// ===========================
// GLOBAL STATE
// ===========================

let placesRemaining = 53;
const TOTAL_PLACES = 100;

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeScrollAnimations();
    initializeForm();
    initializeTracking();
    initializeParallax();
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

    const counters = [
        'places-remaining',
        'places-remaining-2',
        'places-remaining-3'
    ];

    counters.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            animateNumber(element, parseInt(element.textContent) || TOTAL_PLACES - 47, places, 1500);
        }
    });

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

    const otherCount = TOTAL_PLACES - placesRemaining - 3;
    const otherElement = document.getElementById('other-count');
    if (otherElement) {
        otherElement.textContent = otherCount;
    }
}

function animateNumber(element, start, end, duration = 1500) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function simulatePlacesUpdate() {
    setInterval(() => {
        if (placesRemaining > 0) {
            updatePlacesRemaining(placesRemaining - 1);
        }
    }, 30000);
}

// ===========================
// PARALLAX EFFECT
// ===========================

function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.stars-background');

        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
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

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.faq-icon');
        if (icon) icon.textContent = '▶';
    });

    if (!wasActive) {
        faqItem.classList.add('active');
        const icon = button.querySelector('.faq-icon');
        if (icon) icon.textContent = '▼';

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

        const formFields = form.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                if (this.value) {
                    trackEvent('Form', 'Field Completed', this.name);
                }
            });

            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            field.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

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

    trackEvent('Form', 'Submit', 'Founder Application');

    console.log('Form submitted:', data);
    localStorage.setItem('founderApplication', JSON.stringify(data));

    showFormSuccess();
    updatePlacesRemaining(placesRemaining - 1);
}

function showFormSuccess() {
    const form = document.querySelector('.founder-form');
    const success = document.getElementById('form-success');

    if (form && success) {
        form.style.display = 'none';
        success.style.display = 'block';
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });

        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#F59E0B', '#8B5CF6', '#10B981', '#3B82F6', '#EF4444'];
    const confettiCount = 60;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                opacity: 1;
                border-radius: 50%;
                z-index: 10000;
                pointer-events: none;
            `;

            document.body.appendChild(confetti);

            const duration = 2500 + Math.random() * 1500;
            const rotation = Math.random() * 720 - 360;
            const xMovement = (Math.random() - 0.5) * 200;

            confetti.animate([
                {
                    transform: `translateY(0) translateX(0) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 100}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }, i * 30);
    }
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.problem-card, .benefit-card, .testimonial-card, .timeline-step, .faq-item, .metric-card, .founder-mini'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    trackScrollDepth();
    initializeNavbarScroll();
}

function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });
}

function trackScrollDepth() {
    const depths = [25, 50, 75, 100];
    const tracked = new Set();

    const throttle = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    func(...args);
                    timeoutId = null;
                }, delay);
            }
        };
    };

    const checkScroll = throttle(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        depths.forEach(depth => {
            if (scrollPercent >= depth && !tracked.has(depth)) {
                tracked.add(depth);
                trackEvent('Scroll Depth', `${depth}%`, window.location.pathname);
            }
        });
    }, 500);

    window.addEventListener('scroll', checkScroll);
}

// ===========================
// ANALYTICS & TRACKING
// ===========================

function initializeTracking() {
    trackPageView();
    trackTimeOnPage();

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            trackEvent('Button Click', 'CTA', text);
        });
    });

    document.querySelectorAll('.benefit-card, .problem-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const title = this.querySelector('h3')?.textContent;
            if (title) {
                trackEvent('Card', 'Hover', title);
            }
        });
    });
}

function trackPageView() {
    console.log('Page view tracked:', window.location.pathname);
}

function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
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

window.addEventListener('load', () => {
    const avatarsContainer = document.getElementById('avatars-container');
    if (avatarsContainer) {
        const avatars = avatarsContainer.innerHTML;
        avatarsContainer.innerHTML += avatars;
    }
});

// ===========================
// SMOOTH SCROLL ENHANCEMENTS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// COOKIE CONSENT (GDPR)
// ===========================

function showCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #0A0E27 0%, #1E293B 100%);
                padding: 24px;
                box-shadow: 0 -8px 32px rgba(0,0,0,0.2);
                z-index: 9999;
                border-top: 2px solid rgba(245, 158, 11, 0.3);
            ">
                <div style="
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                    flex-wrap: wrap;
                ">
                    <p style="
                        color: rgba(255, 255, 255, 0.9);
                        margin: 0;
                        font-size: 15px;
                        flex: 1;
                    ">
                        🍪 Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.
                    </p>
                    <div style="display: flex; gap: 16px;">
                        <button
                            onclick="acceptCookies()"
                            style="
                                background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
                                color: white;
                                border: none;
                                padding: 12px 28px;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                                font-size: 14px;
                            "
                        >
                            Accepter
                        </button>
                        <button
                            onclick="declineCookies()"
                            style="
                                background: transparent;
                                color: white;
                                border: 2px solid rgba(255, 255, 255, 0.3);
                                padding: 12px 28px;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                                font-size: 14px;
                            "
                        >
                            Refuser
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('[style*="position: fixed"][style*="bottom: 0"]')?.parentElement.remove();
    trackEvent('GDPR', 'Cookies Accepted', 'Cookie Banner');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('[style*="position: fixed"][style*="bottom: 0"]')?.parentElement.remove();
    trackEvent('GDPR', 'Cookies Declined', 'Cookie Banner');
}

setTimeout(showCookieConsent, 3000);

// ===========================
// PERFORMANCE MONITORING
// ===========================

window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    console.log('Page load time:', pageLoadTime + 'ms');

    if (pageLoadTime > 3000) {
        console.warn('Page load time is slow. Consider optimization.');
    }

    trackEvent('Performance', 'Page Load Time', `${pageLoadTime}ms`);
});

// ===========================
// INTERACTIVE HOVER EFFECTS
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.benefit-card, .problem-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// ===========================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ===========================

window.scrollToForm = scrollToForm;
window.scrollToSection = scrollToSection;
window.toggleFaq = toggleFaq;
window.acceptCookies = acceptCookies;
window.declineCookies = declineCookies;
