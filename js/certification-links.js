// Function to add certification link boxes to all certification cards
document.addEventListener('DOMContentLoaded', function() {
  // Get all certification cards
  const certificationCards = document.querySelectorAll('.certification-card');
  
  certificationCards.forEach(card => {
    // Find the original certification link
    const originalLink = card.querySelector('.certification-link');
    
    if (originalLink) {
      // Get the link URL and text
      const linkUrl = originalLink.getAttribute('href');
      const linkText = originalLink.textContent.trim();
      
      // Create the certification link box
      const linkBox = document.createElement('a');
      linkBox.className = 'certification-link-box';
      linkBox.href = linkUrl;
      linkBox.target = '_blank';
      
      // Add icon
      const icon = document.createElement('i');
      icon.className = 'fas fa-certificate';
      linkBox.appendChild(icon);
      
      // Add text
      const span = document.createElement('span');
      span.textContent = linkText;
      linkBox.appendChild(span);
      
      // Append to certification card
      card.appendChild(linkBox);
      
      // Hide the original link (CSS already handles this, but just to be sure)
      originalLink.style.display = 'none';
    }
  });
});
