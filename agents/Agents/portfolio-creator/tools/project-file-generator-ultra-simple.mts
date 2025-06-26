import { tool } from "@langchain/core/tools";
import { z } from "zod";
import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';

export const projectFileGeneratorUltraSimple = tool(
  async ({ selectedStack, userStructuredData, projectName }) => {
    try {
      console.log(`🚀 Génération projet ${projectName} avec stack ${selectedStack}`);
      
      // Créer le dossier de projet
      const projectPath = path.join(process.cwd(), 'generated-portfolios', projectName);
      
      // Nettoyer le dossier s'il existe déjà pour éviter les mélanges
      try {
        await fs.promises.rm(projectPath, { recursive: true, force: true });
        console.log(`🧹 Dossier existant nettoyé: ${projectPath}`);
      } catch (error) {
        // Le dossier n'existait pas, c'est normal
      }
      
      await fs.promises.mkdir(projectPath, { recursive: true });
      
      let files: string[] = [];
      
      if (selectedStack === 'react') {
        files = await generateReactProject(projectPath, userStructuredData, projectName);
      } else if (selectedStack === 'vue') {
        files = await generateVueProject(projectPath, userStructuredData, projectName);
      } else {
        files = await generateVanillaProject(projectPath, userStructuredData, projectName);
      }
      
      // Créer le ZIP
      const zipPath = await createProjectZip(projectPath, projectName);
      
      console.log(`✅ Projet ${selectedStack} généré avec succès! Fichiers:`, files);
      
      // Retourner du JSON parsable pour l'interface
      const result = {
        success: true,
        message: `✅ Projet ${projectName} généré avec succès !`,
        downloadUrl: `/download/${path.basename(zipPath)}`,
        projectName: projectName,
        stackInfo: `Stack: ${selectedStack.toUpperCase()}`,
        files: files,
        projectPath: projectPath,
        zipPath: zipPath
      };
      
      return JSON.stringify(result, null, 2);
      
    } catch (error) {
      console.error('❌ Erreur génération:', error);
      const errorResult = {
        success: false,
        message: `❌ Erreur lors de la génération du projet : ${error.message}`,
        error: true
      };
      return JSON.stringify(errorResult, null, 2);
    }
  },
  {
    name: "projectFileGeneratorUltraSimple",
    description: "Génère un portfolio avec la vraie structure selon la stack choisie (React/Vue/Vanilla)",
    schema: z.object({
      selectedStack: z.enum(['react', 'vue', 'vanilla']).describe("Stack choisie"),
      userStructuredData: z.string().describe("Données utilisateur"), 
      projectName: z.string().default("portfolio-stack").describe("Nom du projet")
    }),
  }
);

async function generateReactProject(projectPath: string, userData: string, projectName: string): Promise<string[]> {
  // Créer structure React + TypeScript + Vite
  await fs.promises.mkdir(path.join(projectPath, 'src'), { recursive: true });
  await fs.promises.mkdir(path.join(projectPath, 'src', 'components'), { recursive: true });
  await fs.promises.mkdir(path.join(projectPath, 'public'), { recursive: true });
  
  // Parse user data pour les composants
  const parsedUserData = parseUserData(userData, 'react');
  
  // package.json React
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      preview: "vite preview"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "lucide-react": "^0.263.1"
    },
    devDependencies: {
      "@types/react": "^18.2.66",
      "@types/react-dom": "^18.2.22",
      "@typescript-eslint/eslint-plugin": "^7.2.0",
      "@typescript-eslint/parser": "^7.2.0",
      "@vitejs/plugin-react": "^4.2.1",
      eslint: "^8.57.0",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.6",
      typescript: "^5.2.2",
      vite: "^5.2.0"
    }
  };
  await fs.promises.writeFile(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // index.html
  const indexHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio ${parsedUserData.name || 'Développeur'}</title>
    <meta name="description" content="Portfolio de ${parsedUserData.name || 'Développeur'} - ${parsedUserData.title || 'Développeur Web'}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  await fs.promises.writeFile(path.join(projectPath, 'index.html'), indexHtml);
  
  // src/main.tsx
  const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'main.tsx'), mainTsx);
  
  // src/App.tsx - Composant principal enrichi
  const appTsx = `import Header from './components/Header'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
        <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
        </main>
      </div>
  )
}

export default App`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'App.tsx'), appTsx);

  // Components React
  await generateReactComponents(projectPath, parsedUserData);
  
  // src/App.css
  const appCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  padding: 80px 0;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #2d3748;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'App.css'), appCss);
  
  // src/index.css
  const indexCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --text: #2d3748;
  --text-light: #718096;
  --bg: #f7fafc;
  --white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}

#app {
  width: 100%;
}`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'index.css'), indexCss);
  
  // vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})`;
  await fs.promises.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfig);
  
  // tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ["src"],
    references: [{ path: "./tsconfig.node.json" }]
  };
  await fs.promises.writeFile(path.join(projectPath, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
  
  // tsconfig.node.json
  const tsconfigNode = {
    compilerOptions: {
      composite: true,
      skipLibCheck: true,
      module: "ESNext",
      moduleResolution: "bundler",
      allowSyntheticDefaultImports: true
    },
    include: ["vite.config.ts"]
  };
  await fs.promises.writeFile(path.join(projectPath, 'tsconfig.node.json'), JSON.stringify(tsconfigNode, null, 2));
  
  // README.md
  const readme = generateReactReadme(projectName, parsedUserData);
  await fs.promises.writeFile(path.join(projectPath, 'README.md'), readme);
  
  return ['index.html', 'package.json', 'vite.config.ts', 'tsconfig.json', 'tsconfig.node.json', 'src/main.tsx', 'src/App.tsx', 'src/App.css', 'src/index.css', 'src/components/Header.tsx', 'src/components/About.tsx', 'src/components/Skills.tsx', 'src/components/Projects.tsx', 'src/components/Contact.tsx', 'README.md'];
}

async function generateReactComponents(projectPath: string, userData: any) {
  // Header.tsx
  const headerTsx = `import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      background: 'rgba(255,255,255,0.95)', 
      backdropFilter: 'blur(10px)', 
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
          ${userData.name || 'Portfolio'}
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" style={{ textDecoration: 'none', color: '#2d3748', fontWeight: '500' }}>À propos</a>
          <a href="#skills" style={{ textDecoration: 'none', color: '#2d3748', fontWeight: '500' }}>Compétences</a>
          <a href="#projects" style={{ textDecoration: 'none', color: '#2d3748', fontWeight: '500' }}>Projets</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#2d3748', fontWeight: '500' }}>Contact</a>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#718096' }}><Github size={20} /></a>
            <a href="#" style={{ color: '#718096' }}><Linkedin size={20} /></a>
            <a href="#contact" style={{ color: '#718096' }}><Mail size={20} /></a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'Header.tsx'), headerTsx);

  // About.tsx
  const aboutTsx = `const About = () => {
  return (
    <section id="about" style={{ padding: '100px 0', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          ${userData.name || 'Développeur'}
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
          ${userData.title || 'Développeur Web Full-Stack'}
        </h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem', opacity: 0.9 }}>
          Passionné par le développement web moderne, je crée des applications performantes et élégantes.
          Spécialisé en ${Array.isArray(userData.skills) ? userData.skills.slice(0, 3).join(', ') : 'React, TypeScript et Node.js'}.
        </p>
        <a href="#contact" className="btn" style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
          Me contacter
        </a>
      </div>
    </section>
  );
};

export default About;`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'About.tsx'), aboutTsx);

  // Skills.tsx  
  const skillsTsx = `const Skills = () => {
  const skills = ${JSON.stringify(userData.skills || ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker'])};

  return (
    <section id="skills" style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Compétences</h2>
        <div className="grid grid-3">
          {skills.map((skill, index) => (
            <div key={index} className="card" style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>{skill}</h3>
              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: \`\${85 + Math.random() * 10}%\`, 
                  height: '100%', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'Skills.tsx'), skillsTsx);

  // Projects.tsx
  const projectsTsx = `const Projects = () => {
  const projects = [
    {
      title: 'Plateforme E-commerce',
      description: 'Application complète avec paiement en ligne, gestion des stocks et dashboard admin.',
      tech: ['React', 'TypeScript', 'Node.js'],
      image: 'https://via.placeholder.com/400x250?text=E-commerce+Platform'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Interface de visualisation de données en temps réel avec graphiques interactifs.',
      tech: ['React', 'D3.js', 'TanStack Query'],
      image: 'https://via.placeholder.com/400x250?text=Analytics+Dashboard'
    },
    {
      title: 'Application Mobile',
      description: 'App hybride pour la gestion de tâches avec synchronisation cloud.',
      tech: ['React Native', 'TypeScript', 'Firebase'],
      image: 'https://via.placeholder.com/400x250?text=Mobile+App'
    }
  ];

  return (
    <section id="projects" style={{ padding: '100px 0', background: '#f7fafc' }}>
      <div className="container">
        <h2 className="section-title">Projets</h2>
        <div className="grid grid-2">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <img src={project.image} alt={project.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2d3748' }}>{project.title}</h3>
              <p style={{ color: '#718096', marginBottom: '1.5rem' }}>{project.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} style={{ background: '#667eea', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'Projects.tsx'), projectsTsx);

  // Contact.tsx
  const contactTsx = `import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '100px 0', background: '#2d3748', color: 'white' }}>
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Contact</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#667eea' }}>Parlons de votre projet</h3>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
              Je suis toujours intéressé par de nouveaux défis. 
              N'hésitez pas à me contacter pour discuter de vos projets.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={20} style={{ color: '#667eea' }} />
                <span>contact@portfolio.dev</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={20} style={{ color: '#667eea' }} />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <MapPin size={20} style={{ color: '#667eea' }} />
                <span>Paris, France</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <a href="#" style={{ background: '#667eea', padding: '12px', borderRadius: '8px', color: 'white' }}>
                <Github size={24} />
              </a>
              <a href="#" style={{ background: '#667eea', padding: '12px', borderRadius: '8px', color: 'white' }}>
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '12px' }}>
            <form>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nom</label>
                <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#2d3748' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#2d3748' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                <textarea rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#2d3748', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" className="btn" style={{ width: '100%' }}>
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'Contact.tsx'), contactTsx);
}

function parseUserData(userData: string, selectedStack: 'react' | 'vue' | 'vanilla' = 'react'): any {
  try {
    const parsed = JSON.parse(userData);
    // S'assurer que les skills sont un tableau
    if (parsed && typeof parsed === 'object') {
      // Nettoyer et valider les données
      return {
        name: parsed.name || parsed.personalInfo?.name || extractName(userData),
        title: parsed.title || parsed.personalInfo?.title || extractTitle(userData, selectedStack),
        skills: Array.isArray(parsed.skills) ? parsed.skills : 
                Array.isArray(parsed.skills?.technical) ? parsed.skills.technical :
                extractSkills(userData, selectedStack),
        projects: Array.isArray(parsed.projects) ? parsed.projects : extractProjects(userData, selectedStack)
      };
    }
  } catch {
    // Si le parsing JSON échoue, extraire depuis le texte
  }
  
  // Extraction simple depuis le texte
  const result = {
    name: extractName(userData),
    title: extractTitle(userData, selectedStack),
    skills: extractSkills(userData, selectedStack),
    projects: extractProjects(userData, selectedStack)
  };
  
  // Vérification finale que skills est un tableau avec defaults selon la stack
  if (!Array.isArray(result.skills)) {
    result.skills = getDefaultSkills(selectedStack);
  }
  
  return result;
}

function extractName(text: string): string {
  const nameMatch = text.match(/je suis ([^,\n.]+)/i) || 
                   text.match(/nom[:\s]+([^,\n.]+)/i) ||
                   text.match(/sami\s+assiakh/i) ||
                   text.match(/([A-Z][a-z]+\s+[A-Z][a-z]+)/);
  return nameMatch ? nameMatch[1].trim() : 'Développeur';
}

function extractTitle(text: string, selectedStack: 'react' | 'vue' | 'vanilla' = 'react'): string {
  if (text.includes('full-stack') || text.includes('fullstack')) return 'Développeur Full-Stack';
  if (text.includes('frontend') || text.includes('front-end')) return 'Développeur Frontend';
  if (text.includes('backend') || text.includes('back-end')) return 'Développeur Backend';
  if (text.includes('react')) return 'Développeur React';
  if (text.includes('vue')) return 'Développeur Vue.js';
  if (text.includes('symfony')) return 'Développeur PHP/Symfony';
  
  // Titre par défaut selon la stack
  if (selectedStack === 'vue') return 'Développeur Vue.js';
  if (selectedStack === 'vanilla') return 'Développeur JavaScript';
  return 'Développeur React';
}

function extractSkills(text: string, selectedStack: 'react' | 'vue' | 'vanilla' = 'react'): string[] {
  const skills: string[] = [];
  const skillPatterns = [
    'typescript', 'javascript', 'react', 'vue', 'angular', 'node.js', 'nodejs', 'express',
    'python', 'django', 'flask', 'php', 'symfony', 'laravel', 'java', 'spring',
    'mongodb', 'postgresql', 'mysql', 'redis', 'docker', 'kubernetes', 'aws', 'git'
  ];
  
  const lowerText = text.toLowerCase();
  skillPatterns.forEach(skill => {
    if (lowerText.includes(skill)) {
      // Capitaliser correctement
      if (skill === 'node.js' || skill === 'nodejs') {
        skills.push('Node.js');
      } else if (skill === 'javascript') {
        skills.push('JavaScript');
      } else if (skill === 'typescript') {
        skills.push('TypeScript');
      } else {
        skills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    }
  });
  
  // Retourner au moins quelques skills par défaut si rien trouvé selon la stack
  return skills.length > 0 ? [...new Set(skills)] : getDefaultSkills(selectedStack);
}

function extractProjects(text: string, selectedStack: 'react' | 'vue' | 'vanilla' = 'react'): any[] {
  // Projets par défaut si pas détectés selon la stack
  if (selectedStack === 'vue') {
    return [
      { name: 'Application Vue', description: 'Application web moderne avec Vue.js', tech: ['Vue.js 3', 'TypeScript'] }
    ];
  } else if (selectedStack === 'vanilla') {
    return [
      { name: 'Site Web', description: 'Site web responsive en HTML/CSS/JS', tech: ['HTML5', 'CSS3', 'JavaScript'] }
    ];
  }
  return [
    { name: 'Application React', description: 'Application web moderne avec React', tech: ['React', 'TypeScript'] }
  ];
}

function getDefaultSkills(selectedStack: 'react' | 'vue' | 'vanilla'): string[] {
  if (selectedStack === 'vue') {
    return ['Vue.js 3', 'TypeScript', 'Composition API'];
  } else if (selectedStack === 'vanilla') {
    return ['HTML5', 'CSS3', 'JavaScript ES6+'];
  }
  return ['React', 'TypeScript', 'Node.js'];
}

function generateReactReadme(projectName: string, userData: any): string {
  return `# ${projectName}

Portfolio de ${userData.name || 'Développeur'} - ${userData.title || 'Développeur Web'}

## 🚀 Stack Technique

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Styling:** CSS Modules + Custom CSS

## 🌟 Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Navigation fluide avec ancres
- ✅ Composants React réutilisables
- ✅ Animations et transitions CSS
- ✅ Formulaire de contact
- ✅ Optimisé pour le SEO

## 🛠️ Installation et lancement

\`\`\`bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev
\`\`\`

Puis ouvrir [http://localhost:5173](http://localhost:5173)

## 📦 Build de production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📁 Structure du projet

\`\`\`
src/
├── components/          # Composants React
│   ├── Header.tsx      # Navigation
│   ├── About.tsx       # Section à propos
│   ├── Skills.tsx      # Compétences
│   ├── Projects.tsx    # Projets
│   └── Contact.tsx     # Contact
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
├── App.css             # Styles principaux
└── index.css           # Styles globaux
\`\`\`

## 🎨 Personnalisation

1. **Informations personnelles:** Modifiez les données dans les composants
2. **Couleurs:** Changez les variables CSS dans \`index.css\`
3. **Projets:** Ajoutez vos projets dans \`Projects.tsx\`
4. **Contact:** Mettez à jour vos informations dans \`Contact.tsx\`

---

**Généré avec BondAI Portfolio Creator** 🤖
`;
}

async function generateVueProject(projectPath: string, userData: string, projectName: string): Promise<string[]> {
  // Créer structure Vue 3 + TypeScript + Vite
  await fs.promises.mkdir(path.join(projectPath, 'src'), { recursive: true });
  await fs.promises.mkdir(path.join(projectPath, 'src', 'components'), { recursive: true });
  await fs.promises.mkdir(path.join(projectPath, 'public'), { recursive: true });
  
  // Parse user data pour les composants
  const parsedUserData = parseUserData(userData, 'vue');
  
  // package.json Vue
  const packageJson = {
    name: projectName,
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vue-tsc && vite build",
      preview: "vite preview"
    },
    dependencies: {
      vue: "^3.4.0",
      "vue-router": "^4.2.5"
    },
    devDependencies: {
      "@vitejs/plugin-vue": "^5.0.0",
      typescript: "^5.2.0",
      "vue-tsc": "^1.8.0",
      vite: "^5.0.0"
    }
  };
  await fs.promises.writeFile(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // index.html
  const indexHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio ${parsedUserData.name || 'Développeur'}</title>
    <meta name="description" content="Portfolio de ${parsedUserData.name || 'Développeur'} - ${parsedUserData.title || 'Développeur Web'}" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`;
  await fs.promises.writeFile(path.join(projectPath, 'index.html'), indexHtml);
  
  // src/main.ts
  const mainTs = `import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'main.ts'), mainTs);
  
  // src/App.vue - Composant principal enrichi
  const appVue = `<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <div class="app">
    <HeaderComponent />
    <main>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  padding: 80px 0;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #2d3748;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #4fc08d 0%, #42b883 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
}

.grid {
  display: grid;
  gap: 2rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}
</style>`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'App.vue'), appVue);

  // Components Vue
  await generateVueComponents(projectPath, parsedUserData);
  
  // src/style.css
  const styleCss = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #4fc08d;
  --secondary: #42b883;
  --text: #2d3748;
  --text-light: #718096;
  --bg: #f7fafc;
  --white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

html {
  scroll-behavior: smooth;
}

#app {
  width: 100%;
}`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'style.css'), styleCss);
  
  // vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})`;
  await fs.promises.writeFile(path.join(projectPath, 'vite.config.ts'), viteConfig);
  
  // README.md
  const readme = generateVueReadme(projectName, parsedUserData);
  await fs.promises.writeFile(path.join(projectPath, 'README.md'), readme);
  
  return ['index.html', 'package.json', 'vite.config.ts', 'src/main.ts', 'src/App.vue', 'src/style.css', 'src/components/HeaderComponent.vue', 'src/components/AboutSection.vue', 'src/components/SkillsSection.vue', 'src/components/ProjectsSection.vue', 'src/components/ContactSection.vue', 'README.md'];
}

async function generateVueComponents(projectPath: string, userData: any) {
  // HeaderComponent.vue
  const headerVue = `<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        {{ "${userData.name || 'Portfolio'}" }}
      </div>
      
      <div class="nav-links">
        <a href="#about">À propos</a>
        <a href="#skills">Compétences</a>
        <a href="#projects">Projets</a>
        <a href="#contact">Contact</a>
        
        <div class="social-links">
          <a href="#" aria-label="GitHub">🔗</a>
          <a href="#" aria-label="LinkedIn">💼</a>
          <a href="#contact" aria-label="Email">📧</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 0;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  font-size: 1.2rem;
}
</style>`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'HeaderComponent.vue'), headerVue);

  // AboutSection.vue
  const aboutVue = `<script setup lang="ts">
const userData = ${JSON.stringify(userData, null, 2)}
</script>

<template>
  <section id="about" class="hero">
    <div class="container">
      <h1 class="hero-title">
        {{ userData.name || 'Développeur' }}
      </h1>
      <h2 class="hero-subtitle">
        {{ userData.title || 'Développeur Web Full-Stack' }}
      </h2>
      <p class="hero-description">
                 Passionné par le développement web moderne, je crée des applications performantes et élégantes.
         Spécialisé en {{ Array.isArray(userData.skills) ? userData.skills.slice(0, 3).join(', ') : 'Vue.js, TypeScript, Node.js' }}.
      </p>
      <a href="#contact" class="btn hero-btn">
        Me contacter
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 100px 0;
  background: linear-gradient(135deg, #4fc08d 0%, #42b883 100%);
  color: white;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 3rem;
  opacity: 0.9;
}

.hero-btn {
  font-size: 1.1rem;
  padding: 16px 32px;
}
</style>`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'AboutSection.vue'), aboutVue);

  // SkillsSection.vue
  const skillsVue = `<script setup lang="ts">
import { ref, onMounted } from 'vue'

const skills = ref(${JSON.stringify(userData.skills || ['Vue.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker'])})
const skillLevels = ref<number[]>([])

onMounted(() => {
  skillLevels.value = skills.value.map(() => 85 + Math.random() * 10)
})
</script>

<template>
  <section id="skills" class="skills">
    <div class="container">
      <h2 class="section-title">Compétences</h2>
      <div class="grid grid-3">
        <div v-for="(skill, index) in skills" :key="index" class="card skill-card">
          <h3 class="skill-name">{{ skill }}</h3>
          <div class="skill-bar">
            <div 
              class="skill-progress" 
              :style="{ width: skillLevels[index] + '%' }"
            ></div>
          </div>
          <span class="skill-level">{{ Math.round(skillLevels[index]) }}%</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: 100px 0;
}

.skill-card {
  text-align: center;
}

.skill-name {
  color: var(--primary);
  margin-bottom: 1rem;
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(135deg, #4fc08d 0%, #42b883 100%);
  border-radius: 4px;
  transition: width 0.8s ease;
}

.skill-level {
  font-size: 0.9rem;
  color: var(--text-light);
}
</style>`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'SkillsSection.vue'), skillsVue);

  // ProjectsSection.vue
  const projectsVue = `<script setup lang="ts">
import { ref } from 'vue'

const projects = ref([
  {
    title: 'Plateforme E-commerce',
    description: 'Application complète avec paiement en ligne, gestion des stocks et dashboard admin.',
    tech: ['Vue.js 3', 'TypeScript', 'Pinia'],
    image: 'https://via.placeholder.com/400x250?text=E-commerce+Platform'
  },
  {
    title: 'Dashboard Analytics',
    description: 'Interface de visualisation de données en temps réel avec graphiques interactifs.',
    tech: ['Vue.js 3', 'Composition API', 'Chart.js'],
    image: 'https://via.placeholder.com/400x250?text=Analytics+Dashboard'
  },
  {
    title: 'Application Web',
    description: 'Application web responsive avec router et gestion d\'état moderne.',
    tech: ['Vue.js 3', 'Vue Router', 'Vite'],
    image: 'https://via.placeholder.com/400x250?text=Web+App'
  }
])
</script>

<template>
  <section id="projects" class="projects">
    <div class="container">
      <h2 class="section-title">Projets</h2>
      <div class="grid grid-2">
        <div v-for="(project, index) in projects" :key="index" class="card project-card">
          <img :src="project.image" :alt="project.title" class="project-image" />
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 100px 0;
  background: var(--bg);
}

.project-card {
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.project-description {
  color: var(--text-light);
  margin-bottom: 1.5rem;
}

.project-tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}
</style>`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'ProjectsSection.vue'), projectsVue);

  // ContactSection.vue
  const contactVue = `<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form.value)
  // Here you would handle form submission
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="container">
      <h2 class="contact-title">Contact</h2>
      
      <div class="contact-grid">
        <div class="contact-info">
          <h3 class="contact-subtitle">Parlons de votre projet</h3>
          <p class="contact-description">
            Je suis toujours intéressé par de nouveaux défis. 
            N'hésitez pas à me contacter pour discuter de vos projets.
          </p>
          
          <div class="contact-details">
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>contact@portfolio.dev</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📱</span>
              <span>+33 1 23 45 67 89</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <span>Paris, France</span>
            </div>
          </div>
          
          <div class="social-links">
            <a href="#" class="social-link">🔗</a>
            <a href="#" class="social-link">💼</a>
          </div>
        </div>
        
        <div class="contact-form-container">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">Nom</label>
              <input 
                id="name"
                v-model="form.name" 
                type="text" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                id="email"
                v-model="form.email" 
                type="email" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message"
                v-model="form.message" 
                rows="4" 
                required
              ></textarea>
            </div>
            <button type="submit" class="btn form-btn">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 100px 0;
  background: #2d3748;
  color: white;
}

.contact-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.contact-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--primary);
}

.contact-description {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  color: var(--primary);
  font-size: 1.2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  background: var(--primary);
  padding: 12px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

.contact-form-container {
  background: rgba(255,255,255,0.1);
  padding: 2rem;
  border-radius: 12px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: white;
  color: var(--text);
  resize: vertical;
}

.form-btn {
  width: 100%;
}
</style>`;
  await fs.promises.writeFile(path.join(projectPath, 'src', 'components', 'ContactSection.vue'), contactVue);
}

function generateVueReadme(projectName: string, userData: any): string {
  return `# ${projectName}

Portfolio de ${userData.name || 'Développeur'} - ${userData.title || 'Développeur Web'}

## 🚀 Stack Technique

- **Frontend:** Vue.js 3 + TypeScript
- **Build Tool:** Vite
- **Router:** Vue Router 4
- **Styling:** CSS Scoped + Custom CSS

## 🌟 Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Navigation fluide avec ancres
- ✅ Composants Vue réutilisables
- ✅ Composition API et TypeScript
- ✅ Animations et transitions CSS
- ✅ Formulaire de contact réactif
- ✅ Optimisé pour le SEO

## 🛠️ Installation et lancement

\`\`\`bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev
\`\`\`

Puis ouvrir [http://localhost:5173](http://localhost:5173)

## 📦 Build de production

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 📁 Structure du projet

\`\`\`
src/
├── components/              # Composants Vue
│   ├── HeaderComponent.vue  # Navigation
│   ├── AboutSection.vue     # Section à propos
│   ├── SkillsSection.vue    # Compétences
│   ├── ProjectsSection.vue  # Projets
│   └── ContactSection.vue   # Contact
├── App.vue                  # Composant principal
├── main.ts                  # Point d'entrée  
└── style.css                # Styles globaux
\`\`\`

## 🎨 Personnalisation

1. **Informations personnelles:** Modifiez les données dans les composants
2. **Couleurs:** Changez les variables CSS dans \`style.css\`
3. **Projets:** Ajoutez vos projets dans \`ProjectsSection.vue\`
4. **Contact:** Mettez à jour vos informations dans \`ContactSection.vue\`

## 🧩 Composants

- **HeaderComponent:** Navigation fixe avec liens d'ancrage
- **AboutSection:** Section héro avec présentation
- **SkillsSection:** Grille de compétences avec barres de progression
- **ProjectsSection:** Showcase des projets avec images et technologies
- **ContactSection:** Formulaire de contact et informations

---

**Généré avec BondAI Portfolio Creator** 🤖
`;
}

async function generateVanillaProject(projectPath: string, userData: string, projectName: string): Promise<string[]> {
  // Structure Vanilla simple mais moderne
  await fs.promises.mkdir(path.join(projectPath, 'css'), { recursive: true });
  await fs.promises.mkdir(path.join(projectPath, 'js'), { recursive: true });
  
  // package.json Vanilla
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: `Portfolio Vanilla JS généré avec BondAI`,
    main: "index.html",
    scripts: { 
      start: "npx serve .",
      dev: "npx serve ."
    },
    keywords: ["portfolio", "vanilla-js", "html5", "css3", "bondai"]
  };
  await fs.promises.writeFile(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));
  
  // index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Vanilla - ${projectName}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🚀 Mon Portfolio Vanilla JS</h1>
            <p>Créé avec HTML5 + CSS3 + JavaScript ES6+</p>
            <nav>
                <button class="nav-btn active" data-section="about">À propos</button>
                <button class="nav-btn" data-section="demo">Démo JS</button>
                <button class="nav-btn" data-section="contact">Contact</button>
            </nav>
        </header>
        
        <main>
            <section id="about" class="section active">
                <h2>👤 À propos</h2>
                <div class="user-data">
                    <pre id="userData">${userData}</pre>
                </div>
            </section>
            
            <section id="demo" class="section">
                <h2>⚡ Démo JavaScript</h2>
                <div class="demo-container">
                    <button id="counterBtn">Clics: <span id="counter">0</span></button>
                    <div class="color-changer">
                        <button id="colorBtn">Changer la couleur</button>
                        <div id="colorBox"></div>
                    </div>
                </div>
            </section>
            
            <section id="contact" class="section">
                <h2>📧 Contact</h2>
                <p>Portfolio généré avec BondAI</p>
                <p>Stack: HTML5 + CSS3 + JavaScript ES6+</p>
                <p>Performance maximale, aucune dépendance</p>
            </section>
        </main>
    </div>
    
    <script src="js/script.js"></script>
</body>
</html>`;
  await fs.promises.writeFile(path.join(projectPath, 'index.html'), indexHtml);
  
  // css/style.css
  const styleCss = `/* Variables CSS */
:root {
  --primary-color: #ff6b6b;
  --secondary-color: #4ecdc4;
  --text-color: #333;
  --bg-color: #f8f9fa;
  --white: #ffffff;
  --shadow: 0 4px 20px rgba(0,0,0,0.1);
  --radius: 12px;
}

/* Reset et base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  min-height: 100vh;
  padding: 2rem;
}

/* Container principal */
.container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

/* Header */
.header {
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.header p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Navigation */
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-btn {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-btn:hover,
.nav-btn.active {
  background: rgba(255,255,255,0.9);
  color: var(--text-color);
  transform: translateY(-2px);
}

/* Sections */
main {
  padding: 3rem 2rem;
}

.section {
  display: none;
  animation: fadeIn 0.5s ease;
}

.section.active {
  display: block;
}

.section h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 4px solid var(--primary-color);
  font-size: 1.8rem;
}

/* Données utilisateur */
.user-data {
  background: var(--bg-color);
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid #e9ecef;
  margin: 1.5rem 0;
}

.user-data pre {
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #495057;
}

/* Démo JavaScript */
.demo-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 2rem 0;
}

#counterBtn {
  background: linear-gradient(45deg, var(--primary-color), #ff8a80);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
}

#counterBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(255,107,107,0.4);
}

.color-changer {
  text-align: center;
}

#colorBtn {
  background: linear-gradient(45deg, var(--secondary-color), #26a69a);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
}

#colorBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(78,205,196,0.4);
}

#colorBox {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  margin: 0 auto;
  border-radius: 50%;
  transition: all 0.5s ease;
  box-shadow: var(--shadow);
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  body { padding: 1rem; }
  .header { padding: 2rem 1rem; }
  .header h1 { font-size: 2rem; }
  main { padding: 2rem 1rem; }
  nav { gap: 0.5rem; }
  .nav-btn { padding: 0.6rem 1rem; font-size: 0.9rem; }
}`;
  await fs.promises.writeFile(path.join(projectPath, 'css', 'style.css'), styleCss);
  
  // js/script.js
  const scriptJs = `// Portfolio Vanilla JS - Code moderne ES6+
class PortfolioApp {
  constructor() {
    this.counter = 0;
    this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];
    this.init();
  }
  
  init() {
    this.setupNavigation();
    this.setupCounter();
    this.setupColorChanger();
    console.log('🚀 Portfolio Vanilla JS initialisé !');
  }
  
  // Navigation entre sections
  setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetSection = button.dataset.section;
        
        // Retirer active de tous
        navButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Activer le bon
        button.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
      });
    });
  }
  
  // Compteur de clics
  setupCounter() {
    const counterBtn = document.getElementById('counterBtn');
    const counterSpan = document.getElementById('counter');
    
    counterBtn.addEventListener('click', () => {
      this.counter++;
      counterSpan.textContent = this.counter;
      
      // Animation de feedback
      counterBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        counterBtn.style.transform = 'scale(1)';
      }, 150);
    });
  }
  
  // Changeur de couleur
  setupColorChanger() {
    const colorBtn = document.getElementById('colorBtn');
    const colorBox = document.getElementById('colorBox');
    
    colorBtn.addEventListener('click', () => {
      const randomColor = this.getRandomColor();
      const randomColor2 = this.getRandomColor();
      
      colorBox.style.background = \`linear-gradient(45deg, \${randomColor}, \${randomColor2})\`;
      colorBox.style.transform = 'rotate(180deg) scale(1.1)';
      
      setTimeout(() => {
        colorBox.style.transform = 'rotate(0deg) scale(1)';
      }, 500);
    });
  }
  
  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}

// Initialiser l'app quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Fonction utilitaire pour afficher les données utilisateur de manière plus jolie
document.addEventListener('DOMContentLoaded', () => {
  const userDataElement = document.getElementById('userData');
  if (userDataElement) {
    try {
      const userData = userDataElement.textContent;
      // Tenter de parser et reformater si c'est du JSON
      if (userData.trim().startsWith('{')) {
        const parsed = JSON.parse(userData);
        userDataElement.textContent = JSON.stringify(parsed, null, 2);
      }
    } catch (e) {
      // Garder le texte tel quel si ce n'est pas du JSON
    }
  }
});`;
  await fs.promises.writeFile(path.join(projectPath, 'js', 'script.js'), scriptJs);
  
  // README.md
  const readme = `# ${projectName}

Portfolio Vanilla JS généré avec BondAI Portfolio Creator.

## 🚀 Stack
- HTML5 moderne
- CSS3 avec variables et Grid/Flexbox
- JavaScript ES6+ (Classes, Arrow Functions, etc.)
- Aucune dépendance externe

## 🛠️ Lancement

\`\`\`bash
npm start
# ou directement
npx serve .
\`\`\`

Puis ouvrir http://localhost:3000

## ✨ Fonctionnalités
- Navigation par onglets
- Compteur de clics interactif
- Changeur de couleurs animé
- Design responsive
- Animations CSS smooth
- Code JavaScript moderne

## 📁 Structure
- index.html - Page principale
- css/style.css - Styles modernes avec variables CSS
- js/script.js - JavaScript ES6+ orienté objet
- package.json - Configuration du projet
`;
  await fs.promises.writeFile(path.join(projectPath, 'README.md'), readme);
  
  return ['index.html', 'package.json', 'css/style.css', 'js/script.js', 'README.md'];
}

async function createProjectZip(projectPath: string, projectName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const zipPath = path.join(process.cwd(), 'generated-portfolios', `${projectName}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => resolve(zipPath));
    archive.on('error', reject);
    
    archive.pipe(output);
    archive.directory(projectPath, false);
    archive.finalize();
  });
} 