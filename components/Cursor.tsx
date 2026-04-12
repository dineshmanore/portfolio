"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [laggingPosition, setLaggingPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let lerpX = laggingPosition.x;
    let lerpY = laggingPosition.y;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const animateLaggingCursor = () => {
      // Lerp logic (0.12 factor)
      lerpX += (mousePosition.x - lerpX) * 0.12;
      lerpY += (mousePosition.y - lerpY) * 0.12;
      setLaggingPosition({ x: lerpX, y: lerpY });
      animationFrameId = requestAnimationFrame(animateLaggingCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("a") || 
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    animateLaggingCursor();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  return (
    <>
      {/* 8px Cyan Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan rounded-full pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      
      {/* Lagging Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan pointer-events-none z-[9998]"
        animate={{
          x: laggingPosition.x - (isHovering ? 29 : 20),
          y: laggingPosition.y - (isHovering ? 29 : 20),
          width: isHovering ? 58 : 40,
          height: isHovering ? 58 : 40,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.0 }}
        style={{
          boxShadow: isHovering ? "0 0 15px rgba(0, 212, 255, 0.4)" : "none",
        }}
      />
    </>
  );
}
