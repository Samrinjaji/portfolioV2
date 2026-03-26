document.addEventListener('DOMContentLoaded', () => {

   /* --- COORDINATED ENTRANCE --- */
    if (typeof gsap !== 'undefined') {
        const mainTl = gsap.timeline({ 
            defaults: { ease: "power4.out", duration: 1.2 } 
        });

        mainTl
            // 1. Header Entrance
            .from("header", { y: -100, opacity: 0 })
            .from("header .font-marker, .nav-links li, #hamburgerBtn", {
                y: -20, opacity: 0, duration: 0.8, stagger: 0.1
            }, "-=0.8")

            // 2. Background "PORTFOLIO" text (Fades in deep background)
            .from(".md\\:text-9xl", { 
                opacity: 0, 
                scale: 0.9, 
                duration: 2 
            }, "-=0.5")

            // 3. THE BRUSH STROKE (Reveals your name)
            // Ensure your CSS has .brush-stroke { transform-origin: left; }
            .from(".brush-stroke", { 
                scaleX: 0, 
                duration: 1.2, 
                ease: "expo.inOut" 
            }, "-=1.5")

            // 4. Content Stagger (Left side text & buttons)
            .from("#home .flex-col.items-center.md\\:items-start > *", {
                y: 40,
                opacity: 0,
                stagger: 0.15
            }, "-=1.0")

            // 5. Tilt Card Entrance
            .from("#tilt-card", {
                x: 60,
                opacity: 0,
                duration: 1.5
            }, "-=1.2")

            // 6. Hero Stats Pop-in
            .from(".hero-stats > div", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.8");

            /* --- PROJECTS SCROLL ANIMATION --- */
            if (typeof gsap !== 'undefined') {
                // Animate Header
                gsap.from("#projects .mb-12", {
                    scrollTrigger: {
                        trigger: "#projects",
                        start: "top 80%",
                    },
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                // Staggered Cards Entrance
                gsap.from(".project-tilt-container", {
                    scrollTrigger: {
                        trigger: ".grid",
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out"
                });

                // Suble Background Glow Movement (Parallax)
                gsap.to(".bg-ember\\/5", {
                    scrollTrigger: {
                        trigger: "#projects",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    },
                    y: -100,
                    x: 50
                });
            }

            /* --- BULLETPROOF ABOUT ANIMATION --- */
            if (typeof gsap !== 'undefined') {
                // Register ScrollTrigger if you haven't yet
                gsap.registerPlugin(ScrollTrigger);

                const aboutTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#about",
                        start: "top 75%",
                        // toggleActions: "play none none none" // Ensures it only plays once
                    }
                });

                aboutTl
                    // 1. Header & Bio Text
                    .from("#about .max-w-7xl.mb-12, #about .space-y-4 p", {
                        y: 20,
                        opacity: 0,
                        stagger: 0.1,
                        duration: 0.8,
                        clearProps: "all" // Clears GSAP styles after finishing
                    })
                    // 2. The Tech Stack Module Container
                    .from("#about .relative.group .p-8", {
                        scale: 0.98,
                        opacity: 0,
                        duration: 0.8
                    }, "-=0.5")
                    // 3. TARGETING THE SKILLS TEXT SPECIFICALLY
                    .from(".group\\/chip", {
                        y: 15,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.4,
                        ease: "power2.out",
                        clearProps: "opacity" // Force opacity back to original after animation
                    }, "-=0.4")
                    // 4. The Skill Level Bars
                    .from(".w-1.h-3.bg-ember", {
                        scaleY: 0,
                        stagger: 0.1,
                        duration: 0.5,
                        transformOrigin: "bottom"
                    }, "-=0.2");
            }

            /* --- GALLERY ENTRANCE --- */
            if (typeof gsap !== 'undefined') {
                gsap.from("#about .grid.h-125 > div", {
                    scrollTrigger: {
                        trigger: "#about .grid.h-125",
                        start: "top 85%", // Starts when the grid is near the bottom of the screen
                        toggleActions: "play none none none"
                    },
                    y: 50,
                    scale: 0.9,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.1, // Creates the "one-by-one" loading feel
                    ease: "expo.out",
                    clearProps: "all" // Important: removes GSAP styles after animation so hover effects work
                });
            }

            /* --- CONTACT SECTION ANIMATION --- */
if (typeof gsap !== 'undefined') {
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
        }
    });

    contactTl
        // 1. Reveal the "Contact" header with the red lines
        .from("#contact .flex.items-center.justify-center", {
            width: 0,
            opacity: 0,
            duration: 1,
            ease: "expo.inOut"
        })
        // 2. Main Heading and Paragraph fade & slide up
        .from("#contact h2, #contact p", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5")
        // 3. The Email Link (scales up slightly)
        .from("#contact a[href^='mailto']", {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.4")
        // 4. Social Icons Staggered Pop-in
        .from("#contact .group.relative.w-12", {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "all"
        }, "-=0.3");
}
}
    
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

window.scrollTo({
  top: 0,
  behavior: 'smooth' 
});

