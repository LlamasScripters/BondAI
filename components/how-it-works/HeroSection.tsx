import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Découvrez comment ServiceIA révolutionne la recherche de prestataires avec l'intelligence artificielle
        </p>
        <Link href="/">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Commencer maintenant
          </Button>
        </Link>
      </div>
    </div>
  )
}