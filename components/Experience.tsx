"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "G H Raisoni University",
    role: "B.Tech Second Year",
    period: "2024 - 2028",
    description: "Actively pursuing B.Tech at G H Raisoni International Skill Tech University, Pune. Mastering core engineering principles and advanced web architectures.",
    highlights: ["Academic Excellence", "Lab Research", "Data Structures"]
  },
  {
    company: "AI & Full Stack Lab",
    role: "Project Developer",
    period: "2024 - Present",
    description: "Developing complex applications like 'AI Study Copilot' and 'SmartCart' using modern JavaScript and intelligent APIs.",
    highlights: ["React Development", "API Integration", "AI Logic"]
  },
  {
    company: "Event Management Dev",
    role: "System Designer",
    period: "2025",
    description: "Architected a structured discovery and ticketing platform focusing on user flow optimization and practical functionality.",
    highlights: ["System Design", "UI/UX Flow", "Problem Solving"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-24 text-center"
        >
          <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-dm uppercase tracking-[0.2em] text-white/50 mb-8">
            The Journey
          </div>
          <h2 className="text-5xl md:text-6xl font-jakarta font-medium tracking-tighter text-white/50 mb-2">
            My <span className="font-extrabold text-white">Experience</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center justify-between`}
              >
                {/* Connector Dot */}
                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-base border-2 border-white/20 z-10 hidden md:block" />

                {/* Content Card */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-sm font-dm text-white/40 tracking-wider mb-2 block">{exp.period}</span>
                  <h3 className="text-3xl font-jakarta font-bold text-white mb-2">{exp.company}</h3>
                  <p className="text-[#00d4ff] font-dm text-lg mb-6">{exp.role}</p>
                  <p className="text-white/50 font-dm leading-relaxed text-lg mb-8 max-w-lg ml-auto mr-0 md:mr-auto">
                    {exp.description}
                  </p>
                  <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    {exp.highlights.map(h => (
                      <span key={h} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/40 font-bold uppercase tracking-widest">{h}</span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
