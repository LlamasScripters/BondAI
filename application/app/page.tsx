"use client"

import { useState } from "react"
import { Search, Star, Bot, User, Plus, ShoppingCart, Zap, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Service {
  id: string
  name: string
  type: "human" | "ai"
  rating: number
  reviews: number
  price: string
  description: string
  skills: string[]
  avatar: string
  isOnline?: boolean
  collaborators?: string[]
}

const mockServices: Service[] = [
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
    collaborators: ["2", "3"],
  },
  {
    id: "2",
    name: "CodeAssistant Pro",
    type: "ai",
    rating: 4.7,
    reviews: 892,
    price: "0.05€/req",
    description: "Agent IA spécialisé dans la génération de code React et l'optimisation des performances.",
    skills: ["Code Generation", "React", "Performance", "Debugging"],
    avatar: "/placeholder.svg?height=40&width=40",
    collaborators: ["1", "4"],
  },
  {
    id: "3",
    name: "Thomas Martin",
    type: "human",
    rating: 4.8,
    reviews: 89,
    price: "55€/h",
    description: "Designer UX/UI passionné par les interfaces utilisateur intuitives et accessibles.",
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: false,
    collaborators: ["1", "5"],
  },
  {
    id: "4",
    name: "DataAnalyzer AI",
    type: "ai",
    rating: 4.6,
    reviews: 445,
    price: "0.08€/req",
    description: "Agent IA pour l'analyse de données et la création de visualisations interactives.",
    skills: ["Data Analysis", "Visualization", "Python", "SQL"],
    avatar: "/placeholder.svg?height=40&width=40",
    collaborators: ["2", "6"],
  },
]

const recommendedTeams = [
  {
    id: "team1",
    name: "Équipe Full-Stack",
    members: ["Marie Dubois", "Thomas Martin"],
    projects: 12,
    rating: 4.9,
    description: "Duo expérimenté pour vos projets web complets",
  },
  {
    id: "team2",
    name: "AI + Human Combo",
    members: ["Marie Dubois", "CodeAssistant Pro"],
    projects: 8,
    rating: 4.8,
    description: "Développement accéléré avec assistance IA",
  },
]

export default function ServiceMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const filteredServices = mockServices.filter((service) => {
    if (activeTab === "human" && service.type !== "human") return false
    if (activeTab === "ai" && service.type !== "ai") return false
    if (searchQuery) {
      return (
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    return true
  })

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Découvrez nos services</h1>
          <p className="text-lg text-muted-foreground">
            Trouvez le prestataire parfait grâce à la recherche en langage naturel
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Décrivez votre besoin en langage naturel... Ex: 'Je cherche un développeur React pour créer une app e-commerce moderne'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Zap className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <Filter className="h-4 w-4" />
              <span>Filtres intelligents activés • Recherche sémantique • Recommandations IA</span>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Cart */}
        {selectedServices.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">
                    {selectedServices.length} service(s) sélectionné(s)
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Voir le panier
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Tous les services</TabsTrigger>
                <TabsTrigger value="human">Prestataires humains</TabsTrigger>
                <TabsTrigger value="ai">Agents IA</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={service.avatar || "/placeholder.svg"} alt={service.name} />
                            <AvatarFallback>
                              {service.type === "ai" ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
                            </AvatarFallback>
                          </Avatar>
                          {service.type === "human" && service.isOnline && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                          )}
                          {service.type === "ai" && (
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Zap className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            {service.type === "ai" ? (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                <Bot className="h-3 w-3 mr-1" />
                                Agent IA
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                <User className="h-3 w-3 mr-1" />
                                Humain
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm font-medium">{service.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({service.reviews} avis)</span>
                            <span className="text-sm font-medium text-green-600">{service.price}</span>
                          </div>

                          <p className="text-gray-600 mb-3">{service.description}</p>

                          <div className="flex flex-wrap gap-2">
                            {service.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant={selectedServices.includes(service.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleServiceSelection(service.id)}
                        >
                          {selectedServices.includes(service.id) ? (
                            <>Ajouté</>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              Ajouter
                            </>
                          )}
                        </Button>
                        <Link href={`/profil/${service.id}`}>
                          <Button variant="ghost" size="sm">
                            Voir profil
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recommended Teams */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Équipes recommandées</CardTitle>
                <CardDescription>Prestataires qui ont déjà collaboré ensemble</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedTeams.map((team) => (
                  <div key={team.id} className="p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{team.name}</h4>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-xs">{team.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{team.description}</p>
                    <div className="text-xs text-gray-500">{team.projects} projets ensemble</div>
                    <div className="flex gap-1 mt-2">
                      <Link href={`/equipe/${team.id}`}>
                        <Button size="sm" variant="outline" className="text-xs flex-1">
                          Voir détails
                        </Button>
                      </Link>
                      <Button size="sm" variant="default" className="text-xs flex-1">
                        Embaucher
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agents IA complémentaires</CardTitle>
                <CardDescription>Recommandés pour votre projet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">TestBot AI</span>
                  </div>
                  <p className="text-xs text-gray-600">Tests automatisés</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm">SEO Optimizer</span>
                  </div>
                  <p className="text-xs text-gray-600">Optimisation SEO</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
