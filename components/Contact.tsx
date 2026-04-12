"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Email", value: "dineshmanore6@gmail.com", href: "mailto:dineshmanore6@gmail.com", icon: "✉️" },
  { label: "LinkedIn", value: "/in/dineshmanore", href: "https://linkedin.com/in/dineshmanore", icon: "💼" },
  { label: "Instagram", value: "@dinesh._.44", href: "https://instagram.com/dinesh._.44", icon: "📸" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[#050810] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-[#00d4ff]/5 to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 pt-16 pb-24">
        <motion.h2 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-6xl md:text-8xl font-jakarta font-extrabold text-white tracking-tighter mb-12"
        >
          Let&apos;s Work <br className="md:hidden" /> <span className="text-white/40">Together</span>
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="text-lg md:text-xl text-white/40 font-dm max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Whether you have a unique project idea or a creative vision to bring to life, 
          I&apos;d love to hear from you. Let&apos;s build something exceptional.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a 
            href="mailto:dineshmanore6@gmail.com" 
            className="group flex items-center gap-3 px-10 py-5 bg-white rounded-full text-black font-jakarta font-bold text-sm tracking-widest hover:bg-[#00d4ff] hover:text-white transition-all duration-500"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:scale-110 transition-transform"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            SEND A MESSAGE
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          
          <button className="flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-full text-white font-jakarta font-bold text-sm tracking-widest hover:bg-white/10 transition-all duration-500">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
             DOWNLOAD CV
          </button>
        </motion.div>
      </div>
    </section>
  );
}
