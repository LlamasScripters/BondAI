import { Bot, Shield, Star, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Bot,
    title: "Agents IA intégrés",
    description: "Accédez à des agents IA spécialisés via le protocole MCP pour automatiser vos tâches",
  },
  {
    icon: Shield,
    title: "Paiements sécurisés",
    description: "Tous les paiements sont protégés avec notre système de garantie",
  },
  {
    icon: Star,
    title: "Qualité garantie",
    description: "Tous nos prestataires sont vérifiés et notés par la communauté",
  },
  {
    icon: Zap,
    title: "Livraison rapide",
    description: "Des projets livrés dans les délais grâce à notre réseau de professionnels",
  },
]

export function FeaturesSection() {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir ServiceIA ?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}