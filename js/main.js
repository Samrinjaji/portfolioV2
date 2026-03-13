const glow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    glow.style.opacity = "1";
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal the brush stroke first
    const brush = document.querySelector('.brush-stroke');
    if(brush) brush.classList.add('brush-stroke-active');

    // 2. Reveal the rest of the content with a slight delay
    const itemsToReveal = document.querySelectorAll('.hero-label, .hero-name, .hero-sub, .hero-desc, .hero-actions, .hero-stats, .home-right');
    
    itemsToReveal.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('reveal-visible');
        }, 200 + (index * 100)); // Staggers the fade-in slightly
    });
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
            speed = 2000; // Pause at end
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

    photoContainer.addEventListener('mousemove', (e) => {
        const rect = photoContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Tweak numbers to increase/decrease tilt intensity
        photoFrame.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    photoContainer.addEventListener('mouseleave', () => {
        photoFrame.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
        photoFrame.style.transition = "all 0.5s ease";
    });

    photoContainer.addEventListener('mouseenter', () => {
        photoFrame.style.transition = "none";
    });

    // Initialize
    window.onload = type;

    const stats = document.querySelectorAll('.hero-stat strong');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.innerText);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps approx

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

// Trigger stats after the hero text has finished sliding up
setTimeout(animateStats, 1400);