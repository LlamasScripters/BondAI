"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

export function PricingFAQ() {
  const faqs = [
    {
      question: "Comment fonctionne exactement la commission de 5% ?",
      answer: "La commission de 5% est prélevée uniquement sur le coût de l'appel API du prestataire externe. Par exemple, si un prestataire facture 10€ pour un service, nous prélevons 0,50€ de commission. Cette commission nous permet de maintenir la plateforme, gérer les relations partenaires et assurer la qualité de service."
    },
    {
      question: "Pourquoi 0,10€ par appel pour vos APIs maison ?",
      answer: "Ce tarif fixe couvre nos coûts d'infrastructure cloud, le développement continu de nos modèles IA, et la maintenance de nos services. Contrairement aux APIs externes où nous prélevons un pourcentage, nos APIs maison ont un coût fixe et prévisible."
    },
    {
      question: "Y a-t-il des frais cachés ou des abonnements mensuels ?",
      answer: "Absolument aucun frais caché ! Notre modèle est 100% à l'usage. Vous ne payez que ce que vous consommez : 5% de commission sur les APIs externes et 0,10€ par appel sur nos APIs maison. Pas d'abonnement mensuel, pas de frais d'activation."
    },
    {
      question: "Puis-je voir le détail de mes facturations ?",
      answer: "Oui, votre dashboard inclut un suivi en temps réel de tous vos appels API avec le détail des coûts. Vous pouvez exporter vos factures, voir l'historique complet et analyser votre consommation par prestataire et par projet."
    },
    {
      question: "Existe-t-il des tarifs dégressifs pour les gros volumes ?",
      answer: "Pour les entreprises avec un volume important (1000+ appels/mois), nous proposons des tarifs négociés. Contactez notre équipe commerciale pour discuter d'un contrat personnalisé avec des tarifs préférentiels."
    },
    {
      question: "Comment puis-je contrôler mes dépenses ?",
      answer: "Vous pouvez définir des limites de budget quotidiennes, hebdomadaires ou mensuelles. La plateforme vous enverra des alertes lorsque vous approchez de vos limites et peut automatiquement suspendre les appels pour éviter les dépassements."
    },
    {
      question: "Que se passe-t-il si un appel API échoue ?",
      answer: "Si un appel API échoue côté prestataire, vous n'êtes pas facturé. Nous ne prélevons de commission que sur les appels réussis. En cas de problème, notre équipe support vous aide à identifier et résoudre rapidement les incidents."
    },
    {
      question: "Puis-je changer de formule à tout moment ?",
      answer: "Oui, vous pouvez passer du plan gratuit au plan professionnel instantanément. Pour les solutions entreprise, une période de transition peut être nécessaire pour mettre en place les intégrations personnalisées."
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="mr-2 h-4 w-4" />
              Questions fréquentes
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Tout savoir sur nos{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                tarifs
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Les réponses aux questions les plus fréquentes sur notre modèle de tarification.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6 bg-white dark:bg-gray-900"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground mb-4">
              <HelpCircle className="h-4 w-4" />
              <span>Une autre question ?</span>
            </div>
            <p className="text-lg mb-6">
              Notre équipe est là pour vous aider
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@bondai.com" 
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 rounded-lg transition-colors"
              >
                support@bondai.com
              </a>
              <a 
                href="tel:+33123456789" 
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-950 dark:hover:bg-green-900 rounded-lg transition-colors"
              >
                +33 1 23 45 67 89
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
