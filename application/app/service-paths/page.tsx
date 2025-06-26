"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import { Lightbulb, Clock, Euro, CheckCircle, ArrowRight, Settings } from "lucide-react"

interface ServicePath {
  id: string
  title: string
  duration: string
  price: string
  steps: Array<{
    id: string
    title: string
    description: string
    provider: string
    estimatedTime: string
    price: string
  }>
  totalPrice: number
  totalDuration: string
}

const mockPaths: ServicePath[] = [
  {
    id: "path1",
    title: "Solution Express - MVP Rapide",
    duration: "2-3 semaines",
    price: "2,500€ - 3,500€",
    totalPrice: 3000,
    totalDuration: "21 jours",
    steps: [
      {
        id: "step1",
        title: "Conception UX/UI",
        description: "Wireframes, maquettes et prototypes interactifs",
        provider: "Thomas Martin",
        estimatedTime: "5 jours",
        price: "800€"
      },
      {
        id: "step2", 
        title: "Développement Frontend",
        description: "Interface React responsive avec Tailwind CSS",
        provider: "Marie Dubois",
        estimatedTime: "10 jours", 
        price: "1,500€"
      },
      {
        id: "step3",
        title: "Backend & API",
        description: "API REST avec authentification et base de données",
        provider: "Alex Chen",
        estimatedTime: "6 jours",
        price: "700€"
      }
    ]
  },
  {
    id: "path2", 
    title: "Solution Premium - Plateforme Complète",
    duration: "4-6 semaines",
    price: "5,500€ - 8,000€",
    totalPrice: 6750,
    totalDuration: "35 jours",
    steps: [
      {
        id: "step1",
        title: "Audit & Stratégie",
        description: "Analyse des besoins et architecture technique",
        provider: "Consultant Senior",
        estimatedTime: "3 jours",
        price: "500€"
      },
      {
        id: "step2",
        title: "Design System Complet", 
        description: "Charte graphique, composants réutilisables",
        provider: "Équipe Design",
        estimatedTime: "8 jours",
        price: "1,500€"
      },
      {
        id: "step3",
        title: "Développement Full-Stack",
        description: "Application complète avec dashboard admin",
        provider: "Équipe Dev Senior",
        estimatedTime: "20 jours",
        price: "4,000€"
      },
      {
        id: "step4",
        title: "Tests & Déploiement",
        description: "Tests automatisés, CI/CD et mise en production",
        provider: "DevOps Expert",
        estimatedTime: "4 jours",
        price: "750€"
      }
    ]
  },
  {
    id: "path3",
    title: "Solution IA-Assistée - Innovation",
    duration: "3-4 semaines", 
    price: "4,000€ - 5,500€",
    totalPrice: 4750,
    totalDuration: "28 jours",
    steps: [
      {
        id: "step1",
        title: "Génération Automatique UI",
        description: "Interface générée par IA selon vos spécifications",
        provider: "IA Designer Pro",
        estimatedTime: "2 jours",
        price: "300€"
      },
      {
        id: "step2",
        title: "Code IA-Assisté",
        description: "Développement accéléré avec assistance IA",
        provider: "Marie + CodeAssistant Pro",
        estimatedTime: "15 jours",
        price: "3,200€"
      },
      {
        id: "step3",
        title: "Optimisation Intelligente",
        description: "Performance et sécurité optimisées par IA",
        provider: "OptiBot AI",
        estimatedTime: "7 jours", 
        price: "900€"
      },
      {
        id: "step4",
        title: "Tests Automatisés",
        description: "Suite de tests générée automatiquement",
        provider: "TestGen AI",
        estimatedTime: "4 jours",
        price: "350€"
      }
    ]
  }
]

export default function ServicePaths() {
  const [userNeed, setUserNeed] = useState("")
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [showPaths, setShowPaths] = useState(false)

  const generatePaths = () => {
    if (userNeed.trim()) {
      setShowPaths(true)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Service Paths</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Décrivez votre projet et recevez 3 feuilles de route personnalisées avec les meilleurs prestataires
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 border-2 border-dashed border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Exprimez votre besoin
              </h2>
              <p className="text-gray-600">
                Plus vous donnez de détails, plus nos feuilles de route seront précises
              </p>
            </div>
            
            <Textarea
              placeholder="Ex: Je veux créer une plateforme e-commerce B2B avec système de devis personnalisés, gestion des stocks en temps réel, intégration comptable et tableau de bord analytique. Budget prévu : 10k€, délai souhaité : 2 mois..."
              value={userNeed}
              onChange={(e) => setUserNeed(e.target.value)}
              className="min-h-[120px] text-lg border-2 border-gray-200 focus:border-blue-400 rounded-xl mb-6"
            />

            <div className="flex justify-center">
              <Button 
                onClick={generatePaths}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-3 text-lg"
                disabled={!userNeed.trim()}
              >
                <Lightbulb className="h-5 w-5 mr-2" />
                Générer mes feuilles de route
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Paths */}
        {showPaths && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                3 approches adaptées à votre projet
              </h3>
              <p className="text-muted-foreground">
                Choisissez la feuille de route qui correspond le mieux à vos contraintes
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {mockPaths.map((path) => (
                <Card 
                  key={path.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPath === path.id 
                      ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                      : 'hover:shadow-md hover:scale-102'
                  }`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={path.id === 'path1' ? 'secondary' : path.id === 'path2' ? 'default' : 'outline'}>
                        {path.id === 'path1' ? 'Rapide' : path.id === 'path2' ? 'Premium' : 'Innovation'}
                      </Badge>
                      {selectedPath === path.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                        <div className="text-sm font-medium">{path.duration}</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Euro className="h-5 w-5 text-green-500 mx-auto mb-1" />
                        <div className="text-sm font-medium">{path.price}</div>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-700">Étapes du projet :</h4>
                      {path.steps.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{step.title}</div>
                            <div className="text-xs text-gray-600 mb-1">{step.description}</div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-blue-600 font-medium">{step.provider}</span>
                              <span className="text-gray-500">{step.estimatedTime} • {step.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full" 
                      variant={selectedPath === path.id ? "default" : "outline"}
                    >
                      {selectedPath === path.id ? (
                        <>
                          <Settings className="h-4 w-4 mr-2" />
                          Personnaliser ce path
                        </>
                      ) : (
                        <>
                          <ArrowRight className="h-4 w-4 mr-2" />
                          Choisir cette approche
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedPath && (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Feuille de route sélectionnée !
                  </h3>
                  <p className="text-green-700 mb-4">
                    Vous pouvez maintenant personnaliser votre parcours ou procéder à la contractualisation
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                      Personnaliser
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Contractualiser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 