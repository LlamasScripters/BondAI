"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProfileData } from "./types"

interface AboutSectionProps {
  profile: ProfileData
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>À propos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Compétences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Missions */}
      <Card>
        <CardHeader>
          <CardTitle>Missions récentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.missions.slice(0, 3).map((mission) => (
            <div key={mission.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{mission.title}</h4>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{mission.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{mission.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {mission.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Client: {mission.client}</span>
                <span>
                  {mission.budget} • {mission.duration}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
