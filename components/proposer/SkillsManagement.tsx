"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SkillsManagementProps {
  skills: string[]
  newSkill: string
  onNewSkillChange: (value: string) => void
  onAddSkill: () => void
  onRemoveSkill: (skill: string) => void
}

export function SkillsManagement({
  skills,
  newSkill,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill
}: SkillsManagementProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onAddSkill()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compétences et technologies</CardTitle>
        <CardDescription>Ajoutez les compétences et technologies maîtrisées</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ex: React, Python, Design..."
            value={newSkill}
            onChange={(e) => onNewSkillChange(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button type="button" onClick={onAddSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <button 
                type="button" 
                onClick={() => onRemoveSkill(skill)} 
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
