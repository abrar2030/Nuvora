/**
 * Futuristic Animated Section Backgrounds
 * Created for Abrar Ahmed's Portfolio Website
 * 
 * This script creates unique animated backgrounds for each section
 * of the portfolio website, using modern canvas techniques.
 */

class SectionBackgrounds {
  constructor() {
    // Store all background animations
    this.backgrounds = {};
    
    // Initialize backgrounds when DOM is loaded
    this.init();
  }
  
  init() {
    // Create each section background
    this.createHeroBackground();
    this.createAboutBackground();
    this.createEducationBackground();
    this.createExperienceBackground();
    this.createSkillsBackground();
    this.createPortfolioBackground();
    this.createContactBackground();
    
    // Handle resize events
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Handle scroll events for performance optimization
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  
  handleResize() {
    // Resize all active canvases
    Object.values(this.backgrounds).forEach(bg => {
      if (bg.canvas) {
        this.resizeCanvas(bg.canvas, bg.container);
        if (bg.resize) bg.resize();
      }
    });
  }
  
  handleScroll() {
    // Optimize performance by only animating visible sections
    Object.values(this.backgrounds).forEach(bg => {
      if (bg.container) {
        const rect = bg.container.getBoundingClientRect();
        const isVisible = (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
        
        // Pause/resume animations based on visibility
        if (isVisible && bg.paused) {
          bg.paused = false;
          if (bg.resume) bg.resume();
        } else if (!isVisible && !bg.paused) {
          bg.paused = true;
          if (bg.pause) bg.pause();
        }
      }
    });
  }
  
  createCanvas(containerId, canvasId) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    // Create background container if it doesn't exist
    let bgContainer = container.querySelector('.section-bg');
    if (!bgContainer) {
      bgContainer = document.createElement('div');
      bgContainer.className = 'section-bg';
      container.appendChild(bgContainer);
    }
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.className = 'section-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 1s ease';
    
    // Add canvas to background container
    bgContainer.appendChild(canvas);
    
    // Set canvas dimensions
    this.resizeCanvas(canvas, container);
    
    // Fade in the canvas
    setTimeout(() => {
      canvas.style.opacity = '1';
    }, 100);
    
    return {
      container,
      canvas,
      ctx: canvas.getContext('2d'),
      paused: false
    };
  }
  
  resizeCanvas(canvas, container) {
    if (!canvas || !container) return;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  
  // Hero Section - 3D Grid Landscape with Floating Data Nodes
  createHeroBackground() {
    const bg = this.createCanvas('home', 'hero-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Grid properties
    const gridSize = 20;
    const gridSpacing = 50;
    const gridDepth = 10;
    const perspective = 500;
    const horizonY = canvas.height * 0.5;
    
    // Floating nodes
    const nodes = [];
    const nodeCount = 30;
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        radius: Math.random() * 3 + 2,
        color: Math.random() < 0.7 ? '#00c6ff' : '#00ff9d',
        speed: Math.random() * 0.5 + 0.2
      });
    }
    
    // Animation variables
    let time = 0;
    let animationId;
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Draw grid
      ctx.strokeStyle = 'rgba(0, 198, 255, 0.3)';
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let z = 0; z < gridDepth; z++) {
        const depth = z + time % 1;
        const scale = perspective / (perspective + depth * gridSpacing);
        const y = horizonY + (canvas.height - horizonY) * scale;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.globalAlpha = (1 - depth / gridDepth) * 0.5;
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let x = -gridSize; x <= gridSize; x++) {
        const xPos = canvas.width / 2 + x * gridSpacing;
        
        ctx.beginPath();
        ctx.moveTo(xPos, horizonY);
        ctx.lineTo(xPos, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
      }
      
      // Draw nodes
      ctx.globalAlpha = 1;
      for (const node of nodes) {
        // Update node position
        node.z -= node.speed;
        if (node.z < 0) {
          node.z = 1000;
          node.x = Math.random() * canvas.width;
          node.y = Math.random() * (canvas.height / 2);
        }
        
        // Calculate projected position
        const scale = perspective / (perspective + node.z);
        const projectedX = node.x;
        const projectedY = node.y * scale + horizonY * (1 - scale);
        const projectedRadius = node.radius * scale;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, projectedRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = scale;
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, projectedRadius * 2, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          projectedX, projectedY, projectedRadius,
          projectedX, projectedY, projectedRadius * 2
        );
        gradient.addColorStop(0, node.color.replace(')', ', 0.5)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, node.color.replace(')', ', 0)').replace('rgb', 'rgba'));
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Store background
    this.backgrounds.hero = bg;
  }
  
  // About Section - Neural Network Visualization
  createAboutBackground() {
    const bg = this.createCanvas('about', 'about-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Neural network nodes
    const nodes = [];
    const nodeCount = 40;
    const connections = [];
    const connectionDistance = 150;
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: Math.random() < 0.7 ? '#00ff9d' : '#00c6ff'
      });
    }
    
    // Animation variables
    let time = 0;
    let animationId;
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Update connections
      connections.length = 0;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            connections.push({
              from: nodes[i],
              to: nodes[j],
              distance,
              opacity: 1 - distance / connectionDistance
            });
          }
        }
      }
      
      // Draw connections
      for (const connection of connections) {
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.strokeStyle = `rgba(0, 255, 157, ${connection.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw and update nodes
      for (const node of nodes) {
        // Update position
        node.x += node.speedX;
        node.y += node.speedY;
        
        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.speedX *= -1;
        if (node.y < 0 || node.y > canvas.height) node.speedY *= -1;
        
        // Pulse effect
        const pulse = Math.sin(time + node.pulseOffset) * 0.5 + 0.5;
        const radius = node.radius * (1 + pulse * 0.5);
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          node.x, node.y, radius,
          node.x, node.y, radius * 3
        );
        gradient.addColorStop(0, node.color.replace(')', ', 0.3)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, node.color.replace(')', ', 0)').replace('rgb', 'rgba'));
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Draw pulse waves
      if (time % 3 < 0.1) {
        const centerNode = nodes[Math.floor(Math.random() * nodes.length)];
        const wave = {
          x: centerNode.x,
          y: centerNode.y,
          radius: 0,
          maxRadius: 200,
          speed: 2,
          opacity: 1,
          color: centerNode.color
        };
        
        // Add wave animation
        const drawWave = () => {
          wave.radius += wave.speed;
          wave.opacity = 1 - wave.radius / wave.maxRadius;
          
          if (wave.opacity > 0) {
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            ctx.strokeStyle = wave.color.replace(')', `, ${wave.opacity})`).replace('rgb', 'rgba');
            ctx.lineWidth = 2;
            ctx.stroke();
            
            requestAnimationFrame(drawWave);
          }
        };
        
        drawWave();
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Store background
    this.backgrounds.about = bg;
  }
  
  // Education Section - Floating Geometric Shapes and Digital Rain
  createEducationBackground() {
    const bg = this.createCanvas('education', 'education-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Geometric shapes
    const shapes = [];
    const shapeCount = 15;
    
    // Digital rain
    const rainColumns = [];
    const columnCount = Math.floor(canvas.width / 20);
    
    // Shape types
    const shapeTypes = [
      // Cube
      (x, y, size, rotation) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Draw cube
        ctx.beginPath();
        ctx.rect(-size/2, -size/2, size, size);
        ctx.stroke();
        
        // Draw perspective lines
        const perspective = size * 0.3;
        ctx.beginPath();
        ctx.moveTo(-size/2, -size/2);
        ctx.lineTo(-size/2 + perspective, -size/2 - perspective);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(size/2, -size/2);
        ctx.lineTo(size/2 + perspective, -size/2 - perspective);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(size/2, size/2);
        ctx.lineTo(size/2 + perspective, size/2 - perspective);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-size/2, size/2);
        ctx.lineTo(-size/2 + perspective, size/2 - perspective);
        ctx.stroke();
        
        // Draw top face
        ctx.beginPath();
        ctx.moveTo(-size/2 + perspective, -size/2 - perspective);
        ctx.lineTo(size/2 + perspective, -size/2 - perspective);
        ctx.lineTo(size/2 + perspective, size/2 - perspective);
        ctx.lineTo(-size/2 + perspective, size/2 - perspective);
        ctx.closePath();
        ctx.stroke();
        
        ctx.restore();
      },
      
      // Tetrahedron
      (x, y, size, rotation) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        const h = size * Math.sqrt(3) / 2;
        
        // Draw base
        ctx.beginPath();
        ctx.moveTo(-size/2, h/3);
        ctx.lineTo(size/2, h/3);
        ctx.lineTo(0, -h*2/3);
        ctx.closePath();
        ctx.stroke();
        
        // Draw to apex
        ctx.beginPath();
        ctx.moveTo(-size/2, h/3);
        ctx.lineTo(0, 0);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(size/2, h/3);
        ctx.lineTo(0, 0);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, -h*2/3);
        ctx.lineTo(0, 0);
        ctx.stroke();
        
        ctx.restore();
      },
      
      // Octahedron
      (x, y, size, rotation) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        // Draw top and bottom pyramids
        ctx.beginPath();
        ctx.moveTo(0, -size/2);
        ctx.lineTo(size/2, 0);
        ctx.lineTo(0, size/2);
        ctx.lineTo(-size/2, 0);
        ctx.closePath();
        ctx.stroke();
        
        // Draw middle line
        ctx.beginPath();
        ctx.moveTo(-size/2, 0);
        ctx.lineTo(size/2, 0);
        ctx.stroke();
        
        ctx.restore();
      }
    ];
    
    // Initialize shapes
    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        type: Math.floor(Math.random() * shapeTypes.length)
      });
    }
    
    // Initialize rain columns
    for (let i = 0; i < columnCount; i++) {
      rainColumns.push({
        x: i * 20 + 10,
        drops: [],
        nextDrop: Math.random() * 100
      });
    }
    
    // Characters for digital rain
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Animation variables
    let time = 0;
    let animationId;
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(10, 14, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Draw and update shapes
      ctx.strokeStyle = 'rgba(0, 198, 255, 0.6)';
      ctx.lineWidth = 1.5;
      
      for (const shape of shapes) {
        // Update position
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;
        
        // Boundary check with wrap-around
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
        
        // Draw shape
        shapeTypes[shape.type](shape.x, shape.y, shape.size, shape.rotation);
      }
      
      // Update and draw digital rain
      for (const column of rainColumns) {
        // Add new drops
        column.nextDrop--;
        if (column.nextDrop <= 0) {
          column.drops.push({
            y: 0,
            speed: Math.random() * 3 + 1,
            char: chars[Math.floor(Math.random() * chars.length)],
            opacity: 1
          });
          column.nextDrop = Math.random() * 100 + 50;
        }
        
        // Update and draw drops
        for (let i = column.drops.length - 1; i >= 0; i--) {
          const drop = column.drops[i];
          drop.y += drop.speed;
          
          // Remove drops that are off-screen
          if (drop.y > canvas.height) {
            column.drops.splice(i, 1);
            continue;
          }
          
          // Draw character
          ctx.font = '14px monospace';
          ctx.fillStyle = i === column.drops.length - 1 
            ? 'rgba(0, 255, 157, 0.9)' 
            : `rgba(0, 198, 255, ${drop.opacity})`;
          ctx.fillText(drop.char, column.x, drop.y);
          
          // Randomly change character
          if (Math.random() < 0.1) {
            drop.char = chars[Math.floor(Math.random() * chars.length)];
          }
          
          // Fade out older drops
          drop.opacity -= 0.005;
        }
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Resize handler
    bg.resize = () => {
      // Update rain columns
      const newColumnCount = Math.floor(canvas.width / 20);
      rainColumns.length = 0;
      
      for (let i = 0; i < newColumnCount; i++) {
        rainColumns.push({
          x: i * 20 + 10,
          drops: [],
          nextDrop: Math.random() * 100
        });
      }
    };
    
    // Store background
    this.backgrounds.education = bg;
  }
  
  // Experience Section - Circuit Board Pattern
  createExperienceBackground() {
    const bg = this.createCanvas('experience', 'experience-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Circuit properties
    const gridSize = 30;
    const nodeRadius = 2;
    const nodes = [];
    const connections = [];
    const activeConnections = [];
    
    // Create grid of nodes
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Add some randomness to grid
        const offsetX = (Math.random() - 0.5) * gridSize * 0.5;
        const offsetY = (Math.random() - 0.5) * gridSize * 0.5;
        
        nodes.push({
          x: x * gridSize + offsetX,
          y: y * gridSize + offsetY,
          connections: []
        });
      }
    }
    
    // Connect nodes (circuit traces)
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Find closest nodes
      const neighbors = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        
        const neighbor = nodes[j];
        const dx = node.x - neighbor.x;
        const dy = node.y - neighbor.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < gridSize * 1.5) {
          neighbors.push({
            node: neighbor,
            distance
          });
        }
      }
      
      // Sort by distance and connect to closest
      neighbors.sort((a, b) => a.distance - b.distance);
      const connectCount = Math.floor(Math.random() * 3) + 1; // 1-3 connections
      
      for (let j = 0; j < Math.min(connectCount, neighbors.length); j++) {
        const neighbor = neighbors[j].node;
        
        // Check if connection already exists
        if (!node.connections.includes(neighbor) && !neighbor.connections.includes(node)) {
          node.connections.push(neighbor);
          neighbor.connections.push(node);
          
          connections.push({
            from: node,
            to: neighbor,
            active: false,
            pulsePosition: 0,
            pulseSpeed: 0
          });
        }
      }
    }
    
    // Animation variables
    let time = 0;
    let animationId;
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.016;
      
      // Randomly activate connections
      if (Math.random() < 0.05 && activeConnections.length < 10) {
        const availableConnections = connections.filter(c => !c.active);
        if (availableConnections.length > 0) {
          const connection = availableConnections[Math.floor(Math.random() * availableConnections.length)];
          connection.active = true;
          connection.pulsePosition = 0;
          connection.pulseSpeed = Math.random() * 0.02 + 0.01;
          activeConnections.push(connection);
        }
      }
      
      // Draw connections
      ctx.lineWidth = 1;
      
      for (const connection of connections) {
        if (connection.active) {
          // Draw active connection with pulse
          const gradient = ctx.createLinearGradient(
            connection.from.x, connection.from.y,
            connection.to.x, connection.to.y
          );
          
          gradient.addColorStop(0, 'rgba(255, 0, 200, 0.3)');
          gradient.addColorStop(connection.pulsePosition - 0.05, 'rgba(255, 0, 200, 0.3)');
          gradient.addColorStop(connection.pulsePosition, 'rgba(255, 0, 200, 0.8)');
          gradient.addColorStop(Math.min(1, connection.pulsePosition + 0.05), 'rgba(255, 0, 200, 0.3)');
          gradient.addColorStop(1, 'rgba(255, 0, 200, 0.3)');
          
          ctx.strokeStyle = gradient;
          
          // Update pulse position
          connection.pulsePosition += connection.pulseSpeed;
          if (connection.pulsePosition > 1) {
            connection.active = false;
            activeConnections.splice(activeConnections.indexOf(connection), 1);
          }
        } else {
          // Draw inactive connection
          ctx.strokeStyle = 'rgba(0, 198, 255, 0.15)';
        }
        
        ctx.beginPath();
        ctx.moveTo(connection.from.x, connection.from.y);
        ctx.lineTo(connection.to.x, connection.to.y);
        ctx.stroke();
      }
      
      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 198, 255, 0.5)';
        ctx.fill();
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Resize handler
    bg.resize = () => {
      // Recreate the circuit when canvas is resized
      nodes.length = 0;
      connections.length = 0;
      activeConnections.length = 0;
      
      // Create grid of nodes
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const offsetX = (Math.random() - 0.5) * gridSize * 0.5;
          const offsetY = (Math.random() - 0.5) * gridSize * 0.5;
          
          nodes.push({
            x: x * gridSize + offsetX,
            y: y * gridSize + offsetY,
            connections: []
          });
        }
      }
      
      // Connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const neighbors = [];
        
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          
          const neighbor = nodes[j];
          const dx = node.x - neighbor.x;
          const dy = node.y - neighbor.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < gridSize * 1.5) {
            neighbors.push({
              node: neighbor,
              distance
            });
          }
        }
        
        neighbors.sort((a, b) => a.distance - b.distance);
        const connectCount = Math.floor(Math.random() * 3) + 1;
        
        for (let j = 0; j < Math.min(connectCount, neighbors.length); j++) {
          const neighbor = neighbors[j].node;
          
          if (!node.connections.includes(neighbor) && !neighbor.connections.includes(node)) {
            node.connections.push(neighbor);
            neighbor.connections.push(node);
            
            connections.push({
              from: node,
              to: neighbor,
              active: false,
              pulsePosition: 0,
              pulseSpeed: 0
            });
          }
        }
      }
    };
    
    // Store background
    this.backgrounds.experience = bg;
  }
  
  // Skills Section - Particle Galaxy
  createSkillsBackground() {
    const bg = this.createCanvas('skills', 'skills-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Particles
    const particles = [];
    const particleCount = 200;
    
    // Star colors
    const colors = [
      '#00c6ff', // Cyan
      '#00ff9d', // Green
      '#ff00c8', // Magenta
      '#ffffff'  // White
    ];
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const distance = Math.random() * canvas.width * 0.4;
      const angle = Math.random() * Math.PI * 2;
      
      particles.push({
        x: canvas.width / 2 + Math.cos(angle) * distance,
        y: canvas.height / 2 + Math.sin(angle) * distance,
        radius: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle,
        distance,
        orbitSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() < 0.5 ? 1 : -1),
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
    
    // Animation variables
    let time = 0;
    let animationId;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    // Add mouse move listener
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = 'rgba(10, 14, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Calculate center of gravity (follows mouse with delay)
      const centerX = canvas.width / 2 + (mouseX - canvas.width / 2) * 0.1;
      const centerY = canvas.height / 2 + (mouseY - canvas.height / 2) * 0.1;
      
      // Draw and update particles
      for (const particle of particles) {
        // Update orbit
        particle.angle += particle.orbitSpeed;
        
        // Calculate position
        particle.x = centerX + Math.cos(particle.angle) * particle.distance;
        particle.y = centerY + Math.sin(particle.angle) * particle.distance;
        
        // Twinkle effect
        const twinkle = Math.sin(time * particle.twinkleSpeed + particle.twinkleOffset) * 0.5 + 0.5;
        const radius = particle.radius * (1 + twinkle * 0.5);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.5 + twinkle * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, radius,
          particle.x, particle.y, radius * 3
        );
        gradient.addColorStop(0, particle.color.replace(')', ', 0.3)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, particle.color.replace(')', ', 0)').replace('rgb', 'rgba'));
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Cleanup
    bg.cleanup = () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
    
    // Store background
    this.backgrounds.skills = bg;
  }
  
  // Portfolio Section - Holographic Displays
  createPortfolioBackground() {
    const bg = this.createCanvas('portfolio', 'portfolio-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Holographic grid
    const gridSize = 40;
    const gridLines = [];
    
    // Create grid lines
    const cols = Math.ceil(canvas.width / gridSize) + 1;
    const rows = Math.ceil(canvas.height / gridSize) + 1;
    
    // Horizontal lines
    for (let y = 0; y < rows; y++) {
      gridLines.push({
        x1: 0,
        y1: y * gridSize,
        x2: canvas.width,
        y2: y * gridSize,
        direction: 'horizontal',
        offset: Math.random() * Math.PI * 2
      });
    }
    
    // Vertical lines
    for (let x = 0; x < cols; x++) {
      gridLines.push({
        x1: x * gridSize,
        y1: 0,
        x2: x * gridSize,
        y2: canvas.height,
        direction: 'vertical',
        offset: Math.random() * Math.PI * 2
      });
    }
    
    // Holographic elements
    const holoElements = [];
    const elementCount = 5;
    
    // Create holographic elements
    for (let i = 0; i < elementCount; i++) {
      holoElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        pulseSpeed: Math.random() * 0.05 + 0.02,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
    
    // Animation variables
    let time = 0;
    let animationId;
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Draw grid
      for (const line of gridLines) {
        // Calculate opacity with wave effect
        const wave = Math.sin(time * 2 + line.offset) * 0.5 + 0.5;
        const opacity = 0.1 + wave * 0.1;
        
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(0, 198, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw holographic elements
      for (const element of holoElements) {
        // Update rotation
        element.rotation += element.rotationSpeed;
        
        // Pulse effect
        const pulse = Math.sin(time * element.pulseSpeed + element.pulseOffset) * 0.5 + 0.5;
        
        // Draw element
        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(element.rotation);
        
        // Draw outer circle
        ctx.beginPath();
        ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 198, 255, ${0.2 + pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw inner circle
        ctx.beginPath();
        ctx.arc(0, 0, element.size / 3, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 157, ${0.2 + pulse * 0.3})`;
        ctx.stroke();
        
        // Draw cross lines
        ctx.beginPath();
        ctx.moveTo(-element.size / 2, 0);
        ctx.lineTo(element.size / 2, 0);
        ctx.moveTo(0, -element.size / 2);
        ctx.lineTo(0, element.size / 2);
        ctx.strokeStyle = `rgba(255, 0, 200, ${0.2 + pulse * 0.3})`;
        ctx.stroke();
        
        // Draw scan line
        ctx.beginPath();
        const scanY = (Math.sin(time * 2) * element.size / 2);
        ctx.moveTo(-element.size / 2, scanY);
        ctx.lineTo(element.size / 2, scanY);
        ctx.strokeStyle = `rgba(0, 255, 157, ${0.5 + pulse * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Resize handler
    bg.resize = () => {
      // Recreate grid lines
      gridLines.length = 0;
      
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      
      // Horizontal lines
      for (let y = 0; y < rows; y++) {
        gridLines.push({
          x1: 0,
          y1: y * gridSize,
          x2: canvas.width,
          y2: y * gridSize,
          direction: 'horizontal',
          offset: Math.random() * Math.PI * 2
        });
      }
      
      // Vertical lines
      for (let x = 0; x < cols; x++) {
        gridLines.push({
          x1: x * gridSize,
          y1: 0,
          x2: x * gridSize,
          y2: canvas.height,
          direction: 'vertical',
          offset: Math.random() * Math.PI * 2
        });
      }
      
      // Reposition holographic elements
      for (const element of holoElements) {
        element.x = Math.random() * canvas.width;
        element.y = Math.random() * canvas.height;
      }
    };
    
    // Store background
    this.backgrounds.portfolio = bg;
  }
  
  // Contact Section - Digital Pulse
  createContactBackground() {
    const bg = this.createCanvas('contact', 'contact-canvas');
    if (!bg) return;
    
    const { canvas, ctx } = bg;
    
    // Pulse waves
    const waves = [];
    const maxWaves = 5;
    
    // Connection points
    const points = [];
    const pointCount = 20;
    
    // Initialize points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }
    
    // Animation variables
    let time = 0;
    let animationId;
    
    // Draw function
    const draw = () => {
      if (bg.paused) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update time
      time += 0.01;
      
      // Add new wave every 2 seconds
      if (time % 2 < 0.02 && waves.length < maxWaves) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        waves.push({
          x: centerX,
          y: centerY,
          radius: 0,
          maxRadius: Math.max(canvas.width, canvas.height),
          speed: 2,
          color: Math.random() < 0.5 ? '#00c6ff' : '#ff00c8'
        });
      }
      
      // Update and draw waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        
        // Remove waves that are too large
        if (wave.radius > wave.maxRadius) {
          waves.splice(i, 1);
          continue;
        }
        
        // Draw wave
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        const opacity = 1 - wave.radius / wave.maxRadius;
        ctx.strokeStyle = wave.color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Update points
      for (const point of points) {
        // Update position
        point.x += point.speedX;
        point.y += point.speedY;
        
        // Boundary check with bounce
        if (point.x < 0 || point.x > canvas.width) point.speedX *= -1;
        if (point.y < 0 || point.y > canvas.height) point.speedY *= -1;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00c6ff';
        ctx.fill();
      }
      
      // Draw connections
      ctx.strokeStyle = 'rgba(0, 198, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.globalAlpha = 1 - distance / 150;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      // Request next frame
      animationId = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Add methods for pausing/resuming
    bg.pause = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };
    
    bg.resume = () => {
      if (!animationId) {
        draw();
      }
    };
    
    // Store background
    this.backgrounds.contact = bg;
  }
}

// Initialize when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  // Create section backgrounds
  new SectionBackgrounds();
});
