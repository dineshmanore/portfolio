document.addEventListener('DOMContentLoaded', () => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });

    // --- Configuration ---
    const TOTAL_FRAMES = 120;
    const MIN_LOAD_MS  = 3200; // minimum 3.2 seconds
    const images = [];
    const canvas = document.getElementById('scrolly-canvas');
    const ctx = canvas.getContext('2d');
    const loaderPercent = document.getElementById('loader-percent');
    const loaderBarFill = document.getElementById('loader-bar-fill');
    const loader        = document.getElementById('loader');
    const canvasWrapper = document.querySelector('.canvas-wrapper');
    const cursor        = document.getElementById('cursor');

    // Hide canvas/overlays so they don't bleed through the loader
    gsap.set(canvasWrapper, { opacity: 0 });

    // --- Real Projects ---
    const PROJECTS = [
        {
            title: "AI Copilot",
            category: "AI Engineering",
            image: "assets/projects/AI Study & Career Copilot.png",
            live: "https://ai-study-career-copilot.vercel.app/"
        },
        {
            title: "SmartCart",
            category: "Full Stack Development",
            image: "assets/projects/SmartCart E-commerce img.png",
            live: "http://smartcartdm.vercel.app/"
        },
        {
            title: "Event Hub",
            category: "Frontend Architecture",
            image: "assets/projects/Event Management System.png",
            live: "https://event-management-ticketing-system-seven.vercel.app/"
        }
    ];

    const SKILLS = ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "GSAP", "PYTHON", "AI APIS"];

    // --- Cursor ---
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX - 6, y: e.clientY - 6, duration: 0.1 });
    });

    // --- Content Injection ---
    const injectContent = () => {
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '';
            PROJECTS.forEach(p => {
                const card = document.createElement('a');
                card.href = p.live;
                card.target = "_blank";
                card.className = "p-card fade-in-up";
                card.innerHTML = `
                    <div class="p-img-wrapper">
                        <img src="${encodeURI(p.image)}" alt="${p.title}" class="p-img-bg" loading="lazy">
                    </div>
                    <div class="p-gradient"></div>
                    <div class="p-content">
                        <div>
                            <span class="p-cat">${p.category}</span>
                            <h3 class="p-title">${p.title}</h3>
                        </div>
                        <div class="p-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
        }

        const marqueeInner = document.getElementById('marquee-inner');
        if (marqueeInner) {
            marqueeInner.innerHTML = '';
            const skillSet = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];
            skillSet.forEach(s => {
                const item = document.createElement('div');
                item.className = "m-item";
                item.innerText = s;
                marqueeInner.appendChild(item);
            });
        }
    };

    // ─── Loader Logic ────────────────────────────────────────────────────────
    let imagesReady   = false;
    let timerReady    = false;
    let revealed      = false;

    // Smooth animated progress — always runs for at least MIN_LOAD_MS
    const startTime = performance.now();

    const animateProgress = () => {
        const elapsed  = performance.now() - startTime;
        const rawRatio = Math.min(elapsed / MIN_LOAD_MS, 1);

        // Ease-in-out cubic
        const eased = rawRatio < 0.5
            ? 4 * rawRatio * rawRatio * rawRatio
            : 1 - Math.pow(-2 * rawRatio + 2, 3) / 2;

        const pct = Math.round(eased * 100);
        if (loaderPercent) loaderPercent.innerText = pct + '%';
        if (loaderBarFill) loaderBarFill.style.width = (eased * 100) + '%';

        if (rawRatio < 1) {
            requestAnimationFrame(animateProgress);
        } else {
            timerReady = true;
            tryReveal();
        }
    };
    requestAnimationFrame(animateProgress);

    // Check if BOTH images and timer are done
    const tryReveal = () => {
        if (revealed || !imagesReady || !timerReady) return;
        revealed = true;

        // Ensure bar shows 100%
        if (loaderPercent) loaderPercent.innerText = '100%';
        if (loaderBarFill) loaderBarFill.style.width = '100%';

        // Short pause at 100% so user sees it, then smooth reveal
        setTimeout(() => {
            const tl = gsap.timeline();
            tl.to(loader, { opacity: 0, duration: 0.8, ease: 'power2.inOut' })
              .call(() => { loader.style.display = 'none'; })
              .to(canvasWrapper, { opacity: 1, duration: 0.6, ease: 'power2.out' })
              .call(() => {
                  renderFrame(0);
                  initScrollAnimation();
              });
        }, 400);
    };

    // ─── Preloading Images ────────────────────────────────────────────────────
    let framesLoaded = 0;
    const preloadImages = () => {
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `./assets/sequence/frame_${frameNum}.png`;
            img.onload  = () => { framesLoaded++; checkImages(); };
            img.onerror = () => { framesLoaded++; checkImages(); };
            images.push(img);
        }
    };

    const checkImages = () => {
        if (framesLoaded >= TOTAL_FRAMES) {
            imagesReady = true;
            tryReveal();
        }
    };

    // ─── Canvas Rendering ─────────────────────────────────────────────────────
    const renderFrame = (index) => {
        const img = images[index];
        if (!img || !img.complete) return;
        const dpr = window.devicePixelRatio || 1;

        const canvasWidth  = window.innerWidth  * dpr;
        const canvasHeight = window.innerHeight * dpr;

        if (canvas.width  !== canvasWidth)  canvas.width  = canvasWidth;
        if (canvas.height !== canvasHeight) canvas.height = canvasHeight;

        const imgRatio    = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth, drawHeight = canvasHeight;
        let offsetX = 0, offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvasWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.imageSmoothingEnabled  = true;
        ctx.imageSmoothingQuality  = 'high';
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // ─── Scroll Animations ────────────────────────────────────────────────────
    const initScrollAnimation = () => {
        const heroTrigger = '.hero-canvas-section';

        const scrollObj = { frame: 0 };
        gsap.to(scrollObj, {
            frame: TOTAL_FRAMES - 1,
            snap: 'frame',
            scrollTrigger: { trigger: heroTrigger, start: 'top top', end: 'bottom bottom', scrub: 0 },
            onUpdate: function() { renderFrame(this.targets()[0].frame); }
        });

        // Overlay Phase 1: Center (0–20%)
        gsap.fromTo('#overlay-1',
            { y: '0vh', opacity: 1 },
            { y: '-50vh', opacity: 0, scrollTrigger: { trigger: heroTrigger, start: '0%', end: '20%', scrub: true } }
        );

        // Overlay Phase 2: Left (20–50%)
        const t2 = gsap.timeline({ scrollTrigger: { trigger: heroTrigger, start: '20%', end: '50%', scrub: true }});
        t2.fromTo('#overlay-2', { y: '50vh', opacity: 0 }, { y: '0vh', opacity: 1, duration: 0.3 })
          .to('#overlay-2',    { y: '-50vh', opacity: 0, duration: 0.3 });

        // Overlay Phase 3: Right (50–80%)
        const t3 = gsap.timeline({ scrollTrigger: { trigger: heroTrigger, start: '50%', end: '80%', scrub: true }});
        t3.fromTo('#overlay-3', { y: '50vh', opacity: 0 }, { y: '0vh', opacity: 1, duration: 0.3 })
          .to('#overlay-3',    { y: '-30vh', opacity: 0, duration: 0.3 });

        // Fade-in-up for content sections
        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
            );
        });
    };

    injectContent();
    preloadImages();
});
