/**
 * Advanced Particle System for Abrar Ahmed's Portfolio
 * Created for the 2025 redesign
 * 
 * This script creates an interactive animated background with particles
 * representing a network/cloud infrastructure theme with enhanced visuals.
 */

class AdvancedParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouse = {
      x: null,
      y: null,
      radius: 150
    };
    
    // Enhanced color scheme from website
    this.colors = {
      primary: '#00d8ff',      // Primary cyan
      primaryLight: '#60e6ff', // Light cyan
      secondary: '#00ffb3',    // Secondary green
      tertiary: '#ff00aa',     // Tertiary magenta
      dark: '#080c14',         // Dark background
      light: '#e6e9ff'         // Light color
    };
    
    // Particle settings
    this.particleCount = 100;
    this.particleMinRadius = 1;
    this.particleMaxRadius = 5;
    this.particleMaxSpeed = 0.5;
    this.connectionDistance = 150;
    this.isDarkTheme = document.body.classList.contains('dark-theme') || 
                       document.body.getAttribute('data-theme') === 'dark';
    
    // Initialize
    this.init();
    this.animate();
    this.setupEventListeners();
  }
  
  init() {
    // Set canvas to full window size
    this.resizeCanvas();
    
    // Create particles
    for (let i = 0; i < this.particleCount; i++) {
      const radius = Math.random() * (this.particleMaxRadius - this.particleMinRadius) + this.particleMinRadius;
      const x = Math.random() * (this.canvas.width - radius * 2) + radius;
      const y = Math.random() * (this.canvas.height - radius * 2) + radius;
      const directionX = (Math.random() - 0.5) * this.particleMaxSpeed;
      const directionY = (Math.random() - 0.5) * this.particleMaxSpeed;
      
      // Randomly assign colors with higher probability for primary
      const colorRand = Math.random();
      let color;
      if (colorRand < 0.6) {
        color = this.colors.primary;
      } else if (colorRand < 0.8) {
        color = this.colors.primaryLight;
      } else if (colorRand < 0.9) {
        color = this.colors.secondary;
      } else {
        color = this.colors.tertiary;
      }
      
      this.particles.push({
        x,
        y,
        radius,
        directionX,
        directionY,
        color,
        originalRadius: radius,
        opacity: Math.random() * 0.5 + 0.5,
        pulse: Math.random() * 0.02 + 0.01,
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      });
    }
  }
  
  resizeCanvas() {
    const container = this.canvas.parentElement;
    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
  }
  
  setupEventListeners() {
    // Resize event
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
    
    // Mouse move event for interactive effect
    this.canvas.addEventListener('mousemove', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = event.clientX - rect.left;
      this.mouse.y = event.clientY - rect.top;
    });
    
    // Mouse leave event
    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
    
    // Theme change event
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      setTimeout(() => {
        this.isDarkTheme = document.body.classList.contains('dark-theme') || 
                           document.body.getAttribute('data-theme') === 'dark';
      }, 100);
    });
  }
  
  // Draw individual particle
  drawParticle(particle) {
    // Pulsating effect
    particle.radius += particle.pulse * particle.pulseDirection;
    if (particle.radius > particle.originalRadius * 1.5 || 
        particle.radius < particle.originalRadius * 0.5) {
      particle.pulseDirection *= -1;
    }
    
    // Glowing effect
    const gradient = this.ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.radius * 2
    );
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }
  
  // Draw connections between particles
  drawConnections() {
    this.connections = [];
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / this.connectionDistance);
          
          this.connections.push({
            x1: this.particles[i].x,
            y1: this.particles[i].y,
            x2: this.particles[j].x,
            y2: this.particles[j].y,
            opacity: opacity * 0.5,
            color1: this.particles[i].color,
            color2: this.particles[j].color
          });
        }
      }
    }
    
    // Draw all connections
    for (const connection of this.connections) {
      // Create gradient for connection
      const gradient = this.ctx.createLinearGradient(
        connection.x1, connection.y1,
        connection.x2, connection.y2
      );
      gradient.addColorStop(0, connection.color1);
      gradient.addColorStop(1, connection.color2);
      
      this.ctx.beginPath();
      this.ctx.moveTo(connection.x1, connection.y1);
      this.ctx.lineTo(connection.x2, connection.y2);
      this.ctx.strokeStyle = gradient;
      this.ctx.globalAlpha = connection.opacity;
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    }
  }
  
  // Update particle positions and handle interactions
  updateParticles() {
    for (const particle of this.particles) {
      // Boundary collision detection
      if (particle.x + particle.radius > this.canvas.width || particle.x - particle.radius < 0) {
        particle.directionX = -particle.directionX;
      }
      
      if (particle.y + particle.radius > this.canvas.height || particle.y - particle.radius < 0) {
        particle.directionY = -particle.directionY;
      }
      
      // Move particles
      particle.x += particle.directionX;
      particle.y += particle.directionY;
      
      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          // Increase particle size when mouse is near
          const targetRadius = particle.originalRadius * 3;
          particle.radius += (targetRadius - particle.radius) * 0.1;
          
          // Add slight repulsion effect
          const angle = Math.atan2(dy, dx);
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const forceDirectionX = Math.cos(angle) * force * 0.5;
          const forceDirectionY = Math.sin(angle) * force * 0.5;
          
          particle.x += forceDirectionX;
          particle.y += forceDirectionY;
          
          // Increase opacity when mouse is near
          particle.opacity = Math.min(1, particle.opacity + 0.05);
        } else {
          // Return to original size
          particle.radius += (particle.originalRadius - particle.radius) * 0.1;
          
          // Return to original opacity
          particle.opacity += ((Math.random() * 0.5 + 0.5) - particle.opacity) * 0.1;
        }
      } else {
        // Return to original size when mouse leaves
        particle.radius += (particle.originalRadius - particle.radius) * 0.1;
        
        // Return to original opacity
        particle.opacity += ((Math.random() * 0.5 + 0.5) - particle.opacity) * 0.1;
      }
      
      // Draw the particle
      this.drawParticle(particle);
    }
  }
  
  // Main animation loop
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawConnections();
    this.updateParticles();
  }
}

/**
 * Section-specific background animations
 * Each section has a unique animated background
 */
class SectionBackgrounds {
  constructor() {
    this.sections = document.querySelectorAll('[data-section-bg]');
    this.init();
  }
  
  init() {
    this.sections.forEach(section => {
      const bgType = section.getAttribute('data-section-bg');
      const bgElement = section.querySelector('.section-bg');
      
      if (!bgElement) return;
      
      switch (bgType) {
        case 'hero':
          this.createHeroBackground(bgElement);
          break;
        case 'about':
          this.createNeuralNetworkBackground(bgElement);
          break;
        case 'education':
          this.createDigitalRainBackground(bgElement);
          break;
        case 'experience':
          this.createCircuitBoardBackground(bgElement);
          break;
        case 'skills':
          this.createParticleGalaxyBackground(bgElement);
          break;
        case 'portfolio':
          this.createHolographicBackground(bgElement);
          break;
        case 'certifications':
          this.createDataFlowBackground(bgElement);
          break;
        case 'recommendations':
          this.createPulseBackground(bgElement);
          break;
        case 'contact':
          this.createConnectionLinesBackground(bgElement);
          break;
      }
    });
  }
  
  // Hero section: 3D Grid Landscape
  createHeroBackground(element) {
    const gridElement = element.querySelector('.section-bg-grid');
    if (!gridElement) return;
    
    gridElement.style.backgroundSize = '50px 50px';
    gridElement.style.animation = 'gridMove 20s linear infinite';
    
    // Add keyframes for grid movement
    this.addKeyframes(`
      @keyframes gridMove {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 50px 50px;
        }
      }
    `);
    
    // Create canvas for 3D grid
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.className = 'hero-canvas';
    element.appendChild(canvas);
    
    // Initialize particle system
    new AdvancedParticleSystem('hero-canvas');
  }
  
  // About section: Neural Network Visualization
  createNeuralNetworkBackground(element) {
    const neuralNetworkElement = element.querySelector('.neural-network-bg');
    if (!neuralNetworkElement) {
      const neuralNetwork = document.createElement('div');
      neuralNetwork.className = 'neural-network-bg';
      element.appendChild(neuralNetwork);
      
      // Create nodes
      for (let i = 0; i < 15; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        node.style.animationDelay = `${Math.random() * 5}s`;
        neuralNetwork.appendChild(node);
      }
      
      // Add CSS for neural network
      this.addStyles(`
        .neural-network-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .neural-node {
          position: absolute;
          width: 10px;
          height: 10px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
          animation: pulse 3s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.5);
            opacity: 0.7;
          }
        }
      `);
    }
  }
  
  // Education section: Digital Rain Effect
  createDigitalRainBackground(element) {
    const digitalRainElement = element.querySelector('.digital-rain-bg');
    if (!digitalRainElement) {
      const digitalRain = document.createElement('div');
      digitalRain.className = 'digital-rain-bg';
      element.appendChild(digitalRain);
      
      // Create rain columns
      for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.className = 'rain-column';
        column.style.left = `${i * 5}%`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add random characters
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columnLength = Math.floor(Math.random() * 15) + 10;
        
        for (let j = 0; j < columnLength; j++) {
          const char = document.createElement('div');
          char.className = 'rain-char';
          char.textContent = chars[Math.floor(Math.random() * chars.length)];
          char.style.animationDelay = `${j * 0.1}s`;
          column.appendChild(char);
        }
        
        digitalRain.appendChild(column);
      }
      
      // Add CSS for digital rain
      this.addStyles(`
        .digital-rain-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }
        
        .rain-column {
          position: absolute;
          top: -20%;
          font-family: monospace;
          font-size: 14px;
          color: var(--primary);
          text-shadow: 0 0 5px var(--primary);
          animation: rain-fall 10s linear infinite;
        }
        
        .rain-char {
          opacity: 0;
          animation: char-fade 3s linear infinite;
        }
        
        @keyframes rain-fall {
          0% {
            transform: translateY(-10%);
          }
          100% {
            transform: translateY(110%);
          }
        }
        
        @keyframes char-fade {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
        }
      `);
    }
  }
  
  // Experience section: Circuit Board Pattern
  createCircuitBoardBackground(element) {
    const circuitBoardElement = element.querySelector('.circuit-board-bg');
    if (!circuitBoardElement) {
      const circuitBoard = document.createElement('div');
      circuitBoard.className = 'circuit-board-bg';
      element.appendChild(circuitBoard);
      
      // Create circuit lines
      for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        
        // Randomize position and size
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 150 + 50}px`;
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        
        circuitBoard.appendChild(line);
        
        // Add nodes to lines
        const nodeCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < nodeCount; j++) {
          const node = document.createElement('div');
          node.className = 'circuit-node';
          node.style.left = `${j * 30 + 10}%`;
          circuitBoard.appendChild(node);
        }
      }
      
      // Add CSS for circuit board
      this.addStyles(`
        .circuit-board-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .circuit-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          animation: circuit-glow 3s infinite alternate;
        }
        
        .circuit-node {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 5px var(--primary);
          animation: node-pulse 2s infinite alternate;
        }
        
        @keyframes circuit-glow {
          0% {
            opacity: 0.3;
            box-shadow: 0 0 2px var(--primary);
          }
          100% {
            opacity: 0.7;
            box-shadow: 0 0 8px var(--primary);
          }
        }
        
        @keyframes node-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
      `);
    }
  }
  
  // Skills section: Particle Galaxy
  createParticleGalaxyBackground(element) {
    const galaxyElement = element.querySelector('.particle-galaxy-bg');
    if (!galaxyElement) {
      const galaxy = document.createElement('div');
      galaxy.className = 'particle-galaxy-bg';
      element.appendChild(galaxy);
      
      // Create stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'galaxy-star';
        
        // Randomize position, size and color
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        
        // Random color from primary, secondary, tertiary
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--tertiary)'];
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        galaxy.appendChild(star);
      }
      
      // Add CSS for galaxy
      this.addStyles(`
        .particle-galaxy-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .galaxy-star {
          position: absolute;
          border-radius: 50%;
          animation: star-twinkle infinite alternate;
        }
        
        @keyframes star-twinkle {
          0% {
            opacity: 0.3;
            box-shadow: 0 0 2px currentColor;
          }
          100% {
            opacity: 1;
            box-shadow: 0 0 8px currentColor;
          }
        }
      `);
    }
  }
  
  // Portfolio section: Holographic Displays
  createHolographicBackground(element) {
    const holographicElement = element.querySelector('.holographic-bg');
    if (!holographicElement) {
      const holographic = document.createElement('div');
      holographic.className = 'holographic-bg';
      element.appendChild(holographic);
      
      // Create holographic elements
      for (let i = 0; i < 5; i++) {
        const holoElement = document.createElement('div');
        holoElement.className = 'holo-element';
        
        // Randomize position and size
        holoElement.style.left = `${Math.random() * 80 + 10}%`;
        holoElement.style.top = `${Math.random() * 80 + 10}%`;
        holoElement.style.width = `${Math.random() * 100 + 50}px`;
        holoElement.style.height = `${Math.random() * 100 + 50}px`;
        holoElement.style.animationDelay = `${Math.random() * 5}s`;
        
        holographic.appendChild(holoElement);
      }
      
      // Add CSS for holographic elements
      this.addStyles(`
        .holographic-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .holo-element {
          position: absolute;
          border: 1px solid var(--primary);
          border-radius: 5px;
          box-shadow: 0 0 10px var(--primary);
          opacity: 0.3;
          animation: holo-float 10s infinite alternate;
        }
        
        .holo-element::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
          animation: holo-scan 3s infinite;
        }
        
        @keyframes holo-float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        @keyframes holo-scan {
          0% {
            top: 0;
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0.3;
          }
        }
      `);
    }
  }
  
  // Certifications section: Data Flow
  createDataFlowBackground(element) {
    const dataFlowElement = element.querySelector('.data-flow-bg');
    if (!dataFlowElement) {
      const dataFlow = document.createElement('div');
      dataFlow.className = 'data-flow-bg';
      element.appendChild(dataFlow);
      
      // Create data streams
      for (let i = 0; i < 10; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        
        // Randomize position and size
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.width = `${Math.random() * 2 + 1}px`;
        stream.style.animationDuration = `${Math.random() * 5 + 5}s`;
        stream.style.animationDelay = `${Math.random() * 5}s`;
        
        dataFlow.appendChild(stream);
      }
      
      // Add CSS for data flow
      this.addStyles(`
        .data-flow-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .data-stream {
          position: absolute;
          top: -10%;
          height: 120%;
          background: linear-gradient(to bottom, transparent, var(--primary), transparent);
          animation: data-flow infinite linear;
        }
        
        @keyframes data-flow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `);
    }
  }
  
  // Recommendations section: Pulse Background
  createPulseBackground(element) {
    const pulseElement = element.querySelector('.pulse-bg');
    if (!pulseElement) {
      const pulse = document.createElement('div');
      pulse.className = 'pulse-bg';
      element.appendChild(pulse);
      
      // Create pulse circles
      for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'pulse-circle';
        
        // Center the circles
        circle.style.left = '50%';
        circle.style.top = '50%';
        circle.style.animationDelay = `${i * 2}s`;
        
        pulse.appendChild(circle);
      }
      
      // Add CSS for pulse effect
      this.addStyles(`
        .pulse-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .pulse-circle {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary);
          transform: translate(-50%, -50%);
          animation: pulse-expand 6s infinite;
        }
        
        @keyframes pulse-expand {
          0% {
            width: 10px;
            height: 10px;
            opacity: 0.8;
            box-shadow: 0 0 10px var(--primary);
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            box-shadow: 0 0 30px var(--primary);
          }
        }
      `);
    }
  }
  
  // Contact section: Connection Lines
  createConnectionLinesBackground(element) {
    const connectionElement = element.querySelector('.connection-lines-bg');
    if (!connectionElement) {
      const connection = document.createElement('div');
      connection.className = 'connection-lines-bg';
      element.appendChild(connection);
      
      // Create connection points
      for (let i = 0; i < 10; i++) {
        const point = document.createElement('div');
        point.className = 'connection-point';
        
        // Randomize position
        point.style.left = `${Math.random() * 100}%`;
        point.style.top = `${Math.random() * 100}%`;
        
        connection.appendChild(point);
      }
      
      // Add CSS for connection lines
      this.addStyles(`
        .connection-lines-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background-image: 
            radial-gradient(var(--primary) 1px, transparent 1px),
            radial-gradient(var(--secondary) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: 0 0, 25px 25px;
          animation: connection-move 60s linear infinite;
        }
        
        .connection-point {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
          animation: point-pulse 3s infinite alternate;
        }
        
        @keyframes connection-move {
          0% {
            background-position: 0 0, 25px 25px;
          }
          100% {
            background-position: 50px 50px, 75px 75px;
          }
        }
        
        @keyframes point-pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
      `);
    }
  }
  
  // Helper method to add keyframes
  addKeyframes(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  // Helper method to add styles
  addStyles(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create canvas element for hero section
  const heroContainer = document.querySelector('.hero .animated-hero-container');
  if (heroContainer) {
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.className = 'hero-canvas';
    heroContainer.appendChild(canvas);
    
    // Initialize particle system
    new AdvancedParticleSystem('hero-canvas');
  }
  
  // Initialize section backgrounds
  new SectionBackgrounds();
  
  // Initialize cursor effects from animations.js
  if (typeof initCursorEffects === 'function') {
    initCursorEffects();
  }
});
