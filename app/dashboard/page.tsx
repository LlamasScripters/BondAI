"use client"

import { useState } from "react"
import {
  User,
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Star,
  Bot,
  FileText,
  Download,
  Eye,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Project {
  id: string
  title: string
  provider: {
    name: string
    type: "human" | "ai" | "team"
    avatar: string
  }
  status: "in_progress" | "review" | "completed" | "on_hold"
  progress: number
  startDate: string
  deadline: string
  budget: string
  description: string
  lastUpdate: string
  deliverables: {
    name: string
    status: "pending" | "in_progress" | "completed" | "review"
    dueDate: string
  }[]
}

interface Notification {
  id: string
  type: "request" | "update" | "delivery" | "message"
  from: {
    name: string
    type: "human" | "ai" | "team"
    avatar: string
  }
  project: string
  title: string
  message: string
  timestamp: string
  isRead: boolean
  requiresAction: boolean
}

interface Order {
  id: string
  date: string
  items: {
    name: string
    type: "human" | "ai" | "team"
    price: string
    status: "active" | "completed" | "cancelled"
  }[]
  total: string
  status: "active" | "completed" | "cancelled"
  paymentMethod: string
}

interface ClientProfile {
  name: string
  email: string
  company: string
  avatar: string
  joinDate: string
  totalSpent: string
  activeProjects: number
  completedProjects: number
  rating: number
  phone: string
  address: string
  preferences: {
    notifications: boolean
    emailUpdates: boolean
    projectReminders: boolean
  }
}

// Mock data
const mockProfile: ClientProfile = {
  name: "Jean Dupont",
  email: "jean.dupont@example.com",
  company: "TechStart SAS",
  avatar: "/placeholder.svg?height=80&width=80",
  joinDate: "2023-03-15",
  totalSpent: "15,750€",
  activeProjects: 3,
  completedProjects: 8,
  rating: 4.8,
  phone: "+33 1 23 45 67 89",
  address: "123 Rue de la Tech, 75001 Paris",
  preferences: {
    notifications: true,
    emailUpdates: true,
    projectReminders: true,
  },
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Application E-commerce Mobile",
    provider: {
      name: "Équipe Full-Stack Pro",
      type: "team",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "in_progress",
    progress: 65,
    startDate: "2024-01-15",
    deadline: "2024-03-15",
    budget: "12,000€",
    description: "Développement d'une application mobile e-commerce avec paiement intégré",
    lastUpdate: "2024-01-28",
    deliverables: [
      { name: "Maquettes UI/UX", status: "completed", dueDate: "2024-01-25" },
      { name: "API Backend", status: "in_progress", dueDate: "2024-02-10" },
      { name: "App Mobile iOS", status: "in_progress", dueDate: "2024-02-25" },
      { name: "App Mobile Android", status: "pending", dueDate: "2024-03-05" },
      { name: "Tests & Déploiement", status: "pending", dueDate: "2024-03-15" },
    ],
  },
  {
    id: "2",
    title: "Optimisation SEO Site Web",
    provider: {
      name: "SEO Optimizer AI",
      type: "ai",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "review",
    progress: 90,
    startDate: "2024-01-20",
    deadline: "2024-02-05",
    budget: "800€",
    description: "Analyse et optimisation SEO complète du site corporate",
    lastUpdate: "2024-01-29",
    deliverables: [
      { name: "Audit SEO", status: "completed", dueDate: "2024-01-25" },
      { name: "Optimisation On-Page", status: "completed", dueDate: "2024-01-30" },
      { name: "Rapport final", status: "review", dueDate: "2024-02-05" },
    ],
  },
  {
    id: "3",
    title: "Refonte Interface Utilisateur",
    provider: {
      name: "Sophie Laurent",
      type: "human",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "on_hold",
    progress: 25,
    startDate: "2024-01-10",
    deadline: "2024-02-28",
    budget: "3,500€",
    description: "Modernisation de l'interface utilisateur du dashboard admin",
    lastUpdate: "2024-01-26",
    deliverables: [
      { name: "Recherche utilisateur", status: "completed", dueDate: "2024-01-20" },
      { name: "Wireframes", status: "in_progress", dueDate: "2024-02-05" },
      { name: "Prototypes", status: "pending", dueDate: "2024-02-15" },
      { name: "Design final", status: "pending", dueDate: "2024-02-28" },
    ],
  },
]

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "request",
    from: {
      name: "Équipe Full-Stack Pro",
      type: "team",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Application E-commerce Mobile",
    title: "Validation des spécifications API",
    message:
      "Nous avons besoin de votre validation sur les spécifications de l'API de paiement avant de continuer le développement.",
    timestamp: "2024-01-29T10:30:00Z",
    isRead: false,
    requiresAction: true,
  },
  {
    id: "2",
    type: "update",
    from: {
      name: "SEO Optimizer AI",
      type: "ai",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Optimisation SEO Site Web",
    title: "Rapport d'optimisation prêt",
    message: "L'analyse SEO est terminée. Le rapport final est disponible pour révision.",
    timestamp: "2024-01-29T09:15:00Z",
    isRead: false,
    requiresAction: true,
  },
  {
    id: "3",
    type: "message",
    from: {
      name: "Sophie Laurent",
      type: "human",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Refonte Interface Utilisateur",
    title: "Question sur les couleurs",
    message: "Pouvez-vous me confirmer la palette de couleurs à utiliser pour le nouveau design ?",
    timestamp: "2024-01-28T16:45:00Z",
    isRead: true,
    requiresAction: false,
  },
  {
    id: "4",
    type: "delivery",
    from: {
      name: "Équipe Full-Stack Pro",
      type: "team",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    project: "Application E-commerce Mobile",
    title: "Livraison des maquettes",
    message: "Les maquettes UI/UX sont terminées et disponibles pour téléchargement.",
    timestamp: "2024-01-25T14:20:00Z",
    isRead: true,
    requiresAction: false,
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    items: [
      { name: "Équipe Full-Stack Pro", type: "team", price: "12,000€", status: "active" },
      { name: "SEO Optimizer AI", type: "ai", price: "800€", status: "active" },
    ],
    total: "12,800€",
    status: "active",
    paymentMethod: "Carte bancaire",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    items: [{ name: "Sophie Laurent", type: "human", price: "3,500€", status: "active" }],
    total: "3,500€",
    status: "active",
    paymentMethod: "Virement bancaire",
  },
  {
    id: "ORD-2023-045",
    date: "2023-12-20",
    items: [
      { name: "Marie Dubois", type: "human", price: "2,250€", status: "completed" },
      { name: "CodeAssistant Pro", type: "ai", price: "150€", status: "completed" },
    ],
    total: "2,400€",
    status: "completed",
    paymentMethod: "Carte bancaire",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [profile, setProfile] = useState(mockProfile)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Calendar events from projects
  const calendarEvents = [
    // From projects deadlines
    ...mockProjects.map((project) => ({
      id: `project-${project.id}`,
      title: `Échéance: ${project.title}`,
      date: project.deadline,
      type: "deadline" as const,
      project: project,
    })),
    // From deliverables
    ...mockProjects.flatMap((project) =>
      project.deliverables.map((deliverable) => ({
        id: `deliverable-${project.id}-${deliverable.name}`,
        title: `${deliverable.name} - ${project.title}`,
        date: deliverable.dueDate,
        type: "deliverable" as const,
        status: deliverable.status,
        project: project,
      })),
    ),
    // Custom events
    {
      id: "meeting-1",
      title: "Réunion équipe Full-Stack",
      date: "2024-02-05",
      type: "meeting" as const,
      time: "14:00",
    },
    {
      id: "review-1",
      title: "Révision maquettes UI",
      date: "2024-02-08",
      type: "review" as const,
      time: "10:30",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return calendarEvents.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "in_progress":
        return "text-blue-600 bg-blue-100"
      case "review":
        return "text-orange-600 bg-orange-100"
      case "on_hold":
        return "text-gray-600 bg-gray-100"
      case "pending":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé"
      case "in_progress":
        return "En cours"
      case "review":
        return "En révision"
      case "on_hold":
        return "En pause"
      case "pending":
        return "En attente"
      case "active":
        return "Actif"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  const unreadNotifications = mockNotifications.filter((n) => !n.isRead).length
  const actionRequiredNotifications = mockNotifications.filter((n) => n.requiresAction).length

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Tableau de bord</h1>
              <p className="text-lg text-muted-foreground">Bienvenue, {profile.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Projets actifs</p>
                  <p className="text-2xl font-bold">{profile.activeProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Projets terminés</p>
                  <p className="text-2xl font-bold">{profile.completedProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total dépensé</p>
                  <p className="text-2xl font-bold">{profile.totalSpent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Actions requises</p>
                  <p className="text-2xl font-bold">{actionRequiredNotifications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="projects">Projets ({mockProjects.length})</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Projets récents</CardTitle>
                  <CardDescription>Aperçu de vos projets en cours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={project.provider.avatar || "/placeholder.svg"} alt={project.provider.name} />
                        <AvatarFallback>
                          {project.provider.type === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.provider.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={project.progress} className="flex-1 h-2" />
                          <span className="text-xs text-muted-foreground">{project.progress}%</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications récentes</CardTitle>
                  <CardDescription>Dernières mises à jour de vos projets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockNotifications.slice(0, 4).map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-3 rounded-lg ${
                        !notification.isRead ? "bg-blue-50 border border-blue-200" : "border"
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={notification.from.avatar || "/placeholder.svg"}
                          alt={notification.from.name}
                        />
                        <AvatarFallback>
                          {notification.from.type === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          {notification.requiresAction && (
                            <Badge variant="destructive" className="text-xs">
                              Action requise
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{notification.from.name}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Project Info */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={project.provider.avatar || "/placeholder.svg"} alt={project.provider.name} />
                        <AvatarFallback>
                          {project.provider.type === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{project.provider.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {project.provider.type === "ai" ? "Agent IA" : "Prestataire"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-semibold">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Début</p>
                      <p className="font-semibold">{new Date(project.startDate).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Échéance</p>
                      <p className="font-semibold">{new Date(project.deadline).toLocaleDateString("fr-FR")}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Progression globale</h4>
                      <span className="text-sm text-muted-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="font-medium mb-3">Livrables</h4>
                    <div className="space-y-2">
                      {project.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-3 w-3 rounded-full ${
                                deliverable.status === "completed"
                                  ? "bg-green-500"
                                  : deliverable.status === "in_progress"
                                    ? "bg-blue-500"
                                    : deliverable.status === "review"
                                      ? "bg-orange-500"
                                      : "bg-gray-300"
                              }`}
                            />
                            <span className="text-sm">{deliverable.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(deliverable.status)} variant="outline">
                              {getStatusLabel(deliverable.status)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(deliverable.dueDate).toLocaleDateString("fr-FR")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contacter
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            {mockNotifications.map((notification) => (
              <Card key={notification.id} className={!notification.isRead ? "border-blue-200 bg-blue-50" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.from.avatar || "/placeholder.svg"} alt={notification.from.name} />
                      <AvatarFallback>
                        {notification.from.type === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {notification.requiresAction && <Badge variant="destructive">Action requise</Badge>}
                          {!notification.isRead && <Badge variant="secondary">Nouveau</Badge>}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>{notification.from.name}</strong> • {notification.project}
                      </p>
                      <p className="text-sm mb-4">{notification.message}</p>
                      <div className="flex gap-2">
                        {notification.requiresAction && <Button size="sm">Répondre</Button>}
                        <Button variant="outline" size="sm">
                          Marquer comme lu
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Commande {order.id}</CardTitle>
                      <CardDescription>{new Date(order.date).toLocaleDateString("fr-FR")}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                      <p className="text-lg font-semibold mt-1">{order.total}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              item.type === "ai"
                                ? "bg-blue-100"
                                : item.type === "team"
                                  ? "bg-purple-100"
                                  : "bg-green-100"
                            }`}
                          >
                            {item.type === "ai" ? (
                              <Bot className="h-4 w-4 text-blue-600" />
                            ) : item.type === "team" ? (
                              <User className="h-4 w-4 text-purple-600" />
                            ) : (
                              <User className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.type === "ai" ? "Agent IA" : item.type === "team" ? "Équipe" : "Prestataire"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.price}</p>
                          <Badge className={getStatusColor(item.status)} variant="outline">
                            {getStatusLabel(item.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Paiement: {order.paymentMethod}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Facture
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar View */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                          Aujourd'hui
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty cells for days before month starts */}
                      {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                        <div key={`empty-${i}`} className="p-2 h-24"></div>
                      ))}

                      {/* Days of the month */}
                      {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                        const day = i + 1
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                        const events = getEventsForDate(date)
                        const isToday = date.toDateString() === new Date().toDateString()

                        return (
                          <div
                            key={day}
                            className={`p-1 h-24 border rounded-lg ${
                              isToday ? "bg-blue-50 border-blue-200" : "hover:bg-muted/50"
                            }`}
                          >
                            <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
                            <div className="space-y-1">
                              {events.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={`text-xs p-1 rounded truncate ${
                                    event.type === "deadline"
                                      ? "bg-red-100 text-red-800"
                                      : event.type === "deliverable"
                                        ? "bg-blue-100 text-blue-800"
                                        : event.type === "meeting"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-orange-100 text-orange-800"
                                  }`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {events.length > 2 && (
                                <div className="text-xs text-muted-foreground">+{events.length - 2} autres</div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Events Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Événements à venir</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {calendarEvents
                      .filter((event) => new Date(event.date) >= new Date())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .slice(0, 5)
                      .map((event) => (
                        <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div
                            className={`h-3 w-3 rounded-full mt-1 ${
                              event.type === "deadline"
                                ? "bg-red-500"
                                : event.type === "deliverable"
                                  ? "bg-blue-500"
                                  : event.type === "meeting"
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(event.date).toLocaleDateString("fr-FR")}
                              {"time" in event && event.time && (
                                <>
                                  <Clock className="h-3 w-3 ml-1" />
                                  {event.time}
                                </>
                              )}
                            </div>
                            {"status" in event && event.status && (
                              <Badge className={getStatusColor(event.status)} variant="outline">
                                {getStatusLabel(event.status)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                {/* Legend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Légende</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm">Échéances projet</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Livrables</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Réunions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span className="text-sm">Révisions</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ce mois-ci</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Échéances</span>
                      <span className="font-semibold">
                        {
                          calendarEvents.filter(
                            (e) => e.type === "deadline" && new Date(e.date).getMonth() === currentDate.getMonth(),
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Livrables</span>
                      <span className="font-semibold">
                        {
                          calendarEvents.filter(
                            (e) => e.type === "deliverable" && new Date(e.date).getMonth() === currentDate.getMonth(),
                          ).length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Réunions</span>
                      <span className="font-semibold">
                        {
                          calendarEvents.filter(
                            (e) => e.type === "meeting" && new Date(e.date).getMonth() === currentDate.getMonth(),
                          ).length
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{profile.name}</h3>
                      <p className="text-muted-foreground">{profile.company}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {profile.rating} • Client depuis {new Date(profile.joinDate).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse</Label>
                      <Textarea
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button>Sauvegarder les modifications</Button>
                </CardContent>
              </Card>

              {/* Account Stats & Preferences */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Statistiques du compte</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{profile.activeProjects}</p>
                        <p className="text-sm text-muted-foreground">Projets actifs</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{profile.completedProjects}</p>
                        <p className="text-sm text-muted-foreground">Projets terminés</p>
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{profile.totalSpent}</p>
                      <p className="text-sm text-muted-foreground">Total dépensé</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Notifications push</Label>
                      <input
                        type="checkbox"
                        id="notifications"
                        checked={profile.preferences.notifications}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, notifications: e.target.checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-updates">Mises à jour par email</Label>
                      <input
                        type="checkbox"
                        id="email-updates"
                        checked={profile.preferences.emailUpdates}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, emailUpdates: e.target.checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="project-reminders">Rappels de projet</Label>
                      <input
                        type="checkbox"
                        id="project-reminders"
                        checked={profile.preferences.projectReminders}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            preferences: { ...profile.preferences, projectReminders: e.target.checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
