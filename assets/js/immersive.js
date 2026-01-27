/**
 * AGENTICUM G5 | IMMERSIVE INTERACTIONS
 * Parallax, 3D Tilts, Scroll Animations
 */

class ImmersiveExperience {
    constructor() {
        this.init();
    }
    
    init() {
        this.initParallax();
        this.initCardTilts();
        this.initScrollAnimations();
        this.initSmoothScroll();
        this.initTypingEffect();
        this.initCounterAnimations();
        console.log('🚀 Immersive Experience Initialized');
    }
    
    // ============================================
    // PARALLAX DEPTH
    // ============================================
    initParallax() {
        const hero = document.querySelector('.hero-section');
        const heroVisual = document.querySelector('.hero-visual');
        const particles = document.getElementById('particle-canvas');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(calc(-50% + ${rate}px))`;
            }
            
            if (particles) {
                particles.style.transform = `translateY(${rate * 0.5}px)`;
            }
            
            // Fade hero content on scroll
            if (hero) {
                const opacity = Math.max(0, 1 - scrolled / 600);
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.opacity = opacity;
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                }
            }
        });
    }
    
    // ============================================
    // 3D CARD TILTS
    // ============================================
    initCardTilts() {
        const cards = document.querySelectorAll('.capability-card, .m-card, .stack-feature, .eq-element');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger children if they exist
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.1}s`;
                        child.classList.add('animate-in');
                    });
                }
            });
        }, observerOptions);
        
        // Elements to animate
        const animateElements = document.querySelectorAll(`
            .section-header,
            .manifesto-container,
            .capability-card,
            .arch-node-group,
            .transformation-visual,
            .twin-container,
            .unicorn-content,
            .stack-visual,
            .stack-feature,
            .holographic-terminal,
            .cta-content
        `);
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ============================================
    // TYPING EFFECT FOR TERMINAL
    // ============================================
    initTypingEffect() {
        const terminal = document.getElementById('landing-terminal');
        if (!terminal) return;
        
        // Already has static content, add cursor blink
        const cursor = terminal.querySelector('.trace-line.cursor');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }
    
    // ============================================
    // COUNTER ANIMATIONS
    // ============================================
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-value[data-target]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.primary-btn, .cta-primary-btn, .demo-enter-btn');
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ============================================
// CURSOR FOLLOWER (Optional Premium Effect)
// ============================================
class CursorFollower {
    constructor() {
        this.cursor = this.createCursor();
        this.init();
    }
    
    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);
        return cursor;
    }
    
    init() {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        const animate = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;
            
            this.cursor.style.left = cursorX + 'px';
            this.cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .capability-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.landing-header');
        if (this.header) {
            this.init();
        }
    }
    
    init() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.classList.add('header-scrolled');
            } else {
                this.header.classList.remove('header-scrolled');
            }
            
            // Hide on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 300) {
                this.header.classList.add('header-hidden');
            } else {
                this.header.classList.remove('header-hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    new ImmersiveExperience();
    new MagneticButtons();
    new HeaderScroll();
    
    // Optional: Custom cursor (can be heavy on performance)
    // Uncomment if desired:
    // new CursorFollower();
    
    console.log('✨ AGENTICUM G5 | 2030 Experience Loaded');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Hide loading after page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
