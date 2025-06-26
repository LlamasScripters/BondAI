"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Euro,
  Zap,
  Bot,
  User,
  Play,
  Pause
} from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoSteps = [
    {
      id: 0,
      title: "Problème : Prestataires peu crédibles",
      description: "Les freelances galèrent à créer des portfolios professionnels",
      visual: "😤 Recherche = semaines\n🤔 Qualité = mystère\n📄 Portfolios = amateurs",
      color: "red"
    },
    {
      id: 1,
      title: "Solution SMP : IA Portfolio Generator",
      description: "Notre IA génère automatiquement des portfolios pro en 2 minutes",
      visual: "✨ Portfolio IA = 2 min\n🎯 Professionnel = garanti\n🚀 Déployé = automatique",
      color: "blue"
    },
    {
      id: 2,
      title: "Inscription Prestataire Révolutionnaire",
      description: "Démonstration live de l'onboarding avec portfolio automatique",
      visual: "👨‍💻 Freelance s'inscrit\n🤖 IA génère portfolio\n🎉 Profil pro instantané",
      color: "green"
    },
    {
      id: 3,
      title: "Service Paths + Portfolio",
      description: "Feuilles de route enrichies avec portfolios des prestataires",
      visual: "📋 Projet défini\n🎯 Prestataires matchés\n💼 Portfolios intégrés",
      color: "purple"
    },
    {
      id: 4,
      title: "Résultat : Marketplace Premium",
      description: "La première marketplace avec portfolios IA automatiques",
      visual: "🏆 Différenciation unique\n💰 Valeur client énorme\n🚀 Croissance garantie",
      color: "gold"
    }
  ]

  const autoPlay = () => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 3000)
      return interval
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined
    if (isPlaying) {
      interval = autoPlay()
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  const getStepColor = (color: string) => {
    const colors = {
      red: "border-red-200 bg-red-50",
      blue: "border-blue-200 bg-blue-50", 
      green: "border-green-200 bg-green-50",
      purple: "border-purple-200 bg-purple-50",
      gold: "border-yellow-200 bg-yellow-50"
    }
    return colors[color as keyof typeof colors] || "border-gray-200 bg-gray-50"
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🎯 Démo BondAI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            La révolution du marketplace avec portfolios IA automatiques
          </p>
          
          {/* Demo Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Auto Play"}
            </Button>
            
            <div className="flex items-center gap-2">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep 
                      ? "bg-blue-500" 
                      : index < currentStep 
                        ? "bg-green-500" 
                        : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Demo Card */}
        <Card className={`mb-8 border-2 ${getStepColor(demoSteps[currentStep].color)}`}>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Badge variant="outline" className="font-mono">
                Étape {currentStep + 1}/{demoSteps.length}
              </Badge>
            </div>
            <CardTitle className="text-2xl">
              {demoSteps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-center text-muted-foreground">
              {demoSteps[currentStep].description}
            </p>
            
            {/* Visual Demo */}
            <div className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300">
              <pre className="text-center text-lg font-semibold whitespace-pre-line">
                {demoSteps[currentStep].visual}
              </pre>
            </div>

            {/* Step-specific Actions */}
            {currentStep === 1 && (
              <div className="text-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Link href="/ai-portfolio">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Essayer le Portfolio IA MAINTENANT
                  </Link>
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 text-center">
                  <User className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Prestataire</h4>
                  <p className="text-sm text-muted-foreground">
                    S'inscrit avec ses compétences
                  </p>
                </Card>
                <Card className="p-4 text-center">
                  <Bot className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold">IA SMP</h4>
                  <p className="text-sm text-muted-foreground">
                    Génère portfolio automatiquement
                  </p>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/service-paths">
                    <Zap className="h-5 w-5 mr-2" />
                    Voir les Service Paths
                  </Link>
                </Button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Précédent
              </Button>
              
              <Button 
                onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
                disabled={currentStep === demoSteps.length - 1}
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Value Proposition Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6">
            <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">2 minutes</h3>
            <p className="text-sm text-muted-foreground">
              Au lieu de 2 semaines pour créer un portfolio
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">100% Professionnel</h3>
            <p className="text-sm text-muted-foreground">
              Qualité garantie par IA + templates optimisés
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <Euro className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Gratuit</h3>
            <p className="text-sm text-muted-foreground">
              Inclus dans l'inscription prestataire SMP
            </p>
          </Card>
        </div>

        {/* CTA Final */}
        <Card className="border-2 border-green-200 bg-green-50 text-center p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            🚀 Prêt à révolutionner votre marketplace ?
          </h2>
          <p className="text-green-700 mb-6">
            BondAI + Portfolio IA = La combinaison gagnante pour dominer le marché
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/ai-portfolio">
                <Lightbulb className="h-5 w-5 mr-2" />
                Créer mon Portfolio IA
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-green-300 text-green-700">
              <Link href="/service-paths">
                <Zap className="h-5 w-5 mr-2" />
                Explorer Service Paths
              </Link>
            </Button>
          </div>
        </Card>

        {/* Stats Footer */}
        <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            🎉 <strong>127 portfolios</strong> générés • <strong>89% satisfaction</strong> • <strong>2 min</strong> temps moyen
          </p>
        </div>
      </div>
    </div>
  )
} 