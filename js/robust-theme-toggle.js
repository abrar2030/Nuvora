/**
 * Robust Theme Toggle Functionality
 * Handles day/night theme switching with reliable functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (!themeToggle) {
    console.error('Theme toggle button not found');
    return;
  }
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Set initial theme
  if (savedTheme === 'light') {
    applyLightTheme();
  } else {
    applyDarkTheme(); // Default to dark theme if no preference or preference is dark
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
  
  // Toggle theme function
  function toggleTheme(e) {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
    
    if (body.classList.contains('dark-theme')) {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
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
  
  // Add debug message to confirm script is loaded
  console.log('Robust theme toggle initialized');
});
