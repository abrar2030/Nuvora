/**
 * Remove All Portfolio Icons
 * Completely removes all icons from portfolio items as requested by user
 */

document.addEventListener('DOMContentLoaded', function() {
  // Remove all icons from portfolio items
  removeAllPortfolioIcons();
  
  function removeAllPortfolioIcons() {
    console.log('Removing ALL portfolio icons...');
    
    // Get all portfolio overlays
    const portfolioOverlays = document.querySelectorAll('.portfolio-overlay');
    
    // Remove all overlay content completely
    portfolioOverlays.forEach(overlay => {
      // Either hide the entire overlay or make it a simple transparent overlay without icons
      overlay.innerHTML = ''; // Remove all content inside overlay
      
      // Style the overlay to still provide hover effect but without any icons
      overlay.style.display = 'block';
      overlay.style.background = 'rgba(26, 32, 44, 0.8)';
      overlay.style.transition = 'opacity 0.3s ease';
    });
    
    // Store GitHub URLs for each project to maintain clickability of the entire card
    const projectLinks = {};
    
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      // Find the project title
      const titleElement = item.querySelector('.portfolio-title');
      if (!titleElement) return;
      
      const projectTitle = titleElement.textContent.trim();
      
      // Find the GitHub link URL
      const githubLink = item.querySelector('.portfolio-link[href*="github"]');
      if (githubLink) {
        const githubUrl = githubLink.getAttribute('href');
        projectLinks[projectTitle] = githubUrl;
        
        // Make the entire portfolio card clickable
        const portfolioCard = item.querySelector('.portfolio-card');
        if (portfolioCard) {
          portfolioCard.style.cursor = 'pointer';
          portfolioCard.style.position = 'relative';
          
          // Add click event listener to the entire card
          portfolioCard.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(githubUrl, '_blank');
          });
        }
      }
    });
    
    console.log('All portfolio icons completely removed');
    console.log('Made portfolio cards clickable with these GitHub links:', projectLinks);
  }
});
