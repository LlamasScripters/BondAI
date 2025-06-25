"use client"

import { Star, Globe, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ProfileData } from "./types"

interface SidebarInfoProps {
  profile: ProfileData
}

export function SidebarInfo({ profile }: SidebarInfoProps) {
  const totalRatings = Object.values(profile.ratingBreakdown).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-6">
      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Tarifs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {profile.hourlyRate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tarif horaire</span>
              <span className="font-semibold">{profile.hourlyRate}</span>
            </div>
          )}
          {profile.projectRate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Projet</span>
              <span className="font-semibold">{profile.projectRate}</span>
            </div>
          )}
          {profile.requestRate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Par requête</span>
              <span className="font-semibold">{profile.requestRate}</span>
            </div>
          )}
          <Separator />
          <div className="text-center">
            <Badge variant="outline" className="text-green-600 border-green-600">
              {profile.availability}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Rating Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Évaluations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-3">{rating}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <Progress
                value={
                  (profile.ratingBreakdown[rating as keyof typeof profile.ratingBreakdown] / totalRatings) *
                  100
                }
                className="flex-1 h-2"
              />
              <span className="text-xs text-muted-foreground w-8">
                {profile.ratingBreakdown[rating as keyof typeof profile.ratingBreakdown]}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Languages */}
      {profile.languages && (
        <Card>
          <CardHeader>
            <CardTitle>Langues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <Badge key={lang} variant="outline">
                  <Globe className="h-3 w-3 mr-1" />
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certifications */}
      {profile.certifications && (
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {profile.certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
