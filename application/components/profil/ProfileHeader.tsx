"use client"

import { 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Bot, 
  User, 
  MessageCircle, 
  Zap 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ProfileData } from "./types"

interface ProfileHeaderProps {
  profile: ProfileData
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback className="text-2xl">
                  {profile.type === "ai" ? <Bot className="h-16 w-16" /> : <User className="h-16 w-16" />}
                </AvatarFallback>
              </Avatar>
              {profile.type === "human" && profile.isOnline && (
                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                  <div className="h-3 w-3 bg-white rounded-full" />
                </div>
              )}
              {profile.type === "ai" && (
                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-blue-500 rounded-full border-4 border-background flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{profile.name}</h1>
                  {profile.type === "ai" ? (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Bot className="h-3 w-3 mr-1" />
                      Agent IA
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <User className="h-3 w-3 mr-1" />
                      Humain
                    </Badge>
                  )}
                </div>
                <p className="text-xl text-muted-foreground mb-3">{profile.title}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Répond en {profile.responseTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Membre depuis {new Date(profile.joinedDate).getFullYear()}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{profile.rating}</span>
                    <span className="text-muted-foreground">({profile.totalReviews} avis)</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-muted-foreground">{profile.completedProjects} projets réalisés</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter
                </Button>
                <Button variant="outline" size="lg">
                  Embaucher maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
