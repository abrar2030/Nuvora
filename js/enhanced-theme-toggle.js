/**
 * Enhanced Theme Toggle Functionality
 * Handles dark/light theme switching with improved animations and user feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Create theme transition overlay
  const transitionOverlay = document.createElement('div');
  transitionOverlay.className = 'theme-transition-overlay';
  document.body.appendChild(transitionOverlay);
  
  // Create theme indicator
  const themeIndicator = document.createElement('div');
  themeIndicator.className = 'theme-indicator';
  document.body.appendChild(themeIndicator);
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    // Apply saved theme
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme + '-theme');
    body.setAttribute('data-theme', savedTheme);
  } else {
    // Check system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDarkScheme ? 'dark' : 'light';
    
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(defaultTheme + '-theme');
    body.setAttribute('data-theme', defaultTheme);
    localStorage.setItem('theme', defaultTheme);
  }
  
  // Show current theme on page load
  showThemeIndicator();
  
  // Toggle theme function with enhanced animations
  function toggleTheme() {
    // Activate transition overlay
    transitionOverlay.classList.add('active');
    
    // Get current and new theme
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Delay theme switch for animation
    setTimeout(() => {
      // Switch theme
      body.classList.remove(currentTheme + '-theme');
      body.classList.add(newTheme + '-theme');
      body.setAttribute('data-theme', newTheme);
      
      // Save preference
      localStorage.setItem('theme', newTheme);
      
      // Remove overlay
      setTimeout(() => {
        transitionOverlay.classList.remove('active');
        
        // Show theme indicator
        showThemeIndicator();
      }, 300);
    }, 200);
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
  
  // Add click event listener
  themeToggle.addEventListener('click', toggleTheme);
  
  // Add keyboard support
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      body.classList.remove('dark-theme', 'light-theme');
      body.classList.add(newTheme + '-theme');
      body.setAttribute('data-theme', newTheme);
    }
  });
  
  // Add debug message to confirm script is loaded
  console.log('Enhanced theme toggle initialized');
});
