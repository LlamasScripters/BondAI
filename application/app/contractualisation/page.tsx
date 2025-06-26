"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Shield, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  Download,
  Signature,
  Lock,
  Euro,
  AlertTriangle
} from "lucide-react"

interface ContractData {
  projectTitle: string
  totalAmount: number
  duration: string
  milestones: Array<{
    id: string
    title: string
    amount: number
    deadline: string
    deliverables: string[]
  }>
  providers: Array<{
    id: string
    name: string
    role: string
    amount: number
  }>
}

const mockContract: ContractData = {
  projectTitle: "Plateforme e-commerce B2B",
  totalAmount: 6750,
  duration: "35 jours",
  milestones: [
    {
      id: "m1",
      title: "Audit & Stratégie",
      amount: 500,
      deadline: "15/02/2025",
      deliverables: ["Cahier des charges détaillé", "Architecture technique", "Planning projet"]
    },
    {
      id: "m2", 
      title: "Design System",
      amount: 1500,
      deadline: "28/02/2025",
      deliverables: ["Maquettes desktop/mobile", "Composants UI", "Guide de style"]
    },
    {
      id: "m3",
      title: "Développement",
      amount: 4000,
      deadline: "25/03/2025", 
      deliverables: ["Frontend complet", "API Backend", "Base de données", "Tests unitaires"]
    },
    {
      id: "m4",
      title: "Déploiement",
      amount: 750,
      deadline: "01/04/2025",
      deliverables: ["Mise en production", "Formation utilisateurs", "Documentation"]
    }
  ],
  providers: [
    { id: "p1", name: "Consultant Senior", role: "Chef de projet", amount: 500 },
    { id: "p2", name: "Équipe Design", role: "UX/UI", amount: 1500 },
    { id: "p3", name: "Équipe Dev Senior", role: "Développement", amount: 4000 },
    { id: "p4", name: "DevOps Expert", role: "Infrastructure", amount: 750 }
  ]
}

type ContractStep = "review" | "payment_setup" | "signatures" | "escrow" | "completed"

export default function Contractualisation() {
  const [currentStep, setCurrentStep] = useState<ContractStep>("review")
  const [signedProviders, setSignedProviders] = useState<string[]>([])
  const [clientSigned, setClientSigned] = useState(false)
  const [escrowFunded, setEscrowFunded] = useState(false)

  const steps = [
    { id: "review", title: "Révision", icon: FileText },
    { id: "payment_setup", title: "Paiement", icon: CreditCard },
    { id: "signatures", title: "Signatures", icon: Signature },
    { id: "escrow", title: "Séquestre", icon: Shield },
    { id: "completed", title: "Actif", icon: CheckCircle }
  ]

  const getStepStatus = (stepId: string) => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    const currentIndex = steps.findIndex(s => s.id === currentStep)
    
    if (stepIndex < currentIndex) return "completed"
    if (stepIndex === currentIndex) return "current"
    return "pending"
  }

  const handleProviderSign = (providerId: string) => {
    setSignedProviders(prev => [...prev, providerId])
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case "review":
        return true
      case "payment_setup":
        return true
      case "signatures":
        return clientSigned && signedProviders.length === mockContract.providers.length
      case "escrow":
        return escrowFunded
      default:
        return false
    }
  }

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep)
    if (currentIndex < steps.length - 1 && canProceedToNextStep()) {
      setCurrentStep(steps[currentIndex + 1].id as ContractStep)
    }
  }

  const simulateAction = (action: string) => {
    switch (action) {
      case "client_sign":
        setClientSigned(true)
        break
      case "fund_escrow":
        setEscrowFunded(true)
        break
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contractualisation Automatique</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Processus sécurisé de signature électronique et paiement sous séquestre
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const status = getStepStatus(step.id)
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      status === "completed" ? "bg-green-500 text-white" :
                      status === "current" ? "bg-blue-500 text-white" :
                      "bg-gray-200 text-gray-500"
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <div className={`font-medium ${
                        status === "current" ? "text-blue-600" : "text-gray-600"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-4 ${
                        status === "completed" ? "bg-green-500" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
            <Progress value={(steps.findIndex(s => s.id === currentStep) + 1) * 20} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contract Review */}
            {currentStep === "review" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Révision du Contrat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{mockContract.projectTitle}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Montant total :</span> {mockContract.totalAmount}€
                      </div>
                      <div>
                        <span className="font-medium">Durée :</span> {mockContract.duration}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Jalons du projet</h4>
                    <div className="space-y-3">
                      {mockContract.milestones.map((milestone) => (
                        <div key={milestone.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{milestone.title}</h5>
                            <Badge variant="outline">{milestone.amount}€</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Échéance : {milestone.deadline}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Livrables :</span>
                            <ul className="list-disc list-inside ml-2">
                              {milestone.deliverables.map((deliverable, idx) => (
                                <li key={idx}>{deliverable}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                    <Button onClick={nextStep}>
                      Approuver et continuer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Setup */}
            {currentStep === "payment_setup" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Configuration du Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Paiement sécurisé sous séquestre</span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Vos fonds sont détenus de manière sécurisée et libérés automatiquement lors de la validation des jalons.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-number">Numéro de carte</Label>
                      <Input 
                        id="card-number" 
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiration</Label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/AA"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nom sur la carte</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button onClick={nextStep} className="w-full">
                    <Lock className="h-4 w-4 mr-2" />
                    Sécuriser le paiement ({mockContract.totalAmount}€)
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Signatures */}
            {currentStep === "signatures" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Signature className="h-5 w-5" />
                    Signatures Électroniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Signatures des prestataires</h4>
                    {mockContract.providers.map((provider) => (
                      <div key={provider.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{provider.name}</div>
                          <div className="text-sm text-gray-600">{provider.role}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{provider.amount}€</span>
                          {signedProviders.includes(provider.id) ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Signé
                            </Badge>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleProviderSign(provider.id)}
                            >
                              Simuler signature
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Votre signature</h4>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Client (Vous)</div>
                        <div className="text-sm text-gray-600">Donneur d'ordre</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {clientSigned ? (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Signé
                          </Badge>
                        ) : (
                          <Button 
                            onClick={() => simulateAction("client_sign")}
                          >
                            <Signature className="h-4 w-4 mr-2" />
                            Signer électroniquement
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {canProceedToNextStep() && (
                    <Button onClick={nextStep} className="w-full">
                      Finaliser les signatures
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Escrow */}
            {currentStep === "escrow" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Séquestre Sécurisé
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Contrat signé avec succès</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      Toutes les parties ont signé le contrat. Procédez maintenant au financement du séquestre.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Financement du séquestre</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Montant total du projet :</span>
                        <span className="font-medium">{mockContract.totalAmount}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frais de service SMP (5%) :</span>
                        <span className="font-medium">{Math.round(mockContract.totalAmount * 0.05)}€</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total à débiter :</span>
                        <span>{Math.round(mockContract.totalAmount * 1.05)}€</span>
                      </div>
                    </div>

                    {!escrowFunded ? (
                      <Button 
                        onClick={() => simulateAction("fund_escrow")}
                        className="w-full"
                      >
                        <Euro className="h-4 w-4 mr-2" />
                        Financer le séquestre
                      </Button>
                    ) : (
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="font-medium text-green-800">Séquestre financé avec succès</p>
                      </div>
                    )}
                  </div>

                  {escrowFunded && (
                    <Button onClick={nextStep} className="w-full">
                      Activer le projet
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Completed */}
            {currentStep === "completed" && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-green-800 mb-2">
                    Projet Actif !
                  </h3>
                  <p className="text-green-700 mb-6">
                    Votre contrat est maintenant actif. Les prestataires peuvent commencer à travailler.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button variant="outline" className="border-green-300 text-green-700">
                      Voir le tableau de bord
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Suivre le projet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contract Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Résumé du Contrat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Projet :</span>
                  <span className="text-sm font-medium">{mockContract.projectTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Durée :</span>
                  <span className="text-sm font-medium">{mockContract.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Prestataires :</span>
                  <span className="text-sm font-medium">{mockContract.providers.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total :</span>
                  <span>{mockContract.totalAmount}€</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Signature électronique certifiée</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Paiement sous séquestre</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Assurance projet incluse</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Conformité RGPD</span>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Besoin d'aide ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Notre équipe est là pour vous accompagner.
                </p>
                <Button variant="outline" className="w-full">
                  Contacter le support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 