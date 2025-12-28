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