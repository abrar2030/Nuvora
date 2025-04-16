/**
 * Enhanced Theme Toggle Functionality
 * Handles dark/light theme switching with proper UI updates
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (!themeToggle) return;
  
  // Check for system preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Function to update UI based on current theme
  const updateThemeUI = (isDark) => {
    // Update body class
    if (isDark) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
    
    // Update theme toggle icon visibility if needed
    const moonIcon = document.querySelector('.theme-toggle .fa-moon');
    const sunIcon = document.querySelector('.theme-toggle .fa-sun');
    
    if (moonIcon && sunIcon) {
      if (isDark) {
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'translateY(-100%)';
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'translateY(0)';
      } else {
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'translateY(0)';
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'translateY(100%)';
      }
    }
    
    // Dispatch custom event for other components that need to react to theme changes
    const themeChangeEvent = new CustomEvent('themechange', { 
      detail: { isDark } 
    });
    document.dispatchEvent(themeChangeEvent);
  };
  
  // Apply saved theme or system preference
  if (savedTheme === 'dark' || (savedTheme === null && prefersDarkScheme.matches)) {
    updateThemeUI(true);
  } else {
    updateThemeUI(false);
  }
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    const isDarkTheme = body.classList.contains('dark-theme');
    updateThemeUI(!isDarkTheme);
    
    // Save theme preference
    localStorage.setItem('theme', !isDarkTheme ? 'dark' : 'light');
  });
  
  // Listen for system preference changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
      updateThemeUI(e.matches);
    }
  });
});
