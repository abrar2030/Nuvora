/**
 * Enhanced Theme Toggle Functionality
 * Handles dark/light theme switching with proper UI updates
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (!themeToggle) return;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    body.classList.add(savedTheme + '-theme');
  }
  
  // Toggle theme function
  function toggleTheme() {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
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
  
  // Add debug message to confirm script is loaded
  console.log('Theme toggle initialized');
});
