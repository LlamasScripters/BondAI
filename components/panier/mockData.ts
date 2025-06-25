import { CartItem, TeamItem } from "./types"

export const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Marie Dubois",
    type: "human",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    price: "45€/h",
    priceNumeric: 45,
    priceType: "hour",
    estimatedHours: 40,
    description: "Développeuse React/Next.js avec 8 ans d'expérience",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "2",
    name: "CodeAssistant Pro",
    type: "ai",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    price: "0.05€/req",
    priceNumeric: 0.05,
    priceType: "request",
    description: "Agent IA spécialisé dans la génération de code",
    skills: ["Code Generation", "React", "Performance"],
  },
]

export const mockTeamItems: TeamItem[] = [
  {
    id: "team1",
    name: "Équipe Full-Stack",
    members: ["Marie Dubois", "Thomas Martin"],
    memberDetails: [
      {
        id: "1",
        name: "Marie Dubois",
        type: "human",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        price: "45€/h",
        priceNumeric: 45,
        priceType: "hour",
        description: "Développeuse React/Next.js",
        skills: ["React", "Next.js", "TypeScript"],
      },
      {
        id: "3",
        name: "Thomas Martin",
        type: "human",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        price: "55€/h",
        priceNumeric: 55,
        priceType: "hour",
        description: "Designer UX/UI",
        skills: ["UI/UX Design", "Figma", "Prototyping"],
      },
    ],
    projects: 12,
    rating: 4.9,
    totalPrice: 8500,
    description: "Duo expérimenté pour vos projets web complets",
  },
]
