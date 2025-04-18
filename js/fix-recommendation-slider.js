/**
 * Fix Recommendation Slider
 * Ensures the recommendation section navigation works properly
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the recommendation slider
  setTimeout(function() {
    initRecommendationSlider();
  }, 100); // Small delay to ensure all other scripts have run
  
  function initRecommendationSlider() {
    // Get slider elements
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    // Check if elements exist
    if (!recommendationItems.length || !prevButton || !nextButton || !sliderDots.length) {
      console.error('Recommendation slider elements not found');
      return;
    }
    
    // Set initial state - force first recommendation
    let currentIndex = 0;
    
    // Explicitly set display style for all items
    recommendationItems.forEach((item, index) => {
      // Force hide all items initially
      item.style.display = 'none';
      item.classList.remove('active');
    });
    
    // Force show first item
    if (recommendationItems[0]) {
      recommendationItems[0].style.display = 'block';
      recommendationItems[0].classList.add('active');
      console.log('Forcing display of first recommendation');
    }
    
    // Update dots to match first recommendation
    sliderDots.forEach((dot, index) => {
      if (index === 0) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Add event listeners to buttons with improved handling
    prevButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + recommendationItems.length) % recommendationItems.length;
      updateSlider();
      console.log('Previous recommendation clicked, now showing index:', currentIndex);
    });
    
    nextButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % recommendationItems.length;
      updateSlider();
      console.log('Next recommendation clicked, now showing index:', currentIndex);
    });
    
    // Add event listeners to dots
    sliderDots.forEach((dot, index) => {
      dot.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = index;
        updateSlider();
        console.log('Dot clicked, now showing index:', currentIndex);
      });
    });
    
    // Function to update slider state
    function updateSlider() {
      // Hide all items
      recommendationItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('active');
      });
      
      // Show current item
      recommendationItems[currentIndex].style.display = 'block';
      recommendationItems[currentIndex].classList.add('active');
      
      // Update dots
      sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
      
      // Ensure buttons are visible and clickable
      prevButton.style.display = 'flex';
      nextButton.style.display = 'flex';
      prevButton.style.pointerEvents = 'auto';
      nextButton.style.pointerEvents = 'auto';
      prevButton.style.cursor = 'pointer';
      nextButton.style.cursor = 'pointer';
      prevButton.style.opacity = '1';
      nextButton.style.opacity = '1';
      
      // Add visual feedback for buttons
      prevButton.style.position = 'relative';
      nextButton.style.position = 'relative';
      prevButton.style.zIndex = '10';
      nextButton.style.zIndex = '10';
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + recommendationItems.length) % recommendationItems.length;
        updateSlider();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % recommendationItems.length;
        updateSlider();
      }
    });
    
    // Add touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const recommendationContainer = document.querySelector('.recommendations-slider');
    if (recommendationContainer) {
      recommendationContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, false);
      
      recommendationContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, false);
      
      function handleSwipe() {
        if (touchEndX < touchStartX) {
          // Swipe left, show next
          currentIndex = (currentIndex + 1) % recommendationItems.length;
          updateSlider();
        } else if (touchEndX > touchStartX) {
          // Swipe right, show previous
          currentIndex = (currentIndex - 1 + recommendationItems.length) % recommendationItems.length;
          updateSlider();
        }
      }
    }
    
    console.log('Recommendation slider initialized with', recommendationItems.length, 'items');
  }
});

// Add a window load event to ensure the first recommendation is shown
window.addEventListener('load', function() {
  // Force first recommendation to be visible after page is fully loaded
  setTimeout(function() {
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (recommendationItems.length) {
      // Hide all items
      recommendationItems.forEach((item, index) => {
        item.style.display = 'none';
        item.classList.remove('active');
      });
      
      // Show first item
      recommendationItems[0].style.display = 'block';
      recommendationItems[0].classList.add('active');
      
      // Update dots
      if (sliderDots.length) {
        sliderDots.forEach((dot, index) => {
          dot.classList.toggle('active', index === 0);
        });
      }
      
      console.log('Window load: Forced display of first recommendation');
    }
  }, 300); // Delay to ensure everything else has loaded
});
