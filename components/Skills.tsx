"use client";

import { motion } from "framer-motion";
import { FiLayout, FiCode, FiSmartphone, FiMonitor } from "react-icons/fi";

const services = [
  {
    icon: <FiLayout />,
    title: "Frontend Architecture",
    description: "Designing scalable, maintainable, and high-performance frontend systems using semantic accessible markup and clean visual hierarchy.",
  },
  {
    icon: <FiCode />,
    title: "Interactive Development",
    description: "Building seamless user interfaces with advanced DOM manipulation, dynamic events, and modern Javascript.",
  },
  {
    icon: <FiSmartphone />,
    title: "Responsive Design",
    description: "Crafting fluid, mobile-first layouts that adapt perfectly to any screen size or device ecosystem.",
  },
  {
    icon: <FiMonitor />,
    title: "UI Implementation",
    description: "Translating complex designs into pixel-perfect, interactive code with smooth framer-motion animations.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 w-full flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-20 text-center"
      >
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-dm uppercase tracking-[0.2em] text-white/50 mb-8">
          Core Capabilities
        </div>
        <h2 className="text-5xl md:text-6xl font-jakarta font-medium tracking-tight text-white/50 mb-2">
          What I <span className="font-extrabold text-white">Do</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1200px]">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-[#0a0a0a] border border-white/[0.05] rounded-3xl p-10 md:p-14 hover:bg-[#111] transition-all duration-500 group"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-[22px] text-white/80 mb-10 group-hover:scale-105 transition-transform duration-500">
              {service.icon}
            </div>
            <h3 className="text-2xl md:text-[28px] font-jakarta font-bold text-white mb-5 tracking-tight">{service.title}</h3>
            <p className="text-white/40 font-dm text-[17px] leading-relaxed font-normal">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
