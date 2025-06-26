#!/usr/bin/env node

import { HumanMessage } from '@langchain/core/messages';
import { RunnableConfig } from '@langchain/core/runnables';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { getAgent, getAgentsMetadata } from './agents-registry.mts';
import AdmZip from 'adm-zip';
import fetch from 'node-fetch';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
interface AgentConfig {
  id: string;
  name: string;
  description: string;
}

interface UserInput {
  message: string;
  thread_id?: string;
  conversation_id?: string;
  chat_id?: string;
  context?: any;
  details?: any;
}

interface AgentResponse {
  content: string;
  thread_id: string;
  run_id: string;
}

interface ChatMessage {
  type: 'human' | 'ai' | 'tool';
  content: string;
  timestamp: string;
  tool_calls?: any[];
  tool_call_id?: string;
}

interface ConversationState {
  thread_id: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

// Configuration
const API_VERSION = "1.0.0";
const API_TITLE = "Agent CLI Server";
const API_DESCRIPTION = "Serveur Express.js pour le CLI des agents IA";
const PORT = process.env.PORT || 8080;

// In-memory storage (replace with real database in production)
const conversations: Map<string, ConversationState> = new Map();
const activeGenerations: Map<string, boolean> = new Map();

// Load agents configuration - utilise maintenant le registre d'agents
async function loadAgentsConfig(): Promise<AgentConfig[]> {
  try {
    // Récupération des métadonnées depuis le registre
    const agents = getAgentsMetadata();
    console.log(`✅ ${agents.length} agent(s) chargé(s) depuis le registre:`, agents.map(a => a.id).join(', '));
    return agents;
  } catch (error) {
    console.warn('⚠️ Erreur lors du chargement des agents depuis le registre:', error);
    return [];
  }
}

// Middleware d'authentification
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token && process.env.REQUIRE_AUTH !== 'false') {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  // Store token in request for later use
  (req as any).token = token;
  next();
}

// Middleware de gestion des erreurs
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    message: err.message,
    path: req.path
  });
}

// Utilitaires pour les conversations
function getOrCreateConversation(threadId: string): ConversationState {
  if (!conversations.has(threadId)) {
    const now = new Date().toISOString();
    conversations.set(threadId, {
      thread_id: threadId,
      messages: [],
      created_at: now,
      updated_at: now
    });
  }
  return conversations.get(threadId)!;
}

function addMessageToConversation(threadId: string, message: ChatMessage) {
  const conversation = getOrCreateConversation(threadId);
  conversation.messages.push(message);
  conversation.updated_at = new Date().toISOString();
}

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.text());

// Routes
app.get('/health', async (req: Request, res: Response) => {
  try {
    const agents = await loadAgentsConfig();
    res.json({
      status: 'ok',
      version: API_VERSION,
      title: API_TITLE,
      description: API_DESCRIPTION,
      timestamp: new Date().toISOString(),
      agents_count: agents.length,
      available_agents: agents.map(a => a.id),
      components: {
        api: 'healthy',
        agents: 'healthy',
        database: 'healthy' // Simulé
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la vérification de santé'
    });
  }
});

app.get('/agents', authenticateToken, async (req: Request, res: Response) => {
  try {
    const agents = await loadAgentsConfig();
    res.json(agents);
  } catch (error) {
    console.error('Erreur lors du chargement des agents:', error);
    res.status(500).json({
      error: 'Erreur lors du chargement des agents',
      message: (error as Error).message
    });
  }
});

app.post('/:agentId/invoke', authenticateToken, async (req: Request, res: Response) => {
  const { agentId } = req.params;
  const userInput: UserInput = req.body;
  
  try {
    console.log(`🤖 Invocation de l'agent ${agentId} pour le thread ${userInput.thread_id || 'nouveau'}`);
    
    const threadId = userInput.thread_id || uuidv4();
    const runId = uuidv4();
    
    // Récupérer l'agent depuis le registre
    const agent = getAgent(agentId);

    // Ajouter le message utilisateur à la conversation
    addMessageToConversation(threadId, {
      type: 'human',
      content: userInput.message,
      timestamp: new Date().toISOString()
    });

    // Configuration pour l'agent
    const config: RunnableConfig = {
      configurable: { thread_id: threadId },
      runId: runId
    };

    // Invoquer l'agent avec le message
    const input = { messages: [new HumanMessage({ content: userInput.message })] };
    const result = await agent.invoke(input, config);

    // Extraire la réponse
    const lastMessage = result.messages[result.messages.length - 1];
    const responseContent = lastMessage?.content || 'Aucune réponse';

    // Ajouter la réponse de l'agent à la conversation
    addMessageToConversation(threadId, {
      type: 'ai',
      content: responseContent.toString(),
      timestamp: new Date().toISOString()
    });

    const agentResponse: AgentResponse = {
      content: responseContent.toString(),
      thread_id: threadId,
      run_id: runId
    };

    res.json(agentResponse);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'invocation:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'invocation de l\'agent',
      message: (error as Error).message
    });
  }
});

app.post('/:agentId/stream', authenticateToken, async (req: Request, res: Response) => {
  const { agentId } = req.params;
  const userInput: UserInput = req.body;
  
  try {
    console.log(`🌊 Streaming avec l'agent ${agentId} pour le thread ${userInput.thread_id || 'nouveau'}`);
    
    const threadId = userInput.thread_id || uuidv4();
    const runId = uuidv4();
    
    // Récupérer l'agent depuis le registre
    const agent = getAgent(agentId);

    // Configuration SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Cache-Control');

    // Marquer la génération comme active
    activeGenerations.set(threadId, true);

    // Fonction pour envoyer des événements SSE
    const sendSSE = (event: string, data?: any) => {
      res.write(`event: ${event}\n`);
      if (data !== undefined) {
        res.write(`data: ${JSON.stringify(data)}\n`);
      }
      res.write('\n');
    };

    // Ajouter le message utilisateur à la conversation
    addMessageToConversation(threadId, {
      type: 'human',
      content: userInput.message,
      timestamp: new Date().toISOString()
    });

    // Commencer le streaming
    sendSSE('stream_start');

    try {
      // Configuration pour l'agent
      const config: RunnableConfig = {
        configurable: { thread_id: threadId },
        runId: runId
      };

      const input = { messages: [new HumanMessage({ content: userInput.message })] };
      let fullResponse = '';

      try {
        // Utiliser le vrai streaming pour capturer les événements d'outils
        const stream = await agent.stream(input, config);
        
        for await (const chunk of stream) {
          if (!activeGenerations.get(threadId)) {
            break; // Génération arrêtée
          }
          
          console.log('📦 Chunk reçu:', JSON.stringify(chunk, null, 2));
          
          // Traiter les différents nœuds du graphe
          for (const [nodeName, nodeData] of Object.entries(chunk)) {
            if (nodeName === '__start__') continue;
            
            console.log(`🔄 Nœud: ${nodeName}`, nodeData);
            
            // Traiter les messages dans nodeData
            if (nodeData && typeof nodeData === 'object' && 'messages' in nodeData) {
              const messages = (nodeData as any).messages || [];
              
              for (const message of messages) {
                // Détecter les appels d'outils
                if (message.tool_calls && Array.isArray(message.tool_calls)) {
                  for (const toolCall of message.tool_calls) {
                    sendSSE('tool_execution_start', {
                      name: toolCall.name,
                      params: toolCall.args || {},
                      id: toolCall.id
                    });
                  }
                }
                
                // Détecter les résultats d'outils
                if (message.tool_call_id && message.content) {
                  sendSSE('tool_execution_complete', {
                    name: message.name || 'tool',
                    output: message.content,
                    id: message.tool_call_id
                  });
                }
                
                // Messages normaux de l'agent
                if (message.content && !message.tool_call_id && nodeName === 'agent') {
                  const content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
                  fullResponse += content;
                  
                  // Envoyer le contenu par petits chunks
                  const chunks = content.match(/.{1,10}/g) || [content];
                  for (const textChunk of chunks) {
                    sendSSE('stream_token', { token: textChunk });
                    await new Promise(resolve => setTimeout(resolve, 20));
                  }
                }
              }
            }
          }
        }
      } catch (streamError) {
        console.error('❌ Erreur pendant le streaming de l\'agent:', streamError);
        sendSSE('tool_execution_error', {
          name: 'agent_stream',
          error: (streamError as Error).message
        });
        fullResponse = `Erreur lors du traitement de votre demande: ${(streamError as Error).message}`;
        sendSSE('stream_token', { token: fullResponse });
      }

      // Ajouter la réponse complète à la conversation
      if (fullResponse) {
        addMessageToConversation(threadId, {
          type: 'ai',
          content: fullResponse,
          timestamp: new Date().toISOString()
        });
      }

      // Terminer le streaming
      sendSSE('stream_end', { thread_id: threadId });
      
    } catch (error) {
      console.error('❌ Erreur pendant le streaming:', error);
      sendSSE('error', (error as Error).message);
    } finally {
      // Nettoyer
      activeGenerations.delete(threadId);
      res.end();
    }

    // Gérer la déconnexion du client
    req.on('close', () => {
      console.log(`🔌 Client déconnecté pour le thread ${threadId}`);
      activeGenerations.set(threadId, false);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du streaming:', error);
    res.status(500).json({
      error: 'Erreur lors du streaming avec l\'agent',
      message: (error as Error).message
    });
  }
});

app.post('/:agentId/stop', authenticateToken, async (req: Request, res: Response) => {
  const { agentId } = req.params;
  const { thread_id } = req.body;
  
  try {
    console.log(`🛑 Arrêt de la génération pour l'agent ${agentId}, thread ${thread_id}`);
    
    if (thread_id && activeGenerations.has(thread_id)) {
      activeGenerations.set(thread_id, false);
      setTimeout(() => activeGenerations.delete(thread_id), 1000); // Nettoyer après 1 seconde
      
      res.json({
        status: 'success',
        message: 'Génération arrêtée avec succès'
      });
    } else {
      res.json({
        status: 'success',
        message: 'Aucune génération active à arrêter'
      });
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
    res.status(500).json({
      error: 'Erreur lors de l\'arrêt de la génération',
      message: (error as Error).message
    });
  }
});

// Route pour obtenir l'historique d'une conversation
app.get('/conversations/:threadId', authenticateToken, async (req: Request, res: Response) => {
  const { threadId } = req.params;
  
  try {
    const conversation = conversations.get(threadId);
    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation non trouvée',
        message: `Aucune conversation trouvée pour le thread ${threadId}`
      });
    }
    
    res.json(conversation);
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la conversation:', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération de la conversation',
      message: (error as Error).message
    });
  }
});

// Route pour lister toutes les conversations
app.get('/conversations', authenticateToken, async (req: Request, res: Response) => {
  try {
    const conversationList = Array.from(conversations.values()).map(conv => ({
      thread_id: conv.thread_id,
      message_count: conv.messages.length,
      created_at: conv.created_at,
      updated_at: conv.updated_at,
      last_message: conv.messages[conv.messages.length - 1]?.content.slice(0, 100) || 'Aucun message'
    }));
    
    res.json(conversationList);
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des conversations:', error);
    res.status(500).json({
      error: 'Erreur lors de la récupération des conversations',
      message: (error as Error).message
    });
  }
});

// Route pour télécharger les portfolios générés
app.get('/download/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;
  
  try {
    console.log(`📥 Téléchargement demandé pour: ${filename}`);
    
    // Validation du nom de fichier pour sécurité
    if (!filename.match(/^[a-zA-Z0-9-_]+\.zip$/)) {
      return res.status(400).json({
        error: 'Nom de fichier invalide',
        message: 'Le fichier doit être un ZIP avec un nom valide'
      });
    }
    
    const filePath = path.join(process.cwd(), 'generated-portfolios', filename);
    
    // Vérifier que le fichier existe
    try {
      await import('fs').then(fs => fs.promises.access(filePath));
    } catch {
      return res.status(404).json({
        error: 'Fichier non trouvé',
        message: `Le portfolio ${filename} n'existe pas ou a expiré`
      });
    }
    
    // Envoyer le fichier
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('❌ Erreur lors du téléchargement:', err);
        if (!res.headersSent) {
          res.status(500).json({
            error: 'Erreur lors du téléchargement',
            message: err.message
          });
        }
      } else {
        console.log(`✅ Téléchargement réussi: ${filename}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du téléchargement:', error);
    res.status(500).json({
      error: 'Erreur lors du téléchargement',
      message: (error as Error).message
    });
  }
});

// Route pour déployer un portfolio sur Vercel
app.post('/deploy-to-vercel/:filename', authenticateToken, async (req: Request, res: Response) => {
  const { filename } = req.params;
  const { vercelToken, projectName, teamId } = req.body;
  
  try {
    console.log(`🚀 Déploiement Vercel demandé pour: ${filename}`);
    
    // Validation du nom de fichier
    if (!filename.match(/^[a-zA-Z0-9-_]+\.zip$/)) {
      return res.status(400).json({
        error: 'Nom de fichier invalide',
        message: 'Le fichier doit être un ZIP avec un nom valide'
      });
    }

    // Validation du token Vercel
    if (!vercelToken) {
      return res.status(400).json({
        error: 'Token Vercel requis',
        message: 'Le token Vercel est nécessaire pour le déploiement'
      });
    }
    
    const filePath = path.join(process.cwd(), 'generated-portfolios', filename);
    
    // Vérifier que le fichier existe
    try {
      const fs = await import('fs');
      await fs.promises.access(filePath);
    } catch {
      return res.status(404).json({
        error: 'Fichier non trouvé',
        message: `Le portfolio ${filename} n'existe pas ou a expiré`
      });
    }

    // Déployer sur Vercel
    const deploymentResult = await deployToVercel(filePath, vercelToken, projectName, teamId);
    
    console.log(`✅ Déploiement Vercel réussi: ${deploymentResult.url}`);
    
    res.json({
      success: true,
      message: 'Déploiement sur Vercel réussi !',
      deployment: deploymentResult
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du déploiement Vercel:', error);
    res.status(500).json({
      error: 'Erreur lors du déploiement sur Vercel',
      message: (error as Error).message
    });
  }
});

// Fonction pour nettoyer le nom de projet selon les contraintes Vercel
function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase() // Convertir en minuscules
    .replace(/[^a-z0-9._-]/g, '-') // Remplacer les caractères non autorisés par des tirets
    .replace(/---+/g, '--') // Éviter les séquences de 3 tirets ou plus
    .replace(/^[-._]+|[-._]+$/g, '') // Supprimer les tirets/points/underscores au début et à la fin
    .substring(0, 100) // Limiter à 100 caractères
    .replace(/[-._]+$/, ''); // Nettoyer la fin après la troncature
}

// Fonction utilitaire pour déployer sur Vercel
async function deployToVercel(zipPath: string, vercelToken: string, projectName?: string, teamId?: string) {
  const fs = await import('fs');
  
  // Extraire le ZIP dans un dossier temporaire
  const zip = new AdmZip(zipPath);
  const tempDir = path.join(process.cwd(), 'temp-deploy', Date.now().toString());
  await fs.promises.mkdir(tempDir, { recursive: true });
  
  try {
    zip.extractAllTo(tempDir, true);
    
    // Lire la structure des fichiers
    const files = await readDirectoryRecursive(tempDir);
    
    // Déterminer les paramètres du projet selon la stack
    const projectSettings = await determineProjectSettings(tempDir);
    
    // Créer un nom de projet valide pour Vercel
    const validProjectName = sanitizeProjectName(projectName || `portfolio-${Date.now()}`);
    
    // Créer le payload de déploiement Vercel
    const deploymentPayload = {
      name: validProjectName,
      files: files,
      projectSettings: projectSettings,
      target: 'production' as const
    };

    // Ajouter teamId si fourni
    const url = teamId 
      ? `https://api.vercel.com/v13/deployments?teamId=${teamId}`
      : 'https://api.vercel.com/v13/deployments';

    // Envoyer le déploiement à Vercel
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deploymentPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API Vercel (${response.status}): ${errorText}`);
    }

    const deployment = await response.json() as any;
    
    return {
      id: deployment.id,
      url: `https://${deployment.url}`,
      readyState: deployment.readyState,
      createdAt: deployment.createdAt
    };
    
  } finally {
    // Nettoyer le dossier temporaire
    try {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn('⚠️ Erreur lors du nettoyage:', cleanupError);
    }
  }
}

// Fonction pour lire récursivement un dossier et créer la structure de fichiers Vercel
async function readDirectoryRecursive(dir: string): Promise<Array<{file: string, data: string}>> {
  const fs = await import('fs');
  const files: Array<{file: string, data: string}> = [];
  
  async function readDir(currentDir: string, basePath: string = '') {
    const items = await fs.promises.readdir(currentDir, { withFileTypes: true });
    
    for (const item of items) {
      const itemPath = path.join(currentDir, item.name);
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
      
      if (item.isDirectory()) {
        await readDir(itemPath, relativePath);
      } else {
        const content = await fs.promises.readFile(itemPath, 'utf-8');
        files.push({
          file: relativePath,
          data: content
        });
      }
    }
  }
  
  await readDir(dir);
  return files;
}

// Fonction pour déterminer les paramètres du projet selon la stack
async function determineProjectSettings(projectDir: string) {
  const fs = await import('fs');
  
  try {
    // Vérifier s'il y a un package.json
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = JSON.parse(await fs.promises.readFile(packageJsonPath, 'utf-8'));
    
    // Détecter la stack à partir des dépendances
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    if (dependencies.react && dependencies.next) {
      return {
        framework: 'nextjs',
        buildCommand: 'npm run build',
        outputDirectory: '.next',
        installCommand: 'npm install',
        devCommand: 'npm run dev'
      };
    } else if (dependencies.react && dependencies.vite) {
      return {
        framework: null,
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        installCommand: 'npm install',
        devCommand: 'npm run dev'
      };
    } else if (dependencies.vue && dependencies.vite) {
      return {
        framework: null,
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        installCommand: 'npm install',
        devCommand: 'npm run dev'
      };
    }
  } catch (error) {
    console.log('📝 Pas de package.json trouvé, utilisation des paramètres par défaut');
  }
  
  // Paramètres par défaut pour du HTML statique
  return {
    framework: null,
    buildCommand: null,
    outputDirectory: null,
    installCommand: null,
    devCommand: null
  };
}

// Middleware de gestion des erreurs
app.use(errorHandler);

// Gérer les routes non trouvées
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route non trouvée',
    message: `La route ${req.path} n'existe pas`,
    available_endpoints: [
      'GET /health',
      'GET /agents',
      'POST /:agentId/invoke',
      'POST /:agentId/stream',
      'POST /:agentId/stop',
      'GET /conversations',
      'GET /conversations/:threadId',
      'GET /download/:filename',
      'POST /deploy-to-vercel/:filename'
    ]
  });
});

// Démarrer le serveur
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log('🚀 Serveur Agent CLI démarré !');
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/health`);
      console.log(`🤖 Agents: http://localhost:${PORT}/agents`);
      console.log('');
      console.log('📚 Endpoints disponibles:');
      console.log('  GET  /health                     - Vérification de santé');
      console.log('  GET  /agents                     - Liste des agents');
      console.log('  POST /:agentId/invoke            - Invocation directe');
      console.log('  POST /:agentId/stream            - Streaming SSE');
      console.log('  POST /:agentId/stop              - Arrêter la génération');
      console.log('  GET  /conversations              - Liste des conversations');
      console.log('  GET  /conversations/:threadId    - Détails d\'une conversation');
      console.log('  GET  /download/:filename         - Télécharger un portfolio ZIP');
      console.log('  POST /deploy-to-vercel/:filename - Déployer sur Vercel');
      console.log('');
      console.log('🔑 Variables d\'environnement:');
      console.log(`  PORT=${PORT}`);
      console.log(`  REQUIRE_AUTH=${process.env.REQUIRE_AUTH || 'true'}`);
      console.log('');
      console.log('💡 Pour tester avec le CLI:');
      console.log('  npm run cli check');
      console.log('  npm run cli chat');
      
      // Charger et afficher les agents disponibles
      loadAgentsConfig().then(agents => {
        console.log('');
        console.log('🤖 Agents disponibles:');
        agents.forEach(agent => {
          console.log(`  - ${agent.id}: ${agent.name}`);
          console.log(`    ${agent.description}`);
        });
      });
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Gérer l'arrêt propre du serveur
process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Arrêt du serveur...');
  process.exit(0);
});

// Démarrer le serveur si ce fichier est exécuté directement
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export default app; 