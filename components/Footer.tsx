"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/8 py-8 bg-[#050810] z-10 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <Link href="#home" className="text-xl font-jakarta font-bold tracking-tight mb-4 md:mb-0 hover:opacity-80 transition-opacity">
          DINESH<span className="text-[#00d4ff]">.</span>
        </Link>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="text-sm font-dm text-white/40 mb-1">
            © {new Date().getFullYear()} Dinesh Manore
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/20">
             <a href="https://github.com/dineshmanore" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d4ff] transition-colors">GitHub</a>
             <span>/</span>
             <a href="https://www.linkedin.com/in/dineshmanore/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d4ff] transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
