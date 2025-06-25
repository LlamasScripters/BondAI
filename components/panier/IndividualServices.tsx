import { Trash2, Plus, Minus, ShoppingCart, Bot, User, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CartItem } from "./types"

interface IndividualServicesProps {
  cartItems: CartItem[]
  onRemoveItem: (id: string) => void
  onUpdateHours: (id: string, hours: number) => void
  calculateItemTotal: (item: CartItem) => number
}

export function IndividualServices({ 
  cartItems, 
  onRemoveItem, 
  onUpdateHours, 
  calculateItemTotal 
}: IndividualServicesProps) {
  if (cartItems.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Services individuels ({cartItems.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                <AvatarFallback>
                  {item.type === "ai" ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <Badge variant={item.type === "ai" ? "secondary" : "outline"}>
                    {item.type === "ai" ? (
                      <>
                        <Bot className="h-3 w-3 mr-1" />
                        Agent IA
                      </>
                    ) : (
                      <>
                        <User className="h-3 w-3 mr-1" />
                        Humain
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{item.rating}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {item.priceType === "hour" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm">Heures estimées:</Label>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onUpdateHours(item.id, (item.estimatedHours || 1) - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.estimatedHours || 1}
                        onChange={(e) => onUpdateHours(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 h-6 text-center text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onUpdateHours(item.id, (item.estimatedHours || 1) + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="font-semibold text-lg mb-2">
                  {item.priceType === "hour" && item.estimatedHours
                    ? `${calculateItemTotal(item)}€`
                    : item.price}
                </div>
                <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
