import { User, Bot, MessageSquare, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Project } from "./types"
import { getStatusColor, getStatusLabel } from "./utils"

interface ProjectsTabProps {
  projects: Project[]
}

export function ProjectsTab({ projects }: ProjectsTabProps) {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="mt-1">{project.description}</CardDescription>
              </div>
              <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={project.provider.avatar || "/placeholder.svg"} alt={project.provider.name} />
                  <AvatarFallback>
                    {project.provider.type === "ai" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{project.provider.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.provider.type === "ai" ? "Agent IA" : "Prestataire"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold">{project.budget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Début</p>
                <p className="font-semibold">{new Date(project.startDate).toLocaleDateString("fr-FR")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Échéance</p>
                <p className="font-semibold">{new Date(project.deadline).toLocaleDateString("fr-FR")}</p>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Progression globale</h4>
                <span className="text-sm text-muted-foreground">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="font-medium mb-3">Livrables</h4>
              <div className="space-y-2">
                {project.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          deliverable.status === "completed"
                            ? "bg-green-500"
                            : deliverable.status === "in_progress"
                              ? "bg-blue-500"
                              : deliverable.status === "review"
                                ? "bg-orange-500"
                                : "bg-gray-300"
                        }`}
                      />
                      <span className="text-sm">{deliverable.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(deliverable.status)} variant="outline">
                        {getStatusLabel(deliverable.status)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(deliverable.dueDate).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contacter
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Voir détails
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
