// Function to ensure project and certification links are clickable
document.addEventListener('DOMContentLoaded', function() {
  // Fix certification links
  fixCertificationLinks();
  
  // Fix GitHub project links
  fixGithubLinks();
  
  // Function to fix certification links
  function fixCertificationLinks() {
    // Certification verification URLs mapping
    const certificationVerifyUrls = {
      'SQL (Advanced)': 'https://www.hackerrank.com/certificates/iframe/bfd758408ff3',
      'Software Engineer': 'https://www.hackerrank.com/certificates/iframe/407808ada668',
      'DevOps in Google Cloud': 'https://www.cloudskillsboost.google/public_profiles/1601f1ee-b805-48be-a523-753d139f53cf/badges/13533180',
      'Terraform in Google Cloud': 'https://www.credly.com/badges/af1f1708-6284-438e-a618-d1b05e7ca3df',
      'Kubernetes in Google Cloud': 'https://www.credly.com/badges/638bf94d-f099-4173-b62b-be91bb814092',
      'AWS Well-Architected Proficient': 'https://www.credly.com/badges/7be07071-23b7-4916-a8a7-51fbdd071ae2'
    };
    
    // Get all certification items
    const certificationItems = document.querySelectorAll('.certification-item');
    
    certificationItems.forEach(item => {
      // Find the certification title
      const titleElement = item.querySelector('.certification-title');
      if (!titleElement) return;
      
      const certTitle = titleElement.textContent.trim();
      const certUrl = certificationVerifyUrls[certTitle];
      
      if (!certUrl) return;
      
      // Find and fix the certification link
      const certLink = item.querySelector('.certification-link');
      if (certLink) {
        certLink.href = certUrl;
        certLink.target = '_blank';
        certLink.style.pointerEvents = 'auto'; // Ensure it's clickable
        certLink.style.cursor = 'pointer';
      }
      
      // Find and fix the verify button
      const verifyBtn = item.querySelector('.certification-verify-btn');
      if (verifyBtn) {
        verifyBtn.href = certUrl;
        verifyBtn.target = '_blank';
        verifyBtn.style.pointerEvents = 'auto'; // Ensure it's clickable
        verifyBtn.style.cursor = 'pointer';
        
        // Add click event listener to ensure it works
        verifyBtn.addEventListener('click', function(e) {
          window.open(certUrl, '_blank');
        });
      }
    });
    
    console.log('Certification links fixed');
  }
  
  // Function to fix GitHub project links
  function fixGithubLinks() {
    // Project GitHub URLs mapping
    const projectGithubUrls = {
      'PayNext Payment System': 'https://github.com/abrar2030/PayNext',
      'FinovaBank Platform': 'https://github.com/abrar2030/FinovaBank',
      'BlockGuardian Fraud Detection': 'https://github.com/abrar2030/BlockGuardian',
      'BlockScore Credit Scoring': 'https://github.com/abrar2030/BlockScore',
      'CarbonXchange Marketplace': 'https://github.com/abrar2030/CarbonXchange',
      'LendSmart Micro Lending': 'https://github.com/abrar2030/LendSmart'
    };
    
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
      // Find the project title
      const titleElement = item.querySelector('.portfolio-title');
      if (!titleElement) return;
      
      const projectTitle = titleElement.textContent.trim();
      const githubUrl = projectGithubUrls[projectTitle];
      
      if (!githubUrl) return;
      
      // Find and fix the GitHub link in the overlay
      const githubLink = item.querySelector('.portfolio-overlay a[href*="github.com"]');
      if (githubLink) {
        githubLink.href = githubUrl;
        githubLink.target = '_blank';
        githubLink.style.pointerEvents = 'auto'; // Ensure it's clickable
        githubLink.style.cursor = 'pointer';
        
        // Add click event listener to ensure it works
        githubLink.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent event bubbling
          window.open(githubUrl, '_blank');
        });
      }
      
      // Find or create GitHub link box in the content area
      const contentDiv = item.querySelector('.portfolio-content');
      if (!contentDiv) return;
      
      let githubLinkBox = contentDiv.querySelector('.github-link-box');
      
      if (!githubLinkBox) {
        // Create the GitHub link box
        githubLinkBox = document.createElement('a');
        githubLinkBox.className = 'github-link-box';
        githubLinkBox.href = githubUrl;
        githubLinkBox.target = '_blank';
        githubLinkBox.setAttribute('aria-label', 'View project on GitHub');
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = 'fab fa-github';
        githubLinkBox.appendChild(icon);
        
        // Append to content div
        contentDiv.appendChild(githubLinkBox);
      } else {
        // Update existing GitHub link box
        githubLinkBox.href = githubUrl;
      }
      
      // Ensure the link box is clickable
      githubLinkBox.style.pointerEvents = 'auto';
      githubLinkBox.style.cursor = 'pointer';
      
      // Add click event listener to ensure it works
      githubLinkBox.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        window.open(githubUrl, '_blank');
      });
    });
    
    console.log('GitHub project links fixed');
  }
});
