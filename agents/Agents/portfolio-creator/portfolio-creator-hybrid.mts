import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { structureUserData } from "./tools/data-structurer.mts";
import { projectFileGeneratorUltraSimple } from "./tools/project-file-generator-ultra-simple.mts";

const agentModel = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
});

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class HybridPortfolioCreatorAgent {
  private conversations = new Map<string, ConversationMessage[]>();

  async invoke(input: { message: string; thread_id?: string }): Promise<{ content: string; thread_id: string }> {
    const threadId = input.thread_id || `thread-${Date.now()}`;
    
    console.log(`🤖 AGENT HYBRIDE: Message pour thread ${threadId}: "${input.message}"`);
    
    // Récupérer la conversation existante
    if (!this.conversations.has(threadId)) {
      this.conversations.set(threadId, []);
    }
    const conversation = this.conversations.get(threadId)!;
    
    // Ajouter le message utilisateur
    conversation.push({
      role: 'user',
      content: input.message,
      timestamp: new Date()
    });
    
    try {
      // 🔥 INTERCEPTION : Si l'utilisateur choisit une option → FORCER LA GÉNÉRATION
      if (input.message.toLowerCase().includes('option')) {
        console.log('🚀 OPTION DÉTECTÉE - GÉNÉRATION FORCÉE PAR CODE');
        const response = await this.forceGeneration(conversation, input.message);
        
        conversation.push({
          role: 'assistant',
          content: response,
          timestamp: new Date()
        });
        
        return { content: response, thread_id: threadId };
      }
      
      // Sinon, utiliser le LLM avec des instructions strictes
      const response = await this.askLLM(conversation);
      
      // 🔥 FALLBACK : Si on a 6+ messages et pas d'options proposées, FORCER
      const messageCount = conversation.filter(m => m.role === 'user').length;
      const hasNotProposedOptions = !response.toLowerCase().includes('option 1 : react');
      
      let finalResponse = response;
      if (messageCount >= 6 && hasNotProposedOptions && !response.includes('stack technologique')) {
        console.log('🚨 FALLBACK ACTIVÉ - FORCE LES OPTIONS');
        finalResponse = `🚀 Parfait ! J'ai maintenant toutes les informations nécessaires pour créer votre portfolio. Choisissez votre stack technologique :

**Option 1 : React + TanStack + shadcn/ui + TypeScript**
- Moderne et très recherché par les employeurs

**Option 2 : Vue.js 3 + Pinia + Vue Router + TypeScript**  
- Framework intuitif et performant

**Option 3 : Je ne sais pas / Performance maximale**
- HTML5 + JavaScript ES6+ + CSS natif

Quelle option préférez-vous ?`;
      }
      
      conversation.push({
        role: 'assistant',
        content: finalResponse,
        timestamp: new Date()
      });
      
      return { content: finalResponse, thread_id: threadId };
      
    } catch (error) {
      console.error('❌ Erreur agent hybride:', error);
      return {
        content: "❌ Erreur lors du traitement de votre demande.",
        thread_id: threadId
      };
    }
  }

  private async forceGeneration(conversation: ConversationMessage[], choice: string): Promise<string> {
    try {
      console.log('🎯 DÉBUT GÉNÉRATION FORCÉE (SANS LLM)');
      
      // Déterminer la stack choisie
      let selectedStack: 'react' | 'vue' | 'vanilla' = 'react';
      if (choice.toLowerCase().includes('option 2')) {
        selectedStack = 'vue';
      } else if (choice.toLowerCase().includes('option 3')) {
        selectedStack = 'vanilla';
      }

      console.log(`🚀 Stack sélectionnée: ${selectedStack}`);
      
      // Structurer les données de la conversation
      const conversationText = conversation.map(m => `${m.role}: ${m.content}`).join('\n');
      console.log('📊 Appel tool structureUserData...');
      
      const structuredData = await structureUserData.invoke({
        conversationData: conversationText
      });
      
      console.log('🔧 Appel tool projectFileGeneratorUltraSimple...');
      
      // Générer le projet
      const projectResult = await projectFileGeneratorUltraSimple.invoke({
        selectedStack,
        userStructuredData: structuredData,
        projectName: "portfolio-hybrid"
      });
      
      console.log('✅ GÉNÉRATION FORCÉE TERMINÉE');
      
      // Transformer le JSON en message utilisateur-friendly MAIS garder le JSON pour l'interface
      try {
        const parsed = JSON.parse(projectResult);
        if (parsed.success) {
          // Retourner le JSON ET le message user-friendly séparés par un marqueur
          const userMessage = `✅ Votre portfolio ${selectedStack.toUpperCase()} a été généré avec succès !

🎉 Votre projet est prêt et inclut :
- Page HTML moderne et responsive  
- Composants React/Vue réutilisables
- Configuration package.json complète
- Documentation README.md

📥 **Votre fichier ZIP est prêt à télécharger !**

Le projet contient ${parsed.files?.length || 3} fichiers et utilise la stack ${selectedStack.toUpperCase()}.

🔗 Utilisez le bouton de téléchargement qui apparaît automatiquement pour récupérer votre portfolio !`;

          // Retourner le message user-friendly + JSON caché pour l'interface
          return `${userMessage}

<!-- PROJECT_DATA: ${projectResult} -->`;
        }
      } catch {
        // Si le parsing échoue, on retourne le résultat tel quel
      }
      
      return projectResult;
      
    } catch (error) {
      console.error('❌ ERREUR GÉNÉRATION FORCÉE:', error);
      return `❌ Erreur lors de la génération: ${error.message}`;
    }
  }

  private async askLLM(conversation: ConversationMessage[]): Promise<string> {
    const conversationText = conversation.map(m => `${m.role}: ${m.content}`).join('\n');
    
    // Détecter si on doit proposer les options
    const shouldProposeOptions = this.shouldProposeStackOptions(conversationText);
    
    // Compter les échanges pour décider
    const messageCount = conversationText.split('\n').filter(m => m.startsWith('user:')).length;
    const hasNotProposedOptions = !conversationText.toLowerCase().includes('option 1 : react');
    
    let prompt = `Tu es un assistant portfolio IA. Réponds en français de manière naturelle et engageante.

Conversation actuelle:
${conversationText}

RÈGLES STRICTES:
- Ne JAMAIS proposer Next.js, Symfony, ou d'autres stacks
- SEULEMENT les 3 options fixes : React+TanStack, Vue+Pinia, ou Vanilla
- Poser PLUSIEURS questions avant de proposer les stacks

Instructions:
${(shouldProposeOptions || messageCount >= 6) && hasNotProposedOptions ? `
🔥🔥🔥 ABSOLUMENT OBLIGATOIRE - TU DOIS PROPOSER LES OPTIONS MAINTENANT 🔥🔥🔥

Copie-colle EXACTEMENT ce texte (RIEN d'autre) :

🚀 Parfait ! J'ai maintenant toutes les informations nécessaires pour créer votre portfolio. Choisissez votre stack technologique :

**Option 1 : React + TanStack + shadcn/ui + TypeScript**
- Moderne et très recherché par les employeurs

**Option 2 : Vue.js 3 + Pinia + Vue Router + TypeScript**  
- Framework intuitif et performant

**Option 3 : Je ne sais pas / Performance maximale**
- HTML5 + JavaScript ES6+ + CSS natif

Quelle option préférez-vous ?

🚨 STOP - N'ajoute AUCUN autre texte après ça !
` : `
- Si l'utilisateur n'a pas donné son nom, demande son nom et titre professionnel
- Si il n'a pas donné ses compétences, demande ses compétences principales
- Si il n'a pas parlé de projets, demande ses projets principaux
- Si il n'a pas parlé d'objectifs, demande ses objectifs (emploi, freelance, etc.)
- Si il n'a pas parlé de design, demande ses préférences de style
- Sois naturel et engageant
- Une seule question courte à la fois
- APRÈS AU MOINS 5 questions/réponses, tu pourras proposer les 3 options de stack
- NE JAMAIS mentionner Next.js, Symfony, CMS ou autres stacks
`}

Réponds:`;

    console.log('🤖 Appel LLM Gemini...');
    const response = await agentModel.invoke([{ role: 'user', content: prompt }]);
    return response.content as string;
  }

  private shouldProposeStackOptions(conversationText: string): boolean {
    const text = conversationText.toLowerCase();
    const messages = conversationText.split('\n');
    
    // Compter les échanges (approximatif)
    const userMessages = messages.filter(m => m.startsWith('user:')).length;
    const assistantMessages = messages.filter(m => m.startsWith('assistant:')).length;
    
    // Vérifier qu'on a déjà eu assez d'échanges (augmenté à 6)
    const hasEnoughExchanges = userMessages >= 6 && assistantMessages >= 5;
    
    // Vérifier qu'on n'a pas déjà proposé les options
    const hasNotProposedYet = !text.includes('option 1 : react') && 
                              !text.includes('stack technologique') &&
                              !text.includes('quelle option préférez');
    
    // Détection d'informations complètes
    const hasName = text.includes('je suis') || text.includes('nom');
    const hasSkills = text.includes('développeur') || text.includes('compétences') || text.includes('typescript') || text.includes('react') || text.includes('vue');
    const hasProjects = text.includes('projet') || text.includes('expérience') || text.includes('travaillé');
    const hasObjectives = text.includes('objectif') || text.includes('emploi') || text.includes('freelance') || text.includes('portfolio');
    
    const hasCompleteInfo = hasName && hasSkills && (hasProjects || hasObjectives);
    
    console.log(`📊 Analyse COMPLÈTE: échanges=${userMessages}/${assistantMessages}, nom=${hasName}, skills=${hasSkills}, projets=${hasProjects}, objectifs=${hasObjectives}, complet=${hasCompleteInfo}, notProposed=${hasNotProposedYet}`);
    
    // Proposer si on a eu assez d'échanges ET qu'on a des infos complètes ET qu'on n'a pas déjà proposé
    return hasEnoughExchanges && hasCompleteInfo && hasNotProposedYet;
  }
}

export const portfolioCreatorAgentHybrid = new HybridPortfolioCreatorAgent(); 