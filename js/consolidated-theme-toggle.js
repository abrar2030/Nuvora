/**
 * Consolidated Theme Toggle Functionality
 * Combines the best features from all theme toggle implementations
 * to create a single, reliable solution.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Create theme transition overlay for smooth transitions
  const transitionOverlay = document.createElement('div');
  transitionOverlay.className = 'theme-transition-overlay';
  document.body.appendChild(transitionOverlay);
  
  // Create theme indicator for user feedback
  const themeIndicator = document.createElement('div');
  themeIndicator.className = 'theme-indicator';
  document.body.appendChild(themeIndicator);
  
  if (!themeToggle) {
    console.error('Theme toggle button not found');
    return;
  }
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'light') {
    applyLightTheme();
  } else if (savedTheme === 'dark' || prefersDarkScheme) {
    applyDarkTheme(); // Default to dark theme if preference is dark or system prefers dark
  } else {
    applyDarkTheme(); // Default fallback to dark theme
  }
  
  // Apply dark theme function
  function applyDarkTheme() {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    // Update icon visibility for dark theme
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
    
    console.log('Dark theme applied');
  }
  
  // Apply light theme function
  function applyLightTheme() {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    
    // Update icon visibility for light theme
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
    
    console.log('Light theme applied');
  }
  
  // Show theme indicator function
  function showThemeIndicator() {
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const icon = currentTheme === 'dark' ? 'moon' : 'sun';
    const text = currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
    
    themeIndicator.innerHTML = `<i class="fas fa-${icon}"></i>${text}`;
    themeIndicator.classList.add('show');
    
    // Hide after delay
    setTimeout(() => {
      themeIndicator.classList.remove('show');
    }, 2000);
  }
  
  // Toggle theme function with enhanced animations
  function toggleTheme(e) {
    if (e) {
      e.preventDefault(); // Prevent default behavior
      e.stopPropagation(); // Stop event propagation
    }
    
    // Activate transition overlay
    transitionOverlay.classList.add('active');
    
    // Delay theme switch for animation
    setTimeout(() => {
      if (body.classList.contains('dark-theme')) {
        applyLightTheme();
      } else {
        applyDarkTheme();
      }
      
      // Remove overlay
      setTimeout(() => {
        transitionOverlay.classList.remove('active');
        
        // Show theme indicator
        showThemeIndicator();
      }, 300);
    }, 200);
  }
  
  // Add click event listener with explicit binding
  themeToggle.onclick = toggleTheme;
  
  // Add keyboard support
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme(e);
    }
  });
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      if (newTheme === 'dark') {
        applyDarkTheme();
      } else {
        applyLightTheme();
      }
    }
  });
  
  // Show initial theme indicator
  setTimeout(() => {
    showThemeIndicator();
  }, 1000);
  
  // Add debug message to confirm script is loaded
  console.log('Consolidated theme toggle initialized');
});
