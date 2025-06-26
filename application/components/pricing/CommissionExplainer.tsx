"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ExternalLink, 
  Zap, 
  TrendingUp, 
  Users, 
  Calculator,
  Info
} from "lucide-react"

export function CommissionExplainer() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Info className="mr-2 h-4 w-4" />
              Comment ça fonctionne
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Notre modèle de{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                commissions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un système équitable qui aligne nos intérêts avec les vôtres. 
              Plus vous utilisez la plateforme, plus nous grandissons ensemble.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Prestataires externes */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-2">
                      <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Prestataires externes</CardTitle>
                      <CardDescription>APIs tierces et partenaires</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">5%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Nous prélevons une commission de <strong>5%</strong> sur chaque appel API 
                  effectué vers nos prestataires partenaires. Cette commission nous permet de :
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Maintenir la qualité de service</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Gérer les relations partenaires</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Assurer le support technique</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Exemple : Appel API à 10€</span>
                    <span className="font-medium">Commission : 0,50€</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* APIs maison */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full -mr-16 -mt-16" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-lg bg-indigo-100 dark:bg-indigo-900 p-2">
                      <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">APIs BondAI</CardTitle>
                      <CardDescription>Nos services développés en interne</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">0,10€</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Pour nos APIs développées en interne, nous facturons un tarif fixe de{" "}
                  <strong>0,10€ par appel</strong>. Ce prix couvre :
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span>Infrastructure cloud et calcul</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span>Développement et maintenance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span>Amélioration continue des modèles</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Prix par appel</span>
                    <span className="font-medium">0,10€</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Volume mensuel : 1000+ appels</span>
                    <span>Remises disponibles</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calcualteur rapide */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-xl">Calculateur rapide</CardTitle>
              </div>
              <CardDescription>
                Estimez vos coûts mensuels selon votre usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-900/50">
                  <div className="text-2xl font-bold text-purple-600 mb-2">100</div>
                  <div className="text-sm text-muted-foreground mb-2">appels/mois</div>
                  <div className="text-lg font-semibold">~15€/mois</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-900/50">
                  <div className="text-2xl font-bold text-purple-600 mb-2">500</div>
                  <div className="text-sm text-muted-foreground mb-2">appels/mois</div>
                  <div className="text-lg font-semibold">~65€/mois</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-900/50">
                  <div className="text-2xl font-bold text-purple-600 mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground mb-2">appels/mois</div>
                  <div className="text-lg font-semibold">Tarifs dégressifs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
