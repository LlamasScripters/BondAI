export interface Mission {
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

export interface Review {
  id: string
  client: string
  avatar: string
  rating: number
  date: string
  comment: string
  project: string
  helpful: number
}

export interface ProfileData {
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

export type ProfileType = "human" | "ai"
