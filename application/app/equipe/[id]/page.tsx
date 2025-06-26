"use client"

import { useState, use } from "react"
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Bot,
  User,
  MessageCircle,
  Award,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  type: "human" | "ai"
  avatar: string
  title: string
  rating: number
  reviews: number
  skills: string[]
  hourlyRate: string
  description: string
  location?: string
  languages?: string[]
  responseTime?: string
  isOnline?: boolean
  certifications?: string[]
  completedProjects: number
}

interface TeamProject {
  id: string
  title: string
  client: string
  duration: string
  completedAt: string
  rating: number
  budget: string
  description: string
  technologies: string[]
  teamContribution: string[]
}

interface TeamData {
  id: string
  name: string
  description: string
  coverImage: string
  rating: number
  totalReviews: number
  completedProjects: number
  totalRevenue: string
  formationDate: string
  specialties: string[]
  members: TeamMember[]
  projects: TeamProject[]
  pricing: {
    hourlyRate: string
    projectRate: string
    discountPercentage: number
  }
  availability: string
  successRate: number
}

// Mock data
const mockTeamData: TeamData = {
  id: "team1",
  name: "Équipe Full-Stack Pro",
  description:
    "Une équipe expérimentée combinant expertise humaine et intelligence artificielle pour livrer des projets web de haute qualité. Nous excellons dans le développement d'applications modernes, scalables et performantes.",
  coverImage: "/placeholder.svg?height=200&width=800",
  rating: 4.9,
  totalReviews: 89,
  completedProjects: 47,
  totalRevenue: "450K€",
  formationDate: "2022-01-15",
  specialties: ["Développement Web", "Applications Mobile", "E-commerce", "SaaS"],
  members: [
    {
      id: "1",
      name: "Marie Dubois",
      type: "human",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "Lead Developer",
      rating: 4.9,
      reviews: 127,
      skills: ["React", "Next.js", "TypeScript", "Node.js"],
      hourlyRate: "45€/h",
      description: "Développeuse senior avec 8 ans d'expérience",
      location: "Paris, France",
      languages: ["Français", "Anglais"],
      responseTime: "< 2h",
      isOnline: true,
      certifications: ["AWS Solutions Architect"],
      completedProjects: 89,
    },
    {
      id: "3",
      name: "Thomas Martin",
      type: "human",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "UX/UI Designer",
      rating: 4.8,
      reviews: 89,
      skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
      hourlyRate: "55€/h",
      description: "Designer passionné par l'expérience utilisateur",
      location: "Lyon, France",
      languages: ["Français", "Anglais", "Espagnol"],
      responseTime: "< 4h",
      isOnline: false,
      certifications: ["Google UX Design Certificate"],
      completedProjects: 67,
    },
    {
      id: "ai1",
      name: "CodeAssistant Pro",
      type: "ai",
      avatar: "/placeholder.svg?height=80&width=80",
      title: "AI Code Generator",
      rating: 4.7,
      reviews: 892,
      skills: ["Code Generation", "Testing", "Performance", "Documentation"],
      hourlyRate: "0.05€/req",
      description: "Agent IA spécialisé dans la génération de code optimisé",
      responseTime: "< 1min",
      completedProjects: 1250,
    },
  ],
  projects: [
    {
      id: "1",
      title: "Plateforme E-commerce B2B",
      client: "TechCorp Solutions",
      duration: "4 mois",
      completedAt: "2024-01-15",
      rating: 5,
      budget: "25000€",
      description:
        "Développement complet d'une plateforme e-commerce B2B avec gestion avancée des stocks, facturation automatisée et tableau de bord analytique.",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS", "Docker"],
      teamContribution: ["Marie: Architecture & Backend", "Thomas: Design & UX", "CodeAssistant: Tests & Optimisation"],
    },
    {
      id: "2",
      title: "Application SaaS de Gestion",
      client: "StartupInnovate",
      duration: "3 mois",
      completedAt: "2023-11-20",
      rating: 5,
      budget: "18000€",
      description: "Application web SaaS pour la gestion de projets avec collaboration temps réel et intégrations API.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Vercel"],
      teamContribution: [
        "Marie: Développement Full-Stack",
        "Thomas: Interface utilisateur",
        "CodeAssistant: API & Tests",
      ],
    },
  ],
  pricing: {
    hourlyRate: "85€/h",
    projectRate: "8000-35000€",
    discountPercentage: 15,
  },
  availability: "Disponible dans 2 semaines",
  successRate: 98,
}

export default function EquipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState("overview")
  const resolvedParams = use(params)
  const team = mockTeamData // En réalité, fetch basé sur resolvedParams.id

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
        <img
          src={team.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-4 left-4">
          <Link href="/panier">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au panier
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        {/* Team Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="h-32 w-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{team.name}</h1>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Users className="h-3 w-3 mr-1" />
                        Équipe
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Formée en {new Date(team.formationDate).getFullYear()}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {team.totalRevenue} générés
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {team.successRate}% de réussite
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{team.rating}</span>
                        <span className="text-muted-foreground">({team.totalReviews} avis)</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="text-muted-foreground">{team.completedProjects} projets réalisés</span>
                    </div>

                    <p className="text-muted-foreground mb-4">{team.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {team.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter l'équipe
                    </Button>
                    <Button variant="outline" size="lg">
                      Embaucher maintenant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="members">Membres ({team.members.length})</TabsTrigger>
            <TabsTrigger value="projects">Projets ({team.projects.length})</TabsTrigger>
            <TabsTrigger value="pricing">Tarifs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Team Members Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Membres de l'équipe</CardTitle>
                    <CardDescription>Une combinaison parfaite d'expertise humaine et d'IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>
                                {member.type === "ai" ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
                              </AvatarFallback>
                            </Avatar>
                            {member.type === "human" && member.isOnline && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                            )}
                            {member.type === "ai" && (
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Zap className="h-2 w-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-sm">{member.name}</h4>
                              <Badge variant={member.type === "ai" ? "secondary" : "outline"} className="text-xs">
                                {member.type === "ai" ? "IA" : "Humain"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{member.title}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{member.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Projets récents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {team.projects.slice(0, 2).map((project) => (
                      <div key={project.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{project.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                        <div className="space-y-2 mb-3">
                          <div className="text-xs font-medium text-muted-foreground">Contribution de l'équipe:</div>
                          {project.teamContribution.map((contribution, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              • {contribution}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Client: {project.client}</span>
                          <span>
                            {project.budget} • {project.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Pricing Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tarifs équipe</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tarif horaire équipe</span>
                      <span className="font-semibold">{team.pricing.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Projets</span>
                      <span className="font-semibold">{team.pricing.projectRate}</span>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        -{team.pricing.discountPercentage}% vs services individuels
                      </Badge>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        {team.availability}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Taux de réussite</span>
                        <span>{team.successRate}%</span>
                      </div>
                      <Progress value={team.successRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Satisfaction client</span>
                        <span>{(team.rating / 5) * 100}%</span>
                      </div>
                      <Progress value={(team.rating / 5) * 100} className="h-2" />
                    </div>
                    <Separator />
                    <div className="text-center text-sm text-muted-foreground">
                      Équipe formée depuis{" "}
                      {Math.floor(
                        (Date.now() - new Date(team.formationDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
                      )}{" "}
                      ans
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {team.members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>
                            {member.type === "ai" ? <Bot className="h-8 w-8" /> : <User className="h-8 w-8" />}
                          </AvatarFallback>
                        </Avatar>
                        {member.type === "human" && member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-white" />
                        )}
                        {member.type === "ai" && (
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Zap className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <Badge variant={member.type === "ai" ? "secondary" : "outline"}>
                            {member.type === "ai" ? (
                              <>
                                <Bot className="h-3 w-3 mr-1" />
                                Agent IA
                              </>
                            ) : (
                              <>
                                <User className="h-3 w-3 mr-1" />
                                Humain
                              </>
                            )}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">{member.title}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{member.rating}</span>
                            <span>({member.reviews} avis)</span>
                          </div>
                          {member.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {member.location}
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{member.description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {member.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-green-600">{member.hourlyRate}</span>
                          <Link href={`/profil/${member.id}`}>
                            <Button variant="outline" size="sm">
                              Voir profil
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-6">
              {team.projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{project.rating}</span>
                        </div>
                        <p className="text-lg font-semibold text-green-600">{project.budget}</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-2">Contribution de l'équipe:</h4>
                      <ul className="space-y-1">
                        {project.teamContribution.map((contribution, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {contribution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Client: {project.client}</span>
                      <span>
                        Durée: {project.duration} • Terminé le {project.completedAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tarification équipe</CardTitle>
                  <CardDescription>Économisez en embauchant l'équipe complète</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Tarif horaire équipe</div>
                      <div className="text-sm text-muted-foreground">Tous les membres inclus</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{team.pricing.hourlyRate}</div>
                      <div className="text-xs text-green-600">-{team.pricing.discountPercentage}% vs individuel</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Projets forfaitaires</div>
                      <div className="text-sm text-muted-foreground">Selon la complexité</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{team.pricing.projectRate}</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Avantages équipe</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Coordination optimisée entre les membres</li>
                      <li>• Livraison plus rapide grâce au travail en parallèle</li>
                      <li>• Expertise complémentaire (humain + IA)</li>
                      <li>• Un seul point de contact</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comparaison des coûts</CardTitle>
                  <CardDescription>Équipe vs services individuels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Marie Dubois (45€/h)</span>
                      <span className="text-sm">45€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Thomas Martin (55€/h)</span>
                      <span className="text-sm">55€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">CodeAssistant Pro (0.05€/req)</span>
                      <span className="text-sm">~5€/h</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total individuel/h</span>
                      <span>105€</span>
                    </div>
                    <div className="flex justify-between font-semibold text-green-600">
                      <span>Tarif équipe/h</span>
                      <span>{team.pricing.hourlyRate}</span>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Économie de {105 - Number.parseInt(team.pricing.hourlyRate)}€/h
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
