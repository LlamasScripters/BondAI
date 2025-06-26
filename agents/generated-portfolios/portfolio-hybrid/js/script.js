// Portfolio Vanilla JS - Code moderne ES6+
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
      
      colorBox.style.background = `linear-gradient(45deg, ${randomColor}, ${randomColor2})`;
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
});