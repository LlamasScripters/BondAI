import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const generatePortfolioSection = tool(
  async ({ sectionType, userInfo, tone, length }) => {
    try {
      const sections = {
        bio: {
          template: `Je suis ${userInfo.name || '[Nom]'}, ${userInfo.title || 'professionnel passionné'} avec ${userInfo.experience || 'plusieurs années'} d'expérience.`,
          examples: [
            "Développeur full-stack passionné par l'innovation technologique",
            "Designer UX/UI créatif spécialisé dans les expériences utilisateur exceptionnelles",
            "Chef de projet agile expert en transformation digitale"
          ]
        },
        about: {
          template: `À propos de moi\n\nPassionné(e) par ${userInfo.passion || 'mon domaine'}, je combine créativité et expertise technique pour ${userInfo.goal || 'créer des solutions innovantes'}.`,
          examples: [
            "À propos de moi\n\nPassionné par le développement web moderne, je combine créativité et expertise technique pour créer des applications web performantes et intuitives. Mon approche centrée utilisateur me permet de concevoir des solutions qui répondent vraiment aux besoins.",
            "À propos de moi\n\nDesigner UX/UI avec une forte sensibilité pour l'expérience utilisateur, je transforme les idées complexes en interfaces simples et élégantes. Mon objectif est de créer des produits numériques qui enchantent les utilisateurs."
          ]
        },
        experience: {
          template: `Expérience Professionnelle\n\n🏢 ${userInfo.currentJob || 'Poste Actuel'}\n📅 ${userInfo.period || 'Période'}\n✨ Principales réalisations : ${userInfo.achievements || 'Réalisations importantes'}`,
          examples: [
            "Expérience Professionnelle\n\n🏢 Développeur Full-Stack Senior - TechCorp\n📅 2022 - Présent\n✨ Principales réalisations :\n• Lead technique sur 3 projets majeurs\n• Amélioration des performances de 40%\n• Encadrement d'une équipe de 4 développeurs",
            "Expérience Professionnelle\n\n🏢 UX Designer - DesignStudio\n📅 2021 - Présent\n✨ Principales réalisations :\n• Refonte complète de l'application mobile (2M+ utilisateurs)\n• Augmentation du taux de conversion de 35%\n• Création du design system de l'entreprise"
          ]
        },
        skills: {
          template: `Compétences\n\n🚀 Techniques : ${userInfo.techSkills || 'Compétences techniques'}\n💡 Créatives : ${userInfo.creativeSkills || 'Compétences créatives'}\n🤝 Relationnelles : ${userInfo.softSkills || 'Compétences relationnelles'}`,
          examples: [
            "Compétences\n\n🚀 Techniques : React, Node.js, TypeScript, PostgreSQL, Docker\n💡 Créatives : UI/UX Design, Prototypage, Design Thinking\n🤝 Relationnelles : Leadership, Communication, Travail d'équipe",
            "Compétences\n\n🚀 Techniques : Figma, Sketch, Principle, InVision, Adobe Creative Suite\n💡 Créatives : User Research, Wireframing, Prototypage interactif\n🤝 Relationnelles : Facilitation d'ateliers, Présentation client, Collaboration cross-team"
          ]
        },
        projects: {
          template: `Projets Phares\n\n🎯 ${userInfo.projectName || 'Nom du Projet'}\n📝 ${userInfo.projectDescription || 'Description du projet'}\n🛠️ Technologies : ${userInfo.tech || 'Technologies utilisées'}\n🏆 Résultats : ${userInfo.results || 'Résultats obtenus'}`,
          examples: [
            "Projets Phares\n\n🎯 E-commerce Platform Revolution\n📝 Développement complet d'une plateforme e-commerce moderne avec paiement sécurisé\n🛠️ Technologies : React, Node.js, Stripe, MongoDB\n🏆 Résultats : +300% de conversions, 50% de réduction du temps de chargement",
            "Projets Phares\n\n🎯 HealthCare Mobile App\n📝 Application mobile pour le suivi médical avec interface intuitive\n🛠️ Technologies : React Native, Firebase, Figma\n🏆 Résultats : 4.8/5 sur l'App Store, 100k+ téléchargements en 6 mois"
          ]
        }
      };

      const section = sections[sectionType as keyof typeof sections];
      if (!section) {
        return `❌ Type de section non supporté. Types disponibles : ${Object.keys(sections).join(', ')}`;
      }

      let content = section.template;
      
      // Adapter le ton
      if (tone === 'professional') {
        content = content.replace(/🎯|🚀|💡|🤝|🏢|📅|✨|📝|🛠️|🏆/g, '•');
      } else if (tone === 'creative') {
        content = content + '\n\n✨ Cette section peut être enrichie avec plus de créativité selon vos besoins !';
      }

      // Adapter la longueur
      if (length === 'short') {
        content = content.split('\n').slice(0, 3).join('\n');
      } else if (length === 'long') {
        content = content + '\n\n' + section.examples[0];
      }

      return `✨ Section ${sectionType} générée :

${content}

💡 Suggestions d'amélioration :
${section.examples.map(ex => `• ${ex}`).join('\n')}

📝 Conseils :
• Personnalisez avec vos vraies informations
• Ajoutez des métriques précises si possible  
• Utilisez un langage adapté à votre secteur`;

    } catch (error) {
      console.error('Erreur génération section:', error);
      return `❌ Erreur lors de la génération de la section ${sectionType}`;
    }
  },
  {
    name: "generatePortfolioSection",
    description: "Génère une section spécifique du portfolio (bio, about, experience, skills, projects) personnalisée selon les informations utilisateur",
    schema: z.object({
      sectionType: z.enum(['bio', 'about', 'experience', 'skills', 'projects']).describe("Type de section à générer"),
      userInfo: z.object({
        name: z.string().optional().describe("Nom de l'utilisateur"),
        title: z.string().optional().describe("Titre/poste actuel"),
        experience: z.string().optional().describe("Années d'expérience"),
        passion: z.string().optional().describe("Domaine de passion"),
        goal: z.string().optional().describe("Objectif professionnel"),
        currentJob: z.string().optional().describe("Poste actuel"),
        period: z.string().optional().describe("Période d'emploi"),
        achievements: z.string().optional().describe("Principales réalisations"),
        techSkills: z.string().optional().describe("Compétences techniques"),
        creativeSkills: z.string().optional().describe("Compétences créatives"),
        softSkills: z.string().optional().describe("Compétences relationnelles"),
        projectName: z.string().optional().describe("Nom du projet"),
        projectDescription: z.string().optional().describe("Description du projet"),
        tech: z.string().optional().describe("Technologies utilisées"),
        results: z.string().optional().describe("Résultats obtenus")
      }).describe("Informations personnelles de l'utilisateur"),
      tone: z.enum(['professional', 'creative', 'casual']).default('professional').describe("Ton à adopter"),
      length: z.enum(['short', 'medium', 'long']).default('medium').describe("Longueur souhaitée")
    }),
  }
); 