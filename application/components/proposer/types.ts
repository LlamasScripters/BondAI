export type ServiceType = "human" | "ai"

export interface ProposerFormData {
  serviceType: ServiceType
  name: string
  email: string
  description: string
  pricing: string
  pricingUnit: string
  category: string
  skills: string[]
  // AI specific
  apiEndpoints?: string[]
  responseTime?: string
  rateLimit?: string
  autoScaling?: boolean
  // Human specific
  timezone?: string
  languages?: string
  availability?: string
  remoteWork?: boolean
  // Portfolio
  portfolioLinks?: string
  files?: File[]
}
