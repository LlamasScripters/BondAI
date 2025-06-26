"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Send, Download, Eye, Palette, Sparkles, ExternalLink, Rocket } from "lucide-react"
import { agentsAPI } from "@/lib/api"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  htmlContent?: string
  portfolioData?: any
  projectData?: any
}

export default function AIPortfolioPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState<string>()
  const [generatedPortfolios, setGeneratedPortfolios] = useState<any[]>([])
  const [isGeneratingProject, setIsGeneratingProject] = useState(false)
  const [lastProjectData, setLastProjectData] = useState<any>(null)
  const [isDeployingToVercel, setIsDeployingToVercel] = useState(false)
  const [vercelToken, setVercelToken] = useState("")
  const [showVercelModal, setShowVercelModal] = useState(false)
  const [currentDeploymentFile, setCurrentDeploymentFile] = useState<{filename: string, projectData: any} | null>(null)

  const generateSafeProjectName = (originalName?: string) => {
    if (!originalName) {
      return `portfolio-${Date.now()}`
    }
    
    // Générer un nom sûr pour Vercel
    return originalName
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50) // Limiter à 50 caractères pour éviter les noms trop longs
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await agentsAPI.invokeAgent('portfolio-creator', {
        message: input,
        thread_id: threadId
      })

      // Vérifier si la réponse contient du HTML ou un projet complet
      let htmlContent = undefined
      let portfolioData = undefined
      let projectData = undefined
      
      // Extraire le HTML si présent dans la réponse
      const htmlMatch = response.content.match(/```html\n([\s\S]*?)\n```/)
      if (htmlMatch) {
        htmlContent = htmlMatch[1]
      }
      
      // Détecter si c'est une réponse de tool HTML (contient <!DOCTYPE html>)
      if (response.content.includes('<!DOCTYPE html>')) {
        htmlContent = response.content
      }
      
      // Détecter les réponses JSON (projectFileGenerator ou autres tools)
      try {
        const parsed = JSON.parse(response.content)
        
        // Réponse du projectFileGenerator
        if (parsed.success && parsed.zipPath && parsed.downloadUrl) {
          projectData = parsed
          console.log('✅ Projet généré:', projectData)
        }
        // Anciens tools avec HTML
        else if (parsed.html) {
          htmlContent = parsed.html
          portfolioData = parsed
        }
      } catch {
        // Pas du JSON, vérifier s'il y a un JSON caché dans un commentaire HTML
        const hiddenJsonMatch = response.content.match(/<!-- PROJECT_DATA: ([\s\S]*?) -->/);
        if (hiddenJsonMatch) {
          try {
            const jsonString = hiddenJsonMatch[1].trim();
            const parsed = JSON.parse(jsonString);
            if (parsed.success && parsed.downloadUrl) {
              projectData = parsed;
              console.log('✅ Projet détecté via commentaire caché:', projectData);
            }
          } catch (e) {
            console.log('❌ Erreur parsing JSON caché:', e);
          }
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        htmlContent,
        portfolioData,
        projectData
      }

      setMessages(prev => [...prev, assistantMessage])
      setThreadId(response.thread_id)
      
      // Ajouter à la liste des portfolios générés si HTML trouvé
      if (htmlContent) {
        setGeneratedPortfolios(prev => [...prev, {
          id: Date.now(),
          html: htmlContent,
          data: portfolioData,
          timestamp: new Date()
        }])
      }

    } catch (error) {
      console.error('Erreur:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Assurez-vous que le serveur d'agents est démarré.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const downloadPortfolio = (html: string, filename: string = 'portfolio.html') => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const previewPortfolio = (html: string) => {
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(html)
      newWindow.document.close()
    }
  }

  const downloadProjectZip = async (downloadUrl: string, filename: string) => {
    try {
      // Construire l'URL complète du serveur d'agents
      const serverUrl = process.env.NEXT_PUBLIC_AGENTS_SERVER_URL || 'http://localhost:8000'
      const fullUrl = `${serverUrl}${downloadUrl}`
      
      // Ouvrir le lien de téléchargement dans un nouvel onglet
      const link = document.createElement('a')
      link.href = fullUrl
      link.download = filename
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error)
      alert('Erreur lors du téléchargement. Vérifiez que le serveur est démarré.')
    }
  }

  const generateCompletePortfolio = () => {
    const promptProject = `Je souhaite créer un portfolio complet. Voici mes informations :

- Nom: Alexandre Martin
- Titre: Développeur Full-Stack
- Email: alexandre@exemple.com  
- Compétences: React, Node.js, TypeScript, MongoDB, Docker
- Expérience: 3 ans, niveau intermédiaire
- Projets: E-commerce Platform (React/Node.js), Dashboard Analytics (React/D3.js)
- Objectif: Trouver un nouveau poste

Utilise projectFileGenerator pour créer un projet React complet avec tous les fichiers et un ZIP téléchargeable. Je veux un style moderne avec formulaire de contact.`

    setInput(promptProject)
  }

  // Fonction pour détecter si le bouton de génération doit apparaître
  const shouldShowGenerationButton = () => {
    // Vérifier si l'agent a proposé les options de stack (nouvelles phrases)
    const hasStackOptions = messages.some(message => 
      message.role === 'assistant' && (
        message.content.includes('Option 1 : React') ||
        message.content.includes('Option 2 : Vue.js') ||
        message.content.includes('Option 3 : Je ne sais pas') ||
        message.content.includes('choisissez votre stack') ||
        message.content.includes('Quelle option préférez-vous') ||
        message.content.includes('stack technologique')
      )
    );
    
    // Ou si l'utilisateur a répondu avec Option 1/2/3
    const userChoseStack = messages.some(message =>
      message.role === 'user' && (
        message.content.toLowerCase().includes('option 1') ||
        message.content.toLowerCase().includes('option 2') ||
        message.content.toLowerCase().includes('option 3')
      )
    );

    // Ou si l'agent a dit que le projet est généré
    const projectGenerated = messages.some(message =>
      message.role === 'assistant' && (
        message.content.includes('généré avec succès') ||
        message.content.includes('portfolio-final.zip') ||
        message.content.includes('Utilisez le bouton de téléchargement')
      )
    );
    
    return hasStackOptions || userChoseStack || projectGenerated;
  };

  // Fonction pour forcer la génération de projet en contournant le chat
  const forceGenerateProject = async () => {
    if (isGeneratingProject) return;
    
    setIsGeneratingProject(true);
    try {
      console.log('🚀 Forçage de génération de projet...');
      
      // Étape 1: Structurer les données du chat
      const conversationData = messages.map(m => `${m.role}: ${m.content}`).join('\n');
      
      const structureResponse = await agentsAPI.invokeAgent('portfolio-creator', {
        message: `MODE DIRECT: Utilise structureUserData avec cette conversation: ${conversationData}`,
        thread_id: threadId
      });
      
      console.log('📊 Structure response:', structureResponse.content);
      
      // Étape 2: Générer le projet avec projectFileGenerator
      const generateResponse = await agentsAPI.invokeAgent('portfolio-creator', {
        message: `MODE DIRECT: Utilise projectFileGenerator avec selectedStack: "react", userStructuredData: "${structureResponse.content}", projectName: "sami-portfolio-force"`,
        thread_id: threadId
      });
      
      console.log('🎯 Generate response:', generateResponse.content);
      
      // Vérifier si on a une réponse JSON
      try {
        const projectData = JSON.parse(generateResponse.content);
        if (projectData.success && projectData.downloadUrl) {
          setLastProjectData(projectData);
          console.log('✅ Projet généré avec succès!', projectData);
        }
      } catch {
        console.log('📝 Réponse non-JSON:', generateResponse.content);
      }
      
    } catch (error) {
      console.error('❌ Erreur génération forcée:', error);
      alert('Erreur lors de la génération. Vérifiez que le serveur est démarré.');
    } finally {
      setIsGeneratingProject(false);
    }
  }

  const quickPrompts = [
    "Je suis développeur web avec 3 ans d'expérience, aide-moi à créer un portfolio moderne",
    "Génère-moi une section 'À propos' pour un designer UX/UI créatif", 
    "Crée une description pour mon projet e-commerce en React/Node.js",
    "Optimise mon portfolio pour le secteur de la fintech",
    "Suggère-moi des compétences pour un poste de chef de projet"
  ]

  const deployToVercel = async (filename: string, projectData: any) => {
    if (!vercelToken.trim()) {
      setCurrentDeploymentFile({filename, projectData})
      setShowVercelModal(true)
      return
    }

    setIsDeployingToVercel(true)
    try {
      console.log('🚀 Déploiement sur Vercel...', filename)
      
      const serverUrl = process.env.NEXT_PUBLIC_AGENTS_SERVER_URL || 'http://localhost:8000'
      const response = await fetch(`${serverUrl}/deploy-to-vercel/${filename}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vercelToken: vercelToken,
          projectName: generateSafeProjectName(projectData.projectName),
          teamId: null // Optionnel
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors du déploiement')
      }

      const result = await response.json()
      console.log('✅ Déploiement réussi:', result)

      // Ajouter l'URL de déploiement au message
      const deploymentMessage: Message = {
        role: 'assistant',
        content: `🎉 **Déploiement Vercel réussi !**

Votre portfolio a été déployé avec succès sur Vercel.

🔗 **URL de production :** ${result.deployment.url}

Votre site est maintenant en ligne et accessible à tous ! Vous pouvez partager cette URL directement.`,
        timestamp: new Date(),
        projectData: {
          ...projectData,
          vercelUrl: result.deployment.url,
          deploymentId: result.deployment.id
        }
      }

      setMessages(prev => [...prev, deploymentMessage])
      alert(`✅ Déploiement réussi ! Votre site est disponible à : ${result.deployment.url}`)
      
    } catch (error) {
      console.error('❌ Erreur déploiement Vercel:', error)
      alert(`❌ Erreur lors du déploiement : ${error.message}`)
    } finally {
      setIsDeployingToVercel(false)
    }
  }

  const handleVercelTokenSubmit = () => {
    if (vercelToken.trim() && currentDeploymentFile) {
      setShowVercelModal(false)
      deployToVercel(currentDeploymentFile.filename, currentDeploymentFile.projectData)
      setCurrentDeploymentFile(null)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Palette className="h-10 w-10 text-purple-600" />
            Portfolio Creator AI
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agent IA spécialisé dans la création de portfolios professionnels. 
            Générez des sections, descriptions de projets, et même le code HTML complet !
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary">🤖 IA Créative</Badge>
            <Badge variant="secondary">🎨 Design Moderne</Badge>
            <Badge variant="secondary">💻 Code HTML/CSS</Badge>
            <Badge variant="secondary">📱 Responsive</Badge>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prompts rapides */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🚀 Exemples de demandes</CardTitle>
                <CardDescription>
                  Cliquez pour essayer ces exemples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 text-sm border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 whitespace-normal leading-relaxed"
                    onClick={() => setInput(prompt)}
                  >
                    <span className="block">{prompt}</span>
                  </Button>
                ))}
                
                {/* Bouton spécial pour génération HTML complète */}
                <Button
                  variant="default"
                  className="w-full text-left justify-start h-auto p-4 text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 whitespace-normal leading-relaxed shadow-lg hover:shadow-xl"
                  onClick={generateCompletePortfolio}
                >
                  <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="block">Générer un portfolio HTML complet (démo)</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💬 Chat avec l'Agent Portfolio
                  {threadId && (
                    <Badge variant="outline" className="text-xs">
                      Session: {threadId.slice(0, 8)}...
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-96">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Palette className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                      <p>Commencez par me parler de votre profil professionnel !</p>
                      <p className="text-sm mt-2">Je peux vous aider à créer chaque section de votre portfolio.</p>
                    </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        
                        {/* Boutons d'action si HTML généré */}
                        {message.htmlContent && (
                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => previewPortfolio(message.htmlContent!)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              Prévisualiser
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadPortfolio(message.htmlContent!, `portfolio-${Date.now()}.html`)}
                              className="flex items-center gap-1"
                            >
                              <Download className="h-3 w-3" />
                              Télécharger
                            </Button>
                          </div>
                        )}

                        {/* Boutons d'action si projet complet généré */}
                        {message.projectData?.success && message.projectData?.downloadUrl && (
                          <div className="mt-3 space-y-2">
                            <div className="text-sm font-medium text-green-600">
                              ✅ Projet complet généré avec succès !
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              <Button
                                size="sm"
                                onClick={() => downloadProjectZip(
                                  message.projectData.downloadUrl, 
                                  `${message.projectData.projectName || 'portfolio'}.zip`
                                )}
                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                              >
                                <Download className="h-3 w-3" />
                                Télécharger ZIP
                              </Button>
                              
                              <Button
                                size="sm"
                                onClick={() => deployToVercel(
                                  message.projectData.downloadUrl.split('/').pop(),
                                  message.projectData
                                )}
                                disabled={isDeployingToVercel}
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                              >
                                {isDeployingToVercel ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Rocket className="h-3 w-3" />
                                )}
                                Déployer sur Vercel
                              </Button>
                              
                              <div className="text-xs text-gray-500 self-center">
                                {message.projectData.files?.length || 0} fichiers
                              </div>
                            </div>
                            
                            {/* Afficher l'URL Vercel si disponible */}
                            {message.projectData.vercelUrl && (
                              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="text-sm font-medium text-blue-800 mb-1">
                                  🌐 Site déployé sur Vercel
                                </div>
                                <a 
                                  href={message.projectData.vercelUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline text-sm flex items-center gap-1"
                                >
                                  {message.projectData.vercelUrl}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                            
                            {message.projectData.stackInfo && (
                              <div className="text-xs text-gray-600 mt-1">
                                Stack: {message.projectData.stackInfo.split('\n')[0].replace('**Stack:** ', '')}
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 p-3 rounded-lg flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        L'agent travaille sur votre demande...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Décrivez votre profil ou demandez-moi de créer une section spécifique de votre portfolio..."
                    className="flex-1 min-h-[60px] resize-none"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section des portfolios générés */}
        {generatedPortfolios.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">🎨 Portfolios générés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedPortfolios.map((portfolio) => (
                <Card key={portfolio.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Portfolio #{portfolio.id}</h3>
                    <Badge variant="secondary">{portfolio.timestamp.toLocaleTimeString()}</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => previewPortfolio(portfolio.html)}
                      className="flex-1 flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Voir
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadPortfolio(portfolio.html, `portfolio-${portfolio.id}.html`)}
                      className="flex-1 flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Télécharger
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Modal pour le token Vercel */}
        {showVercelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-blue-600" />
                  Déploiement sur Vercel
                </CardTitle>
                <CardDescription>
                  Entrez votre token d'API Vercel pour déployer automatiquement votre portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="vercel-token">Token d'API Vercel</Label>
                  <Input
                    id="vercel-token"
                    type="password"
                    placeholder="vercel_xxxxxxxxxxxx"
                    value={vercelToken}
                    onChange={(e) => setVercelToken(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Créez un token sur{" "}
                    <a 
                      href="https://vercel.com/account/tokens" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      vercel.com/account/tokens
                    </a>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleVercelTokenSubmit}
                    disabled={!vercelToken.trim() || isDeployingToVercel}
                    className="flex-1"
                  >
                    {isDeployingToVercel ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Déploiement...
                      </>
                    ) : (
                      <>
                        <Rocket className="h-4 w-4 mr-2" />
                        Déployer
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowVercelModal(false)
                      setCurrentDeploymentFile(null)
                    }}
                    disabled={isDeployingToVercel}
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions rapides */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Prévisualisation Live</h3>
            <p className="text-sm text-muted-foreground">
              Visualisez votre portfolio en temps réel dans un nouvel onglet
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <Download className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-1">Export ZIP Complet</h3>
            <p className="text-sm text-muted-foreground">
              Téléchargez le projet complet prêt à déployer
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <Rocket className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Déploiement Vercel</h3>
            <p className="text-sm text-muted-foreground">
              Déployez automatiquement sur Vercel en un clic
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <Palette className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold mb-1">Thèmes Modernes</h3>
            <p className="text-sm text-muted-foreground">
              Modern, Dark, Minimal, Creative avec animations
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 