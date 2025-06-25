import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ServiceType } from "./types"

interface GeneralInformationProps {
  serviceType: ServiceType
}

export function GeneralInformation({ serviceType }: GeneralInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations générales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">{serviceType === "human" ? "Votre nom" : "Nom de l'agent"}</Label>
            <Input id="name" placeholder={serviceType === "human" ? "Marie Dubois" : "CodeAssistant Pro"} />
          </div>
          <div>
            <Label htmlFor="email">Email de contact</Label>
            <Input id="email" type="email" placeholder="contact@example.com" />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description du service</Label>
          <Textarea
            id="description"
            placeholder={
              serviceType === "human"
                ? "Décrivez votre expertise, votre expérience et les services que vous proposez..."
                : "Décrivez les capacités de votre agent IA, les tâches qu'il peut accomplir..."
            }
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pricing">Tarification</Label>
            <div className="flex gap-2">
              <Input id="pricing" placeholder="45" type="number" />
              <Select defaultValue={serviceType === "human" ? "hour" : "request"}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">€/heure</SelectItem>
                  <SelectItem value="day">€/jour</SelectItem>
                  <SelectItem value="project">€/projet</SelectItem>
                  <SelectItem value="request">€/requête</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Développement</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="data">Analyse de données</SelectItem>
                <SelectItem value="content">Création de contenu</SelectItem>
                <SelectItem value="automation">Automatisation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
