"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AboutSection } from "./AboutSection"
import { SidebarInfo } from "./SidebarInfo"
import { PortfolioTab } from "./PortfolioTab"
import { ReviewsTab } from "./ReviewsTab"
import { MissionsTab } from "./MissionsTab"
import { ProfileData } from "./types"

interface ProfileTabsProps {
  profile: ProfileData
  activeTab: string
  onTabChange: (value: string) => void
}

export function ProfileTabs({ profile, activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
        <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
        <TabsTrigger value="reviews">Avis ({profile.totalReviews})</TabsTrigger>
        <TabsTrigger value="missions">Missions ({profile.missions.length})</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AboutSection profile={profile} />
          </div>
          <div>
            <SidebarInfo profile={profile} />
          </div>
        </div>
      </TabsContent>

      {/* Portfolio Tab */}
      <TabsContent value="portfolio">
        <PortfolioTab profile={profile} />
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews">
        <ReviewsTab profile={profile} />
      </TabsContent>

      {/* Missions Tab */}
      <TabsContent value="missions">
        <MissionsTab profile={profile} />
      </TabsContent>
    </Tabs>
  )
}
