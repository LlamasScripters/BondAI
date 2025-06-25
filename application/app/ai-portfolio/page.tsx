"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, Download, Eye, Palette, Sparkles } from "lucide-react"
import { agentsAPI } from "@/lib/api"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  htmlContent?: string
  portfolioData?: any
}

export default function AIPortfolioPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState<string>()
  const [generatedPortfolios, setGeneratedPortfolios] = useState<any[]>([])

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

      // Vérifier si la réponse contient du HTML
      let htmlContent = undefined
      let portfolioData = undefined
      
      // Extraire le HTML si présent dans la réponse
      const htmlMatch = response.content.match(/```html\n([\s\S]*?)\n```/)
      if (htmlMatch) {
        htmlContent = htmlMatch[1]
      }
      
      // Détecter si c'est une réponse de tool HTML (contient <!DOCTYPE html>)
      if (response.content.includes('<!DOCTYPE html>')) {
        htmlContent = response.content
      }
      
      // Ou si la réponse est un objet avec du HTML (tool response)
      try {
        const parsed = JSON.parse(response.content)
        if (parsed.html) {
          htmlContent = parsed.html
          portfolioData = parsed
        }
      } catch {
        // Pas du JSON, c'est normal
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        htmlContent,
        portfolioData
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

  const generateCompletePortfolio = () => {
    const promptHTML = `Génère un portfolio HTML complet et responsive en utilisant ton outil createPortfolioHTML avec ces données :

- Nom: "Alexandre Martin"  
- Titre: "Développeur Full-Stack"
- Bio: "Passionné par le développement web moderne, je crée des applications performantes et intuitives"
- Compétences: ["React", "Node.js", "TypeScript", "MongoDB", "Docker"]
- Projets: [
  {name: "E-commerce Platform", description: "Plateforme complète avec paiement Stripe", tech: ["React", "Node.js", "MongoDB"]},
  {name: "Dashboard Analytics", description: "Interface de visualisation de données en temps réel", tech: ["React", "D3.js", "Socket.io"]}
]
- Contact: {email: "alexandre@exemple.com", linkedin: "linkedin.com/in/alexandre", github: "github.com/alexandre"}

Utilise le thème 'modern' avec animations activées. Assure-toi de retourner directement le code HTML complet.`

    setInput(promptHTML)
  }

  const quickPrompts = [
    "Je suis développeur web avec 3 ans d'expérience, aide-moi à créer un portfolio moderne",
    "Génère-moi une section 'À propos' pour un designer UX/UI créatif", 
    "Crée une description pour mon projet e-commerce en React/Node.js",
    "Optimise mon portfolio pour le secteur de la fintech",
    "Suggère-moi des compétences pour un poste de chef de projet"
  ]

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

        {/* Actions rapides */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1">Prévisualisation Live</h3>
            <p className="text-sm text-muted-foreground">
              Visualisez votre portfolio en temps réel dans un nouvel onglet
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <Download className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold mb-1">Export HTML Complet</h3>
            <p className="text-sm text-muted-foreground">
              Téléchargez le fichier HTML prêt à déployer
            </p>
          </Card>
          
          <Card className="p-4 text-center">
            <Palette className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-semibold mb-1">4 Thèmes Modernes</h3>
            <p className="text-sm text-muted-foreground">
              Modern, Dark, Minimal, Creative avec animations
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
} 