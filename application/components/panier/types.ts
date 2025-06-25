export interface CartItem {
  id: string
  name: string
  type: "human" | "ai"
  avatar: string
  rating: number
  price: string
  priceNumeric: number
  priceType: "hour" | "project" | "request"
  estimatedHours?: number
  description: string
  skills: string[]
}

export interface TeamItem {
  id: string
  name: string
  members: string[]
  memberDetails: CartItem[]
  projects: number
  rating: number
  totalPrice: number
  description: string
}
