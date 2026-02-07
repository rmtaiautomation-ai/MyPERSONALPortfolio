// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                initAnimations();
                initParticles();
                initTypewriter();
            }, 300);
        }, 800);
    }
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
    
    // Check for saved theme preference or default to system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };
    
    // Apply theme
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        localStorage.setItem('theme', theme);
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };
    
    // Initialize theme on page load
    applyTheme(getPreferredTheme());
    
    // Add event listeners
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobileBtn) {
        themeToggleMobileBtn.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'light' : 'dark');
        }
    });
}

// Initialize theme toggle
initThemeToggle();

// Rotating Status Text Functionality
function initStatusRotator() {
    const statusWord = document.getElementById('status-word');
    
    if (!statusWord) return;
    
    const statusWords = [
        'Innovating…',
        'Creating…',
        'Building…',
        'Scaling…',
        'Optimizing…'
    ];
    
    let currentIndex = 0;
    
    function rotateStatus() {
        // Add fade-out class
        statusWord.classList.add('fade-out');
        statusWord.classList.remove('fade-in');
        
        // Wait for fade-out animation
        setTimeout(() => {
            // Update word
            currentIndex = (currentIndex + 1) % statusWords.length;
            statusWord.textContent = statusWords[currentIndex];
            
            // Add fade-in class
            statusWord.classList.remove('fade-out');
            statusWord.classList.add('fade-in');
        }, 500);
    }
    
    // Rotate every 4.5 seconds
    setInterval(rotateStatus, 4500);
}

// Initialize status rotator
initStatusRotator();

// Typewriter Effect for Hero Section
function initTypewriter() {
    const headline = document.getElementById('typewriter-headline');
    const paragraph = document.getElementById('hero-paragraph');
    
    if (!headline || !paragraph) return;
    
    const phrases = [
        " Rommel",
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
            const isLightMode = document.body.classList.contains('light-mode');
            const color = isLightMode ? 'rgba(255, 153, 0, ' : 'rgba(0, 255, 224, ';
            ctx.fillStyle = color + Math.max(0.1, Math.min(1, twinkleOpacity)) + ')';
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
            const isLightMode = document.body.classList.contains('light-mode');
            ctx.fillStyle = isLightMode ? 'rgba(100, 100, 100, 0.3)' : 'rgba(150, 150, 150, 0.4)';
            ctx.strokeStyle = isLightMode ? 'rgba(120, 120, 120, 0.4)' : 'rgba(200, 200, 200, 0.6)';
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
            const isLightMode = document.body.classList.contains('light-mode');
            const color = isLightMode ? 'rgba(255, 153, 0, ' : 'rgba(255, 255, 255, ';
            ctx.fillStyle = color + alpha + ')';
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

// Function to open documentation modal
function openDocsModal(title, url) {
    const modal = document.getElementById('docsModal');
    const frame = document.getElementById('notionFrame');
    const modalTitle = document.getElementById('modalTitle');
    
    if (modal && frame && modalTitle) {
        modalTitle.textContent = title + ' Documentation';
        frame.src = url;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Reset to Docs tab when modal opens
        resetTabs();
        activateTab('docs');
    }
}

// Tab switching functionality
function resetTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    tabPanels.forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('active');
    });
}

function activateTab(tabId) {
    const tabButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const tabPanel = document.getElementById(tabId);
    
    if (tabButton && tabPanel) {
        tabButton.classList.add('active');
        tabPanel.classList.remove('hidden');
        tabPanel.classList.add('active');
    }
}

// Initialize tab click handlers
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Don't do anything if already active
            if (this.classList.contains('active')) {
                return;
            }
            
            // Reset all tabs
            resetTabs();
            
            // Activate clicked tab
            activateTab(tabId);
        });
    });
});

// Function to open Loom video modal
function openLoomModal(title, loomUrl) {
    const modal = document.getElementById('loomModal');
    const frame = document.getElementById('loomFrame');
    const modalTitle = document.getElementById('loomVideoTitle');
    const loadingSpinner = document.getElementById('loomLoading');
    
    if (modal && frame && modalTitle) {
        // Convert Loom share URL to embed URL if necessary
        let embedUrl = loomUrl;
        if (loomUrl.includes('loom.com/share/')) {
            embedUrl = loomUrl.replace('loom.com/share/', 'loom.com/embed/');
        } else if (!loomUrl.includes('loom.com/embed/') && loomUrl !== '#' && loomUrl !== 'YOUR_LOOM_URL_HERE') {
            // Basic fallback for other loom formats
            const videoId = loomUrl.split('/').pop().split('?')[0];
            embedUrl = `https://www.loom.com/embed/${videoId}?hide_owner=true&hide_share=true&hide_title=true&hide_embed_speech_bubbles=true`;
        }

        // Set modal content
        modalTitle.textContent = title;
        frame.src = embedUrl;
        
        // Show loading spinner
        if (loadingSpinner) {
            loadingSpinner.classList.remove('hidden');
        }
        
        // Show modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Hide loading spinner when video loads
        frame.onload = function() {
            if (loadingSpinner) {
                setTimeout(() => {
                    loadingSpinner.classList.add('hidden');
                }, 500);
            }
        };
    }
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const closeModal = document.getElementById('closeModal');
    const modal = document.getElementById('docsModal');
    const frame = document.getElementById('notionFrame');

    if (closeModal && modal && frame) {
        const closeAction = () => {
            modal.classList.add('hidden');
            frame.src = '';
            document.body.style.overflow = 'auto';
        };

        closeModal.addEventListener('click', closeAction);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAction();
        });
    }

    const closeLoomModal = document.getElementById('closeLoomModal');
    const loomModal = document.getElementById('loomModal');
    const loomFrame = document.getElementById('loomFrame');
    const fullscreenLoom = document.getElementById('fullscreenLoom');
    
    if (closeLoomModal && loomModal && loomFrame) {
        const closeLoomAction = () => {
            loomModal.classList.add('hidden');
            loomFrame.src = '';
            document.body.style.overflow = 'auto';
        };
        
        closeLoomModal.addEventListener('click', closeLoomAction);
        loomModal.addEventListener('click', (e) => {
            if (e.target === loomModal) closeLoomAction();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !loomModal.classList.contains('hidden')) {
                closeLoomAction();
            }
        });

        if (fullscreenLoom) {
            fullscreenLoom.addEventListener('click', () => {
                if (loomFrame.requestFullscreen) loomFrame.requestFullscreen();
                else if (loomFrame.webkitRequestFullscreen) loomFrame.webkitRequestFullscreen();
                else if (loomFrame.msRequestFullscreen) loomFrame.msRequestFullscreen();
            });
        }
    }
});