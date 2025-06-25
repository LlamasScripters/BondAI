import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const optimizeForIndustry = tool(
  async ({ industry, currentContent, targetRole }) => {
    try {
      const industryOptimizations = {
        tech: {
          keywords: ['innovation', 'scalabilité', 'performance', 'architecture', 'DevOps', 'agile', 'CI/CD'],
          tone: 'Technique et précis, mettez l\'accent sur les technologies et métriques',
          skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript'],
          projectFocus: 'Performance, scalabilité, architecture technique',
          tips: [
            'Mentionnez les métriques de performance (temps de chargement, etc.)',
            'Incluez les technologies modernes et frameworks populaires',
            'Parlez d\'architecture et de bonnes pratiques de développement'
          ]
        },
        design: {
          keywords: ['expérience utilisateur', 'interface intuitive', 'design thinking', 'accessibilité', 'brand identity'],
          tone: 'Créatif et visuel, montrez votre processus de design',
          skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing'],
          projectFocus: 'Impact utilisateur, amélioration UX, conversion',
          tips: [
            'Incluez des visuels et mockups de vos projets',
            'Mentionnez les améliorations UX mesurables',
            'Parlez de votre processus de design et méthodologie'
          ]
        },
        marketing: {
          keywords: ['ROI', 'conversion', 'engagement', 'stratégie digitale', 'growth hacking', 'analytics'],
          tone: 'Orienté résultats, mettez l\'accent sur les KPIs et performances',
          skills: ['Google Analytics', 'SEO/SEM', 'Social Media', 'Email Marketing', 'A/B Testing', 'CRM'],
          projectFocus: 'Croissance, conversion, engagement, ROI',
          tips: [
            'Quantifiez tous vos résultats avec des pourcentages et chiffres',
            'Mentionnez les outils marketing que vous maîtrisez',
            'Parlez de stratégies digitales et campagnes réussies'
          ]
        },
        finance: {
          keywords: ['analyse financière', 'risk management', 'compliance', 'modélisation', 'audit', 'réglementation'],
          tone: 'Professionnel et rigoureux, mettez l\'accent sur la précision',
          skills: ['Excel', 'Python', 'R', 'SQL', 'Bloomberg', 'Risk Management', 'Financial Modeling'],
          projectFocus: 'Optimisation des processus, réduction des risques, compliance',
          tips: [
            'Mentionnez votre connaissance des réglementations',
            'Incluez les certifications financières pertinentes',
            'Parlez d\'optimisation de processus et de contrôle des risques'
          ]
        },
        consulting: {
          keywords: ['transformation', 'optimisation', 'stratégie', 'change management', 'efficacité', 'innovation'],
          tone: 'Stratégique et orienté business, montrez votre impact',
          skills: ['Project Management', 'Change Management', 'Data Analysis', 'Stakeholder Management'],
          projectFocus: 'Transformation organisationnelle, amélioration des processus',
          tips: [
            'Mentionnez les secteurs d\'activité que vous connaissez',
            'Parlez de transformation digitale et d\'amélioration des processus',
            'Incluez des exemples de changements organisationnels réussis'
          ]
        },
        education: {
          keywords: ['pédagogie', 'apprentissage', 'formation', 'innovation éducative', 'digital learning'],
          tone: 'Bienveillant et pédagogue, montrez votre passion pour l\'enseignement',
          skills: ['Création de contenu', 'E-learning', 'Animation de formation', 'Évaluation'],
          projectFocus: 'Impact sur l\'apprentissage, innovation pédagogique',
          tips: [
            'Mentionnez vos méthodes pédagogiques innovantes',
            'Parlez de l\'impact de vos formations sur les apprenants',
            'Incluez les outils technologiques éducatifs que vous utilisez'
          ]
        }
      };

      const optimization = industryOptimizations[industry as keyof typeof industryOptimizations];
      
      if (!optimization) {
        return `❌ Secteur non supporté. Secteurs disponibles : ${Object.keys(industryOptimizations).join(', ')}`;
      }

      // Analyser le contenu actuel et suggérer des améliorations
      const suggestions = [];
      
      // Vérifier si les mots-clés du secteur sont présents
      const hasKeywords = optimization.keywords.some(keyword => 
        currentContent.toLowerCase().includes(keyword.toLowerCase())
      );
      
      if (!hasKeywords) {
        suggestions.push(`Ajoutez des mots-clés du secteur ${industry} : ${optimization.keywords.slice(0, 3).join(', ')}`);
      }

      // Suggestions spécifiques au rôle cible
      if (targetRole) {
        suggestions.push(`Pour un poste de ${targetRole}, mettez l'accent sur : ${optimization.projectFocus}`);
      }

      return `🎯 Optimisation pour le secteur ${industry.toUpperCase()}

${targetRole ? `🎭 Rôle cible : ${targetRole}` : ''}

📝 Ton recommandé : ${optimization.tone}

🔑 Mots-clés à intégrer : ${optimization.keywords.join(', ')}

🛠️ Compétences recommandées : ${optimization.skills.join(', ')}

🎯 Focus projet : ${optimization.projectFocus}

💡 Conseils spécifiques :
${optimization.tips.map(tip => `• ${tip}`).join('\n')}

📋 Suggestions pour votre contenu actuel :
${suggestions.map(suggestion => `• ${suggestion}`).join('\n')}`;

    } catch (error) {
      console.error('Erreur optimisation secteur:', error);
      return `❌ Erreur lors de l'optimisation pour le secteur ${industry}`;
    }
  },
  {
    name: "optimizeForIndustry",
    description: "Optimise le contenu du portfolio pour un secteur d'activité spécifique en suggérant des mots-clés, compétences et approches adaptées",
    schema: z.object({
      industry: z.enum(['tech', 'design', 'marketing', 'finance', 'consulting', 'education']).describe("Secteur d'activité cible"),
      currentContent: z.string().describe("Contenu actuel du portfolio à optimiser"),
      targetRole: z.string().optional().describe("Rôle/poste spécifique visé dans ce secteur")
    }),
  }
); 