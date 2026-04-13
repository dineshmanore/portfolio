document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio V2 Initialized");

    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

    // --- Configuration ---
    const TOTAL_FRAMES = 120;
    const images = [];
    const canvas = document.getElementById('scrolly-canvas');
    const ctx = canvas.getContext('2d');
    const loaderFill = document.getElementById('loader-fill');
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
            image: "assets/projects/SmartCart E-commerce img.png",
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

    const EXPERIENCES = [
        {
            company: "G H Raisoni University",
            role: "B.Tech Second Year",
            period: "2024 - 2028",
            description: "Mastering core engineering principles and advanced algorithms at G H Raisoni International Skill Tech University.",
            highlights: ["Algorithms", "Machine Learning", "System Design"]
        },
        {
            company: "Development Lab",
            role: "Project Architect",
            period: "Current",
            description: "Leading the development of complex React-based applications with a focus on cinematic UI/UX.",
            highlights: ["Animation Logic", "Data Seeding", "Production Deployment"]
        }
    ];

    // --- Cursor Logic ---
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1
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
                    <div class="project-img-box">
                        <img src="${encodeURI(p.image)}" alt="${p.title}" loading="lazy">
                    </div>
                    <div class="project-info">
                        <span class="project-cat">${p.category}</span>
                        <h3>${p.title}</h3>
                        <p class="project-description">${p.description}</p>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });
        }

        const expList = document.getElementById('experience-list');
        if (expList) {
            EXPERIENCES.forEach(exp => {
                const item = document.createElement('div');
                item.className = "timeline-item fade-in-up";
                item.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="period">${exp.period}</span>
                        <h3>${exp.company}</h3>
                        <p class="role">${exp.role}</p>
                        <p class="desc">${exp.description}</p>
                    </div>
                `;
                expList.appendChild(item);
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
                if (loaderFill) loaderFill.style.width = `${progress}%`;
                if (loaderPercent) loaderPercent.innerText = Math.round(progress);
                
                if (framesLoaded === TOTAL_FRAMES) {
                    gsap.to(loader, { opacity: 0, duration: 1.5, ease: "power4.inOut", onComplete: () => {
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
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
        }

        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    };

    // --- Animations ---
    const initScrollAnimation = () => {
        // Hero Frame Animation
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

        // Bio Phases - Center Floating like Reference
        const bioContainer = document.getElementById('bio-text');
        const phases = [
            { text: "Dinesh Manore<span class='accent-dot'>.</span>", sub: "Creative Developer & Interaction Designer" },
            { text: "Cinematic Motion<span class='accent-dot'>.</span>", sub: "Building interfaces that feel alive" },
            { text: "Digital Innovation<span class='accent-dot'>.</span>", sub: "Crafting products with precision" }
        ];

        let currentPhase = -1;
        const updateBio = (index) => {
            if (index === currentPhase) return;
            currentPhase = index;
            gsap.to(bioContainer, { opacity: 0, y: 10, duration: 0.4, onComplete: () => {
                bioContainer.innerHTML = `<h1>${phases[index].text}</h1><p>${phases[index].sub}</p>`;
                gsap.to(bioContainer, { opacity: 1, y: 0, duration: 0.6 });
            }});
        };

        updateBio(0);

        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "15% top", onEnter: () => updateBio(1), onLeaveBack: () => updateBio(0) });
        ScrollTrigger.create({ trigger: ".hero-canvas-section", start: "35% top", onEnter: () => updateBio(2), onLeaveBack: () => updateBio(1) });
        
        gsap.to(bioContainer, { opacity: 0, scrollTrigger: { trigger: ".hero-canvas-section", start: "80% top", scrub: true }});

        // Section Reveals
        gsap.utils.toArray('.fade-in-up').forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: { trigger: el, start: "top 90%" }
                }
            );
        });

        // Stat Counter
        gsap.utils.toArray('.stat-num').forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            gsap.to(num, {
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                scrollTrigger: { trigger: num, start: "top 90%" }
            });
        });
    };

    // Header Logic
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 100);
        document.getElementById('scroll-progress').style.width = 
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + "%";
    });

    injectContent();
    preloadImages();
});
