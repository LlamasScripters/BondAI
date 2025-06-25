export interface Project {
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

export interface Notification {
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

export interface Order {
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

export interface ClientProfile {
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

export interface CalendarEvent {
  id: string
  title: string
  date: string
  type: "deadline" | "deliverable" | "meeting" | "review"
  status?: string
  project?: Project
  time?: string
}
