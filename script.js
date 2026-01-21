// ===================================
// Sticky Navigation on Scroll
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Animated Number Counting for Stats
// ===================================
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateNumber = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + '+';
        }
    };

    updateNumber();
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate stats numbers
            if (entry.target.hasAttribute('data-animate')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateNumber(statNumber);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('[data-fade]').forEach(el => {
    observer.observe(el);
});

// Observe stat items
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Observe news cards
document.querySelectorAll('.news-card').forEach(el => {
    observer.observe(el);
});

// Observe program cards
document.querySelectorAll('.program-card').forEach(el => {
    observer.observe(el);
});

// ===================================
// Video Player Functionality
// ===================================
const playButton = document.getElementById('playButton');
const schoolVideo = document.getElementById('schoolVideo');
const videoPlaceholder = playButton.closest('.video-placeholder');

if (playButton && schoolVideo) {
    playButton.addEventListener('click', () => {
        videoPlaceholder.style.display = 'none';
        schoolVideo.style.display = 'block';
        schoolVideo.play();
    });

    // Show placeholder again when video ends
    schoolVideo.addEventListener('ended', () => {
        videoPlaceholder.style.display = 'flex';
        schoolVideo.style.display = 'none';
    });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for links that are just "#"
        if (href === '#' || href === '#enrollment') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrolled < heroHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Partners Carousel Pause on Hover
// ===================================
const partnersTrack = document.getElementById('partnersTrack');

if (partnersTrack) {
    partnersTrack.addEventListener('mouseenter', () => {
        partnersTrack.style.animationPlayState = 'paused';
    });

    partnersTrack.addEventListener('mouseleave', () => {
        partnersTrack.style.animationPlayState = 'running';
    });
}

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}

// ===================================
// Lazy Loading for Images (if implemented)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Keyboard Navigation Support
// ===================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        if (navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===================================
// Scroll to Top on Page Load (for better UX)
// ===================================
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
});

// ===================================
// Form Validation (if forms are added)
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===================================
// Performance: Debounce scroll events
// ===================================
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

// ===================================
// Add loading class to body when page is loading
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Stagger animation for hero content
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ===================================
// Accessibility: Focus trap for mobile menu
// ===================================
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Apply focus trap when mobile menu is open
const navObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active')) {
            trapFocus(navLinks);
        }
    });
});

navObserver.observe(navLinks, { attributes: true, attributeFilter: ['class'] });

// ===================================
// Console Welcome Message
// ===================================
console.log('%c👋 Üdvözöljük a Németh László Gimnázium weboldalán!',
    'font-size: 16px; font-weight: bold; color: #c5a572;');
console.log('%cHa fejlesztői munkában szeretne részt venni, keressen minket: info@nlgmv.hu',
    'font-size: 12px; color: #1a2c4e;');

// ===================================
// Analytics placeholder (to be implemented)
// ===================================
function trackEvent(category, action, label) {
    // Google Analytics or other tracking implementation
    console.log('Event tracked:', { category, action, label });
}

// Track CTA button clicks
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'Click', btn.textContent.trim());
    });
});

// ===================================
// Cookie Consent (placeholder for future implementation)
// ===================================
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        // Show cookie consent banner
        // This would be implemented based on GDPR requirements
        console.log('Cookie consent not yet obtained');
    }
}

// checkCookieConsent();

// ===================================
// Service Worker Registration (for PWA - future enhancement)
// ===================================
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is implemented
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed'));
    // });
}

// ===================================
// Refresh animations on window resize (debounced)
// ===================================
const handleResize = debounce(() => {
    // Recalculate positions if needed
    // This helps maintain proper spacing on orientation change
    const heroHeight = document.querySelector('.hero').offsetHeight;
    document.documentElement.style.setProperty('--hero-height', `${heroHeight}px`);
}, 250);

window.addEventListener('resize', handleResize);

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
document.documentElement.classList.add('js-enabled');
