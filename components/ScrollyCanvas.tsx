"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// User specific constants
const TOTAL_FRAMES = 120; // Changed to match available frames
const FRAME_EXTENSION = ".png"; // Use ".webp" if applying real WebP frames in the future

function AnimatedBio({ scrollYProgress }: { scrollYProgress: any }) {
  // Map scroll progress to different text phases
  const textIndex = useTransform(scrollYProgress, 
    [0, 0.1, 0.15, 0.25, 0.3, 0.45], 
    [0, 0, 1, 1, 2, 2]
  );
  
  const [index, setIndex] = useState(0);
  useEffect(() => {
    return textIndex.onChange(v => setIndex(Math.round(v)));
  }, [textIndex]);

  // Fade out everything after 50% scroll
  const containerOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  const content = [
    {
      pill: "Creative Developer",
      title: <>Dinesh <br className="md:hidden" /> Manore<span className="text-white/20">.</span></>,
      bio: "Crafting cinematic digital experiences through motion."
    },
    {
      pill: "Vision",
      title: <>Immersive <br className="md:hidden" /> Experiences<span className="text-[#00d4ff]">.</span></>,
      bio: "Crafting motion-rich interfaces that engage and inspire."
    },
    {
      pill: "Goal",
      title: <>Digital <br className="md:hidden" /> Innovation<span className="text-[#ff6b35]">.</span></>,
      bio: "Engineering functional solutions with precision and creative logic."
    }
  ];

  const alignments = [
    "items-center text-center",         // Center (Name)
    "items-end text-right pr-12 md:pr-32", // Right (Mission)
    "items-start text-left pl-12 md:pl-32", // Left (Capability)
  ];

  return (
    <motion.div 
      style={{ opacity: containerOpacity }}
      className={`absolute inset-0 z-30 flex flex-col justify-end pb-32 pointer-events-none px-6 ${alignments[index]}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
           key={index}
           initial={{ opacity: 0, x: index === 0 ? 0 : (index === 1 ? 50 : -50), y: 20 }}
           animate={{ opacity: 1, x: 0, y: 0 }}
           exit={{ opacity: 0, x: index === 0 ? 0 : (index === 1 ? 50 : -50), y: -20 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="flex flex-col max-w-4xl"
        >
          {/* Floating Container */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`flex flex-col ${index === 0 ? "items-center" : (index === 1 ? "items-end" : "items-start")}`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-jakarta font-extrabold text-white tracking-tighter mb-6 drop-shadow-[0_0_30px_rgba(0,0,0,0.5)] leading-[1.1]">
              {content[index].title}
            </h1>
            
            <p className="text-base md:text-lg text-white/40 font-dm max-w-xl leading-relaxed drop-shadow-lg">
              {content[index].bio}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedFrames, setLoadedFrames] = useState(0);

  // Preload images
  useEffect(() => {
    let isCancelled = false;
    const preloadImages = async () => {
      const loaded: HTMLImageElement[] = [];
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (isCancelled) return;
        const img = new Image();
        const frameIndex = i.toString().padStart(3, "0");
        img.src = `/portfolio/sequence/frame_${frameIndex}${FRAME_EXTENSION}`;

        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
        loaded.push(img);
        setLoadedFrames(i);
      }
      setImages(loaded);
    };

    preloadImages();
    return () => {
      isCancelled = true;
    };
  }, []);

  // Map scroll to frame
  const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    if (images.length === 0) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    const render = () => {
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentFrameIndex.get()))
      );
      const img = images[frameIndex];

      if (img && img.complete && img.naturalWidth !== 0) {
        const canvas = canvasRef.current!;
        const cWidth = canvas.width;
        const cHeight = canvas.height;
        const iWidth = img.width;
        const iHeight = img.height;

        // Math for object-fit: cover
        const ratio = Math.max(cWidth / iWidth, cHeight / iHeight);
        const newWidth = iWidth * ratio;
        const newHeight = iHeight * ratio;
        const offsetX = (cWidth - newWidth) / 2;
        const offsetY = (cHeight - newHeight) / 2;

        ctx.clearRect(0, 0, cWidth, cHeight);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
      }
    };

    render();
    const sub = currentFrameIndex.onChange(render);
    return () => sub();
  }, [images, currentFrameIndex]);

  // Handle Canvas Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // High DPI canvas support
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        // Trigger a re-render by setting context transform
        const ctx = canvasRef.current.getContext("2d");
        if(ctx) ctx.scale(dpr, dpr);
        // Force update frame
        currentFrameIndex.set(currentFrameIndex.get() + 0.0001); 
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => window.removeEventListener("resize", handleResize);
  }, [currentFrameIndex]);

  const progressPercent = Math.round((loadedFrames / TOTAL_FRAMES) * 100);

  return (
    <section id="home" ref={sectionRef} className="relative w-full h-[500vh] bg-[#050810]">
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
        {/* Loading Bar */}
        <AnimatePresence>
          {loadedFrames < TOTAL_FRAMES && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050810]"
            >
              <div className="text-text-muted text-sm tracking-widest mb-4">LOADING SEQUENCE [{progressPercent}%]</div>
              <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Canvas - Kept totally clean so burned-in text isn't obstructed */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Cinematic Bio Overlay (Matching Reference Density) */}
        <AnimatedBio scrollYProgress={scrollYProgress} />

        {/* Parallax Content Container */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end items-center pb-12"
        >
           <div className="flex flex-col items-center gap-2">
             <span className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-dm">Scroll to explore</span>
             <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
           </div>
        </motion.div>
      </div>
    </section>
  );
}
