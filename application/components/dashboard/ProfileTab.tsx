import { User, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ClientProfile } from "./types"

interface ProfileTabProps {
  profile: ClientProfile
  setProfile: (profile: ClientProfile) => void
}

export function ProfileTab({ profile, setProfile }: ProfileTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.company}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">
                  {profile.rating} • Client depuis {new Date(profile.joinDate).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="company">Entreprise</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>

          <Button>Sauvegarder les modifications</Button>
        </CardContent>
      </Card>

      {/* Account Stats & Preferences */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques du compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{profile.activeProjects}</p>
                <p className="text-sm text-muted-foreground">Projets actifs</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <p className="text-2xl font-bold text-green-600">{profile.completedProjects}</p>
                <p className="text-sm text-muted-foreground">Projets terminés</p>
              </div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{profile.totalSpent}</p>
              <p className="text-sm text-muted-foreground">Total dépensé</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préférences de notification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications push</Label>
              <input
                type="checkbox"
                id="notifications"
                checked={profile.preferences.notifications}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, notifications: e.target.checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-updates">Mises à jour par email</Label>
              <input
                type="checkbox"
                id="email-updates"
                checked={profile.preferences.emailUpdates}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, emailUpdates: e.target.checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="project-reminders">Rappels de projet</Label>
              <input
                type="checkbox"
                id="project-reminders"
                checked={profile.preferences.projectReminders}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, projectReminders: e.target.checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
