import { Bot, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ServiceType } from "./types"

interface ServiceTypeSelectionProps {
  serviceType: ServiceType
  onServiceTypeChange: (type: ServiceType) => void
}

export function ServiceTypeSelection({ serviceType, onServiceTypeChange }: ServiceTypeSelectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Type de prestation</CardTitle>
        <CardDescription>Choisissez si vous proposez un service humain ou un agent IA</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={serviceType} onValueChange={(value: ServiceType) => onServiceTypeChange(value)}>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="human" id="human" />
            <Label htmlFor="human" className="flex items-center gap-2 cursor-pointer flex-1">
              <User className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">Prestation humaine</div>
                <div className="text-sm text-gray-500">Service fourni par un prestataire humain</div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai" className="flex items-center gap-2 cursor-pointer flex-1">
              <Bot className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Agent IA</div>
                <div className="text-sm text-gray-500">Service automatisé fourni par un agent IA</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
