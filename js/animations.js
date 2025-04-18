/**
 * Advanced Animations for Abrar Ahmed's Portfolio
 * Created for the 2025 redesign
 * 
 * This script handles all animation effects including:
 * - Scroll animations
 * - Reveal effects
 * - Cursor effects
 * - Text animations
 */

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS library with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
    });

    // Initialize custom animations
    initScrollAnimations();
    initCursorEffects();
    initTextAnimations();
    initSkillBars();
    initHoverEffects();
});

// Scroll-based animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    // Initial check for elements in viewport
    checkElementsInViewport();
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        checkElementsInViewport();
        updateScrollProgress();
    });
    
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            } else if (!element.hasAttribute('data-animation-once')) {
                element.classList.remove('animated');
            }
        });
    }
    
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is considered in viewport when it's top is below 20% of the screen
        // and its bottom is above 80% of the screen
        return (
            rect.top <= windowHeight * 0.8 &&
            rect.bottom >= windowHeight * 0.2
        );
    }
}

// Update scroll progress bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (!scrollProgress) return;
    
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = scrollPercentage + '%';
    
    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (scrollPercentage > 20) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

// Custom cursor effects
function initCursorEffects() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor || !cursorTrail) return;
    
    document.addEventListener('mousemove', (e) => {
        // Update cursor position
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Update cursor trail with delay
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-toggle, .theme-toggle, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorTrail.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorTrail.style.opacity = '1';
    });
}

// Text animation effects
function initTextAnimations() {
    // Glitch text effect
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const textContent = text.textContent;
        text.setAttribute('data-text', textContent);
    });
    
    // Typing text effect
    const typingTexts = document.querySelectorAll('.typing-text');
    
    typingTexts.forEach(text => {
        const textContent = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < textContent.length) {
                text.textContent += textContent.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    });
    
    // Reveal text effect
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    revealTexts.forEach(text => {
        const textContent = text.textContent;
        text.setAttribute('data-text', textContent);
    });
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const progressFill = bar.querySelector('.skill-progress-fill');
            const progressGlow = bar.querySelector('.skill-progress-glow');
            
            if (isElementInViewport(bar) && !bar.classList.contains('animated')) {
                setTimeout(() => {
                    progressFill.style.width = progress + '%';
                    progressGlow.style.opacity = '1';
                    bar.classList.add('animated');
                }, 200);
            }
        });
    }
    
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Hover effects for various elements
function initHoverEffects() {
    // Portfolio item hover effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hovered');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hovered');
        });
    });
    
    // Nav link hover effect
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const text = link.getAttribute('data-text');
            if (text) {
                link.setAttribute('data-hover', 'true');
            }
        });
        
        link.addEventListener('mouseleave', () => {
            link.removeAttribute('data-hover');
        });
    });
    
    // Button hover effect
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.classList.add('hovered');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('hovered');
        });
    });
}

// Handle back to top button
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
