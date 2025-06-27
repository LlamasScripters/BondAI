"use client"

import { useState } from "react"
import { Search, Bot, User, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BondRobot } from "@/components/ui/bond-robot"

export default function MobileServiceDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")

  const services = [
    {
      id: "1",
      name: "Marie Dubois",
      type: "human",
      rating: 4.9,
      reviews: 127,
      price: "45€/h",
      description: "Développeuse React/Next.js avec 8 ans d'expérience. Spécialisée dans les applications web modernes.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      tag: "Humain"
    },
    {
      id: "2", 
      name: "Code Assistant Pro",
      type: "ai",
      rating: 4.7,
      reviews: 892,
      price: "0.05€/req",
      description: "Agent IA spécialisé dans la génération de code React et l'optimisation des performances.",
      skills: ["Code Generation", "React", "Performance", "Debugging"],
      avatar: "/placeholder.svg?height=40&width=40",
      tag: "Agent IA"
    }
  ]

  const categories = [
    { name: "App mobile", icon: "📱", description: "Application de livraison" },
    { name: "Refonte web", icon: "🌐", description: "Site vitrine moderne" },
    { name: "Data Science", icon: "📊", description: "Analyse et visualisation" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-cyan/5">
      {/* Header Mobile */}
      <div className="bg-white shadow-sm border-b border-brand-cyan/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BondRobot size="md" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Bonjour</h1>
                <p className="text-sm text-gray-600">Alexandre Percheur</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-brand-cyan/10 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-cyan rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Hero Section Mobile */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <BondRobot size="lg" showLightBulb={true} />
          </div>
          <h2 className="text-2xl font-bold text-brand-cyan mb-2">
            Découvrez nos services
          </h2>
          <p className="text-gray-600 mb-6">
            Trouvez le prestataire parfait grâce à la recherche en langage naturel
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Je veux créer une boutique en ligne moderne avec paiement sécurisé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 py-4 text-base rounded-xl border-brand-cyan/30 focus:border-brand-cyan focus:ring-brand-cyan"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Button size="sm" className="bg-brand-cyan hover:bg-brand-cyan-dark text-white rounded-lg">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Ideas */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-4 px-1">
            Décrivez votre projet en quelques mots
          </p>
          <p className="text-xs text-gray-500 mb-4 px-1">
            Notre IA comprend votre langage naturel et trouve les meilleurs prestataires pour vous
          </p>

          <div className="space-y-3">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="border-brand-cyan/20 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-brand-cyan/10 rounded-xl border border-blue-200/50">
            <p className="text-xs text-gray-600 text-center">
              Filtres intelligents activés • Recherche sémantique • Recommandations IA
            </p>
          </div>
        </div>

        {/* Service Providers */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Tous les services
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs">
                Prestataires humains
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Agents IA
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <Card key={service.id} className="border-brand-cyan/20 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      {service.type === "ai" ? (
                        <div className="w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center">
                          <Bot className="h-5 w-5 text-brand-cyan" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                      {service.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">{service.name}</h4>
                        <Badge 
                          variant="outline"
                          className={service.type === "ai" ? "border-brand-cyan text-brand-cyan" : "border-gray-300"}
                        >
                          {service.tag}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600 ml-1">
                            {service.rating} ({service.reviews} avis)
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs font-medium text-gray-900">{service.price}</span>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {service.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-brand-cyan hover:bg-brand-cyan-dark text-white">
                          + Ajouter
                        </Button>
                        <Button size="sm" variant="outline" className="text-brand-cyan border-brand-cyan">
                          Voir profil
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-cyan/20 px-4 py-2">
        <div className="flex justify-around items-center">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-brand-cyan rounded-full" />
            <span className="text-xs text-brand-cyan">Services</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <span className="text-xs text-gray-500">Messages</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <span className="text-xs text-gray-500">Notifications</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <span className="text-xs text-gray-500">Profil</span>
          </Button>
        </div>
      </div>

      {/* Mobile Spacing */}
      <div className="h-20" />
    </div>
  )
}
