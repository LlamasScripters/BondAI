import { User, Bot, Download, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Order } from "./types"
import { getStatusColor, getStatusLabel } from "./utils"

interface OrdersTabProps {
  orders: Order[]
}

export function OrdersTab({ orders }: OrdersTabProps) {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Commande {order.id}</CardTitle>
                <CardDescription>{new Date(order.date).toLocaleDateString("fr-FR")}</CardDescription>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                <p className="text-lg font-semibold mt-1">{order.total}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        item.type === "ai"
                          ? "bg-blue-100"
                          : item.type === "team"
                            ? "bg-purple-100"
                            : "bg-green-100"
                      }`}
                    >
                      {item.type === "ai" ? (
                        <Bot className="h-4 w-4 text-blue-600" />
                      ) : item.type === "team" ? (
                        <User className="h-4 w-4 text-purple-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "ai" ? "Agent IA" : item.type === "team" ? "Équipe" : "Prestataire"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{item.price}</p>
                    <Badge className={getStatusColor(item.status)} variant="outline">
                      {getStatusLabel(item.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Paiement: {order.paymentMethod}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Facture
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Détails
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
