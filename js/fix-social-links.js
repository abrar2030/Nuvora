/**
 * Fix Social Links
 * Ensures all social links in the Connect With Me section are properly clickable
 */

document.addEventListener('DOMContentLoaded', function() {
  // Fix social links in the Connect With Me section
  fixSocialLinks();
  
  // Function to fix social links
  function fixSocialLinks() {
    // Social media URLs mapping
    const socialUrls = {
      'linkedin': 'https://linkedin.com/in/abrar2030',
      'github': 'https://github.com/abrar2030',
      'facebook': 'https://facebook.com/abrar2O3O',
      'instagram': 'https://instagram.com/abrar2o3o'
    };
    
    // Get all social links in the Connect With Me section
    const contactSocialLinks = document.querySelectorAll('.contact-social .social-links .social-link');
    
    // Get all social links in the footer
    const footerSocialLinks = document.querySelectorAll('.footer-social .social-link');
    
    // Fix all social links
    fixLinks(contactSocialLinks);
    fixLinks(footerSocialLinks);
    
    function fixLinks(links) {
      links.forEach(link => {
        // Determine which social platform this is
        let platform = '';
        if (link.querySelector('.fa-linkedin-in')) platform = 'linkedin';
        else if (link.querySelector('.fa-github')) platform = 'github';
        else if (link.querySelector('.fa-facebook-f')) platform = 'facebook';
        else if (link.querySelector('.fa-instagram')) platform = 'instagram';
        
        if (!platform || !socialUrls[platform]) return;
        
        // Update href and ensure it's clickable
        link.href = socialUrls[platform];
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.pointerEvents = 'auto';
        link.style.cursor = 'pointer';
        link.style.position = 'relative';
        link.style.zIndex = '20';
        
        // Remove any event listeners that might interfere
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add new click event listener
        newLink.addEventListener('click', function(e) {
          e.stopPropagation();
          window.open(socialUrls[platform], '_blank');
          console.log(`Opening ${platform} link: ${socialUrls[platform]}`);
        });
      });
    }
    
    console.log('Social links fixed');
  }
});
