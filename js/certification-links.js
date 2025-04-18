// Function to add certification verification buttons
document.addEventListener('DOMContentLoaded', function() {
  // Get all certification items
  const certificationItems = document.querySelectorAll('.certification-item');
  
  // Certification verification URLs mapping
  const certificationVerifyUrls = {
    'SQL (Advanced)': 'https://www.hackerrank.com/certificates/iframe/bfd758408ff3',
    'Software Engineer': 'https://www.hackerrank.com/certificates/iframe/407808ada668',
    'DevOps in Google Cloud': 'https://www.cloudskillsboost.google/public_profiles/1601f1ee-b805-48be-a523-753d139f53cf/badges/13533180',
    'Terraform in Google Cloud': 'https://www.credly.com/badges/af1f1708-6284-438e-a618-d1b05e7ca3df',
    'Kubernetes in Google Cloud': 'https://www.cloudskillsboost.google/public_profiles/1601f1ee-b805-48be-a523-753d139f53cf/badges/13533180',
    'AWS Well-Architected Proficient': 'https://www.credly.com/badges/7be07071-23b7-4916-a8a7-51fbdd071ae2'
  };
  
  certificationItems.forEach(item => {
    // Find the certification content div
    const contentDiv = item.querySelector('.certification-content');
    
    // Find the certification title
    const titleElement = contentDiv.querySelector('.certification-title');
    const certTitle = titleElement ? titleElement.textContent.trim() : '';
    
    // Find the certification link
    const certLink = contentDiv.querySelector('.certification-link');
    
    if (contentDiv && certTitle && certificationVerifyUrls[certTitle]) {
      // Update the certification link URL
      if (certLink) {
        certLink.setAttribute('href', certificationVerifyUrls[certTitle]);
      }
      
      // Find the verify button if it exists
      const verifyBtn = contentDiv.querySelector('.certification-verify-btn');
      
      if (verifyBtn) {
        // Update existing verify button
        verifyBtn.setAttribute('href', certificationVerifyUrls[certTitle]);
      }
    }
  });
});
