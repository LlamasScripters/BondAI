"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Calendar,
  Bot,
  User,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  Award,
  Zap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface Mission {
  id: string
  title: string
  client: string
  duration: string
  completedAt: string
  rating: number
  budget: string
  description: string
  technologies: string[]
}

interface Review {
  id: string
  client: string
  avatar: string
  rating: number
  date: string
  comment: string
  project: string
  helpful: number
}

interface ProfileData {
  id: string
  name: string
  type: "human" | "ai"
  avatar: string
  coverImage: string
  title: string
  description: string
  location?: string
  languages?: string[]
  responseTime?: string
  joinedDate: string
  isOnline?: boolean
  rating: number
  totalReviews: number
  completedProjects: number
  skills: string[]
  hourlyRate?: string
  projectRate?: string
  requestRate?: string
  availability: string
  portfolio: string[]
  certifications?: string[]
  missions: Mission[]
  reviews: Review[]
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

// Mock data - en réalité, cela viendrait d'une API
const mockProfile: ProfileData = {
  id: "1",
  name: "Marie Dubois",
  type: "human",
  avatar: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=200&width=800",
  title: "Développeuse Full-Stack Senior",
  description:
    "Passionnée par le développement web moderne, je crée des applications performantes et intuitives. Avec plus de 8 ans d'expérience, je maîtrise l'écosystème React/Next.js et les architectures cloud. J'accompagne mes clients de la conception à la mise en production.",
  location: "Paris, France",
  languages: ["Français", "Anglais", "Espagnol"],
  responseTime: "< 2h",
  joinedDate: "2020-03-15",
  isOnline: true,
  rating: 4.9,
  totalReviews: 127,
  completedProjects: 89,
  skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "Tailwind CSS"],
  hourlyRate: "45€",
  projectRate: "2500-8000€",
  availability: "Disponible immédiatement",
  portfolio: [
    "https://github.com/marie-dubois",
    "https://portfolio.marie-dubois.dev",
    "https://linkedin.com/in/marie-dubois",
  ],
  certifications: ["AWS Solutions Architect", "Google Cloud Professional"],
  missions: [
    {
      id: "1",
      title: "Plateforme e-commerce B2B",
      client: "TechCorp",
      duration: "3 mois",
      completedAt: "2024-01-15",
      rating: 5,
      budget: "12000€",
      description:
        "Développement complet d'une plateforme e-commerce avec gestion des stocks et facturation automatisée.",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "AWS"],
    },
    {
      id: "2",
      title: "Application mobile React Native",
      client: "StartupXYZ",
      duration: "2 mois",
      completedAt: "2023-11-20",
      rating: 5,
      budget: "8000€",
      description: "Application mobile de gestion de tâches avec synchronisation temps réel.",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      id: "3",
      title: "Refonte site vitrine",
      client: "AgenceDesign",
      duration: "1 mois",
      completedAt: "2023-09-10",
      rating: 4,
      budget: "3500€",
      description: "Modernisation complète du site avec optimisation SEO et performances.",
      technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    },
  ],
  reviews: [
    {
      id: "1",
      client: "Thomas Martin",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-20",
      comment:
        "Travail exceptionnel ! Marie a livré exactement ce que nous attendions, dans les délais et avec une qualité irréprochable. Communication parfaite tout au long du projet.",
      project: "Plateforme e-commerce B2B",
      helpful: 12,
    },
    {
      id: "2",
      client: "Sophie Laurent",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2023-12-05",
      comment:
        "Très professionnelle et réactive. L'application développée dépasse nos attentes. Je recommande vivement !",
      project: "Application mobile React Native",
      helpful: 8,
    },
    {
      id: "3",
      client: "Pierre Durand",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2023-09-15",
      comment:
        "Bon travail dans l'ensemble. Quelques ajustements ont été nécessaires mais le résultat final est satisfaisant.",
      project: "Refonte site vitrine",
      helpful: 5,
    },
  ],
  ratingBreakdown: {
    5: 89,
    4: 28,
    3: 7,
    2: 2,
    1: 1,
  },
}

export default function ProfilPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const profile = mockProfile // En réalité, fetch basé sur params.id

  const totalRatings = Object.values(profile.ratingBreakdown).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
        <img
          src={profile.coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl">
                      {profile.type === "ai" ? <Bot className="h-16 w-16" /> : <User className="h-16 w-16" />}
                    </AvatarFallback>
                  </Avatar>
                  {profile.type === "human" && profile.isOnline && (
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                      <div className="h-3 w-3 bg-white rounded-full" />
                    </div>
                  )}
                  {profile.type === "ai" && (
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-500 rounded-full border-4 border-background flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      {profile.type === "ai" ? (
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
                    <p className="text-xl text-muted-foreground mb-3">{profile.title}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Répond en {profile.responseTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Membre depuis {new Date(profile.joinedDate).getFullYear()}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{profile.rating}</span>
                        <span className="text-muted-foreground">({profile.totalReviews} avis)</span>
                      </div>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="text-muted-foreground">{profile.completedProjects} projets réalisés</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contacter
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
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({profile.totalReviews})</TabsTrigger>
            <TabsTrigger value="missions">Missions ({profile.missions.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>À propos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Compétences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Missions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Missions récentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profile.missions.slice(0, 3).map((mission) => (
                      <div key={mission.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{mission.title}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{mission.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{mission.description}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {mission.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Client: {mission.client}</span>
                          <span>
                            {mission.budget} • {mission.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tarifs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profile.hourlyRate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tarif horaire</span>
                        <span className="font-semibold">{profile.hourlyRate}</span>
                      </div>
                    )}
                    {profile.projectRate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Projet</span>
                        <span className="font-semibold">{profile.projectRate}</span>
                      </div>
                    )}
                    {profile.requestRate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Par requête</span>
                        <span className="font-semibold">{profile.requestRate}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="text-center">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {profile.availability}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Rating Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Évaluations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <Progress
                          value={
                            (profile.ratingBreakdown[rating as keyof typeof profile.ratingBreakdown] / totalRatings) *
                            100
                          }
                          className="flex-1 h-2"
                        />
                        <span className="text-xs text-muted-foreground w-8">
                          {profile.ratingBreakdown[rating as keyof typeof profile.ratingBreakdown]}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Languages & Certifications */}
                {profile.languages && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Langues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            <Globe className="h-3 w-3 mr-1" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {profile.certifications && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {profile.certifications.map((cert) => (
                          <div key={cert} className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio & Liens</CardTitle>
                <CardDescription>Découvrez mes réalisations et projets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.portfolio.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{link}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-4">
              {profile.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.client} />
                        <AvatarFallback>{review.client[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.client}</h4>
                            <p className="text-sm text-muted-foreground">{review.project}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3">{review.comment}</p>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Utile ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Missions Tab */}
          <TabsContent value="missions">
            <div className="space-y-4">
              {profile.missions.map((mission) => (
                <Card key={mission.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{mission.title}</h3>
                        <p className="text-muted-foreground mb-2">{mission.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {mission.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{mission.rating}</span>
                        </div>
                        <p className="text-sm font-semibold text-green-600">{mission.budget}</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Client: {mission.client}</span>
                      <span>
                        Durée: {mission.duration} • Terminé le {mission.completedAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
