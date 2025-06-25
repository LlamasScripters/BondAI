import { useState } from "react"
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarEvent, Project } from "./types"
import { getStatusColor, getStatusLabel } from "./utils"

interface CalendarTabProps {
  projects: Project[]
}

export function CalendarTab({ projects }: CalendarTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Calendar events from projects
  const calendarEvents: CalendarEvent[] = [
    // From projects deadlines
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      title: `Échéance: ${project.title}`,
      date: project.deadline,
      type: "deadline" as const,
      project: project,
    })),
    // From deliverables
    ...projects.flatMap((project) =>
      project.deliverables.map((deliverable) => ({
        id: `deliverable-${project.id}-${deliverable.name}`,
        title: `${deliverable.name} - ${project.title}`,
        date: deliverable.dueDate,
        type: "deliverable" as const,
        status: deliverable.status,
        project: project,
      })),
    ),
    // Custom events
    {
      id: "meeting-1",
      title: "Réunion équipe Full-Stack",
      date: "2024-02-05",
      type: "meeting" as const,
      time: "14:00",
    },
    {
      id: "review-1",
      title: "Révision maquettes UI",
      date: "2024-02-08",
      type: "review" as const,
      time: "10:30",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return calendarEvents.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar View */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Aujourd'hui
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: getFirstDayOfMonth(currentDate) }, (_, i) => (
                <div key={`empty-${i}`} className="p-2 h-24"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => {
                const day = i + 1
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                const events = getEventsForDate(date)
                const isToday = date.toDateString() === new Date().toDateString()

                return (
                  <div
                    key={day}
                    className={`p-1 h-24 border rounded-lg ${
                      isToday ? "bg-blue-50 border-blue-200" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${
                            event.type === "deadline"
                              ? "bg-red-100 text-red-800"
                              : event.type === "deliverable"
                                ? "bg-blue-100 text-blue-800"
                                : event.type === "meeting"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                          }`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{events.length - 2} autres</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Sidebar */}
      <div className="space-y-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Événements à venir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calendarEvents
              .filter((event) => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div
                    className={`h-3 w-3 rounded-full mt-1 ${
                      event.type === "deadline"
                        ? "bg-red-500"
                        : event.type === "deliverable"
                          ? "bg-blue-500"
                          : event.type === "meeting"
                            ? "bg-green-500"
                            : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("fr-FR")}
                      {event.time && (
                        <>
                          <Clock className="h-3 w-3 ml-1" />
                          {event.time}
                        </>
                      )}
                    </div>
                    {event.status && (
                      <Badge className={getStatusColor(event.status)} variant="outline">
                        {getStatusLabel(event.status)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Légende</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm">Échéances projet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm">Livrables</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm">Réunions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-sm">Révisions</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ce mois-ci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Échéances</span>
              <span className="font-semibold">
                {
                  calendarEvents.filter(
                    (e) => e.type === "deadline" && new Date(e.date).getMonth() === currentDate.getMonth(),
                  ).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Livrables</span>
              <span className="font-semibold">
                {
                  calendarEvents.filter(
                    (e) => e.type === "deliverable" && new Date(e.date).getMonth() === currentDate.getMonth(),
                  ).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Réunions</span>
              <span className="font-semibold">
                {
                  calendarEvents.filter(
                    (e) => e.type === "meeting" && new Date(e.date).getMonth() === currentDate.getMonth(),
                  ).length
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
