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
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // --- Configuration ---
    const TOTAL_FRAMES = 120;
    const images = [];
    const canvas = document.getElementById('scrolly-canvas');
    const ctx = canvas.getContext('2d');
    const loaderPercent = document.getElementById('loader-percent');
    const loader = document.getElementById('loader');
    const cursor = document.getElementById('cursor');

    // --- REAL DATA ---
    const PROJECTS = [
        {
            title: "AI Study & Career Copilot",
            category: "AI / EDTECH",
            description: "AI-based platform for study guidance and career suggestions using intelligent recommendations.",
            image: "assets/projects/AI Study & Career Copilot.png",
            live: "https://ai-study-career-copilot.vercel.app/",
            code: "https://github.com/dineshmanore/AI-Study-Career-Copilot.git"
        },
        {
            title: "SmartCart E-commerce",
            category: "WEB APPLICATION",
            description: "Simulates real-world online shopping with product browsing and cart functionality.",
            image: "assets/projects/SmartCart e-commerce img.png",
            live: "http://smartcartdm.vercel.app/",
            code: "https://github.com/dineshmanore/Ecommerce-Web.git"
        },
        {
            title: "Event & Ticketing System",
            category: "PLATFORM DESIGN",
            description: "Event discovery and ticket booking platform with a highly structured user flow.",
            image: "assets/projects/Event Management System.png",
            live: "https://event-management-ticketing-system-seven.vercel.app/",
            code: "https://github.com/dineshmanore/event-management-ticketing-system.git"
        }
    ];

    const SKILLS = ["HTML5", "CSS3", "JAVASCRIPT", "REACT", "C / C++", "PYTHON", "PROBLEM SOLVING", "MOTION DESIGN"];

    // --- Cursor & Interactivity ---
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    // --- Injection ---
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
                    gsap.to(loader, { opacity: 0, scale: 1.1, duration: 1, ease: "power4.inOut", onComplete: () => {
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
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const w = img.width * ratio;
        const h = img.height * ratio;
        ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    // --- Scroll Logic ---
    const initScrollAnimation = () => {
        gsap.to({f:0}, {
            f: TOTAL_FRAMES - 1,
            snap: "f",
            scrollTrigger: { trigger: ".hero-canvas-section", start: "top top", end: "bottom bottom", scrub: 1 },
            onUpdate: function() { renderFrame(this.targets()[0].f); }
        });

        const bioTitle = document.getElementById('bio-title');
        const bioSub = document.getElementById('bio-sub');
        const bioWrapper = document.querySelector('.bio-content');

        const phases = [
            { h1: "Dinesh<br>Manore", p: "B.Tech Student & Web Developer" },
            { h1: "Building Real<br>Solutions", p: "Functionality, Usability, Practicality" },
            { h1: "Crafting<br>Future Web", p: "B.Tech (2nd Year) @ G H Raisoni" }
        ];

        const updateBio = (index) => {
            gsap.to(bioWrapper, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
                bioTitle.innerHTML = phases[index].h1;
                bioSub.innerHTML = phases[index].p;
                gsap.to(bioWrapper, { opacity: 1, y: 0, duration: 0.5 });
            }});
        };

        updateBio(0);
        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "18% top", onEnter: () => updateBio(1), onLeaveBack: () => updateBio(0) });
        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "38% top", onEnter: () => updateBio(2), onLeaveBack: () => updateBio(1) });
        gsap.to(bioWrapper, { opacity: 0, y: -50, scrollTrigger: { trigger: ".hero-canvas-section", start: "85% top", scrub: true }});

        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" }});
        });
    };

    injectContent();
    preloadImages();
});
