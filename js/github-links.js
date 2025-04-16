// Function to add GitHub link boxes to all portfolio items
document.addEventListener('DOMContentLoaded', function() {
  // Get all portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    // Find the portfolio content div
    const contentDiv = item.querySelector('.portfolio-content');
    
    // Find the GitHub link in the overlay
    const githubLink = item.querySelector('.portfolio-overlay a[href*="github.com"]');
    
    if (contentDiv && githubLink) {
      // Get the GitHub URL
      const githubUrl = githubLink.getAttribute('href');
      
      // Create a simplified repo name from the URL
      const repoName = githubUrl.split('/').pop();
      const username = githubUrl.split('/')[3];
      const displayUrl = `github.com/${username}/${repoName}`;
      
      // Check if a GitHub link box already exists
      if (!contentDiv.querySelector('.github-link-box')) {
        // Create the GitHub link box
        const linkBox = document.createElement('a');
        linkBox.className = 'github-link-box';
        linkBox.href = githubUrl;
        linkBox.target = '_blank';
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = 'fab fa-github';
        linkBox.appendChild(icon);
        
        // Add text
        const span = document.createElement('span');
        span.textContent = displayUrl;
        linkBox.appendChild(span);
        
        // Append to content div
        contentDiv.appendChild(linkBox);
      }
    }
  });
});
