import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PanierHeader() {
  return (
    <div className="mb-8 pt-8">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au marketplace
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Mon panier</h1>
      <p className="text-lg text-muted-foreground">Finalisez votre sélection de prestataires</p>
    </div>
  )
}
