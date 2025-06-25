import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <div className="text-center mt-16">
      <h2 className="text-2xl font-bold mb-4">Prêt à commencer votre projet ?</h2>
      <p className="text-muted-foreground mb-6">
        Rejoignez des milliers d'entreprises qui font confiance à ServiceIA
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/">
          <Button size="lg">Trouver un prestataire</Button>
        </Link>
        <Link href="/proposer">
          <Button variant="outline" size="lg">
            Devenir prestataire
          </Button>
        </Link>
      </div>
    </div>
  )
}