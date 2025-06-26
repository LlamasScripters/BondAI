"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Zap } from "lucide-react"

export function PricingHeader() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            <TrendingUp className="mr-2 h-4 w-4" />
            Transparence totale
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Tarification{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              transparente
            </span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Notre modèle économique est simple : nous ne gagnons que lorsque vous réussissez. 
            Découvrez notre système de commissions équitable et transparent.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border">
              <div className="mb-4 rounded-full bg-blue-100 dark:bg-blue-900 p-3">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Prestataires externes</h3>
              <p className="text-center text-sm text-muted-foreground">
                Commission de 5% sur chaque appel API
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border">
              <div className="mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900 p-3">
                <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">APIs maison</h3>
              <p className="text-center text-sm text-muted-foreground">
                0,10€ par appel API
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border">
              <div className="mb-4 rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Croissance partagée</h3>
              <p className="text-center text-sm text-muted-foreground">
                Votre succès est notre succès
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
