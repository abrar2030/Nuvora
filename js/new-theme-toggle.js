// Add the new theme toggle button to the page
document.addEventListener('DOMContentLoaded', () => {
  // Create a completely new theme toggle button that will be clearly visible
  // First, get the original theme toggle to access its functionality
  const originalThemeToggle = document.querySelector('.theme-toggle');

  if (originalThemeToggle) {
    // Create a new, more prominent button
    const newToggleBtn = document.createElement('button');
    newToggleBtn.id = 'new-theme-toggle';
    newToggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Toggle Theme</span>';
    newToggleBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #ff9500;
      color: #000;
      border: none;
      border-radius: 30px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px rgba(255, 149, 0, 0.9);
    `;
    
    // Add the button to the body
    document.body.appendChild(newToggleBtn);
    
    // Transfer the click event from the original toggle to the new button
    newToggleBtn.addEventListener('click', () => {
      // Simulate a click on the original toggle to maintain all functionality
      originalThemeToggle.click();
      
      // Update the icon and text based on the theme
      if (document.body.classList.contains('dark-theme')) {
        newToggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
      } else {
        newToggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
      }
    });
    
    // Set initial text based on current theme
    if (document.body.classList.contains('dark-theme')) {
      newToggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    } else {
      newToggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
    }
    
    console.log('Created new prominent theme toggle button');
  }
});
