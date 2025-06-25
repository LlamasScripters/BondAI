"use client"

import { Button } from "@/components/ui/button"

export function ActionButtons() {
  return (
    <div className="flex gap-4 justify-end">
      <Button variant="outline" type="button">
        Sauvegarder comme brouillon
      </Button>
      <Button type="submit">
        Publier la prestation
      </Button>
    </div>
  )
}
