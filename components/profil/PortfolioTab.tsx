"use client"

import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileData } from "./types"

interface PortfolioTabProps {
  profile: ProfileData
}

export function PortfolioTab({ profile }: PortfolioTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio & Liens</CardTitle>
        <CardDescription>Découvrez mes réalisations et projets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.portfolio.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <ExternalLink className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{link}</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
