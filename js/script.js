// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if(navLinks.classList.contains('active')){
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            
            const updateCounter = () => {
                const c = +counter.innerText.replace('+', '');
                if(c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
        });
    }

    // Intersection Observer for triggering animations
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if(statsSection && counters.length > 0) {
        observer.observe(statsSection);
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            
            // Show Toast
            if (toast) {
                toast.textContent = `Thank you ${name}! Message Sent Successfully! We will contact you soon.`;
                toast.className = "toast show";
            }
            
            // Reset Form
            contactForm.reset();

            // Hide Toast after 3 seconds
            setTimeout(function(){ 
                if (toast) {
                    toast.className = toast.className.replace("show", "");
                }
            }, 3000);
        });
    }

    // Header Background on Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        let scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}` || 
                        link.getAttribute('href') === `${sectionId}.html` ||
                        link.getAttribute('href') === `/${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Home page special case
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'index.html' || 
                    link.getAttribute('href') === '/' ||
                    link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', highlightNavLink);

    // Project Card Animation on Scroll
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });

    // Animate project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        projectObserver.observe(card);
    });

    // Service Card Animation
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });

    // Animate service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        serviceObserver.observe(card);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal page anchors
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize counters with initial values
    document.querySelectorAll('.counter').forEach(counter => {
        counter.innerText = "0";
    });
});


// Fixed & improved mobile menu, counters and animations
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.getElementById('hamburger');        // button/hamburger control
    const navLinksEl = document.getElementById('navLinks');       // the UL (mobile menu)
    const navAnchors = document.querySelectorAll('#navLinks a');  // anchor links inside nav
    const navItems = document.querySelectorAll('.nav-links li a'); // legacy selector (keeps compatibility)

    // Safety: ensure variables exist
    if (hamburger && navLinksEl) {
        // Ensure hamburger is keyboard-accessible: toggle aria-expanded
        if (!hamburger.hasAttribute('role')) hamburger.setAttribute('role', 'button');
        if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');

        hamburger.addEventListener('click', () => {
            const isActive = navLinksEl.classList.toggle('active');

            // toggle icon classes (FontAwesome)
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isActive);
                icon.classList.toggle('fa-xmark', isActive);
            }

            // update accessibility state
            hamburger.setAttribute('aria-expanded', String(isActive));

            // optionally lock body scroll when menu is open
            document.body.classList.toggle('nav-open', isActive);
        });

        // Close mobile menu when any nav link is clicked (mobile UX)
        const closeMenu = () => {
            if (navLinksEl.classList.contains('active')) {
                navLinksEl.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
                document.body.classList.remove('nav-open');
            }
        };

        navAnchors.forEach(a => a.addEventListener('click', closeMenu));
        navItems.forEach(item => item.addEventListener('click', closeMenu)); // compatibility
    }

    // Counter Animation (improved, non-blocking)
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = Number(counter.getAttribute('data-target')) || 0;
            const duration = 1200;
            const start = 0;
            const startTime = performance.now();
            const isDecimal = String(counter.getAttribute('data-target')).includes('.');

            function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(easeOutCubic(progress) * target);
                counter.innerText = isDecimal ? (value / 10).toFixed(1) : value;
                if (progress < 1) requestAnimationFrame(step);
                else counter.innerText = isDecimal ? (target).toFixed(1) : String(target);
            }
            requestAnimationFrame(step);
        });
    }

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    // IntersectionObserver to trigger counters once
    if (counters.length > 0) {
        const statsSection = document.querySelector('.stats') || document.querySelector('.about') || document.querySelector('.experience');
        if (statsSection) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !countersAnimated) {
                        animateCounters();
                        countersAnimated = true;
                        obs.disconnect();
                    }
                });
            }, { threshold: 0.35 });
            observer.observe(statsSection);
        } else {
            // fallback: animate after small delay
            setTimeout(() => { if (!countersAnimated) { animateCounters(); countersAnimated = true; } }, 1200);
        }
    }

    // IntersectionObservers for project/service card reveals (keeps existing behavior)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.project-card, .service-card').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        revealObserver.observe(card);
    });

    // Smooth scroll for internal anchors (only on same page anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1 && href.startsWith('#')) {
                const target = document.getElementById(href.slice(1));
                if (target) {
                    e.preventDefault();
                    const offset = 72; // header height
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    // Highlight active nav link while scrolling
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('#navLinks a, .nav-links a');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPosition >= top && scrollPosition < top + height) {
                allNavLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `${id}.html`);
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // Initialize counters visually to 0
    document.querySelectorAll('.counter').forEach(c => c.innerText = "0");
});