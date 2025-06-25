import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProjectDescriptionProps {
  projectDescription: string
  estimatedBudget: string
  onDescriptionChange: (value: string) => void
  onBudgetChange: (value: string) => void
}

export function ProjectDescription({
  projectDescription,
  estimatedBudget,
  onDescriptionChange,
  onBudgetChange,
}: ProjectDescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description du projet</CardTitle>
        <CardDescription>
          Décrivez votre projet pour aider les prestataires à mieux vous comprendre
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="description">Détails du projet</Label>
          <Textarea
            id="description"
            placeholder="Décrivez votre projet, vos objectifs, contraintes techniques, délais..."
            value={projectDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="budget">Budget estimé</Label>
          <Input
            id="budget"
            placeholder="Ex: 5000€ - 10000€"
            value={estimatedBudget}
            onChange={(e) => onBudgetChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}
