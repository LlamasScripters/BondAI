"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react"
import Link from "next/link"

export function PricingCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-blue-500/10 rounded-full -ml-24 -mb-24" />
            
            <CardContent className="relative p-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Prêt à commencer ?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Rejoignez des milliers de développeurs qui font confiance à BondAI 
                  pour leurs projets. Commencez gratuitement, payez seulement ce que vous utilisez.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Démarrage instantané</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    50 appels API gratuits pour tester
                  </p>
                </div>

                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Support inclus</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Équipe dédiée pour vous accompagner
                  </p>
                </div>

                <div className="flex flex-col items-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-3">
                    <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Évolutif</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    De l'essai aux solutions entreprise
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/proposer">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Commencer gratuitement
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">
                    Voir la démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 text-sm text-muted-foreground">
                <p>
                  Aucune carte bancaire requise • Annulation à tout moment • Support inclus
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
