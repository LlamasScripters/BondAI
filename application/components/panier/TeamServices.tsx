import { Trash2, Users, Bot, User, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TeamItem } from "./types"
import Link from "next/link"

interface TeamServicesProps {
  teamItems: TeamItem[]
  onRemoveTeam: (id: string) => void
}

export function TeamServices({ teamItems, onRemoveTeam }: TeamServicesProps) {
  if (teamItems.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Équipes ({teamItems.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamItems.map((team) => (
          <div key={team.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{team.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{team.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{team.rating}</span>
                  </div>
                  <span>{team.projects} projets ensemble</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-xl mb-2">{team.totalPrice}€</div>
                <div className="flex gap-2">
                  <Link href={`/equipe/${team.id}`}>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => onRemoveTeam(team.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {team.memberDetails.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.type === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
