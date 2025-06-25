"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function HumanConfiguration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilité et préférences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timezone">Fuseau horaire</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre fuseau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe/paris">Europe/Paris (CET)</SelectItem>
                <SelectItem value="europe/london">Europe/London (GMT)</SelectItem>
                <SelectItem value="america/new_york">America/New_York (EST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="languages">Langues parlées</Label>
            <Input id="languages" placeholder="Français, Anglais..." />
          </div>
        </div>

        <div>
          <Label htmlFor="availability">Disponibilité</Label>
          <Textarea
            id="availability"
            placeholder="Ex: Disponible du lundi au vendredi, 9h-18h. Réponse sous 24h..."
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="remote-work" />
          <Label htmlFor="remote-work">Travail à distance possible</Label>
        </div>
      </CardContent>
    </Card>
  )
}
