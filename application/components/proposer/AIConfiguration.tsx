"use client"

import { Upload, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface AIConfigurationProps {
  apiEndpoints: string[]
  onAddApiEndpoint: () => void
  onRemoveApiEndpoint: (index: number) => void
  onUpdateApiEndpoint: (index: number, value: string) => void
}

export function AIConfiguration({
  apiEndpoints,
  onAddApiEndpoint,
  onRemoveApiEndpoint,
  onUpdateApiEndpoint
}: AIConfigurationProps) {
  return (
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
                  onChange={(e) => onUpdateApiEndpoint(index, e.target.value)}
                />
                {apiEndpoints.length > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => onRemoveApiEndpoint(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={onAddApiEndpoint}>
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
  )
}
