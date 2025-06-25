import { User, Bot } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Notification } from "./types"

interface NotificationsTabProps {
  notifications: Notification[]
}

export function NotificationsTab({ notifications }: NotificationsTabProps) {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className={!notification.isRead ? "border-blue-200 bg-blue-50" : ""}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={notification.from.avatar || "/placeholder.svg"} alt={notification.from.name} />
                <AvatarFallback>
                  {notification.from.type === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {notification.requiresAction && <Badge variant="destructive">Action requise</Badge>}
                    {!notification.isRead && <Badge variant="secondary">Nouveau</Badge>}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(notification.timestamp).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>{notification.from.name}</strong> • {notification.project}
                </p>
                <p className="text-sm mb-4">{notification.message}</p>
                <div className="flex gap-2">
                  {notification.requiresAction && <Button size="sm">Répondre</Button>}
                  <Button variant="outline" size="sm">
                    Marquer comme lu
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
