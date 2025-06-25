"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileData } from "./types"

interface MissionsTabProps {
  profile: ProfileData
}

export function MissionsTab({ profile }: MissionsTabProps) {
  return (
    <div className="space-y-4">
      {profile.missions.map((mission) => (
        <Card key={mission.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{mission.title}</h3>
                <p className="text-muted-foreground mb-2">{mission.description}</p>
                <div className="flex flex-wrap gap-2">
                  {mission.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{mission.rating}</span>
                </div>
                <p className="text-sm font-semibold text-green-600">{mission.budget}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Client: {mission.client}</span>
              <span>
                Durée: {mission.duration} • Terminé le {mission.completedAt}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
