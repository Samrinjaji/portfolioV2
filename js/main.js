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

window.scrollTo({
  top: 0,
  behavior: 'smooth' 
});

