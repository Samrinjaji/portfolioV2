document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Hero Animations
    const brush = document.querySelector('.brush-stroke');
    if(brush) brush.classList.add('brush-stroke-active');

    const itemsToReveal = document.querySelectorAll('.hero-label, .hero-name, .hero-sub, .hero-desc, .hero-actions, .hero-stats, .home-right');
    itemsToReveal.forEach((item, index) => {
        setTimeout(() => item.classList.add('reveal-visible'), 200 + (index * 100));
    });

    // 2. Start Typing Effect
    type(); 

    // 3. Stats Observer
    // This handles the "0 to Target" count only when the user sees the stats
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Added a small delay so the animation starts after the fade-in finishes
            setTimeout(animateStats, 500);
            statsObserver.disconnect();
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) statsObserver.observe(statsSection);

    // 4. Navigation Active State
    setupNavigation();
});

// --- 1. Typing Effect Logic ---
const textElement = document.getElementById('typeText');
const phrases = ["Building Digital Experiences", "Frontend Developer", "UI/UX Specialist"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 500;
    }

    setTimeout(type, speed);
}

// --- 2. 3D Card Tilt Logic ---
const photoContainer = document.querySelector('.home-right');
const photoFrame = document.querySelector('.photo-frame');

if (photoContainer && photoFrame) {
    photoContainer.addEventListener('mousemove', (e) => {
        const rect = photoContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        photoFrame.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    photoContainer.addEventListener('mouseleave', () => {
        photoFrame.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
        photoFrame.style.transition = "all 0.5s ease";
    });

    photoContainer.addEventListener('mouseenter', () => {
        photoFrame.style.transition = "none";
    });
}

// --- 3. Stat Counting Logic ---
function animateStats() {
    const statsElements = document.querySelectorAll('.stat-number');
    
    statsElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        stat.innerText = "0+"; // Reset to zero immediately
        
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps calculation

        const updateCount = () => {
            count += increment;
            if (count < target) {
                stat.innerText = Math.floor(count) + "+";
                requestAnimationFrame(updateCount);
            } else {
                stat.innerText = target + "+";
            }
        };

        updateCount();
    });
}

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // Optional: stop observing once it's revealed
            // scrollObserver.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Slight offset so it doesn't trigger too early
});

// Start observing all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    scrollObserver.observe(el);
});

// --- 4. Navigation Active State Logic ---
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });

    // Handle scroll-based active state
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Find the corresponding nav link for this section and add active
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe all sections
    sections.forEach(section => {
        navObserver.observe(section);
    });
}