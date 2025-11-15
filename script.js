/**
 * Master Pips Academy - Interactive Scripts
 * Demo version - No backend required
 */

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.program-card, .step, .result-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form handling - DEMO VERSION (no backend)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: contactForm.querySelector('[name="name"]').value,
                email: contactForm.querySelector('[name="email"]').value,
                phone: contactForm.querySelector('[name="phone"]').value,
                program: contactForm.querySelector('[name="program"]').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.program) {
                showMessage('Por favor completa todos los campos', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showMessage('Por favor ingresa un email válido', 'error');
                return;
            }

            // Show success message (demo only)
            showSuccessMessage(formData.name);

            // Log to console for demo purposes
            console.log('Form submitted (DEMO):', formData);
        });

        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim() && this.hasAttribute('required')) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });

            input.addEventListener('focus', function() {
                this.style.borderColor = '#D4AF37';
            });
        });
    }

    // Show success message function
    function showSuccessMessage(name) {
        const form = document.getElementById('contactForm');
        form.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="9 12 11 14 15 10"/>
                    </svg>
                </div>
                <h3 class="success-title">¡Gracias, ${name}!</h3>
                <p class="success-text">Tu solicitud ha sido recibida. Nos pondremos en contacto contigo pronto.</p>
                <p class="demo-note"><strong>Nota:</strong> Esta es una versión demo. En producción, los datos se procesarán en el backend.</p>
            </div>
        `;
    }

    // Show error message function
    function showMessage(message, type) {
        const form = document.getElementById('contactForm');
        const existingAlert = form.querySelector('.alert-message');
        if (existingAlert) existingAlert.remove();

        const alert = document.createElement('div');
        alert.className = `alert-message alert-${type}`;
        alert.textContent = message;
        alert.style.cssText = `
            padding: 12px 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            background-color: ${type === 'error' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
            border: 1px solid ${type === 'error' ? '#ff4444' : '#4caf50'};
            color: ${type === 'error' ? '#ff4444' : '#4caf50'};
            text-align: center;
        `;

        form.insertBefore(alert, form.firstChild);

        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    // Smooth scrolling for anchor links
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

    // Counter animation for stats
    const animateCounters = function() {
        const counters = document.querySelectorAll('.stat-number, .result-metric');
        counters.forEach(counter => {
            const target = counter.innerText;
            const isPercentage = target.includes('%');
            const isRating = target.includes('/');
            const isPlusSign = target.includes('+');
            const isMSign = target.includes('M');

            let numericValue;
            if (isPercentage) {
                numericValue = parseFloat(target);
            } else if (isRating) {
                numericValue = parseFloat(target);
            } else if (isPlusSign) {
                numericValue = parseInt(target.replace('+', ''));
            } else if (isMSign) {
                numericValue = parseFloat(target.replace('M+', ''));
            } else {
                numericValue = parseFloat(target);
            }

            if (!isNaN(numericValue)) {
                counter.innerText = '0';

                const increment = numericValue / 50;
                let current = 0;

                const updateCounter = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        if (isPercentage) {
                            counter.innerText = Math.round(numericValue) + '%';
                        } else if (isRating) {
                            counter.innerText = numericValue.toFixed(1) + '/5';
                        } else if (isPlusSign) {
                            counter.innerText = Math.round(numericValue) + '+';
                        } else if (isMSign) {
                            counter.innerText = numericValue.toFixed(0) + 'M+';
                        } else {
                            counter.innerText = Math.round(numericValue);
                        }
                        clearInterval(updateCounter);
                    } else {
                        if (isRating) {
                            counter.innerText = current.toFixed(1);
                        } else if (isMSign) {
                            counter.innerText = current.toFixed(0) + 'M';
                        } else {
                            counter.innerText = Math.round(current);
                        }
                    }
                }, 30);
            }
        });
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    const resultsSection = document.querySelector('.results-grid');
    if (statsSection) statsObserver.observe(statsSection);
    if (resultsSection) statsObserver.observe(resultsSection);
});