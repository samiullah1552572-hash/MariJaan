document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Surprise button functionality
    const surpriseBtn = document.getElementById('surpriseBtn');
    const birthdayCake = document.getElementById('birthdayCake');
    
    if (surpriseBtn && birthdayCake) {
        surpriseBtn.addEventListener('click', () => {
            // Toggle cake visibility
            if (birthdayCake.style.display === 'flex') {
                birthdayCake.style.display = 'none';
                surpriseBtn.textContent = 'Click for a Surprise 🎁';
                stopConfetti();
            } else {
                birthdayCake.style.display = 'flex';
                surpriseBtn.textContent = 'Hide Surprise';
                startConfetti();
                
                // Play birthday song
                playBirthdaySong();
            }
        });
    }

    // Set current year in footer
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Confetti effect
let confettiCanvas = null;
let confettiContext = null;
let confettiParticles = [];
let confettiAnimationId = null;

function initConfetti() {
    confettiCanvas = document.getElementById('confetti');
    if (!confettiCanvas) return;
    
    confettiContext = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    // Create confetti particles
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            color: getRandomColor(),
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            rotation: Math.random() * 10 - 5,
            rotationSpeed: Math.random() * 0.1 - 0.05
        });
    }
}

function startConfetti() {
    if (!confettiContext) initConfetti();
    if (confettiAnimationId) return;
    
    confettiCanvas.style.display = 'block';
    animateConfetti();
}

function stopConfetti() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
        confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiCanvas.style.display = 'none';
    }
}

function animateConfetti() {
    if (!confettiContext) return;
    
    confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach((p, i) => {
        // Update position
        p.y += p.speed;
        p.angle += p.rotationSpeed;
        
        // Reset particle when it goes off screen
        if (p.y > confettiCanvas.height) {
            p.y = -10;
            p.x = Math.random() * confettiCanvas.width;
        }
        
        // Draw particle
        confettiContext.save();
        confettiContext.translate(p.x, p.y);
        confettiContext.rotate(p.angle);
        
        confettiContext.fillStyle = p.color;
        confettiContext.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        
        confettiContext.restore();
    });
    
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

function getRandomColor() {
    const colors = [
        '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
        '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
        '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41',
        '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Birthday song
function playBirthdaySong() {
    // This is a simple implementation that just plays a note
    // For a full song, you would need to implement a more complex solution
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Simple beep function
    const beep = (frequency, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        oscillator.start();
        
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    };
    
    // Play happy birthday notes (simplified)
    const notes = [392, 392, 440, 392, 523, 494, 392, 392, 440, 392, 587, 523];
    const durations = [400, 400, 1000, 1000, 1000, 2000, 400, 400, 1000, 1000, 1000, 2000];
    
    notes.forEach((note, i) => {
        setTimeout(() => beep(note, durations[i]), i * 500);
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
});
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav'); // Add this if you have a navigation
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Prevent zoom on double-tap (mobile)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Fix for iOS viewport height
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Smooth scroll for anchor links
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
});

// Add touch support for hover effects
document.addEventListener('touchstart', function() {}, true);
