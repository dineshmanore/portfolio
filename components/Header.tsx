"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { FiGithub, FiLinkedin, FiFileText } from "react-icons/fi";

const navLinks = [
  { name: "About", id: "home" },
  { name: "Services", id: "skills" },
  { name: "Work", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observers = navLinks.map((link) => {
      const el = document.getElementById(link.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link.id);
            }
          });
        },
        { rootMargin: "-30% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-auto",
        scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="#home" className="text-[18px] font-jakarta font-extrabold tracking-tighter hover:opacity-80 transition-opacity text-white">
          DINESH<span className="text-white/40">.</span>
        </Link>
        
        {/* Center: Nav links */}
        <nav className="hidden xl:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="group relative text-[13px] font-dm font-medium tracking-wide"
            >
              <span
                className={clsx(
                  "transition-all duration-300",
                  activeSection === link.id ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right: Socials & Resume CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-5">
            <a href="https://github.com/dineshmanore" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-300">
              <FiGithub size={19} />
            </a>
            <a href="https://www.linkedin.com/in/dineshmanore/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-300">
              <FiLinkedin size={19} />
            </a>
          </div>
          <a href="#" className="flex items-center gap-2.5 px-6 py-2 bg-white/10 border border-white/5 hover:bg-white/15 rounded-full font-dm text-[13px] font-semibold transition-all text-white">
            <FiFileText size={15} /> Resume
          </a>
        </div>
      </div>
    </header>
  );
}
