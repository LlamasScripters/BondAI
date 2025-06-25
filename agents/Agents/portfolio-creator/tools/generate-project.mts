import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const generateProjectDescription = tool(
  async ({ projectName, projectType, technologies, objectives, results, duration, teamSize }) => {
    try {
      const projectTemplates = {
        webapp: {
          intro: "Application web moderne développée avec",
          focus: "Performance, UX, et scalabilité",
          metrics: ["temps de chargement", "taux de conversion", "nombre d'utilisateurs"]
        },
        mobile: {
          intro: "Application mobile native/cross-platform créée avec",
          focus: "Expérience utilisateur mobile optimale",
          metrics: ["downloads", "rating app store", "retention rate"]
        },
        api: {
          intro: "API REST/GraphQL robuste développée avec",
          focus: "Performance, sécurité, et documentation",
          metrics: ["requêtes/seconde", "temps de réponse", "uptime"]
        },
        ecommerce: {
          intro: "Plateforme e-commerce complète intégrant",
          focus: "Conversion, paiement sécurisé, et gestion stock",
          metrics: ["taux de conversion", "panier moyen", "transactions"]
        },
        dashboard: {
          intro: "Dashboard analytique interactif développé avec",
          focus: "Visualisation de données et insights business",
          metrics: ["sources de données", "métriques trackées", "utilisateurs actifs"]
        },
        design: {
          intro: "Projet de design UX/UI réalisé avec",
          focus: "Expérience utilisateur et interface intuitive",
          metrics: ["amélioration UX", "temps de tâche", "satisfaction utilisateur"]
        }
      };

      const template = projectTemplates[projectType as keyof typeof projectTemplates] || projectTemplates.webapp;
      
      // Générer la description structurée
      const sections = [];
      
      // Introduction
      sections.push(`**${projectName}**`);
      sections.push(`${template.intro} ${technologies || 'technologies modernes'}.`);
      
      // Objectifs
      if (objectives) {
        sections.push(`\n**🎯 Objectifs :**`);
        sections.push(objectives);
      }
      
      // Défis techniques
      sections.push(`\n**🔧 Défis techniques :**`);
      sections.push(`Focus principal sur ${template.focus}.`);
      
      // Technologies
      if (technologies) {
        sections.push(`\n**🛠️ Stack technique :**`);
        sections.push(technologies);
      }
      
      // Équipe et durée
      const projectDetails = [];
      if (duration) projectDetails.push(`⏱️ Durée : ${duration}`);
      if (teamSize) projectDetails.push(`👥 Équipe : ${teamSize}`);
      
      if (projectDetails.length > 0) {
        sections.push(`\n**📊 Détails projet :**`);
        sections.push(projectDetails.join(' | '));
      }
      
      // Résultats
      if (results) {
        sections.push(`\n**🏆 Résultats obtenus :**`);
        sections.push(results);
      } else {
        // Suggestions de résultats selon le type
        sections.push(`\n**🏆 Résultats potentiels :**`);
        sections.push(`• Amélioration des ${template.metrics.join(', ')}`);
        sections.push(`• Solution évolutive et maintenable`);
        sections.push(`• Retours positifs des utilisateurs finaux`);
      }

      // Call-to-action
      sections.push(`\n**🔗 [Voir le projet](lien-vers-projet)** | **📱 [Demo live](lien-demo)**`);

      const fullDescription = sections.join('\n');

      // Suggestions d'amélioration
      const improvementTips = [
        "Ajoutez des métriques précises (ex: +40% de performance)",
        "Incluez des liens vers le code source ou demo",
        "Mentionnez les feedbacks utilisateurs positifs",
        "Décrivez les défis techniques surmontés",
        "Ajoutez des visuels (screenshots, wireframes)"
      ];

      // Exemple selon le type de projet
      const examples = {
        webapp: "E-commerce moderne avec paiement Stripe, réduction de 50% du temps de checkout",
        mobile: "App de fitness avec 4.8/5 sur l'App Store, 100k+ téléchargements",
        api: "API bancaire gérant 10k requêtes/sec avec 99.9% d'uptime",
        ecommerce: "Marketplace B2B avec +300% de conversion après refonte UX",
        dashboard: "Dashboard analytics temps réel pour 50+ métriques business",
        design: "Refonte UX d'app mobile, -60% du temps de navigation utilisateur"
      };

      return `🚀 Description du projet ${projectName} générée :

${fullDescription}

💡 Conseils d'amélioration :
${improvementTips.map(tip => `• ${tip}`).join('\n')}

🌟 Exemple inspirant :
${examples[projectType as keyof typeof examples] || examples.webapp}`;

    } catch (error) {
      console.error('Erreur génération projet:', error);
      return `❌ Erreur lors de la génération de la description du projet ${projectName}`;
    }
  },
  {
    name: "generateProjectDescription",
    description: "Génère une description professionnelle et impactante d'un projet, adaptée au type de projet et aux technologies utilisées",
    schema: z.object({
      projectName: z.string().describe("Nom du projet"),
      projectType: z.enum(['webapp', 'mobile', 'api', 'ecommerce', 'dashboard', 'design']).describe("Type de projet"),
      technologies: z.string().optional().describe("Technologies et outils utilisés"),
      objectives: z.string().optional().describe("Objectifs du projet"),
      results: z.string().optional().describe("Résultats et métriques obtenus"),
      duration: z.string().optional().describe("Durée du projet"),
      teamSize: z.string().optional().describe("Taille de l'équipe")
    }),
  }
); 