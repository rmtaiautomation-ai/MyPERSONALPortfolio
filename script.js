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
    
    if (!headline) return;
    
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
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(230, 125, 34, 0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
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
    const modalTitle = document.getElementById('modalTitle');
    
    if (modal && modalTitle) {
        modalTitle.textContent = title;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Update modal body with project details
        updateModalContent(title);
    }
}

// Function to update modal content with project details
function updateModalContent(projectTitle) {
    const docsPanel = document.getElementById('docs');
    if (!docsPanel) return;
    
    // Find the project data
    const projectData = {
        'Appointment Booking Calendar Sync': {
            description: 'When someone books an appointment, the workflow creates a Google Calendar event, stores the record in Airtable, and sends email confirmations. It also handles reschedules and cancellations automatically.',
            technologies: ['Google Calendar', 'Airtable', 'Gmail', 'Webhook', 'Make.com'],
            features: [
                'Automatic calendar event creation',
                'Airtable record management',
                'Email confirmations to clients',
                'Reschedule handling',
                'Cancellation automation'
            ]
        },
        'Smart Lead Capture & CRM Automation System': {
            description: 'This automation system captures booking inquiries from a website form, validates the information, checks for existing records, updates CRM entries, and sends confirmations and notifications automatically.',
            technologies: ['Airtable', 'Google Sheets', 'Gmail', 'Slack', 'Webhook', 'Make.com'],
            features: [
                'Lead capture from website forms',
                'Data validation and deduplication',
                'Automatic CRM updates',
                'Email confirmations',
                'Slack team notifications'
            ]
        },
        'Automated HR Sentiment & Safety Monitoring': {
            description: 'This automation system monitors field reports submitted by site captains, uses AI to classify each entry by category, sentiment, and urgency, then automatically escalates HR issues via email and updates the CRM sheet — ensuring no critical safety or personnel concern goes unnoticed.',
            technologies: ['Google Sheets', 'OpenAI', 'Gmail', 'JSON Parser', 'Make.com'],
            features: [
                'AI-powered sentiment analysis',
                'Automatic issue classification',
                'Urgency-based escalation',
                'Email alerts for HR issues',
                'CRM sheet updates'
            ]
        },
        'AI-Powered Appointment Reminder System': {
            description: 'This automation system reads upcoming appointments from a Google Sheet, triggers AI voice calls via VAPI to remind patients of their scheduled visits, classifies each call outcome using GPT-3.5, and automatically updates appointment statuses — handling confirmations, cancellations, rescheduling, no-answers, and voicemails in real time.',
            technologies: ['n8n', 'VAPI', 'OpenAI', 'Googlesheet', 'webhook'],
            features: [
                'AI voice call reminders',
                'Call outcome classification',
                'Real-time status updates',
                'Confirmation handling',
                'Voicemail detection'
            ]
        },
        'AI-Powered Customer Support Email Automation with Daily Digest': {
            description: 'This automation system reads incoming customer support emails, uses AI to categorize and draft responses, routes tickets to the right team, sends automated replies, and compiles a daily digest summary delivered to your inbox and team channel.',
            technologies: ['YouTube', 'Airtable', 'Google Sheets', 'n8n'],
            features: [
                'AI email categorization',
                'Automated response drafting',
                'Smart ticket routing',
                'Auto-reply system',
                'Daily digest compilation'
            ]
        },
        'Full Lead Capture & CRM Pipeline (n8n)': {
            description: 'Captures leads from a website form using a webhook, stores them in Airtable or a database, and sends an automated email reply. The workflow also triggers a Slack alert so the team can follow up immediately.',
            technologies: ['n8n', 'Airtable', 'Webhook', 'Gmail', 'Slack'],
            features: [
                'Webhook-based lead capture',
                'Airtable database storage',
                'Automated email replies',
                'Instant Slack alerts',
                'Team follow-up triggers'
            ]
        },
        'AI-Powered Dental Clinic Website': {
            description: 'Modern responsive dental clinic website built with TailwindCSS and JavaScript, integrated with AI-powered booking automation and smart CRM workflows.',
            technologies: ['HTML', 'TailwindCSS', 'JavaScript', 'AI Integration', 'Make.com', 'Airtable'],
            features: [
                'Responsive design',
                'AI-powered booking',
                'CRM integration',
                'Modern UI/UX',
                'Automation workflows'
            ]
        }
    };
    
    const project = projectData[projectTitle];
    if (!project) {
        docsPanel.innerHTML = '<p class="p-6 text-gray-600">Project details not found.</p>';
        return;
    }
    
    // Create detailed content
    const contentHTML = `
        <div class="p-6">
            <h4 class="text-2xl font-bold mb-4 text-gray-800">${projectTitle}</h4>
            <p class="text-gray-600 mb-6 leading-relaxed">${project.description}</p>
            
            <div class="mb-6">
                <h5 class="text-lg font-semibold mb-3 text-gray-700">Key Features:</h5>
                <ul class="space-y-2">
                    ${project.features.map(feature => `
                        <li class="flex items-start gap-2">
                            <i class="fas fa-check-circle text-blue-500 mt-1"></i>
                            <span class="text-gray-600">${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="mb-6">
                <h5 class="text-lg font-semibold mb-3 text-gray-700">Technologies Used:</h5>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-500">
                    <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                    Documentation and demo videos will be added soon. Check back later!
                </p>
            </div>
        </div>
    `;
    
    docsPanel.innerHTML = contentHTML;
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
    const docsPanel = document.getElementById('docs');

    if (closeModal && modal) {
        const closeAction = () => {
            modal.classList.add('hidden');
            if (docsPanel) {
                docsPanel.innerHTML = ''; // Clear content
            }
            document.body.style.overflow = 'auto';
        };

        closeModal.addEventListener('click', closeAction);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAction();
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeAction();
            }
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

// Project Detail Modal Functionality
function openProjectDetailModal(projectId) {
    // Project data configuration
    const projectData = {
        'project-1': {
            title: 'Appointment Booking Calendar Sync',
            description: 'When someone books an appointment, the workflow creates a Google Calendar event, stores the record in Airtable, and sends email confirmations. It also handles reschedules and cancellations automatically.',
            technologies: ['Google Calendar', 'Airtable', 'Gmail', 'Webhook', 'Make.com'],
            documentationUrl: '#', // Add your Notion URL here
            diagramUrl: '#', // Add your diagram image URL here
            demoUrl: '#' // Add your Loom demo URL here
        },
        'project-2': {
            title: 'Smart Lead Capture & CRM Automation System',
            description: 'This automation system captures booking inquiries from a website form, validates the information, checks for existing records, updates CRM entries, and sends confirmations and notifications automatically.',
            technologies: ['Airtable', 'Google Sheets', 'Gmail', 'Slack', 'Webhook', 'Make.com'],
            documentationUrl: '#',
            diagramUrl: '#',
            demoUrl: '#'
        },
        'project-3': {
            title: 'Automated HR Sentiment & Safety Monitoring',
            description: 'This automation system monitors field reports submitted by site captains, uses AI to classify each entry by category, sentiment, and urgency, then automatically escalates HR issues via email and updates the CRM sheet — ensuring no critical safety or personnel concern goes unnoticed.',
            technologies: ['Google Sheets', 'OpenAI', 'Gmail', 'JSON Parser', 'Make.com'],
            documentationUrl: '#',
            diagramUrl: '#',
            demoUrl: '#'
        },
        'project-4': {
            title: 'AI-Powered Appointment Reminder System',
            description: 'This automation system reads upcoming appointments from a Google Sheet, triggers AI voice calls via VAPI to remind patients of their scheduled visits, classifies each call outcome using GPT-3.5, and automatically updates appointment statuses — handling confirmations, cancellations, rescheduling, no-answers, and voicemails in real time.',
            technologies: ['n8n', 'VAPI', 'OpenAI', 'Googlesheet', 'webhook'],
            documentationUrl: '#',
            diagramUrl: '#',
            demoUrl: '#'
        },
        'project-5': {
            title: 'AI-Powered Customer Support Email Automation with Daily Digest',
            description: 'This automation system reads incoming customer support emails, uses AI to categorize and draft responses, routes tickets to the right team, sends automated replies, and compiles a daily digest summary delivered to your inbox and team channel.',
            technologies: ['YouTube', 'Airtable', 'Google Sheets', 'n8n'],
            documentationUrl: '#',
            diagramUrl: '#',
            demoUrl: '#'
        },
        'project-6': {
            title: 'Full Lead Capture & CRM Pipeline (n8n)',
            description: 'Captures leads from a website form using a webhook, stores them in Airtable or a database, and sends an automated email reply. The workflow also triggers a Slack alert so the team can follow up immediately.',
            technologies: ['n8n', 'Airtable', 'Webhook', 'Gmail', 'Slack'],
            documentationUrl: '#',
            diagramUrl: '#',
            demoUrl: '#'
        },
        'project-7': {
            title: 'AI-Powered Dental Clinic Website',
            description: 'Modern responsive dental clinic website built with TailwindCSS and JavaScript, integrated with AI-powered booking automation and smart CRM workflows.',
            technologies: ['HTML', 'TailwindCSS', 'JavaScript', 'AI Integration', 'Make.com', 'Airtable'],
            documentationUrl: '#',
            diagramUrl: '#',
            demoUrl: '#'
        }
    };

    const project = projectData[projectId];
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Open the docs modal with project information
    openDocsModal(project.title, project.documentationUrl);
    
    // Update modal content with project details
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.textContent = project.title;
    }

    // You can customize this further to show more details in the modal
    console.log('Opening project details for:', project.title);
}

// Project Filter Functionality
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.display = '';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Truly Infinite Carousel - JavaScript Based
function initInfiniteCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    
    tracks.forEach(track => {
        const direction = track.dataset.direction || 'rtl';
        const speed = parseFloat(track.dataset.speed) || 1;
        const items = Array.from(track.children);
        
        if (items.length === 0) return;
        
        // Clone items to fill the container
        const containerWidth = track.parentElement.offsetWidth;
        let totalWidth = 0;
        
        // Calculate total width of original items
        items.forEach(item => {
            totalWidth += item.offsetWidth + 48; // 48px = 3rem gap
        });
        
        // Clone enough items to ensure seamless loop
        const clonesNeeded = Math.ceil((containerWidth * 3) / totalWidth);
        for (let i = 0; i < clonesNeeded; i++) {
            items.forEach(item => {
                const clone = item.cloneNode(true);
                track.appendChild(clone);
            });
        }
        
        // Animation variables
        let position = 0;
        let isPaused = false;
        let animationId = null;
        
        // Get the width of one complete set
        const setWidth = totalWidth;
        
        function animate() {
            if (!isPaused) {
                if (direction === 'rtl') {
                    position -= speed;
                    if (position <= -setWidth) {
                        position += setWidth;
                    }
                } else {
                    position += speed;
                    if (position >= 0) {
                        position -= setWidth;
                    }
                }
                track.style.transform = `translate3d(${position}px, 0, 0)`;
            }
            animationId = requestAnimationFrame(animate);
        }
        
        // Initialize position for LTR
        if (direction === 'ltr') {
            position = -setWidth;
        }
        
        // Start animation
        animate();
        
        // Pause on hover
        track.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        track.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    });
}

// Initialize carousels when DOM is ready
document.addEventListener('DOMContentLoaded', initInfiniteCarousels);