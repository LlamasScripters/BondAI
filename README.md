# 🤖 BondAI - Services Management Platform

**BondAI** est une marketplace révolutionnaire qui génère automatiquement les portfolios de vos prestataires grâce à l'Intelligence Artificielle. La première plateforme qui transforme la recherche et la gestion de services en une expérience fluide et intelligente.


## 👥 Membres de l'équipe

Ce projet a été développé par une équipe de 4 développeurs :

- **Sami ASSIAKH** 
- **Aria AMAN**
- **Moussa Seydou TRAORE**
- **Moustapha CHEGDALI**

## 🌟 Fonctionnalités principales

- **🎨 Portfolio IA Automatique** : Génération de portfolios professionnels en 2 minutes au lieu de 2 semaines
- **🛤️ Service Paths Intelligents** : Feuilles de route personnalisées générées par IA
- **🔒 Paiement Sécurisé** : Contractualisation automatique avec escrow intégré
- **🤝 Collaboration Humain-IA** : Marketplace mixte permettant aux développeurs et agents IA de collaborer
- **⚡ Déploiement Instantané** : Intégration Vercel pour un déploiement rapide des portfolios

## 🏗️ Architecture du projet

Le projet est organisé en deux parties principales :

```
BondAI/
├── application/          # Application Next.js (Frontend)
│   ├── app/             # Pages et routing Next.js 15
│   ├── components/      # Composants React réutilisables
│   └── lib/             # Utilitaires et API
└── agents/              # Backend IA et CLI
    ├── Agents/          # Agents IA spécialisés
    ├── CLI/             # Interface en ligne de commande
    └── serveur/         # Serveur Express.js
```

## 🚀 Technologies utilisées

### Frontend (Application)
- **Next.js 15** avec Turbopack
- **React 19** avec TypeScript
- **Tailwind & ShadcnUI** pour le styling
- **Radix UI** pour les composants
- **Lucide React** pour les icônes

### Backend (Agents)
- **Node.js** avec TypeScript
- **LangChain** pour les agents IA
- **Express.js** pour l'API REST
- **Google Gemini AI** pour la génération de contenu
- **Server-Sent Events** pour le streaming temps réel

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Clés API pour les services IA (Google Gemini)

### Installation des dépendances

```bash
# Cloner le repository
git clone <repository-url>
cd BondAI

# Installer les dépendances de l'application
cd application
npm install

# Installer les dépendances des agents
cd ../agents
npm install
```

### Configuration des variables d'environnement

```bash
# Dans le dossier agents/
cp .env.example .env
```

Configurez les variables suivantes dans `agents/.env` :
```env
# Configuration API
API_URL=http://localhost:8080
PORT=8080

# Clés API pour les agents IA
GOOGLE_API_KEY=your-google-api-key

# Authentification (optionnelle)
BEARER_TOKEN=your-token
REQUIRE_AUTH=false
```

## 🎯 Démarrage rapide

### 1. Démarrer le serveur d'agents IA

```bash
cd agents

# Mode production
npm run server

# Mode développement avec rechargement automatique
npm run dev
```

Le serveur sera accessible sur `http://localhost:8080`

### 2. Démarrer l'application frontend

```bash
cd application

# Mode développement
npm run dev

# Mode production
npm run build && npm start
```

L'application sera accessible sur `http://localhost:3000`

### 3. Utiliser le CLI (optionnel)

```bash
cd agents

# Vérifier la connectivité
npm run cli check

# Démarrer un chat avec les agents
npm run cli chat

# Utiliser un agent spécifique
npm run cli chat --agent portfolio-creator
```