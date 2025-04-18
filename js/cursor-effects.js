/**
 * Cursor Effects for Abrar Ahmed's Portfolio
 * Created for the 2025 redesign
 * 
 * This script handles custom cursor effects and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initCursorEffects();
});

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
