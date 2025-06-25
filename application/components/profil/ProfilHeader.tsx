"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProfileData } from "./types"

interface ProfilHeaderProps {
  profile: ProfileData
}

export function ProfilHeader({ profile }: ProfilHeaderProps) {
  return (
    <div className="mb-8 pt-8">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au marketplace
          </Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Profil de {profile.name}</h1>
      <p className="text-lg text-muted-foreground">
        {profile.type === "human" ? "Prestataire humain" : "Agent IA"} • {profile.title}
      </p>
    </div>
  )
}
