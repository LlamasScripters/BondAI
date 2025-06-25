import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const suggestSkills = tool(
  async ({ jobTitle, experience, industry, currentSkills }) => {
    try {
      const skillDatabase = {
        'développeur web': {
          hard: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Git', 'REST API'],
          soft: ['Problem solving', 'Collaboration', 'Communication technique']
        },
        'designer ux/ui': {
          hard: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
          soft: ['Empathie', 'Créativité', 'Attention aux détails']
        },
        'chef de projet': {
          hard: ['Agile/Scrum', 'Jira', 'MS Project', 'Gantt', 'Budget Management'],
          soft: ['Leadership', 'Communication', 'Organisation', 'Gestion du stress']
        },
        'data scientist': {
          hard: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow', 'Pandas', 'Jupyter'],
          soft: ['Pensée analytique', 'Curiosité', 'Rigueur scientifique']
        }
      };

      const currentSkillsLower = currentSkills?.map(s => s.toLowerCase()) || [];
      const suggestions = {
        trending: [],
        missing: [],
        complementary: []
      };

      // Suggestions basées sur le poste
      const roleSkills = skillDatabase[jobTitle?.toLowerCase() as keyof typeof skillDatabase];
      if (roleSkills) {
        suggestions.missing = [...roleSkills.hard, ...roleSkills.soft]
          .filter(skill => !currentSkillsLower.includes(skill.toLowerCase()));
      }

      // Compétences tendance selon l'expérience
      if (experience === 'junior') {
        suggestions.trending = ['Git', 'Agile', 'Testing', 'Documentation', 'Code Review'];
      } else if (experience === 'senior') {
        suggestions.trending = ['Architecture', 'Mentoring', 'DevOps', 'Performance', 'Security'];
      }

      // Compétences complémentaires selon l'industrie
      const industrySkills = {
        tech: ['CI/CD', 'Docker', 'AWS', 'Microservices'],
        finance: ['Compliance', 'Risk Management', 'Excel', 'Bloomberg'],
        healthcare: ['HIPAA', 'Medical devices', 'Regulation'],
        ecommerce: ['Payment systems', 'Analytics', 'SEO', 'Conversion optimization']
      };

      if (industry && industrySkills[industry as keyof typeof industrySkills]) {
        suggestions.complementary = industrySkills[industry as keyof typeof industrySkills];
      }

      return `🎯 Suggestions de compétences pour ${jobTitle} (${experience})

${industry ? `🏢 Secteur : ${industry}` : ''}
📊 Compétences actuelles : ${currentSkills?.length || 0}

🔥 Compétences tendance :
${suggestions.trending.length > 0 ? suggestions.trending.map(skill => `• ${skill}`).join('\n') : '• Aucune suggestion spécifique pour ce niveau'}

❌ Compétences manquantes importantes :
${suggestions.missing.length > 0 ? suggestions.missing.map(skill => `• ${skill}`).join('\n') : '• Votre profil semble complet !'}

➕ Compétences complémentaires :
${suggestions.complementary.length > 0 ? suggestions.complementary.map(skill => `• ${skill}`).join('\n') : '• Aucune suggestion pour ce secteur'}

💡 Recommandations générales :
• Ajoutez 5-7 compétences techniques principales
• Incluez 3-4 soft skills importantes  
• Mentionnez les outils/technologies récents
• Adaptez selon votre secteur d'activité`;

    } catch (error) {
      console.error('Erreur suggestion skills:', error);
      return `❌ Erreur lors de la suggestion de compétences`;
    }
  },
  {
    name: "suggestSkills",
    description: "Suggère des compétences pertinentes selon le poste, l'expérience et le secteur d'activité",
    schema: z.object({
      jobTitle: z.string().describe("Intitulé du poste visé"),
      experience: z.enum(['junior', 'mid', 'senior']).describe("Niveau d'expérience"),
      industry: z.string().optional().describe("Secteur d'activité"),
      currentSkills: z.array(z.string()).optional().describe("Compétences actuelles")
    }),
  }
); 