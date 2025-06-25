"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CoverImageProps {
  coverImage: string
  name: string
}

export function CoverImage({ coverImage, name }: CoverImageProps) {
  return (
    <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
      <img
        src={coverImage || "/placeholder.svg"}
        alt="Cover"
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="secondary" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au marketplace
          </Button>
        </Link>
      </div>
    </div>
  )
}
