// Function to add GitHub link boxes to all portfolio items
document.addEventListener('DOMContentLoaded', function() {
  // Get all portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  // Project GitHub URLs mapping
  const projectGithubUrls = {
    'PayNext Payment System': 'https://github.com/abrar2030/PayNext',
    'FinovaBank Platform': 'https://github.com/abrar2030/FinovaBank',
    'BlockGuardian Fraud Detection': 'https://github.com/abrar2030/BlockGuardian',
    'BlockScore Credit Scoring': 'https://github.com/abrar2030/BlockScore',
    'CarbonXchange Marketplace': 'https://github.com/abrar2030/CarbonXchange',
    'LendSmart Micro Lending': 'https://github.com/abrar2030/LendSmart'
  };
  
  portfolioItems.forEach(item => {
    // Find the portfolio content div
    const contentDiv = item.querySelector('.portfolio-content');
    
    // Find the project title
    const titleElement = contentDiv.querySelector('.portfolio-title');
    const projectTitle = titleElement ? titleElement.textContent.trim() : '';
    
    // Find the GitHub link in the overlay
    const githubLink = item.querySelector('.portfolio-overlay a[href*="github.com"]');
    
    if (contentDiv && githubLink && projectTitle && projectGithubUrls[projectTitle]) {
      // Update the GitHub URL in the overlay
      githubLink.setAttribute('href', projectGithubUrls[projectTitle]);
      
      // Check if a GitHub link box already exists
      if (!contentDiv.querySelector('.github-link-box')) {
        // Create the GitHub link box
        const linkBox = document.createElement('a');
        linkBox.className = 'github-link-box';
        linkBox.href = projectGithubUrls[projectTitle];
        linkBox.target = '_blank';
        linkBox.setAttribute('aria-label', 'View project on GitHub');
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = 'fab fa-github';
        linkBox.appendChild(icon);
        
        // Append to content div
        contentDiv.appendChild(linkBox);
      } else {
        // Update existing GitHub link box
        const existingLinkBox = contentDiv.querySelector('.github-link-box');
        existingLinkBox.href = projectGithubUrls[projectTitle];
      }
    }
  });
});
