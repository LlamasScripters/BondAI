import { User, Bot } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Project, Notification } from "./types"
import { getStatusColor, getStatusLabel } from "./utils"

interface OverviewTabProps {
  projects: Project[]
  notifications: Notification[]
}

export function OverviewTab({ projects, notifications }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Projets récents</CardTitle>
          <CardDescription>Aperçu de vos projets en cours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="flex items-center gap-4 p-3 border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={project.provider.avatar || "/placeholder.svg"} alt={project.provider.name} />
                <AvatarFallback>
                  {project.provider.type === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{project.title}</h4>
                <p className="text-xs text-muted-foreground">{project.provider.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={project.progress} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground">{project.progress}%</span>
                </div>
              </div>
              <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications récentes</CardTitle>
          <CardDescription>Dernières mises à jour de vos projets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.slice(0, 4).map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                !notification.isRead ? "bg-blue-50 border border-blue-200" : "border"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={notification.from.avatar || "/placeholder.svg"}
                  alt={notification.from.name}
                />
                <AvatarFallback>
                  {notification.from.type === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-medium text-sm">{notification.title}</h5>
                  {notification.requiresAction && (
                    <Badge variant="destructive" className="text-xs">
                      Action requise
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{notification.from.name}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
