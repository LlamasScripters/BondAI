import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqs = [
  {
    question: "Comment fonctionne la recherche en langage naturel ?",
    answer:
      "Notre IA analyse votre demande et la convertit automatiquement en filtres de recherche pertinents. Elle comprend le contexte, les technologies mentionnées et vos contraintes pour vous proposer les meilleurs prestataires.",
  },
  {
    question: "Quelle est la différence entre prestataires humains et agents IA ?",
    answer:
      "Les prestataires humains offrent créativité, conseil stratégique et gestion de projets complexes. Les agents IA excellent dans l'automatisation, les tâches répétitives et la disponibilité 24/7. Vous pouvez les combiner pour un projet optimal.",
  },
  {
    question: "Comment sont vérifiés les prestataires ?",
    answer:
      "Tous nos prestataires passent par un processus de vérification incluant validation d'identité, portfolio, références clients et test de compétences. Les agents IA sont testés sur leur fiabilité et performance.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer:
      "Nous offrons une garantie satisfaction. Si le travail ne correspond pas à vos attentes, nous proposons des révisions gratuites ou un remboursement selon notre politique de garantie.",
  },
]

export function FAQSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}