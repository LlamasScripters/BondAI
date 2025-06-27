"use client"

import { useState } from "react"
import { Bot, Upload, Check, Star, Globe, Shield, Zap, Code, Database, Settings, Image, FileText, Video, Mic, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function AjouterAgentPage() {
  const [formData, setFormData] = useState({
    // Informations générales
    name: "",
    shortDescription: "",
    longDescription: "",
    category: "",
    subcategory: "",
    version: "1.0.0",
    
    // Capacités et modèles
    capabilities: [] as string[],
    aiModel: "",
    customModel: "",
    supportedLanguages: [] as string[],
    inputTypes: [] as string[],
    outputTypes: [] as string[],
    
    // Configuration technique
    apiEndpoint: "",
    authMethod: "api_key",
    apiKey: "",
    webhookUrl: "",
    maxRequests: "",
    responseTime: "",
    uptime: "99.9",
    
    // Tarification avancée
    pricing: {
      type: "fixed",
      amount: "",
      currency: "EUR",
      freeTrialRequests: "",
      subscriptionTiers: [] as any[]
    },
    
    // Métadonnées et documentation
    tags: [] as string[],
    documentation: "",
    useCases: "",
    limitations: "",
    
    // Paramètres de publication
    isPublic: true,
    isFeatured: false,
    supportLevel: "basic",
    
    // Contact et support
    contactEmail: "",
    supportUrl: "",
    demoUrl: "",
    
    // Conformité et sécurité
    gdprCompliant: false,
    dataRetention: "",
    encryptionLevel: "standard"
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "Génération de contenu",
    "Analyse de données", 
    "Traduction",
    "Code & Développement",
    "Design & Créativité",
    "Support client",
    "Marketing",
    "Finance & Comptabilité",
    "Éducation & Formation",
    "Santé & Médical",
    "Juridique",
    "Autre"
  ]

  const subcategories = {
    "Génération de contenu": ["Rédaction", "Copywriting", "Articles de blog", "Scripts vidéo", "Poésie", "Résumés"],
    "Analyse de données": ["Analyse prédictive", "Visualisation", "Reporting", "Statistiques", "Machine Learning"],
    "Traduction": ["Traduction automatique", "Localisation", "Sous-titrage", "Interprétation"],
    "Code & Développement": ["Génération de code", "Debug", "Tests", "Documentation", "Revue de code"],
    "Design & Créativité": ["Génération d'images", "Logo", "UI/UX", "Illustrations", "Retouche photo"],
    "Support client": ["Chatbot", "FAQ automatisée", "Classification tickets", "Sentiment analysis"],
    "Marketing": ["SEO", "Publicités", "Email marketing", "Réseaux sociaux", "Analyse concurrentielle"],
    "Finance & Comptabilité": ["Analyse financière", "Prévisions", "Facturation", "Audit"],
    "Éducation & Formation": ["Tutorat", "Évaluation", "Création de cours", "Quiz automatisés"],
    "Santé & Médical": ["Diagnostic aide", "Analyse d'images médicales", "Suivi patient"],
    "Juridique": ["Analyse de contrats", "Recherche jurisprudence", "Rédaction juridique"],
    "Autre": ["Personnalisé"]
  }

  const aiModels = [
    "GPT-4",
    "GPT-3.5",
    "Claude",
    "Gemini",
    "LLaMA",
    "Mistral",
    "PaLM",
    "Modèle personnalisé",
    "Autre"
  ]

  const inputTypes = ["Texte", "Image", "Audio", "Vidéo", "PDF", "CSV", "JSON", "XML"]
  const outputTypes = ["Texte", "Image", "Audio", "Vidéo", "PDF", "CSV", "JSON", "XML", "HTML"]
  const languages = ["Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Chinois", "Japonais", "Arabe", "Russe"]
  
  const capabilities = [
    "Génération de texte",
    "Analyse de sentiment", 
    "Classification",
    "Traduction",
    "Résumé automatique",
    "Questions-réponses",
    "Génération d'images",
    "Reconnaissance optique (OCR)",
    "Analyse d'images",
    "Génération de code",
    "Détection d'anomalies",
    "Prédiction",
    "Chatbot conversationnel",
    "Analyse vocale",
    "Génération audio"
  ]

  // Fonctions helper pour les arrays
  const toggleArrayItem = (array: string[], item: string, setter: (newArray: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item))
    } else {
      setter([...array, item])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    alert("Agent IA ajouté avec succès !")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">Ajouter un Agent IA</h1>
          </div>
          <p className="text-muted-foreground">
            Proposez votre agent IA sur la marketplace BondAI et commencez à générer des revenus
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Informations générales
              </CardTitle>
              <CardDescription>
                Décrivez votre agent IA de manière détaillée pour attirer les clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Nom de l'agent *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Assistant Rédactionnel Premium IA"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Nom accrocheur et descriptif</p>
                </div>
                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="1.0.0"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Catégorie principale *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value, subcategory: ""})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Sous-catégorie</Label>
                  <Select 
                    value={formData.subcategory} 
                    onValueChange={(value) => setFormData({...formData, subcategory: value})}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir une sous-catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="shortDescription">Description courte *</Label>
                <Textarea
                  id="shortDescription"
                  placeholder="Une description concise de votre agent en 1-2 phrases..."
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                  rows={2}
                  maxLength={200}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.shortDescription.length}/200 caractères</p>
              </div>
              
              <div>
                <Label htmlFor="longDescription">Description détaillée *</Label>
                <Textarea
                  id="longDescription"
                  placeholder="Décrivez en détail les fonctionnalités, les cas d'usage, les avantages et la valeur ajoutée de votre agent IA..."
                  value={formData.longDescription}
                  onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="useCases">Cas d'usage principaux</Label>
                <Textarea
                  id="useCases"
                  placeholder="Ex: Rédaction d'articles de blog, création de newsletters, génération de contenu marketing..."
                  value={formData.useCases}
                  onChange={(e) => setFormData({...formData, useCases: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="limitations">Limitations connues</Label>
                <Textarea
                  id="limitations"
                  placeholder="Ex: Ne traite pas les contenus de plus de 10000 mots, limité aux langues européennes..."
                  value={formData.limitations}
                  onChange={(e) => setFormData({...formData, limitations: e.target.value})}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-1">Transparence appréciée par les clients</p>
              </div>
            </CardContent>
          </Card>

          {/* Capacités et Modèles IA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Capacités et Modèles IA
              </CardTitle>
              <CardDescription>
                Définissez les capacités de votre agent et le modèle IA utilisé
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Capacités principales *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {capabilities.map((capability) => (
                    <div key={capability} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={capability}
                        checked={formData.capabilities.includes(capability)}
                        onChange={() => toggleArrayItem(
                          formData.capabilities, 
                          capability, 
                          (newArray) => setFormData({...formData, capabilities: newArray})
                        )}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={capability} className="text-sm cursor-pointer">{capability}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aiModel">Modèle IA utilisé *</Label>
                  <Select value={formData.aiModel} onValueChange={(value) => setFormData({...formData, aiModel: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="customModel">Modèle personnalisé (si applicable)</Label>
                  <Input
                    id="customModel"
                    placeholder="Ex: Mon-Modèle-Fine-Tuné-v2"
                    value={formData.customModel}
                    onChange={(e) => setFormData({...formData, customModel: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Types d'entrée supportés *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {inputTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`input-${type}`}
                          checked={formData.inputTypes.includes(type)}
                          onChange={() => toggleArrayItem(
                            formData.inputTypes, 
                            type, 
                            (newArray) => setFormData({...formData, inputTypes: newArray})
                          )}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`input-${type}`} className="text-sm cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Types de sortie générés *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {outputTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`output-${type}`}
                          checked={formData.outputTypes.includes(type)}
                          onChange={() => toggleArrayItem(
                            formData.outputTypes, 
                            type, 
                            (newArray) => setFormData({...formData, outputTypes: newArray})
                          )}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`output-${type}`} className="text-sm cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label>Langues supportées</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`lang-${language}`}
                        checked={formData.supportedLanguages.includes(language)}
                        onChange={() => toggleArrayItem(
                          formData.supportedLanguages, 
                          language, 
                          (newArray) => setFormData({...formData, supportedLanguages: newArray})
                        )}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`lang-${language}`} className="text-sm cursor-pointer">{language}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration technique */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuration technique
              </CardTitle>
              <CardDescription>
                Paramètres techniques et d'intégration de votre agent IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="apiEndpoint">Point d'API principal *</Label>
                  <Input
                    id="apiEndpoint"
                    placeholder="https://api.example.com/v1/agent"
                    value={formData.apiEndpoint}
                    onChange={(e) => setFormData({...formData, apiEndpoint: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">URL de votre API qui recevra les requêtes</p>
                </div>
                <div>
                  <Label htmlFor="webhookUrl">Webhook (optionnel)</Label>
                  <Input
                    id="webhookUrl"
                    placeholder="https://api.example.com/webhook"
                    value={formData.webhookUrl}
                    onChange={(e) => setFormData({...formData, webhookUrl: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Pour les notifications asynchrones</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authMethod">Méthode d'authentification</Label>
                  <Select value={formData.authMethod} onValueChange={(value) => setFormData({...formData, authMethod: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api_key">Clé API</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="apiKey">Clé API de test</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="sk-..."
                    value={formData.apiKey}
                    onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Pour les tests d'intégration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="maxRequests">Limite requêtes/heure</Label>
                  <Input
                    id="maxRequests"
                    type="number"
                    placeholder="1000"
                    value={formData.maxRequests}
                    onChange={(e) => setFormData({...formData, maxRequests: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="responseTime">Temps réponse moyen (ms)</Label>
                  <Input
                    id="responseTime"
                    type="number"
                    placeholder="2000"
                    value={formData.responseTime}
                    onChange={(e) => setFormData({...formData, responseTime: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="uptime">Uptime garanti (%)</Label>
                  <Input
                    id="uptime"
                    type="number"
                    step="0.1"
                    max="100"
                    placeholder="99.9"
                    value={formData.uptime}
                    onChange={(e) => setFormData({...formData, uptime: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarification avancée */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tarification et Monétisation
              </CardTitle>
              <CardDescription>
                Définissez votre stratégie de prix et vos options de monétisation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pricingType">Modèle de tarification *</Label>
                  <Select 
                    value={formData.pricing.type} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      pricing: {...formData.pricing, type: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Prix fixe par projet</SelectItem>
                      <SelectItem value="per_request">Par requête/utilisation</SelectItem>
                      <SelectItem value="subscription">Abonnement mensuel</SelectItem>
                      <SelectItem value="usage_based">Basé sur l'usage</SelectItem>
                      <SelectItem value="tiered">Tarification échelonnée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Prix de base *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.pricing.amount}
                    onChange={(e) => setFormData({
                      ...formData, 
                      pricing: {...formData.pricing, amount: e.target.value}
                    })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Devise</Label>
                  <Select 
                    value={formData.pricing.currency} 
                    onValueChange={(value) => setFormData({
                      ...formData, 
                      pricing: {...formData.pricing, currency: value}
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeTrialRequests">Requêtes d'essai gratuites</Label>
                  <Input
                    id="freeTrialRequests"
                    type="number"
                    placeholder="100"
                    value={formData.pricing.freeTrialRequests}
                    onChange={(e) => setFormData({
                      ...formData, 
                      pricing: {...formData.pricing, freeTrialRequests: e.target.value}
                    })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Nombre de requêtes gratuites pour tester</p>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-2">Options de tarification</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="bulkDiscount"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="bulkDiscount" className="text-sm cursor-pointer">Remise en gros</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="customPricing"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="customPricing" className="text-sm cursor-pointer">Tarification personnalisée</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentation et support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentation et Support
              </CardTitle>
              <CardDescription>
                Fournissez des ressources pour faciliter l'adoption de votre agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="documentation">Documentation technique</Label>
                <Textarea
                  id="documentation"
                  placeholder="Décrivez comment intégrer et utiliser votre agent (format API, exemples de requêtes/réponses, etc.)..."
                  value={formData.documentation}
                  onChange={(e) => setFormData({...formData, documentation: e.target.value})}
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Email de contact *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="supportUrl">URL support technique</Label>
                  <Input
                    id="supportUrl"
                    placeholder="https://support.example.com"
                    value={formData.supportUrl}
                    onChange={(e) => setFormData({...formData, supportUrl: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="demoUrl">URL de démonstration</Label>
                  <Input
                    id="demoUrl"
                    placeholder="https://demo.example.com"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="supportLevel">Niveau de support proposé</Label>
                <Select value={formData.supportLevel} onValueChange={(value) => setFormData({...formData, supportLevel: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basique (Email uniquement)</SelectItem>
                    <SelectItem value="standard">Standard (Email + Chat)</SelectItem>
                    <SelectItem value="premium">Premium (24/7 + Téléphone)</SelectItem>
                    <SelectItem value="enterprise">Entreprise (Support dédié)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité et conformité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité et Conformité
              </CardTitle>
              <CardDescription>
                Informations sur la sécurité et la conformité réglementaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="encryptionLevel">Niveau de chiffrement</Label>
                  <Select value={formData.encryptionLevel} onValueChange={(value) => setFormData({...formData, encryptionLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (TLS 1.2)</SelectItem>
                      <SelectItem value="high">Elevé (TLS 1.3 + AES-256)</SelectItem>
                      <SelectItem value="enterprise">Entreprise (E2E + HSM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataRetention">Politique de rétention des données</Label>
                  <Select value={formData.dataRetention} onValueChange={(value) => setFormData({...formData, dataRetention: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune rétention</SelectItem>
                      <SelectItem value="24h">24 heures</SelectItem>
                      <SelectItem value="7d">7 jours</SelectItem>
                      <SelectItem value="30d">30 jours</SelectItem>
                      <SelectItem value="custom">Personnalisée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="gdprCompliant" className="font-medium">Conforme RGPD</Label>
                    <p className="text-sm text-muted-foreground">Votre agent respecte-t-il le RGPD ?</p>
                  </div>
                  <Switch
                    id="gdprCompliant"
                    checked={formData.gdprCompliant}
                    onCheckedChange={(checked) => setFormData({...formData, gdprCompliant: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Paramètres de publication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Paramètres de Publication
              </CardTitle>
              <CardDescription>
                Contrôlez la visibilité et la mise en avant de votre agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="isPublic" className="font-medium">Agent public</Label>
                    <p className="text-sm text-muted-foreground">
                      Rendre l'agent visible sur la marketplace
                    </p>
                  </div>
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="isFeatured" className="font-medium">Demander la mise en avant</Label>
                    <p className="text-sm text-muted-foreground">
                      Candidater pour être mis en avant (soumis à validation)
                    </p>
                  </div>
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({...formData, isFeatured: checked})}
                  />
                </div>
              </div>

              <div>
                <Label>Tags de recherche</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {["IA", "Automatisation", "Productivité", "Créativité", "Analyse", "Business", "Innovation", "Efficace", "Rapide", "Personnalisable", "Sécurisé", "Professionnel"].map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`tag-${tag}`}
                        checked={formData.tags.includes(tag)}
                        onChange={() => toggleArrayItem(
                          formData.tags, 
                          tag, 
                          (newArray) => setFormData({...formData, tags: newArray})
                        )}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">{tag}</Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Ces tags aideront les utilisateurs à trouver votre agent</p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Résumé et validation */}
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Check className="h-5 w-5" />
                Prêt à publier ?
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Vérifiez que toutes les informations sont correctes avant de soumettre votre agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Nom :</strong> {formData.name || "Non renseigné"}</p>
                  <p><strong>Catégorie :</strong> {formData.category || "Non renseignée"}</p>
                  <p><strong>Modèle IA :</strong> {formData.aiModel || "Non renseigné"}</p>
                </div>
                <div>
                  <p><strong>Prix :</strong> {formData.pricing.amount ? `${formData.pricing.amount} ${formData.pricing.currency}` : "Non renseigné"}</p>
                  <p><strong>Contact :</strong> {formData.contactEmail || "Non renseigné"}</p>
                  <p><strong>Statut :</strong> {formData.isPublic ? "Public" : "Privé"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              ⚠️ Votre agent sera examiné avant publication (24-48h)
            </div>
            <div className="flex space-x-4">
              <Button type="button" variant="outline" size="lg">
                Sauvegarder le brouillon
              </Button>
              <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[200px]">
                {isSubmitting ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Soumission en cours...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Soumettre pour validation
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}