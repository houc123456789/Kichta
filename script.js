// ===========================
// GLOBAL STATE
// ===========================

let placesRemaining = 53; // Starting with 53 places remaining out of 100
const TOTAL_PLACES = 100;

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeScrollAnimations();
    initializeForm();
    initializeTracking();
    simulatePlacesUpdate();
});

// ===========================
// COUNTERS & PROGRESS BARS
// ===========================

function initializeCounters() {
    updatePlacesRemaining(placesRemaining);
}

function updatePlacesRemaining(places) {
    placesRemaining = places;
    const percentageFilled = ((TOTAL_PLACES - placesRemaining) / TOTAL_PLACES) * 100;

    // Update all counter displays
    const counters = [
        'places-remaining',
        'places-remaining-2',
        'places-remaining-3'
    ];

    counters.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            animateNumber(element, parseInt(element.textContent) || TOTAL_PLACES - 47, places);
        }
    });

    // Update progress bars
    const progressBars = [
        'progress-fill',
        'progress-fill-2'
    ];

    progressBars.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.width = percentageFilled + '%';
        }
    });

    // Update "other count" (total signed up minus named ones)
    const otherCount = TOTAL_PLACES - placesRemaining - 3; // Minus Sarah, Thomas, Julie
    const otherElement = document.getElementById('other-count');
    if (otherElement) {
        otherElement.textContent = otherCount;
    }
}

function animateNumber(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * easeOutQuad(progress));
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// Simulate places being taken (for demo purposes)
function simulatePlacesUpdate() {
    // Simulate a new signup every 3 hours (10800000 ms)
    // For demo, we'll do it every 30 seconds
    setInterval(() => {
        if (placesRemaining > 0) {
            updatePlacesRemaining(placesRemaining - 1);
        }
    }, 30000); // 30 seconds for demo (change to 10800000 for production - 3 hours)
}

// ===========================
// SCROLL & NAVIGATION
// ===========================

function scrollToForm() {
    const formSection = document.getElementById('form');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackEvent('CTA Click', 'Form', 'Scroll to form');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        trackEvent('Navigation', 'Section', sectionId);
    }
}

// ===========================
// FAQ ACCORDION
// ===========================

function toggleFaq(button) {
    const faqItem = button.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.textContent = '▶';
    });

    // Open clicked item if it wasn't active
    if (!wasActive) {
        faqItem.classList.add('active');
        const icon = button.querySelector('.faq-icon');
        if (icon) icon.textContent = '▼';

        // Track which FAQ was opened
        const questionText = button.querySelector('span').textContent;
        trackEvent('FAQ', 'Open', questionText);
    }
}

// ===========================
// FORM HANDLING
// ===========================

function initializeForm() {
    const form = document.getElementById('founder-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);

        // Track form field interactions
        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (this.value) {
                    trackEvent('Form', 'Field Completed', this.name);
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate form
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Collect form data
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        expertise: formData.get('expertise'),
        experience: formData.get('experience'),
        currentTJM: formData.get('currentTJM'),
        targetTJM: formData.get('targetTJM'),
        portfolio: formData.get('portfolio'),
        motivation: formData.get('motivation'),
        gdpr: formData.get('gdpr'),
        timestamp: new Date().toISOString()
    };

    // Track form submission
    trackEvent('Form', 'Submit', 'Founder Application');

    // Here you would normally send to your backend
    // For now, we'll simulate success
    console.log('Form submitted:', data);

    // Store in localStorage for demo
    localStorage.setItem('founderApplication', JSON.stringify(data));

    // Show success message
    showFormSuccess();

    // Update counter
    updatePlacesRemaining(placesRemaining - 1);

    // Send email notification (in production)
    // sendEmailNotification(data);
}

function showFormSuccess() {
    const form = document.querySelector('.founder-form');
    const success = document.getElementById('form-success');

    if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';

        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Confetti effect (optional - can add library)
        createConfetti();
    }
}

function createConfetti() {
    // Simple confetti effect
    const colors = ['#B87333', '#4A69FF', '#10B981', '#F59E0B'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '10000';
        confetti.style.pointerEvents = 'none';

        document.body.appendChild(confetti);

        const duration = 2000 + Math.random() * 1000;
        const endLeft = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100;

        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${360 * (Math.random() - 0.5)}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

function initializeScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll(
        '.problem-card, .benefit-card, .testimonial-card, .timeline-step, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Track scroll depth
    trackScrollDepth();
}

function trackScrollDepth() {
    const depths = [25, 50, 75, 100];
    const tracked = new Set();

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        depths.forEach(depth => {
            if (scrollPercent >= depth && !tracked.has(depth)) {
                tracked.add(depth);
                trackEvent('Scroll Depth', `${depth}%`, window.location.pathname);
            }
        });
    });
}

// ===========================
// ANALYTICS & TRACKING
// ===========================

function initializeTracking() {
    // Track page view
    trackPageView();

    // Track time on page
    trackTimeOnPage();

    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            trackEvent('Button Click', 'CTA', text);
        });
    });
}

function trackPageView() {
    console.log('Page view tracked:', window.location.pathname);
    // In production: send to Google Analytics
    // gtag('config', 'GA_MEASUREMENT_ID', { page_path: window.location.pathname });
}

function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // In production: send to Google Analytics
    // gtag('event', action, { event_category: category, event_label: label });
}

function trackTimeOnPage() {
    const startTime = Date.now();

    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'Time on Page', `${timeSpent} seconds`);
    });
}

// ===========================
// AVATAR CAROUSEL ANIMATION
// ===========================

// Duplicate avatars for infinite scroll effect
window.addEventListener('load', () => {
    const avatarsContainer = document.getElementById('avatars-container');
    if (avatarsContainer) {
        const avatars = avatarsContainer.innerHTML;
        avatarsContainer.innerHTML += avatars; // Duplicate for seamless loop
    }
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================
// COOKIE CONSENT (GDPR)
// ===========================

function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        // Create cookie banner
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.</p>
                <div class="cookie-buttons">
                    <button class="btn btn-primary" onclick="acceptCookies()">Accepter</button>
                    <button class="btn btn-ghost" onclick="declineCookies()">Refuser</button>
                </div>
            </div>
        `;

        // Add styles
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.1);
            z-index: 9999;
        `;

        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-banner')?.remove();
    trackEvent('GDPR', 'Cookies Accepted', 'Cookie Banner');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.cookie-banner')?.remove();
    trackEvent('GDPR', 'Cookies Declined', 'Cookie Banner');
}

// Show cookie consent on load
setTimeout(showCookieConsent, 2000);

// ===========================
// PERFORMANCE MONITORING
// ===========================

window.addEventListener('load', () => {
    // Check page load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    console.log('Page load time:', pageLoadTime + 'ms');

    if (pageLoadTime > 3000) {
        console.warn('Page load time is slow. Consider optimization.');
    }

    trackEvent('Performance', 'Page Load Time', `${pageLoadTime}ms`);
});

// ===========================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ===========================

window.scrollToForm = scrollToForm;
window.scrollToSection = scrollToSection;
window.toggleFaq = toggleFaq;
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
