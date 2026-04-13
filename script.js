document.addEventListener('DOMContentLoaded', () => {
    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

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
            description: "Intelligent study guidance and career path visualization platform built with modern AI integration.",
            image: "assets/projects/AI Study & Career Copilot.png",
            live: "https://ai-study-career-copilot.vercel.app/"
        },
        {
            title: "SmartCart E-commerce",
            category: "Full Stack",
            description: "Immersive shopping experience with intuitive state management and sleek glassmorphism design.",
            image: "assets/projects/SmartCart e-commerce img.png",
            live: "http://smartcartdm.vercel.app/"
        },
        {
            title: "Event Platform",
            category: "Web Platform",
            description: "High-performance event discovery and ticket generation system with optimized user flows.",
            image: "assets/projects/Event Management System.png",
            live: "https://event-management-ticketing-system-seven.vercel.app/"
        }
    ];

    const SKILLS = ["TypeScript", "Next.js", "GSAP", "Three.js", "Python", "Node.js", "AWS", "Figma", "TailwindCSS", "PostgreSQL"];

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
                card.className = "project-card fade-in-up";
                card.innerHTML = `
                    <div class="project-image">
                        <img src="${encodeURI(p.image)}" alt="${p.title}" loading="lazy">
                    </div>
                    <div class="project-meta">
                        <span class="project-cat">${p.category}</span>
                    </div>
                    <h3 class="project-title">${p.title}</h3>
                    <p class="project-desc">${p.description}</p>
                `;
                projectsGrid.appendChild(card);
            });
        }

        const marquee = document.getElementById('marquee-skills');
        if (marquee) {
            const skillSet = [...SKILLS, ...SKILLS, ...SKILLS]; // Multiple sets for loop
            skillSet.forEach(s => {
                const span = document.createElement('span');
                span.className = "skill-badge";
                span.innerText = s;
                marquee.appendChild(span);
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
                    gsap.to(loader, { opacity: 0, duration: 1.2, ease: "power3.inOut", onComplete: () => {
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

    // --- Canvas Rendering ---
    const renderFrame = (index) => {
        const img = images[index];
        if (!img || !img.complete) return;

        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
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

    // --- Animations ---
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

        // Bio Phases - Akshay Style
        const bioContent = document.getElementById('bio-text');
        const phases = [
            { h1: "Dinesh Manore<span class='accent-blue'>.</span>", p: "Interaction Designer & Full Stack Developer" },
            { h1: "Creative Engineering<span class='accent-blue'>.</span>", p: "Where function meets digital precision" },
            { h1: "Build the Future<span class='accent-blue'>.</span>", p: "Crafting products for tomorrow's web" }
        ];

        let currentPhase = -1;
        const updateBio = (index) => {
            if (index === currentPhase) return;
            currentPhase = index;
            gsap.to(bioContent, { opacity: 0, y: 15, duration: 0.4, onComplete: () => {
                bioContent.innerHTML = `<h1>${phases[index].h1}</h1><p>${phases[index].p}</p>`;
                gsap.to(bioContent, { opacity: 1, y: 0, duration: 0.6 });
            }});
        };

        updateBio(0);

        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "15% top", onEnter: () => updateBio(1), onLeaveBack: () => updateBio(0) });
        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "35% top", onEnter: () => updateBio(2), onLeaveBack: () => updateBio(1) });
        gsap.to(bioContent, { opacity: 0, scrollTrigger: { trigger: ".hero-canvas-section", start: "85% top", scrub: true }});

        // Reveals
        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el, { opacity: 0, y: 40 }, { 
                opacity: 1, y: 0, 
                duration: 1.2, 
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 90%" }
            });
        });
    };

    injectContent();
    preloadImages();
});
