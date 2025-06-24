"use client"

import { useState } from "react"
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, CreditCard, Users, Bot, User, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  type: "human" | "ai"
  avatar: string
  rating: number
  price: string
  priceNumeric: number
  priceType: "hour" | "project" | "request"
  estimatedHours?: number
  description: string
  skills: string[]
}

interface TeamItem {
  id: string
  name: string
  members: string[]
  memberDetails: CartItem[]
  projects: number
  rating: number
  totalPrice: number
  description: string
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Marie Dubois",
    type: "human",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    price: "45€/h",
    priceNumeric: 45,
    priceType: "hour",
    estimatedHours: 40,
    description: "Développeuse React/Next.js avec 8 ans d'expérience",
    skills: ["React", "Next.js", "TypeScript"],
  },
  {
    id: "2",
    name: "CodeAssistant Pro",
    type: "ai",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    price: "0.05€/req",
    priceNumeric: 0.05,
    priceType: "request",
    description: "Agent IA spécialisé dans la génération de code",
    skills: ["Code Generation", "React", "Performance"],
  },
]

const mockTeamItems: TeamItem[] = [
  {
    id: "team1",
    name: "Équipe Full-Stack",
    members: ["Marie Dubois", "Thomas Martin"],
    memberDetails: [
      {
        id: "1",
        name: "Marie Dubois",
        type: "human",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
        price: "45€/h",
        priceNumeric: 45,
        priceType: "hour",
        description: "Développeuse React/Next.js",
        skills: ["React", "Next.js", "TypeScript"],
      },
      {
        id: "3",
        name: "Thomas Martin",
        type: "human",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
        price: "55€/h",
        priceNumeric: 55,
        priceType: "hour",
        description: "Designer UX/UI",
        skills: ["UI/UX Design", "Figma", "Prototyping"],
      },
    ],
    projects: 12,
    rating: 4.9,
    totalPrice: 8500,
    description: "Duo expérimenté pour vos projets web complets",
  },
]

export default function PanierPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [teamItems, setTeamItems] = useState<TeamItem[]>(mockTeamItems)
  const [projectDescription, setProjectDescription] = useState("")
  const [estimatedBudget, setEstimatedBudget] = useState("")

  const removeCartItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const removeTeamItem = (id: string) => {
    setTeamItems(teamItems.filter((item) => item.id !== id))
  }

  const updateEstimatedHours = (id: string, hours: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, estimatedHours: Math.max(1, hours) } : item)))
  }

  const calculateItemTotal = (item: CartItem) => {
    if (item.priceType === "hour" && item.estimatedHours) {
      return item.priceNumeric * item.estimatedHours
    }
    return item.priceNumeric
  }

  const totalIndividual = cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  const totalTeams = teamItems.reduce((sum, team) => sum + team.totalPrice, 0)
  const grandTotal = totalIndividual + totalTeams

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au marketplace
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mon panier</h1>
          <p className="text-lg text-muted-foreground">Finalisez votre sélection de prestataires</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Individual Services */}
            {cartItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Services individuels ({cartItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                          <AvatarFallback>
                            {item.type === "ai" ? <Bot className="h-6 w-6" /> : <User className="h-6 w-6" />}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <Badge variant={item.type === "ai" ? "secondary" : "outline"}>
                              {item.type === "ai" ? (
                                <>
                                  <Bot className="h-3 w-3 mr-1" />
                                  Agent IA
                                </>
                              ) : (
                                <>
                                  <User className="h-3 w-3 mr-1" />
                                  Humain
                                </>
                              )}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{item.rating}</span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {item.priceType === "hour" && (
                            <div className="flex items-center gap-2 mb-2">
                              <Label className="text-sm">Heures estimées:</Label>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updateEstimatedHours(item.id, (item.estimatedHours || 1) - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={item.estimatedHours || 1}
                                  onChange={(e) => updateEstimatedHours(item.id, Number.parseInt(e.target.value) || 1)}
                                  className="w-16 h-6 text-center text-sm"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => updateEstimatedHours(item.id, (item.estimatedHours || 1) + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-lg mb-2">
                            {item.priceType === "hour" && item.estimatedHours
                              ? `${calculateItemTotal(item)}€`
                              : item.price}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeCartItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Team Services */}
            {teamItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Équipes ({teamItems.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamItems.map((team) => (
                    <div key={team.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{team.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{team.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{team.rating}</span>
                            </div>
                            <span>{team.projects} projets ensemble</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-xl mb-2">{team.totalPrice}€</div>
                          <div className="flex gap-2">
                            <Link href={`/equipe/${team.id}`}>
                              <Button variant="outline" size="sm">
                                Voir détails
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => removeTeamItem(team.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {team.memberDetails.map((member) => (
                          <div key={member.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>
                                {member.type === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Project Description */}
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
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Budget estimé</Label>
                  <Input
                    id="budget"
                    placeholder="Ex: 5000€ - 10000€"
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            {cartItems.length === 0 && teamItems.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Votre panier est vide</h3>
                  <p className="text-muted-foreground mb-4">
                    Parcourez notre marketplace pour trouver les prestataires parfaits pour votre projet
                  </p>
                  <Link href="/">
                    <Button>Découvrir les services</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Summary */}
          {(cartItems.length > 0 || teamItems.length > 0) && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.length > 0 && (
                    <>
                      <div className="space-y-2">
                        <h4 className="font-medium">Services individuels</h4>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>{calculateItemTotal(item)}€</span>
                          </div>
                        ))}
                      </div>
                      <Separator />
                    </>
                  )}

                  {teamItems.length > 0 && (
                    <>
                      <div className="space-y-2">
                        <h4 className="font-medium">Équipes</h4>
                        {teamItems.map((team) => (
                          <div key={team.id} className="flex justify-between text-sm">
                            <span>{team.name}</span>
                            <span>{team.totalPrice}€</span>
                          </div>
                        ))}
                      </div>
                      <Separator />
                    </>
                  )}

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{grandTotal}€</span>
                  </div>

                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Procéder au paiement
                  </Button>

                  <div className="text-xs text-muted-foreground text-center">
                    Paiement sécurisé • Garantie satisfaction • Support 24/7
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Besoin d'aide ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Notre équipe est là pour vous accompagner dans votre projet
                  </p>
                  <Button variant="outline" className="w-full">
                    Contacter le support
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
