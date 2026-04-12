"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SiJavascript, SiNextdotjs, SiTailwindcss, SiFramer } from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";

const projects = [
  {
    id: "01",
    title: "AI Study & Career Copilot",
    category: "AI / EdTech",
    description: "AI-based platform for study guidance and career suggestions using intelligent recommendations. Helps students navigate their learning path effectively.",
    image: "/projects/AI Study & Career Copilot.png",
    stack: [<SiJavascript key="js" />, <SiNextdotjs key="next" />, <SiFramer key="framer" />],
    stackNames: ["JavaScript", "AI APIs", "Next.js"],
    live: "https://ai-study-career-copilot.vercel.app/",
    github: "https://github.com/dineshmanore/AI-Study-Career-Copilot.git"
  },
  {
    id: "02",
    title: "SmartCart E-commerce",
    category: "Full Stack",
    description: "Real-world online shopping simulation with product browsing, cart functionality, and sleek UI. Focused on practical usability and functional flow.",
    image: "/projects/SmartCart E-commerce img.png",
    stack: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />, <SiJavascript key="js" />],
    stackNames: ["HTML", "CSS", "JavaScript"],
    live: "http://smartcartdm.vercel.app/",
    github: "https://github.com/dineshmanore/Ecommerce-Web.git"
  },
  {
    id: "03",
    title: "Event Management System",
    category: "Web Platform",
    description: "Discovery and ticket booking platform with a structured user flow and automated ticket generation logic. Solves real-world management problems.",
    image: "/projects/Event Management System.png",
    stack: [<FaHtml5 key="html" />, <FaCss3Alt key="css" />, <SiJavascript key="js" />],
    stackNames: ["HTML", "CSS", "JavaScript"],
    live: "https://event-management-ticketing-system-seven.vercel.app/",
    github: "https://github.com/dineshmanore/event-management-ticketing-system.git"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 w-full flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-20 text-center"
      >
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-dm uppercase tracking-[0.2em] text-white/50 mb-8">
          Selected Work
        </div>
        <h2 className="text-5xl md:text-6xl font-jakarta font-medium tracking-tight text-white/50 mb-2">
          Selected <span className="font-extrabold text-white">Work</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1240px]">
        {projects.map((project, index) => (
          <motion.a
            key={project.id}
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" } }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col bg-[#0a0a0a] border border-white/[0.05] rounded-[32px] p-6 hover:bg-[#111] transition-all duration-500 group relative overflow-hidden cursor-pointer"
          >
            {/* Project Images */}
            <div className="w-full aspect-[16/10] bg-black border border-white/5 rounded-2xl overflow-hidden relative mb-8 group-hover:border-white/10 transition-colors">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>

            <div className="px-4 pb-4">
              {/* Info Row: Title & Arrow */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl md:text-[32px] font-jakarta font-bold text-white tracking-tighter">
                  {project.title}
                </h3>
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-[#00d4ff] group-hover:border-transparent transition-all duration-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold">
                  {project.category}
                </div>
                <div className="flex items-center gap-2 text-white/30 text-lg">
                  {project.stack}
                </div>
              </div>

              <p className="text-white/40 font-dm text-[16px] leading-relaxed font-normal max-w-[95%]">
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
