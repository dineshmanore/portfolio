document.addEventListener('DOMContentLoaded', () => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // --- Configuration ---
    const TOTAL_FRAMES = 120;
    const images = [];
    const canvas = document.getElementById('scrolly-canvas');
    const ctx = canvas.getContext('2d');
    const loaderPercent = document.getElementById('loader-percent');
    const loader = document.getElementById('loader');
    const cursor = document.getElementById('cursor');

    // --- Data ---
    const PROJECTS = [
        {
            title: "AI Study Copilot",
            category: "Artificial Intelligence",
            image: "assets/projects/AI Study & Career Copilot.png",
            live: "https://ai-study-career-copilot.vercel.app/"
        },
        {
            title: "SmartCart",
            category: "Full Stack",
            image: "assets/projects/SmartCart e-commerce img.png",
            live: "http://smartcartdm.vercel.app/"
        },
        {
            title: "Event System",
            category: "Web Platform",
            image: "assets/projects/Event Management System.png",
            live: "https://event-management-ticketing-system-seven.vercel.app/"
        }
    ];

    const SKILLS = ["REACT", "GSAP", "NEXT.JS", "TYPESCRIPT", "PYTHON", "NODE.JS", "AWS", "FIGMA"];

    // --- Cursor ---
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // --- Content Injection ---
    const injectContent = () => {
        const projectsGrid = document.getElementById('projects-grid');
        if (projectsGrid) {
            PROJECTS.forEach(p => {
                const card = document.createElement('a');
                card.href = p.live;
                card.target = "_blank";
                card.className = "p-card fade-in-up";
                card.innerHTML = `
                    <div class="p-img-box">
                        <img src="${encodeURI(p.image)}" alt="${p.title}" loading="lazy">
                    </div>
                    <div class="p-meta">
                        <div>
                            <h3 class="p-title">${p.title}</h3>
                            <span class="p-cat">${p.category}</span>
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
        }

        const marqueeInner = document.getElementById('marquee-inner');
        if (marqueeInner) {
            const skillSet = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];
            skillSet.forEach(s => {
                const item = document.createElement('div');
                item.className = "m-item";
                item.innerText = s;
                marqueeInner.appendChild(item);
            });
        }
    };

    // --- Preloading ---
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
                    gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => {
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

    // --- Canvas ---
    const renderFrame = (index) => {
        const img = images[index];
        if (!img || !img.complete) return;

        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== window.innerWidth * dpr) {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
        }

        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, w, h);
    };

    // --- Main Scrollytelling ---
    const initScrollAnimation = () => {
        const scrollObj = { frame: 0 };
        gsap.to(scrollObj, {
            frame: TOTAL_FRAMES - 1,
            snap: "frame",
            scrollTrigger: {
                trigger: ".hero-canvas-section",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            onUpdate: () => renderFrame(scrollObj.frame)
        });

        // Bio Parallax Layers
        const bioTitle = document.getElementById('bio-title');
        const bioSub = document.getElementById('bio-sub');
        const bioWrapper = document.querySelector('.bio-content');

        const phases = [
            { h1: "Dinesh<br>Manore", p: "Interaction Designer & Developer" },
            { h1: "Cinematic<br>Experience", p: "interfaces that move with purpose" },
            { h1: "Digital<br>Innovation", p: "functional solutions with precision" }
        ];

        // Entrance
        gsap.to(bioTitle, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.5 });
        gsap.to(bioSub, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.8 });

        // Phase Transitions
        const updateBio = (index) => {
            gsap.to(bioWrapper, { opacity: 0, y: -30, duration: 0.4, onComplete: () => {
                bioTitle.innerHTML = phases[index].h1;
                bioSub.innerHTML = phases[index].p;
                gsap.to(bioWrapper, { opacity: 1, y: 0, duration: 0.6 });
            }});
        };

        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "20% top", onEnter: () => updateBio(1), onLeaveBack: () => updateBio(0) });
        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "40% top", onEnter: () => updateBio(2), onLeaveBack: () => updateBio(1) });
        
        // Final Fade Out
        gsap.to(bioWrapper, {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: ".hero-canvas-section",
                start: "85% top",
                end: "100% top",
                scrub: true
            }
        });

        // Reveals
        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el, { opacity: 0, y: 60 }, {
                opacity: 1, y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%" }
            });
        });
    };

    injectContent();
    preloadImages();
});
