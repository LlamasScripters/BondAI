"use client"

import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceType } from "./types"

interface PortfolioSectionProps {
  serviceType: ServiceType
}

export function PortfolioSection({ serviceType }: PortfolioSectionProps) {
  return (
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
  )
}
