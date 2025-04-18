/**
 * Remove Portfolio Icons
 * Removes unnecessary icons from portfolio items
 */

document.addEventListener('DOMContentLoaded', function() {
  // Remove search icons from portfolio items
  removePortfolioIcons();
  
  function removePortfolioIcons() {
    // Get all portfolio detail buttons with search icons
    const detailButtons = document.querySelectorAll('.portfolio-details-btn');
    
    // Remove each button
    detailButtons.forEach(button => {
      button.remove();
    });
    
    // Simplify the overlay content - keep only GitHub links
    const overlayContents = document.querySelectorAll('.portfolio-overlay-content');
    
    overlayContents.forEach(content => {
      // Find the GitHub link
      const githubLink = content.querySelector('a.portfolio-link');
      
      if (githubLink) {
        // Clear the content and only keep the GitHub link
        content.innerHTML = '';
        content.appendChild(githubLink);
        
        // Make GitHub link more prominent
        githubLink.style.fontSize = '1.5em';
        githubLink.style.padding = '15px';
      }
    });
    
    console.log('Portfolio icons removed');
  }
});
