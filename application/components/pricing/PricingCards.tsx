"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, TrendingUp, Crown } from "lucide-react"
import Link from "next/link"

export function PricingCards() {
  const plans = [
    {
      name: "Débutant",
      description: "Parfait pour tester la plateforme",
      price: "0€",
      period: "Essai gratuit",
      icon: Zap,
      featured: false,
      benefits: [
        "50 appels API gratuits",
        "Accès à tous les prestataires",
        "Support communautaire",
        "Documentation complète"
      ],
      limitations: [
        "Limité à 50 appels/mois",
        "Pas de support prioritaire"
      ]
    },
    {
      name: "Professionnel",
      description: "Pour les projets sérieux",
      price: "À l'usage",
      period: "Pay-as-you-go",
      icon: TrendingUp,
      featured: true,
      benefits: [
        "Facturation à l'usage uniquement",
        "5% de commission sur APIs externes",
        "0,10€ par appel API maison",
        "Support email prioritaire",
        "Analytiques détaillées",
        "Intégrations avancées"
      ],
      limitations: []
    },
    {
      name: "Entreprise",
      description: "Pour les grandes organisations",
      price: "Sur mesure",
      period: "Contrat annuel",
      icon: Crown,
      featured: false,
      benefits: [
        "Tarifs négociés",
        "SLA garantie 99.9%",
        "Support dédié 24/7",
        "Intégrations personnalisées",
        "Formation équipe",
        "Conformité entreprise"
      ],
      limitations: []
    }
  ]

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Choisissez votre{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                formule
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des options flexibles qui s'adaptent à vos besoins, 
              de l'essai gratuit aux solutions entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <Card 
                  key={plan.name} 
                  className={`relative ${
                    plan.featured 
                      ? 'border-blue-500 shadow-2xl scale-105 bg-white dark:bg-gray-800' 
                      : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 hover:bg-blue-600 px-4 py-1">
                        Le plus populaire
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-8">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-lg p-2 ${
                        plan.featured 
                          ? 'bg-blue-100 dark:bg-blue-900' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          plan.featured 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/ {plan.period}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600 dark:text-green-400">
                        ✅ Inclus
                      </h4>
                      <ul className="space-y-2">
                        {plan.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-amber-600 dark:text-amber-400">
                          ⚠️ Limitations
                        </h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-4 h-4 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button 
                      className={`w-full ${
                        plan.featured 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : ''
                      }`}
                      variant={plan.featured ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href={plan.name === 'Entreprise' ? '/contact' : '/proposer'}>
                        {plan.name === 'Entreprise' ? 'Nous contacter' : 'Commencer maintenant'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Tous les prix sont hors taxes. Facturation mensuelle automatique.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ Aucun engagement</span>
              <span>✓ Annulation à tout moment</span>
              <span>✓ Support inclus</span>
              <span>✓ Mises à jour gratuites</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
