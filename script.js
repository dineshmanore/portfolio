document.addEventListener('DOMContentLoaded', () => {
    // GSAP Registration
    gsap.registerPlugin(ScrollTrigger);

    // --- Configuration ---
    const TOTAL_FRAMES = 120;
    const FRAME_PREFIX = 'sequence/frame_'; // Changed to root sequence folder
    const FRAME_EXT = '.png';
    const images = [];
    const canvas = document.getElementById('scrolly-canvas');
    const ctx = canvas.getContext('2d');
    const loaderFill = document.getElementById('loader-fill');
    const loaderPercent = document.getElementById('loader-percent');
    const loader = document.getElementById('loader');

    // --- Data Sections ---
    const PROJECTS = [
        {
            title: "AI Study & Career Copilot",
            category: "AI / EdTech",
            description: "AI-based platform for study guidance and career suggestions using intelligent recommendations.",
            image: "public/projects/AI Study & Career Copilot.png",
            live: "https://ai-study-career-copilot.vercel.app/"
        },
        {
            title: "SmartCart E-commerce",
            category: "Full Stack",
            description: "Real-world online shopping simulation with product browsing, cart functionality, and sleek UI.",
            image: "public/projects/SmartCart E-commerce img.png",
            live: "http://smartcartdm.vercel.app/"
        },
        {
            title: "Event Management System",
            category: "Web Platform",
            description: "Discovery and ticket booking platform with a structured user flow and automated ticket generation logic.",
            image: "public/projects/Event Management System.png",
            live: "https://event-management-ticketing-system-seven.vercel.app/"
        }
    ];

    const EXPERIENCES = [
        {
            company: "G H Raisoni University",
            role: "B.Tech Second Year",
            period: "2024 - 2028",
            description: "Actively pursuing B.Tech at G H Raisoni International Skill Tech University, Pune. Mastering core engineering principles.",
            highlights: ["Academic Excellence", "Lab Research", "Data Structures"]
        },
        {
            company: "AI & Full Stack Lab",
            role: "Project Developer",
            period: "2024 - Present",
            description: "Developing complex applications like 'AI Study Copilot' and 'SmartCart' using modern JavaScript.",
            highlights: ["React Development", "API Integration", "AI Logic"]
        },
        {
            company: "Event Management Dev",
            role: "System Designer",
            period: "2025",
            description: "Architected a structured discovery and ticketing platform focusing on user flow optimization.",
            highlights: ["System Design", "UI/UX Flow", "Problem Solving"]
        }
    ];

    // --- Preloading ---
    let framesLoaded = 0;
    const preloadImages = () => {
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, '0');
            // Try sequence/ first, if it fails maybe public/sequence/
            img.src = `public/sequence/frame_${frameNum}${FRAME_EXT}`; 
            img.onload = () => {
                framesLoaded++;
                const progress = (framesLoaded / TOTAL_FRAMES) * 100;
                loaderFill.style.width = `${progress}%`;
                loaderPercent.innerText = `LOADING SEQUENCE [${Math.round(progress)}%]`;
                
                if (framesLoaded === TOTAL_FRAMES) {
                    gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => {
                        loader.style.display = 'none';
                        renderFrame(0); // Ensure first frame is visible immediately
                        initScrollAnimation();
                    }});
                }
            };
            images.push(img);
        }
    };

    // --- Canvas Rendering ---
    const renderFrame = (index) => {
        const img = images[index];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        
        // Only update dimensions if they actually changed to prevent flickering
        if (canvas.width !== window.innerWidth * dpr || canvas.height !== window.innerHeight * dpr) {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            const ctxScale = canvas.getContext('2d');
            if(ctxScale) ctxScale.scale(dpr, dpr);
        }

        const iWidth = img.width;
        const iHeight = img.height;
        const cWidth = canvas.width / dpr; // Use logical units for math
        const cHeight = canvas.height / dpr;

        const ratio = Math.max(cWidth / iWidth, cHeight / iHeight);
        const newWidth = iWidth * ratio;
        const newHeight = iHeight * ratio;
        const offsetX = (cWidth - newWidth) / 2;
        const offsetY = (cHeight - newHeight) / 2;

        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    };


    // --- Scroll Animations ---
    const initScrollAnimation = () => {
        // Hero Canvas Frame Animation
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

        // Bio Text Phases
        const bioContainer = document.querySelector('.bio-content-container');
        const phases = [
            { title: "Dinesh <br> Manore<span class='accent-dot'>.</span>", bio: "Crafting cinematic digital experiences through motion." },
            { title: "Immersive <br> Experiences<span class='accent-dot'>.</span>", bio: "Crafting motion-rich interfaces that engage and inspire." },
            { title: "Digital <br> Innovation<span class='accent-dot'>.</span>", bio: "Engineering functional solutions with precision and creative logic." }
        ];

        // Inject first phase
        bioContainer.innerHTML = `
            <div id="bio-text" class="fade-in-up animate">
                <h1 id="bio-title">${phases[0].title}</h1>
                <p id="bio-desc">${phases[0].bio}</p>
            </div>
        `;

        const bioText = document.getElementById('bio-text');
        const bioTitle = document.getElementById('bio-title');
        const bioDesc = document.getElementById('bio-desc');

        // Text switching logic using ScrollTrigger
        ScrollTrigger.create({
            trigger: ".hero-canvas-section",
            start: "15% top",
            onEnter: () => updateBio(1),
            onLeaveBack: () => updateBio(0)
        });

        ScrollTrigger.create({
            trigger: ".hero-canvas-section",
            start: "35% top",
            onEnter: () => updateBio(2),
            onLeaveBack: () => updateBio(1)
        });

        // Fade out bio at 50% scroll
        gsap.to(bioContainer, {
            opacity: 0,
            scrollTrigger: {
                trigger: ".hero-canvas-section",
                start: "45% top",
                end: "55% top",
                scrub: true
            }
        });

        function updateBio(index) {
            gsap.to(bioText, { opacity: 0, y: -20, duration: 0.3, onComplete: () => {
                bioTitle.innerHTML = phases[index].title;
                bioDesc.innerText = phases[index].bio;
                gsap.to(bioText, { opacity: 1, y: 0, duration: 0.5 });
            }});
        }

        // --- General Reveal Animations ---
        gsap.utils.toArray('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 30,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        });

        // Stat Counting
        gsap.utils.toArray('.stat-num').forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            gsap.to(num, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: num,
                    start: "top 90%"
                }
            });
        });
    };

    // --- Content Injection ---
    const injectContent = () => {
        // Projects
        const projectsGrid = document.getElementById('projects-grid');
        PROJECTS.forEach(p => {
            const card = document.createElement('a');
            card.href = p.live;
            card.target = "_blank";
            card.className = "project-card fade-in-up";
            card.innerHTML = `
                <div class="project-img-box">
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <div class="project-header">
                        <h3>${p.title}</h3>
                        <div class="arrow-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg></div>
                    </div>
                    <div class="project-meta">
                        <span class="project-cat">${p.category}</span>
                    </div>
                    <p class="project-description">${p.description}</p>
                </div>
            `;
            projectsGrid.appendChild(card);
        });

        // Experience
        const expList = document.getElementById('experience-list');
        EXPERIENCES.forEach((exp, i) => {
            const item = document.createElement('div');
            item.className = `timeline-item ${i % 2 === 0 ? 'left' : 'right'}`;
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content fade-in-up">
                    <span class="period">${exp.period}</span>
                    <h3>${exp.company}</h3>
                    <p class="role">${exp.role}</p>
                    <p class="desc">${exp.description}</p>
                    <div class="highlights">
                        ${exp.highlights.map(h => `<span class="highlight">${h}</span>`).join('')}
                    </div>
                </div>
            `;
            expList.appendChild(item);
        });
    };

    // --- Header & Scroll Progress ---
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);

        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById('scroll-progress').style.width = `${progress}%`;
    });

    // --- Resize Handler ---
    window.addEventListener('resize', () => {
        if (images.length > 0) {
            // Force redraw current frame on resize
            const scrollPercent = window.scrollY / (window.innerHeight * 4); // Based on hero height
            const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(scrollPercent * TOTAL_FRAMES)));
            renderFrame(index);
        }
    });

    // Start
    injectContent();
    preloadImages();
});
