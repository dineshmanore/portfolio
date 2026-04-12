"use client";

import { motion, useScroll } from "framer-motion";
import Header from "@/components/Header";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import TechMarquee from "@/components/TechMarquee";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative bg-bg-base min-h-screen text-text-main selection:bg-cyan selection:text-[#050810]">
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[999] origin-left bg-gradient-to-r from-[#00d4ff] to-[#ff6b35]"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00d4ff]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ff6b35]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      
      <Header />
      <ScrollyCanvas />
      
      <div className="relative z-10 bg-bg-base w-full">
        <About />
        <TechMarquee />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
