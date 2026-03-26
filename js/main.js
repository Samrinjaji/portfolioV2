document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. GSAP ENTRY ANIMATIONS --- */
    // Only runs if GSAP is loaded via CDN
    if (typeof gsap !== 'undefined') {
        gsap.from("header", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });

        gsap.from(".nav-links li", {
            x: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.5
        });

        // Hero Stats Reveal
        gsap.from(".hero-stats", {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 1.2,
            ease: "power3.out"
        });
    }

    /* --- 2. NAVIGATION & MOBILE MENU --- */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const allLinks = document.querySelectorAll('nav a'); 
    const sections = document.querySelectorAll('section[id]');

    hamburgerBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => mobileMenu.classList.add('hidden'));

    function updateActiveState(targetHref) {
        allLinks.forEach(link => {
            const isMatch = link.getAttribute('href') === targetHref;
            const span = link.querySelector('span');
            link.classList.toggle('active', isMatch);
            link.classList.toggle('text-white', isMatch);
            link.classList.toggle('text-ash', !isMatch);
            if (span) {
                span.classList.toggle('bg-ember', isMatch);
                span.classList.toggle('bg-transparent', !isMatch);
            }
        });
    }

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) updateActiveState(href);
            mobileMenu.classList.add('hidden');
        });
    });

    /* --- 3. SCROLL SPY --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveState(`#${entry.target.id}`);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    /* --- 4. TYPEWRITER EFFECT --- */
    const typeTarget = document.getElementById('typeText');
    const phrases = ["Building Scalable Interfaces", "Designing Modern UIs", "Optimizing Web Performance"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 100;

    function typeEffect() {
        if (!typeTarget) return;
        const currentPhrase = phrases[phraseIndex];
        typeTarget.textContent = isDeleting 
            ? currentPhrase.substring(0, charIndex--) 
            : currentPhrase.substring(0, charIndex++);

        if (!isDeleting && charIndex > currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        } else {
            typeSpeed = isDeleting ? 50 : 100;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    /* --- 5. TILT EFFECTS (Profile & Projects) --- */
    const handleTilt = (container, element, intensity) => {
        if (!container || !element) return;
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) - 0.5;
            const y = ((e.clientY - rect.top) / rect.height) - 0.5;
            element.style.transform = `rotateX(${y * -intensity}deg) rotateY(${x * intensity}deg)`;
        });
        container.addEventListener('mouseleave', () => {
            element.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    };

    handleTilt(document.getElementById('tilt-card'), document.querySelector('.photo-frame'), 15);
    document.querySelectorAll('.project-tilt-container').forEach(c => 
        handleTilt(c, c.querySelector('.project-card'), 8)
    );

    /* --- 6. PROJECT ARCHIVE TOGGLE --- */
    const archiveBtn = document.getElementById('viewArchiveBtn');
    const archiveContent = document.getElementById('projectArchive');

    archiveBtn?.addEventListener('click', () => {
        const isHidden = archiveContent.classList.toggle('hidden');
        archiveBtn.querySelector('span:last-child').style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        
        if (!isHidden && typeof gsap !== 'undefined') {
            gsap.from("#projectArchive > div", {
                opacity: 0,
                y: 10,
                stagger: 0.05,
                duration: 0.4
            });
        }
    });

    /* --- 7. LIGHTBOX --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox) {
        document.querySelectorAll('.cursor-zoom-in').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.replace('hidden', 'flex');
                    setTimeout(() => lightbox.classList.add('opacity-100'), 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('opacity-100');
            setTimeout(() => {
                lightbox.classList.replace('flex', 'hidden');
                document.body.style.overflow = '';
            }, 300);
        });
    }

    /* --- HERO SECTION ANIMATION --- */
const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

heroTl
    // 1. Fade in the background "PORTFOLIO" text
    .from(".md\\:text-9xl", { 
        opacity: 0, 
        scale: 1.1, 
        duration: 2, 
        ease: "power2.out" 
    })
    
    // 2. Slide in the "Frontend Developer" tag
    .from(".flex.items-center.gap-3.text-xs", { 
        x: -30, 
        opacity: 0, 
        duration: 0.8 
    }, "-=1.5")

    // 3. THE REVEAL: Brush stroke scales from left, then text appears
    .from(".brush-stroke", { 
        scaleX: 0, 
        duration: 1, 
        ease: "power3.inOut" 
    }, "-=0.8")
    .from("h1", { 
        y: 20, 
        opacity: 0, 
        duration: 0.8 
    }, "-=0.4")

    // 4. Slide in the description and buttons
    .from(".space-y-3 p, .flex.gap-4.pt-4 a", { 
        y: 20, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2 
    }, "-=0.6")

    // 5. Pop in the Profile Card from the right
    .from("#tilt-card", { 
        x: 50, 
        opacity: 0, 
        duration: 1.2, 
        ease: "back.out(1.2)" 
    }, "-=1")

    // 6. Finally, stagger the stats (3+, 20+, 12+)
    .from(".hero-stats > div", { 
        opacity: 0, 
        y: 20, 
        stagger: 0.2, 
        duration: 0.6 
    }, "-=0.5");
});

