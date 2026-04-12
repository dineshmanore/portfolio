"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Counter Component for Stats
function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * to));
        if (progress < 1) requestAnimationFrame(animateCount);
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, duration, to]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-jakarta font-bold tracking-tight">
          Building things that <span className="text-white/40 italic font-dm font-normal text-3xl md:text-5xl">feel alive.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6 text-lg md:text-xl text-white/60 leading-relaxed font-dm mb-16 font-light">
            <p>
              I am a <span className="text-white font-bold">second-year B.Tech student</span> at G H Raisoni International Skill Tech University, Pune. My focus is on building real-world web applications that solve practical problems.
            </p>
            <p>
              From <span className="text-white">e-commerce systems</span> to <span className="text-white">AI-based tools</span>, I prioritize functionality and usability, ensuring every digital solution I build provides genuine value.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-x-12 gap-y-8 border-t border-white/5 pt-12 items-center">
            <div className="flex flex-col">
              <div className="text-[42px] font-jakarta font-extrabold text-white tracking-tighter leading-none mb-2">
                <Counter to={3} duration={1.5} />+
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 font-jakarta">Live Projects</div>
            </div>
            
            <div className="flex flex-col">
              <div className="text-[42px] font-jakarta font-extrabold text-white tracking-tighter leading-none mb-2">
                <Counter to={20} duration={2} />+
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 font-jakarta">Hours Spent</div>
            </div>

            <div className="flex flex-col">
              <div className="text-[42px] font-jakarta font-extrabold text-white tracking-tighter leading-none mb-2">
                <Counter to={5} duration={1.5} />
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30 font-jakarta">Tech Stack</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Neural Graphic (Anas Style) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative flex items-center justify-center p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#00d4ff]/5 blur-[100px] rounded-full" />
          <motion.div
            className="absolute w-[130px] h-[130px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,212,255,0.8) 0%, rgba(0,212,255,0.1) 70%, transparent 100%)",
              boxShadow: "0 0 60px rgba(0,212,255,0.18)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
