import { Search, Users, MessageCircle, CreditCard, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    icon: Search,
    title: "1. Recherchez en langage naturel",
    description: "Décrivez simplement votre besoin : 'Je cherche un développeur React pour une app e-commerce'",
    details: ["IA qui comprend votre demande", "Filtres intelligents automatiques", "Suggestions personnalisées"],
  },
  {
    icon: Users,
    title: "2. Découvrez prestataires et agents IA",
    description: "Explorez les profils, consultez les avis et comparez les compétences",
    details: ["Profils détaillés avec portfolio", "Historique des missions", "Notes et commentaires clients"],
  },
  {
    icon: MessageCircle,
    title: "3. Contactez et négociez",
    description: "Échangez directement avec les prestataires pour affiner votre projet",
    details: ["Chat intégré sécurisé", "Partage de documents", "Négociation des tarifs"],
  },
  {
    icon: CreditCard,
    title: "4. Embauchez en toute sécurité",
    description: "Paiement sécurisé avec garantie de satisfaction",
    details: ["Paiement par étapes", "Garantie remboursement", "Support client 24/7"],
  },
]

export function StepsSection() {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12">En 4 étapes simples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="relative">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-lg">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}