"use client"

import { useState } from "react"
import { Bot, User, Upload, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function ProposerPrestation() {
  const [serviceType, setServiceType] = useState<"human" | "ai">("human")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [apiEndpoints, setApiEndpoints] = useState<string[]>([""])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addApiEndpoint = () => {
    setApiEndpoints([...apiEndpoints, ""])
  }

  const removeApiEndpoint = (index: number) => {
    setApiEndpoints(apiEndpoints.filter((_, i) => i !== index))
  }

  const updateApiEndpoint = (index: number, value: string) => {
    const updated = [...apiEndpoints]
    updated[index] = value
    setApiEndpoints(updated)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Proposer une prestation</h1>
          <p className="text-lg text-muted-foreground">
            Ajoutez votre service au catalogue - prestation humaine ou agent IA
          </p>
        </div>

        <form className="space-y-8">
          {/* Type de prestation */}
          <Card>
            <CardHeader>
              <CardTitle>Type de prestation</CardTitle>
              <CardDescription>Choisissez si vous proposez un service humain ou un agent IA</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={serviceType} onValueChange={(value: "human" | "ai") => setServiceType(value)}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="human" id="human" />
                  <Label htmlFor="human" className="flex items-center gap-2 cursor-pointer flex-1">
                    <User className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Prestation humaine</div>
                      <div className="text-sm text-gray-500">Service fourni par un prestataire humain</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="ai" id="ai" />
                  <Label htmlFor="ai" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Agent IA</div>
                      <div className="text-sm text-gray-500">Service automatisé fourni par un agent IA</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Informations générales */}
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

          {/* Compétences */}
          <Card>
            <CardHeader>
              <CardTitle>Compétences et technologies</CardTitle>
              <CardDescription>Ajoutez les compétences et technologies maîtrisées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: React, Python, Design..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-red-600">
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Configuration spécifique aux agents IA */}
          {serviceType === "ai" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuration de l'agent IA</CardTitle>
                <CardDescription>Paramètres techniques pour l'intégration de votre agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Points d'accès API</Label>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">
                      Définissez les endpoints de votre agent ou importez un schéma JSON
                    </div>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Importer JSON Schema
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="https://api.example.com/v1/endpoint"
                          value={endpoint}
                          onChange={(e) => updateApiEndpoint(index, e.target.value)}
                        />
                        {apiEndpoints.length > 1 && (
                          <Button type="button" variant="outline" size="icon" onClick={() => removeApiEndpoint(index)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addApiEndpoint}>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un endpoint
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="response-time">Temps de réponse moyen (ms)</Label>
                    <Input id="response-time" type="number" placeholder="500" />
                  </div>
                  <div>
                    <Label htmlFor="rate-limit">Limite de requêtes/minute</Label>
                    <Input id="rate-limit" type="number" placeholder="100" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-scaling" />
                  <Label htmlFor="auto-scaling">Mise à l'échelle automatique</Label>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Configuration spécifique aux prestataires humains */}
          {serviceType === "human" && (
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
          )}

          {/* Portfolio/Exemples */}
          <Card>
            <CardHeader>
              <CardTitle>{serviceType === "human" ? "Portfolio" : "Exemples d'utilisation"}</CardTitle>
              <CardDescription>
                {serviceType === "human"
                  ? "Ajoutez des exemples de vos réalisations"
                  : "Montrez des exemples de ce que votre agent peut accomplir"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="portfolio-links">Liens vers vos réalisations</Label>
                <Textarea
                  id="portfolio-links"
                  placeholder={
                    serviceType === "human"
                      ? "https://github.com/username\nhttps://portfolio.example.com\nhttps://behance.net/username"
                      : "https://demo.example.com\nhttps://api-docs.example.com"
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="files">Fichiers (images, documents)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF jusqu'à 10MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" type="button">
              Sauvegarder comme brouillon
            </Button>
            <Button type="submit">Publier la prestation</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
