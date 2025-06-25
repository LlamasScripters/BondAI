"use client"

import { HeroSection } from "@/components/how-it-works/HeroSection"
import { StepsSection } from "@/components/how-it-works/StepsSection"
import { FeaturesSection } from "@/components/how-it-works/FeaturesSection"
import { ServiceTypesSection } from "@/components/how-it-works/ServiceTypesSection"
import { FAQSection } from "@/components/how-it-works/FAQSection"
import { CTASection } from "@/components/how-it-works/CTASection"

export default function CommentCaMarchePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <StepsSection />
        <FeaturesSection />
        <ServiceTypesSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  )
}
