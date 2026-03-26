// Start at the top on refresh
window.scrollTo({ top: 0, behavior: 'smooth' });

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. GSAP & SCROLLTRIGGER ANIMATIONS --- */
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A. HOME ENTRANCE (Main Timeline)
        const mainTl = gsap.timeline({ 
            defaults: { ease: "power4.out", duration: 1.2 } 
        });

        mainTl
            .from("header", { y: -100, opacity: 0 })
            .from("header .font-marker, .nav-links li, #hamburgerBtn", {
                y: -20, opacity: 0, duration: 0.8, stagger: 0.1
            }, "-=0.8")
            .from(".md\\:text-9xl", { opacity: 0, scale: 0.9, duration: 2 }, "-=0.5")
            .from(".brush-stroke", { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, "-=1.5")
            .from("#home .flex-col.items-center.md\\:items-start > *", {
                y: 40, opacity: 0, stagger: 0.15
            }, "-=1.0")
            .from("#tilt-card", { x: 60, opacity: 0, duration: 1.5 }, "-=1.2")
            .from(".hero-stats > div", {
                y: 20, opacity: 0, stagger: 0.1, ease: "back.out(1.7)"
            }, "-=0.8");

        // B. PROJECTS SECTION
        gsap.from("#projects .mb-12", {
            scrollTrigger: { trigger: "#projects", start: "top 80%" },
            y: 30, opacity: 0, duration: 1
        });
        gsap.from(".project-tilt-container", {
            scrollTrigger: { trigger: "#projects .grid", start: "top 85%" },
            y: 50, opacity: 0, scale: 0.95, duration: 1, stagger: 0.2
        });

        // C. ABOUT SECTION
        const aboutTl = gsap.timeline({
            scrollTrigger: { trigger: "#about", start: "top 75%" }
        });
        aboutTl
            .from("#about .max-w-7xl.mb-12, #about .space-y-4 p", {
                y: 20, opacity: 0, stagger: 0.1, clearProps: "all"
            })
            .from(".group\\/chip", {
                y: 15, opacity: 0, stagger: 0.05, duration: 0.4, clearProps: "opacity"
            }, "-=0.4")
            .from(".w-1.h-3.bg-ember", {
                scaleY: 0, stagger: 0.1, duration: 0.5, transformOrigin: "bottom"
            }, "-=0.2");

        // D. GALLERY REVEAL
        gsap.from("#about .grid.h-125 > div", {
            scrollTrigger: { trigger: "#about .grid.h-125", start: "top 85%" },
            y: 50, scale: 0.9, opacity: 0, stagger: 0.1, duration: 1.2, clearProps: "all"
        });

        // E. CONTACT SECTION
        const contactTl = gsap.timeline({
            scrollTrigger: { trigger: "#contact", start: "top 80%" }
        });
        contactTl
            .from("#contact .flex.items-center.justify-center", { width: 0, opacity: 0, duration: 1 })
            .from("#contact h2, #contact p", { y: 30, opacity: 0, stagger: 0.2 })
            .from("#contact a[href^='mailto']", { scale: 0.9, opacity: 0 })
            .from("#contact .group.relative.w-12", { y: 20, opacity: 0, stagger: 0.1, clearProps: "all" }, "-=0.3");
    }

    /* --- 2. NAVIGATION & MOBILE MENU --- */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const allLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section[id]');

    hamburgerBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu?.classList.toggle('hidden');
    });

    document.addEventListener('click', () => mobileMenu?.classList.add('hidden'));

    function updateActiveState(targetHref) {
        allLinks.forEach(link => {
            const isMatch = link.getAttribute('href') === targetHref;
            const span = link.querySelector('span');
            link.classList.toggle('active', isMatch);
            link.classList.toggle('text-white', isMatch);
            link.classList.toggle('text-ash', !isMatch);
            if (span) {
                if (isMatch) span.classList.replace('bg-transparent', 'bg-ember');
                else span.classList.replace('bg-ember', 'bg-transparent');
            }
        });
    }

    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) updateActiveState(href);
            mobileMenu?.classList.add('hidden');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveState(`#${entry.target.getAttribute('id')}`);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    /* --- 3. TYPEWRITER EFFECT --- */
    const typeTarget = document.getElementById('typeText');
    if (typeTarget) {
        const phrases = ["Building Scalable Interfaces", "Designing Modern UIs", "Optimizing Web Performance"];
        let pIdx = 0, cIdx = 0, isDel = false;

        function typeEffect() {
            const current = phrases[pIdx];
            typeTarget.textContent = isDel ? current.substring(0, cIdx--) : current.substring(0, cIdx++);
            let speed = isDel ? 50 : 100;

            if (!isDel && cIdx > current.length) { isDel = true; speed = 2000; }
            else if (isDel && cIdx < 0) { isDel = false; pIdx = (pIdx + 1) % phrases.length; cIdx = 0; speed = 500; }
            setTimeout(typeEffect, speed);
        }
        typeEffect();
    }

    /* --- 4. 3D TILT EFFECTS --- */
    // Hero Card
    const heroCard = document.getElementById('tilt-card');
    const heroFrame = heroCard?.querySelector('.photo-frame');
    heroCard?.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
        heroFrame.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    heroCard?.addEventListener('mouseleave', () => {
        heroFrame.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });

    // Project Cards
    document.querySelectorAll('.project-tilt-container').forEach(container => {
        const pCard = container.querySelector('.project-card');
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
            pCard.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        });
        container.addEventListener('mouseleave', () => {
            pCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });

    /* --- 5. LIGHTBOX MODULE --- */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox) {
        document.querySelectorAll('.cursor-zoom-in').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.remove('hidden');
                    lightbox.classList.add('flex');
                    setTimeout(() => lightbox.classList.add('opacity-100'), 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.closest('button')) {
                lightbox.classList.remove('opacity-100');
                setTimeout(() => {
                    lightbox.classList.replace('flex', 'hidden');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
});