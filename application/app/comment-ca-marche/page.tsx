"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Lightbulb, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Euro,
  Zap,
  Bot,
  User,
  Users,
  Search,
  FileText,
  CreditCard,
  Shield,
  Star,
  Rocket,
  Target,
  Briefcase
} from "lucide-react"
import Link from "next/link"

export default function CommentCaMarchePage() {
  const [activeTab, setActiveTab] = useState("client")

  const clientSteps = [
    {
      id: 1,
      icon: Search,
      title: "Décrivez votre projet",
      description: "Exprimez votre besoin en langage naturel : 'Je veux créer un site e-commerce moderne avec paiement sécurisé'",
      details: "Notre IA comprend votre demande et analyse vos contraintes (budget, délai, complexité)",
      color: "blue"
    },
    {
      id: 2,
      icon: Lightbulb,
      title: "Service Paths générés automatiquement",
      description: "Recevez 3 feuilles de route personnalisées avec prestataires sélectionnés",
      details: "Chaque approche inclut : jalons, délais, prix et profils des prestataires avec portfolios IA",
      color: "green"
    },
    {
      id: 3,
      icon: Users,
      title: "Choisissez votre équipe",
      description: "Consultez les portfolios automatiques et sélectionnez les prestataires parfaits",
      details: "Portfolios pro générés par IA garantissent la qualité et la crédibilité",
      color: "purple"
    },
    {
      id: 4,
      icon: FileText,
      title: "Contractualisation automatique",
      description: "Signature électronique et paiement sous escrow sécurisé",
      details: "Contrats générés automatiquement, paiements libérés selon les jalons validés",
      color: "orange"
    },
    {
      id: 5,
      icon: Rocket,
      title: "Projet livré + Portfolio",
      description: "Recevez votre projet ET un portfolio automatique pour le présenter",
      details: "Bonus : Portfolio de votre projet généré pour vos communications/investors",
      color: "pink"
    }
  ]

  const providerSteps = [
    {
      id: 1,
      icon: User,
      title: "Inscription simple",
      description: "Décrivez vos compétences en quelques phrases naturelles",
      details: "Pas besoin de CV complexe, parlez simplement de votre expérience",
      color: "blue"
    },
    {
      id: 2,
      icon: Bot,
      title: "Portfolio IA automatique",
      description: "Notre IA génère votre portfolio professionnel en 2 minutes",
      details: "Design moderne, projets mis en valeur, CV optimisé, déployé automatiquement",
      color: "green"
    },
    {
      id: 3,
      icon: Target,
      title: "Matching intelligent",
      description: "Vous êtes automatiquement proposé pour les projets qui vous correspondent",
      details: "Plus besoin de chercher des clients, ils viennent à vous grâce à votre portfolio IA",
      color: "purple"
    },
    {
      id: 4,
      icon: Briefcase,
      title: "Projets garantis",
      description: "Travaillez sereinement avec paiement sécurisé sous escrow",
      details: "Fini les impayés, paiements automatiques à chaque jalon validé",
      color: "orange"
    },
    {
      id: 5,
      icon: Star,
      title: "Portfolio enrichi automatiquement",
      description: "Chaque projet livré enrichit automatiquement votre portfolio",
      details: "Votre crédibilité grandit avec chaque mission réussie",
      color: "pink"
    }
  ]

  const features = [
    {
      icon: Bot,
      title: "IA Portfolio Generator",
      description: "Première plateforme au monde à générer automatiquement des portfolios professionnels",
      benefit: "Prestataires crédibles instantanément"
    },
    {
      icon: Lightbulb,
      title: "Service Paths Intelligents",
      description: "Feuilles de route personnalisées générées par IA selon votre contexte",
      benefit: "Fini les devis interminables"
    },
    {
      icon: Shield,
      title: "Paiement Escrow Sécurisé",
      description: "Fonds détenus en sécurité, libérés automatiquement selon les jalons",
      benefit: "Zéro risque pour tous"
    },
    {
      icon: Zap,
      title: "Matching Ultra-Précis",
      description: "Algorithme IA qui trouve les prestataires parfaits selon 50+ critères",
      benefit: "Résultats garantis"
    }
  ]

  const faqs = [
    {
      question: "Comment l'IA génère-t-elle des portfolios si professionnels ?",
      answer: "Notre IA utilise les meilleures pratiques du design, analyse vos compétences et génère automatiquement une mise en page moderne, un contenu optimisé et un CV structuré. Le tout est déployé automatiquement sur Vercel avec un nom de domaine personnalisé."
    },
    {
      question: "Quelle est la différence avec Fiverr ou Upwork ?",
      answer: "BondAI révolutionne 3 aspects : 1) Portfolios IA automatiques (vs manuels ailleurs), 2) Service Paths intelligents (vs recherche basique), 3) Contractualisation complète intégrée (vs négociation manuelle)."
    },
    {
      question: "Le paiement escrow est-il vraiment sûr ?",
      answer: "Oui, vos fonds sont détenus par un tiers de confiance certifié. Ils ne sont libérés aux prestataires qu'après validation de chaque jalon par vous. En cas de litige, un arbitrage automatique protège vos intérêts."
    },
    {
      question: "Combien coûte la génération de portfolio IA ?",
      answer: "C'est GRATUIT pour tous les prestataires qui s'inscrivent sur BondAI. C'est notre façon d'attirer les meilleurs talents et de garantir un niveau de qualité exceptionnel sur notre marketplace."
    },
    {
      question: "Les Service Paths sont-ils vraiment personnalisés ?",
      answer: "Absolument ! Notre IA analyse votre demande, votre budget, vos contraintes de temps et génère 3 approches différentes (Rapide/Premium/Innovation) avec les vrais prestataires et leurs portfolios réels."
    }
  ]

  const getStepColor = (color: string) => {
    const colors = {
      blue: "border-blue-200 bg-blue-50",
      green: "border-green-200 bg-green-50",
      purple: "border-purple-200 bg-purple-50",
      orange: "border-orange-200 bg-orange-50",
      pink: "border-pink-200 bg-pink-50"
    }
    return colors[color as keyof typeof colors] || "border-gray-200 bg-gray-50"
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Comment fonctionne BondAI ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez la première marketplace qui génère automatiquement des portfolios IA 
            et transforme vos projets en succès garantis
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2 min</div>
              <div className="text-sm text-muted-foreground">Portfolio IA généré</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">127</div>
              <div className="text-sm text-muted-foreground">Portfolios créés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Satisfaction client</div>
            </div>
          </div>

          <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600">
            <Link href="/demo">
              <Lightbulb className="h-5 w-5 mr-2" />
              Voir la démo interactive
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Process Selection */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choisissez votre parcours
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Client ou prestataire, BondAI s'adapte à vos besoins
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="client" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Je suis client
            </TabsTrigger>
            <TabsTrigger value="provider" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Je suis prestataire
            </TabsTrigger>
          </TabsList>

          {/* Client Journey */}
          <TabsContent value="client">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  🎯 Parcours Client : De l'idée au succès
                </h3>
                <p className="text-muted-foreground">
                  Transformez votre vision en réalité avec l'aide de l'IA
                </p>
              </div>

              {clientSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card key={step.id} className={`${getStepColor(step.color)} border-2`}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200">
                          <Icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              Étape {step.id}
                            </Badge>
                            {step.title}
                          </CardTitle>
                        </div>
                        {index < clientSteps.length - 1 && (
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pl-16">
                      <p className="text-lg font-medium text-foreground mb-2">
                        {step.description}
                      </p>
                      <p className="text-muted-foreground">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Provider Journey */}
          <TabsContent value="provider">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  🚀 Parcours Prestataire : Devenir pro instantanément
                </h3>
                <p className="text-muted-foreground">
                  De l'inscription au succès, tout est automatisé
                </p>
              </div>

              {providerSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <Card key={step.id} className={`${getStepColor(step.color)} border-2`}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200">
                          <Icon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">
                              Étape {step.id}
                            </Badge>
                            {step.title}
                          </CardTitle>
                        </div>
                        {index < providerSteps.length - 1 && (
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pl-16">
                      <p className="text-lg font-medium text-foreground mb-2">
                        {step.description}
                      </p>
                      <p className="text-muted-foreground">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nos technologies révolutionnaires
            </h2>
            <p className="text-lg text-muted-foreground">
              4 innovations qui changent tout
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {feature.benefit}
                      </Badge>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tout ce que vous devez savoir sur BondAI
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-2 border-green-200 bg-green-50 text-center p-12">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Prêt à révolutionner votre façon de travailler ?
          </h2>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Rejoignez la première marketplace avec portfolios IA automatiques. 
            Clients et prestataires, l'avenir vous attend !
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/ai-portfolio">
                <Bot className="h-5 w-5 mr-2" />
                Créer mon Portfolio IA
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-green-300 text-green-700">
              <Link href="/service-paths">
                <Lightbulb className="h-5 w-5 mr-2" />
                Générer mes Service Paths
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-green-300 text-green-700">
              <Link href="/demo">
                <Rocket className="h-5 w-5 mr-2" />
                Voir la démo complète
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700">Portfolio IA gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700">Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700">2 minutes setup</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
