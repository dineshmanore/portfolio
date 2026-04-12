"use client";

import React from "react";
import { motion } from "framer-motion";

import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiTypescript, 
  SiNodedotjs, SiThreedotjs, SiJavascript, 
  SiRedux, SiMongodb, SiPrisma, SiGithub, SiFirebase, SiFigma 
} from "react-icons/si";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";

const techsRow1 = [
  { name: "JavaScript", icon: <SiJavascript />, color: "#f7df1e" },
  { name: "React.js", icon: <SiReact />, color: "#61dafb" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06b6d4" },
  { name: "HTML5", icon: <FaHtml5 />, color: "#e34f26" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572b6" },
];

const techsRow2 = [
  { name: "C / C++", icon: <SiFramer />, color: "#00599c" }, // Placeholder icon for C++
  { name: "Python", icon: <SiFramer />, color: "#3776ab" }, // Placeholder icon for Python
  { name: "Problem Solving", icon: <SiFramer />, color: "#ff0055" },
  { name: "Git", icon: <SiGithub />, color: "#f14e32" },
  { name: "Figma", icon: <SiFigma />, color: "#ff6b35" },
  { name: "Modern Web", icon: <SiFramer />, color: "#00d4ff" },
];

export default function TechMarquee() {
  const marqueeItems1 = [...techsRow1, ...techsRow1, ...techsRow1];
  const marqueeItems2 = [...techsRow2, ...techsRow2, ...techsRow2];

  return (
    <section className="py-24 bg-bg-base overflow-hidden border-t border-white/5">
      <div className="flex flex-col items-center mb-16 px-6 text-center">
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-dm uppercase tracking-[0.2em] text-white/50 mb-8">
          The Arsenal
        </div>
        <h2 className="text-4xl md:text-5xl font-jakarta font-medium tracking-tight text-white/50">
          Tools I <span className="font-extrabold text-white">Trust</span>
        </h2>
      </div>

      <div className="relative flex flex-col gap-6">
        {/* Row 1: Left */}
        <div className="flex w-[300vw] animate-marquee items-center gap-6">
          {marqueeItems1.map((tech, index) => (
            <div
              key={`row1-${index}`}
              className="flex items-center flex-shrink-0 px-8 py-4 rounded-full border border-white/5 bg-white/[0.03] text-sm whitespace-nowrap backdrop-blur-sm group hover:border-white/10 transition-colors"
            >
              <span
                className="text-xl mr-3 transition-transform group-hover:scale-110"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </span>
              <span className="font-jakarta font-semibold tracking-wide text-white/80">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Row 2: Right */}
        <div className="flex w-[300vw] animate-marquee-reverse items-center gap-6 self-end">
          {marqueeItems2.map((tech, index) => (
            <div
              key={`row2-${index}`}
              className="flex items-center flex-shrink-0 px-8 py-4 rounded-full border border-white/5 bg-white/[0.03] text-sm whitespace-nowrap backdrop-blur-sm group hover:border-white/10 transition-colors"
            >
              <span
                className="text-xl mr-3 transition-transform group-hover:scale-110"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </span>
              <span className="font-jakarta font-semibold tracking-wide text-white/80">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

