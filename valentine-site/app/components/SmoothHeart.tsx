"use client";

import { motion } from "framer-motion";

interface SmoothHeartProps {
  size?: "small" | "large";
  className?: string;
  children?: React.ReactNode;
}

export function SmoothHeart({ size = "large", className = "", children }: SmoothHeartProps) {
  const sizeClasses = size === "small" ? "h-40 w-40 sm:h-48 sm:w-48" : "h-80 w-80 sm:h-96 sm:w-96";
  
  // Heart path for clip-path
  const heartPath = 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")';
  
  return (
    <motion.div
      className={`relative flex ${sizeClasses} items-center justify-center ${className}`}
      suppressHydrationWarning
      animate={{
        scale: [1, 1.02, 1],
        filter: [
          "brightness(1) drop-shadow(0 0 40px rgba(255,128,181,0.8))",
          "brightness(1.1) drop-shadow(0 0 60px rgba(255,128,181,1)) drop-shadow(0 0 80px rgba(245,203,167,0.9))",
          "brightness(1) drop-shadow(0 0 40px rgba(255,128,181,0.8))",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Heart shape with radial gradient - lightest at center, darker at edges */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: heartPath,
          WebkitClipPath: heartPath,
          background: "radial-gradient(circle at center, #ffeaea 0%, #ffb3d9 30%, #ff80b5 60%, #f03572 85%, #b31245 100%)",
        }}
        suppressHydrationWarning
      />
      
      {/* Subtle outline/halo effect */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: heartPath,
          WebkitClipPath: heartPath,
          background: "transparent",
          boxShadow: "inset 0 0 0 1px rgba(255,234,234,0.4), 0 0 20px rgba(255,234,234,0.3), 0 0 40px rgba(255,192,203,0.2)",
        }}
        suppressHydrationWarning
      />
      
      {/* Content (text) */}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </motion.div>
  );
}
