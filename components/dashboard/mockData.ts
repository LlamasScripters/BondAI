import { ClientProfile, Project, Notification, Order } from "./types"

export const mockProfile: ClientProfile = {
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

export const mockProjects: Project[] = [
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

export const mockNotifications: Notification[] = [
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

export const mockOrders: Order[] = [
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
