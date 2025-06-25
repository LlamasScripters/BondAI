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

          <ActionButtons />
        </form>
      </div>
    </div>
  )
}
