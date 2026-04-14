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
    const images = [];
    const canvas = document.getElementById('scrolly-canvas');
    const ctx = canvas.getContext('2d');
    const loaderPercent = document.getElementById('loader-percent');
    const loader = document.getElementById('loader');
    const cursor = document.getElementById('cursor');

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

    // --- Cursor Interactivity ---
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
                    <div class="p-img-wrapper" style="min-height:260px;">
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

    // --- Preloading Sequence ---
    let framesLoaded = 0;
    const preloadImages = () => {
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            img.src = `./assets/sequence/frame_${frameNum}.png`; 
            img.onload = () => {
                framesLoaded++;
                const progress = (framesLoaded / TOTAL_FRAMES) * 100;
                if (loaderPercent) loaderPercent.innerText = Math.round(progress);
                if (framesLoaded === TOTAL_FRAMES) {
                    gsap.to(loader, { opacity: 0, duration: 1, ease: "power2.inOut", onComplete: () => {
                        loader.style.display = 'none';
                        renderFrame(0); 
                        initScrollAnimation();
                    }});
                }
            };
            img.onerror = () => { framesLoaded++; };
            images.push(img);
        }
    };

    // --- Canvas Rendering (Framer Motion Replica smooth logic) ---
    const renderFrame = (index) => {
        const img = images[index];
        if (!img || !img.complete) return;
        const dpr = window.devicePixelRatio || 1;
        
        const canvasWidth = window.innerWidth * dpr;
        const canvasHeight = window.innerHeight * dpr;
        
        if (canvas.width !== canvasWidth) canvas.width = canvasWidth;
        if (canvas.height !== canvasHeight) canvas.height = canvasHeight;
        
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth = canvasWidth;
        let drawHeight = canvasHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
            drawHeight = canvasWidth / imgRatio;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawWidth = canvasHeight * imgRatio;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // --- Main Scrollytelling Timelines (Matching AnasNihal exactly) ---
    const initScrollAnimation = () => {
        const heroTrigger = ".hero-canvas-section";

        // Image Sequence Scrubbing
        const scrollObj = { frame: 0 };
        gsap.to(scrollObj, {
            frame: TOTAL_FRAMES - 1,
            snap: "frame",
            scrollTrigger: { trigger: heroTrigger, start: "top top", end: "bottom bottom", scrub: 0 },
            onUpdate: function() { renderFrame(this.targets()[0].frame); }
        });

        // Overlay Phase 1: Center (0 to 20%)
        gsap.fromTo("#overlay-1", 
            { y: "0vh", opacity: 1 }, 
            { y: "-50vh", opacity: 0, scrollTrigger: { trigger: heroTrigger, start: "0%", end: "20%", scrub: true } }
        );

        // Overlay Phase 2: Left (20% to 50%)
        const t2 = gsap.timeline({ scrollTrigger: { trigger: heroTrigger, start: "20%", end: "50%", scrub: true }});
        t2.fromTo("#overlay-2", { y: "50vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.3 }) // 20-35% (approx)
          .to("#overlay-2", { y: "-50vh", opacity: 0, duration: 0.3 }); // 35-50%

        // Overlay Phase 3: Right (50% to 80%)
        const t3 = gsap.timeline({ scrollTrigger: { trigger: heroTrigger, start: "50%", end: "80%", scrub: true }});
        t3.fromTo("#overlay-3", { y: "50vh", opacity: 0 }, { y: "0vh", opacity: 1, duration: 0.3 }) // 50-65%
          .to("#overlay-3", { y: "-30vh", opacity: 0, duration: 0.3 }); // 65-80%

        // Entry animations for content body
        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 40 }, 
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
            );
        });
    };

    injectContent();
    preloadImages();
});
