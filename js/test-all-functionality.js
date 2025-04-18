/**
 * Test All Functionality
 * Comprehensive testing of all website features
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('=== WEBSITE FUNCTIONALITY TEST STARTED ===');
  
  // Test theme toggle
  testThemeToggle();
  
  // Test social links
  testSocialLinks();
  
  // Test project links
  testProjectLinks();
  
  // Test certification links
  testCertificationLinks();
  
  // Test recommendation slider
  testRecommendationSlider();
  
  // Function to test theme toggle
  function testThemeToggle() {
    console.log('Testing theme toggle...');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (!themeToggle) {
      console.error('Theme toggle not found');
      return;
    }
    
    // Store initial theme
    const initialTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    console.log('Initial theme:', initialTheme);
    
    // Simulate click on theme toggle
    themeToggle.click();
    
    // Check if theme changed
    const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    console.log('Theme after toggle:', newTheme);
    
    // Toggle back to original theme
    themeToggle.click();
    
    // Verify we're back to initial theme
    const finalTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    console.log('Theme after second toggle:', finalTheme);
    
    if (initialTheme === finalTheme) {
      console.log('✅ Theme toggle test passed');
    } else {
      console.error('❌ Theme toggle test failed');
    }
  }
  
  // Function to test social links
  function testSocialLinks() {
    console.log('Testing social links...');
    
    // Test contact section social links
    const contactSocialLinks = document.querySelectorAll('.contact-social .social-links .social-link');
    testLinks(contactSocialLinks, 'Contact section social links');
    
    // Test footer social links
    const footerSocialLinks = document.querySelectorAll('.footer-social .social-link');
    testLinks(footerSocialLinks, 'Footer social links');
    
    function testLinks(links, sectionName) {
      if (links.length === 0) {
        console.error(`❌ No ${sectionName} found`);
        return;
      }
      
      console.log(`Found ${links.length} ${sectionName}`);
      
      let allLinksValid = true;
      links.forEach((link, index) => {
        const href = link.getAttribute('href');
        const hasPointerEvents = window.getComputedStyle(link).pointerEvents !== 'none';
        const hasCursor = window.getComputedStyle(link).cursor === 'pointer';
        
        if (!href || !hasPointerEvents || !hasCursor) {
          console.error(`❌ Link #${index} in ${sectionName} has issues:`, {
            href: href || 'missing',
            pointerEvents: hasPointerEvents ? 'auto' : 'none',
            cursor: hasCursor ? 'pointer' : 'not pointer'
          });
          allLinksValid = false;
        }
      });
      
      if (allLinksValid) {
        console.log(`✅ All ${sectionName} are valid and clickable`);
      } else {
        console.error(`❌ Some ${sectionName} have issues`);
      }
    }
  }
  
  // Function to test project links
  function testProjectLinks() {
    console.log('Testing project links...');
    
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    if (portfolioLinks.length === 0) {
      console.error('❌ No portfolio links found');
      return;
    }
    
    console.log(`Found ${portfolioLinks.length} portfolio links`);
    
    let allLinksValid = true;
    portfolioLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      const hasPointerEvents = window.getComputedStyle(link).pointerEvents !== 'none';
      const hasCursor = window.getComputedStyle(link).cursor === 'pointer';
      
      if (!href || !hasPointerEvents || !hasCursor) {
        console.error(`❌ Portfolio link #${index} has issues:`, {
          href: href || 'missing',
          pointerEvents: hasPointerEvents ? 'auto' : 'none',
          cursor: hasCursor ? 'pointer' : 'not pointer'
        });
        allLinksValid = false;
      }
    });
    
    // Check if unwanted icons were removed
    const detailButtons = document.querySelectorAll('.portfolio-details-btn');
    if (detailButtons.length > 0) {
      console.error(`❌ Found ${detailButtons.length} detail buttons that should have been removed`);
      allLinksValid = false;
    } else {
      console.log('✅ All detail buttons successfully removed');
    }
    
    if (allLinksValid) {
      console.log('✅ All portfolio links are valid and clickable');
    } else {
      console.error('❌ Some portfolio links have issues');
    }
  }
  
  // Function to test certification links
  function testCertificationLinks() {
    console.log('Testing certification links...');
    
    const certificationLinks = document.querySelectorAll('.certification-verify-btn');
    if (certificationLinks.length === 0) {
      console.error('❌ No certification links found');
      return;
    }
    
    console.log(`Found ${certificationLinks.length} certification links`);
    
    let allLinksValid = true;
    certificationLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      const hasPointerEvents = window.getComputedStyle(link).pointerEvents !== 'none';
      const hasCursor = window.getComputedStyle(link).cursor === 'pointer';
      
      if (!href || !hasPointerEvents || !hasCursor) {
        console.error(`❌ Certification link #${index} has issues:`, {
          href: href || 'missing',
          pointerEvents: hasPointerEvents ? 'auto' : 'none',
          cursor: hasCursor ? 'pointer' : 'not pointer'
        });
        allLinksValid = false;
      }
    });
    
    if (allLinksValid) {
      console.log('✅ All certification links are valid and clickable');
    } else {
      console.error('❌ Some certification links have issues');
    }
  }
  
  // Function to test recommendation slider
  function testRecommendationSlider() {
    console.log('Testing recommendation slider...');
    
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (!recommendationItems.length || !prevButton || !nextButton || !sliderDots.length) {
      console.error('❌ Recommendation slider elements not found');
      return;
    }
    
    console.log(`Found ${recommendationItems.length} recommendation items`);
    
    // Test next button
    const initialActiveItem = document.querySelector('.recommendation-item.active') || recommendationItems[0];
    const initialIndex = Array.from(recommendationItems).indexOf(initialActiveItem);
    
    console.log('Initial active recommendation index:', initialIndex);
    
    // Check if next button is clickable
    const nextButtonClickable = window.getComputedStyle(nextButton).pointerEvents !== 'none';
    const nextButtonVisible = window.getComputedStyle(nextButton).display !== 'none';
    
    if (!nextButtonClickable || !nextButtonVisible) {
      console.error('❌ Next button is not clickable or visible:', {
        pointerEvents: nextButtonClickable ? 'auto' : 'none',
        display: nextButtonVisible ? 'visible' : 'hidden'
      });
    } else {
      console.log('✅ Next button is clickable and visible');
      
      // Simulate click on next button
      nextButton.click();
      
      // Check if item changed
      setTimeout(() => {
        const newActiveItem = document.querySelector('.recommendation-item.active') || recommendationItems[0];
        const newIndex = Array.from(recommendationItems).indexOf(newActiveItem);
        
        console.log('Active recommendation index after next click:', newIndex);
        
        if ((initialIndex + 1) % recommendationItems.length === newIndex) {
          console.log('✅ Next button works correctly');
        } else {
          console.error('❌ Next button did not change to the correct item');
        }
        
        // Test previous button
        const prevButtonClickable = window.getComputedStyle(prevButton).pointerEvents !== 'none';
        const prevButtonVisible = window.getComputedStyle(prevButton).display !== 'none';
        
        if (!prevButtonClickable || !prevButtonVisible) {
          console.error('❌ Previous button is not clickable or visible:', {
            pointerEvents: prevButtonClickable ? 'auto' : 'none',
            display: prevButtonVisible ? 'visible' : 'hidden'
          });
        } else {
          console.log('✅ Previous button is clickable and visible');
          
          // Simulate click on previous button
          prevButton.click();
          
          // Check if item changed back to initial
          setTimeout(() => {
            const finalActiveItem = document.querySelector('.recommendation-item.active') || recommendationItems[0];
            const finalIndex = Array.from(recommendationItems).indexOf(finalActiveItem);
            
            console.log('Active recommendation index after prev click:', finalIndex);
            
            if (initialIndex === finalIndex) {
              console.log('✅ Previous button works correctly');
            } else {
              console.error('❌ Previous button did not change to the correct item');
            }
            
            // Test dots
            if (sliderDots.length === recommendationItems.length) {
              console.log('✅ Correct number of slider dots');
              
              // Test clicking a dot
              const targetDotIndex = (initialIndex + 1) % sliderDots.length;
              sliderDots[targetDotIndex].click();
              
              setTimeout(() => {
                const dotActiveItem = document.querySelector('.recommendation-item.active') || recommendationItems[0];
                const dotIndex = Array.from(recommendationItems).indexOf(dotActiveItem);
                
                console.log('Active recommendation index after dot click:', dotIndex);
                
                if (targetDotIndex === dotIndex) {
                  console.log('✅ Slider dots work correctly');
                } else {
                  console.error('❌ Slider dots did not change to the correct item');
                }
                
                console.log('=== WEBSITE FUNCTIONALITY TEST COMPLETED ===');
              }, 100);
            } else {
              console.error(`❌ Incorrect number of slider dots: ${sliderDots.length} (expected ${recommendationItems.length})`);
              console.log('=== WEBSITE FUNCTIONALITY TEST COMPLETED ===');
            }
          }, 100);
        }
      }, 100);
    }
  }
});
