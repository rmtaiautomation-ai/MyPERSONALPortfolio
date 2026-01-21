// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initAnimations();
            initParticles();
            initTypewriter();
        }, 300);
    }, 800);
});

// Typewriter Effect for Hero Section
function initTypewriter() {
    const headline = document.getElementById('typewriter-headline');
    const paragraph = document.getElementById('hero-paragraph');
    
    if (!headline || !paragraph) return;
    
    const phrases = [
        " Rommel Tima",
        " AI Specialist"
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseBeforeDelete = 2000;
    let pauseBeforeType = 500;
    let timeoutId;
    
    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Erase backwards (right to left)
            headline.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                timeoutId = setTimeout(typeWriter, pauseBeforeType);
                return;
            }
            
            timeoutId = setTimeout(typeWriter, deletingSpeed);
        } else {
            // Type forward
            headline.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentPhrase.length) {
                // Finished typing, pause then start deleting
                headline.innerHTML = currentPhrase + '<span class="typewriter-cursor"></span>';
                timeoutId = setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, pauseBeforeDelete);
                return;
            }
            
            headline.innerHTML = currentPhrase.substring(0, currentCharIndex) + '<span class="typewriter-cursor"></span>';
            timeoutId = setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start the typewriter effect
    typeWriter();
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(230, 125, 34, 0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-bar-fill')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 200);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with 'fade-in-up' class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
    
    // Also observe elements with 'fade-in' class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe skill bars
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        observer.observe(bar);
    });
}

// Particle Animation
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const asteroids = [];
    const stars = [];
    const particleCount = 80;
    const asteroidCount = 5;
    const starCount = 100;

    // Enhanced Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.twinkle = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.twinkle += 0.05;

            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
        }

        draw() {
            const twinkleOpacity = this.opacity + Math.sin(this.twinkle) * 0.2;
            ctx.fillStyle = `rgba(0, 255, 224, ${Math.max(0.1, Math.min(1, twinkleOpacity))})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Canvas Asteroid class
    class CanvasAsteroid {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 15 + 10;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.vertices = this.generateVertices();
        }

        generateVertices() {
            const vertices = [];
            const numVertices = 6 + Math.floor(Math.random() * 4);
            for (let i = 0; i < numVertices; i++) {
                const angle = (Math.PI * 2 / numVertices) * i;
                const radius = this.size * (0.7 + Math.random() * 0.3);
                vertices.push({
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius
                });
            }
            return vertices;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            if (this.x > canvas.width + this.size) this.x = -this.size;
            if (this.x < -this.size) this.x = canvas.width + this.size;
            if (this.y > canvas.height + this.size) this.y = -this.size;
            if (this.y < -this.size) this.y = canvas.height + this.size;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = `rgba(150, 150, 150, 0.4)`;
            ctx.strokeStyle = `rgba(200, 200, 200, 0.6)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
            for (let i = 1; i < this.vertices.length; i++) {
                ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }

    // Twinkling Star class
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random();
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.opacity += this.twinkleSpeed;
            if (this.opacity > 1) {
                this.opacity = 0;
            }
        }

        draw() {
            const alpha = Math.abs(Math.sin(this.opacity * Math.PI));
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Initialize canvas asteroids
    for (let i = 0; i < asteroidCount; i++) {
        asteroids.push(new CanvasAsteroid());
    }

    // Initialize twinkling stars
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        // Draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw asteroids
        asteroids.forEach(asteroid => {
            asteroid.update();
            asteroid.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}