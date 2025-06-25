import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CartItem, TeamItem } from "./types"

interface OrderSummaryProps {
  cartItems: CartItem[]
  teamItems: TeamItem[]
  calculateItemTotal: (item: CartItem) => number
}

export function OrderSummary({ cartItems, teamItems, calculateItemTotal }: OrderSummaryProps) {
  const totalIndividual = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const totalTeams = teamItems.reduce((sum, team) => sum + team.totalPrice, 0)
  const grandTotal = totalIndividual + totalTeams

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.length > 0 && (
            <>
              <div className="space-y-2">
                <h4 className="font-medium">Services individuels</h4>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>{calculateItemTotal(item)}€</span>
                  </div>
                ))}
              </div>
              <Separator />
            </>
          )}

          {teamItems.length > 0 && (
            <>
              <div className="space-y-2">
                <h4 className="font-medium">Équipes</h4>
                {teamItems.map((team) => (
                  <div key={team.id} className="flex justify-between text-sm">
                    <span>{team.name}</span>
                    <span>{team.totalPrice}€</span>
                  </div>
                ))}
              </div>
              <Separator />
            </>
          )}

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{grandTotal}€</span>
          </div>

          <Button className="w-full" size="lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Procéder au paiement
          </Button>

          <div className="text-xs text-muted-foreground text-center">
            Paiement sécurisé • Garantie satisfaction • Support 24/7
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Besoin d'aide ?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Notre équipe est là pour vous accompagner dans votre projet
          </p>
          <Button variant="outline" className="w-full">
            Contacter le support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
