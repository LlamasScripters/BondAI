"use client"

import { useState } from "react"
import {
  ProfilHeader,
  ProfileHeader,
  ProfileTabs,
  mockProfile
} from "@/components/profil"

export default function ProfilPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const profile = mockProfile // En réalité, fetch basé sur params.id

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <ProfilHeader profile={profile} />

        <ProfileHeader profile={profile} />

        <ProfileTabs 
          profile={profile}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  )
}
