"use client"

import { useState } from "react"
import {
  ProposerHeader,
  ServiceTypeSelection,
  GeneralInformation,
  SkillsManagement,
  AIConfiguration,
  HumanConfiguration,
  PortfolioSection,
  ActionButtons,
  ServiceType
} from "@/components/proposer"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card"
import {
  CheckCircle,
  Palette,
  ExternalLink
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProposerPrestation() {
  const [serviceType, setServiceType] = useState<ServiceType>("human")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [apiEndpoints, setApiEndpoints] = useState<string[]>([""])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addApiEndpoint = () => {
    setApiEndpoints([...apiEndpoints, ""])
  }

  const removeApiEndpoint = (index: number) => {
    setApiEndpoints(apiEndpoints.filter((_, i) => i !== index))
  }

  const updateApiEndpoint = (index: number, value: string) => {
    const updated = [...apiEndpoints]
    updated[index] = value
    setApiEndpoints(updated)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <ProposerHeader />

        <form className="space-y-8">
          <ServiceTypeSelection 
            serviceType={serviceType}
            onServiceTypeChange={setServiceType}
          />

          <GeneralInformation serviceType={serviceType} />

          <SkillsManagement
            skills={skills}
            newSkill={newSkill}
            onNewSkillChange={setNewSkill}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
          />

          {serviceType === "ai" && (
            <AIConfiguration
              apiEndpoints={apiEndpoints}
              onAddApiEndpoint={addApiEndpoint}
              onRemoveApiEndpoint={removeApiEndpoint}
              onUpdateApiEndpoint={updateApiEndpoint}
            />
          )}

          {serviceType === "human" && <HumanConfiguration />}

          <PortfolioSection serviceType={serviceType} />

          {/* Portfolio Generation Section */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                Génération Automatique de Portfolio
              </CardTitle>
              <CardDescription>
                                 Notre IA crée automatiquement votre portfolio professionnel à partir de vos informations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-semibold mb-2">✨ Votre Portfolio sera généré avec :</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Page d'accueil personnalisée selon vos compétences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Section projets avec vos réalisations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>CV optimisé et téléchargeable</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Déploiement automatique sur Vercel</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="font-medium text-green-800">Portfolio automatique inclus</div>
                  <div className="text-sm text-green-600">Valorisez votre profil SMP instantanément</div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Gratuit
                </Badge>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => {
                  // Lien vers votre agent IA existant
                  window.open('/ai-portfolio', '_blank')
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Prévisualiser mon futur portfolio
              </Button>
            </CardContent>
          </Card>

          <ActionButtons />
        </form>
      </div>
    </div>
  )
}
