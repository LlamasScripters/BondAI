import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const createPortfolioHTML = tool(
  async ({ portfolioData, theme, layout, includeAnimations }) => {
    try {
      const { name, title, bio, skills, projects, contact } = portfolioData;
      
      const themes = {
        modern: {
          primaryColor: '#2563eb',
          secondaryColor: '#64748b',
          backgroundColor: '#f8fafc',
          textColor: '#1e293b',
          fontFamily: "'Inter', sans-serif"
        },
        dark: {
          primaryColor: '#3b82f6',
          secondaryColor: '#94a3b8',
          backgroundColor: '#0f172a',
          textColor: '#f1f5f9',
          fontFamily: "'JetBrains Mono', monospace"
        },
        minimal: {
          primaryColor: '#000000',
          secondaryColor: '#6b7280',
          backgroundColor: '#ffffff',
          textColor: '#111827',
          fontFamily: "'Helvetica Neue', sans-serif"
        },
        creative: {
          primaryColor: '#7c3aed',
          secondaryColor: '#ec4899',
          backgroundColor: '#fdf4ff',
          textColor: '#581c87',
          fontFamily: "'Poppins', sans-serif"
        }
      };

      const selectedTheme = themes[theme as keyof typeof themes] || themes.modern;

      const animationsCSS = includeAnimations ? `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-pulse-gentle {
          animation: pulse 2s infinite;
        }

        .card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
      ` : '';

      const layoutStyles = {
        single: 'max-width: 800px;',
        two_column: 'display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; max-width: 1200px;',
        three_column: 'display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 1.5rem; max-width: 1400px;'
      };

      const selectedLayout = layoutStyles[layout as keyof typeof layoutStyles] || layoutStyles.single;

      const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || 'Portfolio'} - ${title || 'Professionnel'}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: ${selectedTheme.fontFamily};
            background-color: ${selectedTheme.backgroundColor};
            color: ${selectedTheme.textColor};
            line-height: 1.6;
        }

        .container {
            ${selectedLayout}
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            text-align: center;
            margin-bottom: 3rem;
            ${includeAnimations ? 'animation: fadeInUp 0.8s ease-out;' : ''}
        }

        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            background: linear-gradient(135deg, ${selectedTheme.primaryColor}, ${selectedTheme.secondaryColor});
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: white;
            ${includeAnimations ? 'animation: pulse 2s infinite;' : ''}
        }

        .name {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: ${selectedTheme.primaryColor};
        }

        .title {
            font-size: 1.2rem;
            color: ${selectedTheme.secondaryColor};
            margin-bottom: 1rem;
        }

        .bio {
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
            color: ${selectedTheme.textColor};
        }

        .section {
            margin-bottom: 3rem;
            ${includeAnimations ? 'animation: fadeInUp 0.6s ease-out;' : ''}
        }

        .section h2 {
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: ${selectedTheme.primaryColor};
            border-bottom: 2px solid ${selectedTheme.primaryColor};
            padding-bottom: 0.5rem;
        }

        .card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
            ${theme === 'dark' ? `background: #1e293b; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);` : ''}
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }

        .skill-item {
            background: ${selectedTheme.primaryColor};
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            text-align: center;
            font-weight: 500;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .project-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            ${theme === 'dark' ? `background: #1e293b; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);` : ''}
            ${includeAnimations ? 'transition: all 0.3s ease;' : ''}
        }

        .project-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: ${selectedTheme.primaryColor};
        }

        .project-description {
            color: ${selectedTheme.secondaryColor};
            margin-bottom: 1rem;
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .tech-tag {
            background: ${selectedTheme.backgroundColor};
            padding: 0.25rem 0.5rem;
            border-radius: 5px;
            font-size: 0.8rem;
            color: ${selectedTheme.primaryColor};
            border: 1px solid ${selectedTheme.primaryColor};
        }

        .contact {
            text-align: center;
            background: ${selectedTheme.primaryColor};
            color: white;
            padding: 2rem;
            border-radius: 10px;
        }

        .contact h2 {
            color: white;
            border: none;
            margin-bottom: 1rem;
        }

        .contact-links {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .contact-link {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border: 2px solid white;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        .contact-link:hover {
            background: white;
            color: ${selectedTheme.primaryColor};
        }

        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
            
            .name {
                font-size: 2rem;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }

        ${animationsCSS}
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="profile-image">
                ${name ? name.charAt(0).toUpperCase() : '👤'}
            </div>
            <h1 class="name">${name || 'Votre Nom'}</h1>
            <p class="title">${title || 'Votre Titre Professionnel'}</p>
            <p class="bio">${bio || 'Votre bio professionnelle ici...'}</p>
        </header>

        <section class="section">
            <h2>🚀 Compétences</h2>
            <div class="skills-grid">
                ${(skills || ['Compétence 1', 'Compétence 2', 'Compétence 3']).map(skill => 
                  `<div class="skill-item">${skill}</div>`
                ).join('')}
            </div>
        </section>

        <section class="section">
            <h2>💼 Projets</h2>
            <div class="projects-grid">
                ${(projects || [
                  {name: 'Projet 1', description: 'Description du projet', tech: ['Tech1', 'Tech2']},
                  {name: 'Projet 2', description: 'Description du projet', tech: ['Tech3', 'Tech4']}
                ]).map(project => `
                  <div class="project-card">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                      ${(project.tech || []).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                  </div>
                `).join('')}
            </div>
        </section>

        <section class="contact">
            <h2>📫 Contact</h2>
            <div class="contact-links">
                <a href="mailto:${contact?.email || 'votre@email.com'}" class="contact-link">📧 Email</a>
                <a href="${contact?.linkedin || '#'}" class="contact-link">💼 LinkedIn</a>
                <a href="${contact?.github || '#'}" class="contact-link">🐙 GitHub</a>
                <a href="${contact?.portfolio || '#'}" class="contact-link">🌐 Portfolio</a>
            </div>
        </section>
    </div>

    ${includeAnimations ? `
    <script>
        // Intersection Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observer tous les éléments de section
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });
    </script>
    ` : ''}
</body>
</html>`;

      // Retourner directement le HTML pour éviter les problèmes de sérialisation
      return `🎉 Portfolio HTML généré avec succès !

Thème: ${theme} | Layout: ${layout} | Animations: ${includeAnimations ? 'Activées' : 'Désactivées'}

${htmlContent}

💡 Conseils personnalisation:
• Remplacez les placeholder par vos vraies informations
• Ajoutez vos propres images et logos  
• Personnalisez les couleurs dans la section CSS

🚀 Prochaines étapes:
• Tester sur différents appareils
• Ajouter un favicon personnalisé
• Configurer un nom de domaine`;

    } catch (error) {
      console.error('Erreur génération HTML:', error);
      return `❌ Erreur lors de la génération du HTML du portfolio`;
    }
  },
  {
    name: "createPortfolioHTML",
    description: "Génère le code HTML/CSS complet d'un portfolio moderne et responsive avec thème personnalisable",
    schema: z.object({
      portfolioData: z.object({
        name: z.string().optional().describe("Nom complet"),
        title: z.string().optional().describe("Titre professionnel"),
        bio: z.string().optional().describe("Biographie courte"),
        skills: z.array(z.string()).optional().describe("Liste des compétences"),
        projects: z.array(z.object({
          name: z.string(),
          description: z.string(),
          tech: z.array(z.string()).optional()
        })).optional().describe("Liste des projets"),
        contact: z.object({
          email: z.string().optional(),
          linkedin: z.string().optional(),
          github: z.string().optional(),
          portfolio: z.string().optional()
        }).optional().describe("Informations de contact")
      }).describe("Données du portfolio"),
      theme: z.enum(['modern', 'dark', 'minimal', 'creative']).default('modern').describe("Thème visuel"),
      layout: z.enum(['single', 'two_column', 'three_column']).default('single').describe("Disposition de la page"),
      includeAnimations: z.boolean().default(true).describe("Inclure les animations CSS")
    }),
  }
); 