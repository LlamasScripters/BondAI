import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function EmptyCart() {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Votre panier est vide</h3>
        <p className="text-muted-foreground mb-4">
          Parcourez notre marketplace pour trouver les prestataires parfaits pour votre projet
        </p>
        <Link href="/">
          <Button>Découvrir les services</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
