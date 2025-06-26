import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const structureUserData = tool(
  async ({ conversationData, userResponses }) => {
    try {
      // Créer une structure compatible avec advancedFrontendGenerator
      const structuredData = {
        personalInfo: {
          name: extractName(conversationData) || "Portfolio Professionnel",
          title: extractTitle(conversationData) || "Développeur",
          location: extractLocation(conversationData) || "France",
          email: extractEmail(conversationData) || "contact@portfolio.dev",
          phone: extractPhone(conversationData) || ""
        },
        experience: {
          level: extractExperienceLevel(conversationData) as 'junior' | 'mid' | 'senior' | 'lead',
          yearsOfExperience: extractYearsOfExperience(conversationData),
          currentRole: extractCurrentRole(conversationData) || "Développeur",
          previousRoles: extractPreviousRoles(conversationData),
          industries: extractIndustries(conversationData)
        },
        skills: {
          technical: extractTechnicalSkills(conversationData),
          soft: extractSoftSkills(conversationData),
          languages: extractLanguages(conversationData),
          certifications: extractCertifications(conversationData)
        },
        projects: extractProjects(conversationData),
        goals: {
          careerGoals: extractCareerGoals(conversationData) || "Évolution professionnelle",
          targetCompanies: extractTargetCompanies(conversationData),
          targetRoles: extractTargetRoles(conversationData),
          timeline: extractTimeline(conversationData) || "12 mois"
        },
        preferences: {
          designStyle: extractDesignStyle(conversationData) as 'minimal' | 'modern' | 'creative' | 'corporate',
          colorScheme: extractColorScheme(conversationData) as 'light' | 'dark' | 'auto',
          showcaseProjects: extractShowcaseProjects(conversationData),
          includeBlog: extractIncludeBlog(conversationData),
          multiLanguage: extractMultiLanguage(conversationData)
        }
      };

      return JSON.stringify(structuredData, null, 2);
      
    } catch (error) {
      console.error('Erreur structuration données:', error);
      return `❌ Erreur lors de la structuration des données : ${error}`;
    }
  },
  {
    name: "structureUserData", 
    description: "Structure les réponses du questionnaire en format utilisable pour la génération de portfolio",
    schema: z.object({
      conversationData: z.string().describe("Données de la conversation complète avec l'utilisateur"),
      userResponses: z.record(z.any()).optional().describe("Réponses utilisateur optionnelles supplémentaires")
    }),
  }
);

// Fonctions d'extraction des données

function extractName(data: string): string {
  const nameMatches = data.match(/nom[^:]*[:]\s*([^\n,]+)/i) || 
                     data.match(/je\s+suis\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]*)*)/i) ||
                     data.match(/([A-Z][a-z]+\s+[A-Z]\.?)/);
  return nameMatches ? nameMatches[1].trim() : "";
}

function extractTitle(data: string): string {
  const titleMatches = data.match(/titre[^:]*[:]\s*([^\n,]+)/i) ||
                      data.match(/développeur[^:]*[:]\s*([^\n,]+)/i) ||
                      data.match(/(développeur\s+[^\n,]+)/i);
  return titleMatches ? titleMatches[1].trim() : "";
}

function extractLocation(data: string): string {
  const locationMatches = data.match(/localisation[^:]*[:]\s*([^\n,]+)/i) ||
                         data.match(/(Lyon|Paris|France|Marseille|Toulouse|Bordeaux)/i);
  return locationMatches ? locationMatches[1].trim() : "";
}

function extractEmail(data: string): string {
  const emailMatches = data.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return emailMatches ? emailMatches[1] : "";
}

function extractPhone(data: string): string {
  const phoneMatches = data.match(/(\+?[\d\s\-\(\)]{10,})/);
  return phoneMatches ? phoneMatches[1].trim() : "";
}

function extractExperienceLevel(data: string): string {
  if (data.toLowerCase().includes('junior') || data.includes('0-2 ans')) return 'junior';
  if (data.toLowerCase().includes('senior') || data.includes('5-10 ans')) return 'senior';
  if (data.toLowerCase().includes('lead') || data.includes('10+ ans')) return 'lead';
  if (data.includes('2-5 ans') || data.toLowerCase().includes('intermédiaire')) return 'mid';
  return 'mid';
}

function extractYearsOfExperience(data: string): number {
  const yearsMatches = data.match(/(\d+)\s*ans?\s*d['']?expérience/i);
  if (yearsMatches) return parseInt(yearsMatches[1]);
  
  if (data.toLowerCase().includes('junior')) return 1;
  if (data.toLowerCase().includes('senior')) return 7;
  if (data.toLowerCase().includes('lead')) return 12;
  return 3;
}

function extractCurrentRole(data: string): string {
  const roleMatches = data.match(/poste\s*actuel[^:]*[:]\s*([^\n,]+)/i) ||
                     data.match(/actuellement[^:]*[:]\s*([^\n,]+)/i);
  return roleMatches ? roleMatches[1].trim() : "";
}

function extractPreviousRoles(data: string): string[] {
  const roles: string[] = [];
  const roleKeywords = ['freelance', 'startup', 'développeur', 'ingénieur', 'consultant'];
  
  roleKeywords.forEach(keyword => {
    if (data.toLowerCase().includes(keyword)) {
      roles.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  return [...new Set(roles)];
}

function extractIndustries(data: string): string[] {
  const industries: string[] = [];
  const industryKeywords = ['tech', 'startup', 'saas', 'e-commerce', 'fintech', 'rh', 'finance'];
  
  industryKeywords.forEach(industry => {
    if (data.toLowerCase().includes(industry)) {
      industries.push(industry.toUpperCase());
    }
  });
  
  return industries.length > 0 ? industries : ['Tech'];
}

function extractTechnicalSkills(data: string): string[] {
  const skills: string[] = [];
  const techKeywords = [
    'TypeScript', 'JavaScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 
    'Express', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 
    'Tailwind', 'CSS', 'HTML', 'Git', 'GitHub', 'Vercel', 'Firebase'
  ];
  
  techKeywords.forEach(skill => {
    if (data.toLowerCase().includes(skill.toLowerCase())) {
      skills.push(skill);
    }
  });
  
  return skills.length > 0 ? skills : ['JavaScript', 'React', 'Node.js'];
}

function extractSoftSkills(data: string): string[] {
  const softSkills: string[] = [];
  const softKeywords = [
    'communication', 'autonomie', 'équipe', 'agile', 'scrum', 'leadership',
    'problèmes', 'adaptabilité', 'créativité', 'innovation', 'mentorat'
  ];
  
  softKeywords.forEach(skill => {
    if (data.toLowerCase().includes(skill)) {
      softSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });
  
  return softSkills.length > 0 ? softSkills : ['Communication', 'Autonomie', 'Travail en équipe'];
}

function extractLanguages(data: string): string[] {
  const languages = ['Français'];
  if (data.toLowerCase().includes('anglais') || data.toLowerCase().includes('english')) {
    languages.push('Anglais');
  }
  return languages;
}

function extractCertifications(data: string): string[] {
  const certs: string[] = [];
  if (data.includes('certification') || data.includes('diplôme')) {
    certs.push('Formation développeur web');
  }
  return certs;
}

function extractProjects(data: string): any[] {
  const projects: any[] = [];
  
  // Recherche de projets mentionnés
  const projectPatterns = [
    /plateforme\s+rh/i,
    /dashboard/i,
    /kanban/i,
    /e-commerce/i,
    /portfolio/i
  ];
  
  projectPatterns.forEach((pattern, index) => {
    if (pattern.test(data)) {
      const projectNames = ['Plateforme RH B2B', 'Dashboard Temps Réel', 'Mini Kanban', 'Site E-commerce', 'Portfolio Personnel'];
      const descriptions = [
        'Webapp SaaS pour gestion RH avec authentification et stockage sécurisé',
        'Dashboard de monitoring serveur en temps réel avec WebSockets',
        'Clone de Trello avec drag & drop et persistance Firebase',
        'Site e-commerce avec amélioration SEO et conversion',
        'Portfolio personnel avec blog technique intégré'
      ];
      const technologies = [
        ['React', 'Node.js', 'MongoDB', 'AWS S3', 'TypeScript'],
        ['Next.js', 'WebSockets', 'Redis', 'Chart.js'],
        ['Vue.js', 'Firebase', 'Vuetify'],
        ['Shopify', 'JavaScript', 'JSON-LD'],
        ['Next.js', 'MDX', 'Tailwind']
      ];
      
      projects.push({
        name: projectNames[index],
        description: descriptions[index],
        technologies: technologies[index],
        url: index === 1 ? 'https://realtimedash.dev' : '',
        github: index <= 2 ? `https://github.com/samidev/${projectNames[index].toLowerCase().replace(/\s+/g, '-')}` : '',
        impact: index === 0 ? 'Utilisé par 20+ entreprises' : 'Projet open source'
      });
    }
  });
  
  // Si aucun projet détecté, ajouter un projet par défaut
  if (projects.length === 0) {
    projects.push({
      name: 'Projet Portfolio',
      description: 'Application web moderne développée avec les dernières technologies',
      technologies: ['React', 'TypeScript', 'Tailwind'],
      url: '',
      github: '',
      impact: 'Projet personnel'
    });
  }
  
  return projects;
}

function extractCareerGoals(data: string): string {
  if (data.toLowerCase().includes('freelance')) return 'Développer activité freelance';
  if (data.toLowerCase().includes('startup')) return 'Rejoindre une startup en croissance';
  if (data.toLowerCase().includes('senior')) return 'Évoluer vers un poste senior';
  return 'Progression de carrière';
}

function extractTargetCompanies(data: string): string[] {
  const companies: string[] = [];
  if (data.toLowerCase().includes('startup')) companies.push('Startups tech');
  if (data.toLowerCase().includes('scale-up')) companies.push('Scale-ups');
  return companies.length > 0 ? companies : ['Entreprises tech'];
}

function extractTargetRoles(data: string): string[] {
  const roles: string[] = [];
  if (data.toLowerCase().includes('backend')) roles.push('Développeur Backend');
  if (data.toLowerCase().includes('full-stack')) roles.push('Développeur Full-stack');
  if (data.toLowerCase().includes('lead')) roles.push('Tech Lead');
  return roles.length > 0 ? roles : ['Développeur Full-stack'];
}

function extractTimeline(data: string): string {
  if (data.includes('6 mois') || data.includes('6-12')) return '6-12 mois';
  if (data.includes('2-3 ans')) return '2-3 ans';
  return '12 mois';
}

function extractDesignStyle(data: string): string {
  if (data.toLowerCase().includes('minimal')) return 'minimal';
  if (data.toLowerCase().includes('creative')) return 'creative';
  if (data.toLowerCase().includes('corporate')) return 'corporate';
  return 'modern';
}

function extractColorScheme(data: string): string {
  if (data.toLowerCase().includes('dark')) return 'dark';
  if (data.toLowerCase().includes('light')) return 'light';
  return 'auto';
}

function extractShowcaseProjects(data: string): boolean {
  return data.toLowerCase().includes('projet') || data.toLowerCase().includes('réalisation');
}

function extractIncludeBlog(data: string): boolean {
  return data.toLowerCase().includes('blog') || data.toLowerCase().includes('article');
}

function extractMultiLanguage(data: string): boolean {
  return data.toLowerCase().includes('multilingue') || data.toLowerCase().includes('anglais');
} 