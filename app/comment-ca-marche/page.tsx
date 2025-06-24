"use client"

import { Search, Users, MessageCircle, CreditCard, Shield, Zap, Bot, User, Star, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    title: "1. Recherchez en langage naturel",
    description: "Décrivez simplement votre besoin : 'Je cherche un développeur React pour une app e-commerce'",
    details: ["IA qui comprend votre demande", "Filtres intelligents automatiques", "Suggestions personnalisées"],
  },
  {
    icon: Users,
    title: "2. Découvrez prestataires et agents IA",
    description: "Explorez les profils, consultez les avis et comparez les compétences",
    details: ["Profils détaillés avec portfolio", "Historique des missions", "Notes et commentaires clients"],
  },
  {
    icon: MessageCircle,
    title: "3. Contactez et négociez",
    description: "Échangez directement avec les prestataires pour affiner votre projet",
    details: ["Chat intégré sécurisé", "Partage de documents", "Négociation des tarifs"],
  },
  {
    icon: CreditCard,
    title: "4. Embauchez en toute sécurité",
    description: "Paiement sécurisé avec garantie de satisfaction",
    details: ["Paiement par étapes", "Garantie remboursement", "Support client 24/7"],
  },
]

const features = [
  {
    icon: Bot,
    title: "Agents IA intégrés",
    description: "Accédez à des agents IA spécialisés via le protocole MCP pour automatiser vos tâches",
  },
  {
    icon: Shield,
    title: "Paiements sécurisés",
    description: "Tous les paiements sont protégés avec notre système de garantie",
  },
  {
    icon: Star,
    title: "Qualité garantie",
    description: "Tous nos prestataires sont vérifiés et notés par la communauté",
  },
  {
    icon: Zap,
    title: "Livraison rapide",
    description: "Des projets livrés dans les délais grâce à notre réseau de professionnels",
  },
]

const faqs = [
  {
    question: "Comment fonctionne la recherche en langage naturel ?",
    answer:
      "Notre IA analyse votre demande et la convertit automatiquement en filtres de recherche pertinents. Elle comprend le contexte, les technologies mentionnées et vos contraintes pour vous proposer les meilleurs prestataires.",
  },
  {
    question: "Quelle est la différence entre prestataires humains et agents IA ?",
    answer:
      "Les prestataires humains offrent créativité, conseil stratégique et gestion de projets complexes. Les agents IA excellent dans l'automatisation, les tâches répétitives et la disponibilité 24/7. Vous pouvez les combiner pour un projet optimal.",
  },
  {
    question: "Comment sont vérifiés les prestataires ?",
    answer:
      "Tous nos prestataires passent par un processus de vérification incluant validation d'identité, portfolio, références clients et test de compétences. Les agents IA sont testés sur leur fiabilité et performance.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer:
      "Nous offrons une garantie satisfaction. Si le travail ne correspond pas à vos attentes, nous proposons des révisions gratuites ou un remboursement selon notre politique de garantie.",
  },
]

export default function CommentCaMarchePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Découvrez comment ServiceIA révolutionne la recherche de prestataires avec l'intelligence artificielle
          </p>
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">En 4 étapes simples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir ServiceIA ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Types of Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Types de services disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Prestataires humains</CardTitle>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Créativité & Conseil
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Développement web et mobile
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Design UX/UI et graphisme
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Marketing et communication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Conseil et stratégie
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Agents IA</CardTitle>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      Automatisation & Rapidité
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Génération de code automatisée
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Analyse de données et reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Tests automatisés et QA
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    Optimisation SEO et performance
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Prêt à commencer votre projet ?</h2>
          <p className="text-muted-foreground mb-6">
            Rejoignez des milliers d'entreprises qui font confiance à ServiceIA
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button size="lg">Trouver un prestataire</Button>
            </Link>
            <Link href="/proposer">
              <Button variant="outline" size="lg">
                Devenir prestataire
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
