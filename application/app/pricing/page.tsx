import { PricingHeader } from "@/components/pricing/PricingHeader"
import { PricingCards } from "@/components/pricing/PricingCards"
import { CommissionExplainer } from "@/components/pricing/CommissionExplainer"
import { PricingFAQ } from "@/components/pricing/PricingFAQ"
import { PricingCTA } from "@/components/pricing/PricingCTA"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHeader />
      <CommissionExplainer />
      <PricingCards />
      <PricingFAQ />
      <PricingCTA />
    </div>
  )
}
