"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DashboardHeader,
  OverviewTab,
  ProjectsTab,
  CalendarTab,
  NotificationsTab,
  OrdersTab,
  ProfileTab,
  mockProfile,
  mockProjects,
  mockNotifications,
  mockOrders,
} from "@/components/dashboard"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [profile, setProfile] = useState(mockProfile)

  const unreadNotifications = mockNotifications.filter((n) => !n.isRead).length
  const actionRequiredNotifications = mockNotifications.filter((n) => n.requiresAction).length

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader
          profile={profile}
          unreadNotifications={unreadNotifications}
          actionRequiredNotifications={actionRequiredNotifications}
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="projects">Projets ({mockProjects.length})</TabsTrigger>
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab projects={mockProjects} notifications={mockNotifications} />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsTab projects={mockProjects} />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <CalendarTab projects={mockProjects} />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationsTab notifications={mockNotifications} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrdersTab orders={mockOrders} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileTab profile={profile} setProfile={setProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
