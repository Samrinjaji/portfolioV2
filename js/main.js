document.addEventListener('DOMContentLoaded', () => {
    
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const allLinks = document.querySelectorAll('nav a'); // Grabs both desktop and mobile
  const sections = document.querySelectorAll('section[id]'); // Only sections with IDs

  // 1. Toggle mobile menu
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });

  // Close menu when clicking anywhere outside
  document.addEventListener('click', () => mobileMenu.classList.add('hidden'));

  // 2. Function to Sync Active States
  function updateActiveState(targetHref) {
    allLinks.forEach(link => {
      const isMatch = link.getAttribute('href') === targetHref;
      const span = link.querySelector('span');

      // Toggle Classes
      link.classList.toggle('active', isMatch);
      link.classList.toggle('text-white', isMatch);
      link.classList.toggle('text-ash', !isMatch);

      // Mobile indicator line
      if (span) {
        if (isMatch) {
          span.classList.replace('bg-transparent', 'bg-ember');
        } else {
          span.classList.replace('bg-ember', 'bg-transparent');
        }
      }
    });
  }

  // 3. Click Handler
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only prevent default if it's an anchor link to keep smooth scroll clean
      if (href.startsWith('#')) {
        updateActiveState(href);
      }
      
      mobileMenu.classList.add('hidden');
    });
  });

  // 4. Scroll Spy (Intersection Observer)
  // This automatically sets the active link based on what the user sees
  const observerOptions = {
    root: null,
    threshold: 0.5, // Trigger when 50% of the section is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.getAttribute('id')}`;
        updateActiveState(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  
});

const typeTarget = document.getElementById('typeText');
const phrases = ["Building Scalable Interfaces", "Designing Modern UIs", "Optimizing Web Performance"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        // Remove characters
        typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster when deleting
    } else {
        // Add characters
        typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    // Logic for pausing at the end of a word or starting to delete
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before starting next word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the effect
document.addEventListener('DOMContentLoaded', typeEffect);

document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('tilt-card');
    const frame = card.querySelector('.photo-frame');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation (adjust the '15' to increase/decrease tilt intensity)
        const rotateX = ((y - centerY) / centerY) * -15; 
        const rotateY = ((x - centerX) / centerX) * 15;

        frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset position when mouse leaves
    card.addEventListener('mouseleave', () => {
        frame.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const projectContainers = document.querySelectorAll('.project-tilt-container');

    projectContainers.forEach(container => {
        const card = container.querySelector('.project-card');

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle rotation for professional feel
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });
});

/* --- LIGHTBOX MODULE --- */
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.cursor-zoom-in');

    // Function to Open
    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        
        // Trigger opacity transition
        setTimeout(() => {
            lightbox.classList.add('opacity-100');
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Lock scroll
    };

    // Function to Close
    const closeLightbox = () => {
        lightbox.classList.remove('opacity-100');
        setTimeout(() => {
            lightbox.classList.remove('flex');
            lightbox.classList.add('hidden');
        }, 300);
        
        document.body.style.overflow = ''; // Restore scroll
    };

    // Event Listeners for Gallery Items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openLightbox(img.src);
        });
    });

    // Close on Background Click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.closest('button')) {
            closeLightbox();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
});


/* document.addEventListener('DOMContentLoaded', () => {
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

    // 5. Theme Toggle
    setupTheme();
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

// --- 5. Theme Toggle Logic ---
function setupTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const html = document.documentElement;
    const sunIcon = themeBtn.querySelector('img[alt="light"]');
    const moonIcon = themeBtn.querySelector('img[alt="dark"]');

    // Get saved theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme, sunIcon, moonIcon);

    // Handle theme toggle
    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme, sunIcon, moonIcon);
    });
}

function updateThemeIcons(theme, sunIcon, moonIcon) {
    if (theme === 'dark') {
        sunIcon.classList.add('block');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        moonIcon.classList.remove('block');
    } else {
        sunIcon.classList.add('hidden');
        sunIcon.classList.remove('block');
        moonIcon.classList.add('block');
        moonIcon.classList.remove('hidden');
    }
} */