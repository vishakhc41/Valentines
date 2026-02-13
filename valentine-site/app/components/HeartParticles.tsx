"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";

const HEART_COUNT = 14;

// Heart path for clip-path
const heartPath = 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")';

/**
 * Subtle floating hearts that drift in the background and
 * respond gently to cursor movement for a cinematic feel.
 */
export function HeartParticles() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);

  const smoothX = useSpring(cursorX, { stiffness: 45, damping: 20 });
  const smoothY = useSpring(cursorY, { stiffness: 45, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to ~60fps
      if (now - lastUpdateRef.current < 16) return;
      lastUpdateRef.current = now;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        cursorX.set(x);
        cursorY.set(y);
      });
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  const hearts = useMemo(() => Array.from({ length: HEART_COUNT }), []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      suppressHydrationWarning
    >
      {hearts.map((_, index) => {
        const baseX = (index * 97) % 100;
        const baseY = (index * 53) % 100;
        const size = 26 + ((index * 13) % 28);
        const depth = 0.28 + ((index * 17) % 40) / 100;

        return (
          <motion.div
            key={index}
            className="floating-heart absolute"
            style={{
              left: `${baseX}%`,
              top: `${baseY}%`,
              translateX: smoothX,
              translateY: smoothY,
              opacity: 0.18 + depth * 0.4,
            }}
            transition={{ type: "spring", stiffness: 45, damping: 18 }}
            suppressHydrationWarning
          >
            <div
              className="relative"
              style={{ width: size, height: size }}
              suppressHydrationWarning
            >
              {/* Heart shape with radial gradient */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: heartPath,
                  WebkitClipPath: heartPath,
                  background: "radial-gradient(circle at center, #ffeaea 0%, #ffb3d9 30%, #ff80b5 60%, #f03572 85%, #b31245 100%)",
                }}
                suppressHydrationWarning
              />
              {/* Subtle outline/halo */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: heartPath,
                  WebkitClipPath: heartPath,
                  background: "transparent",
                  boxShadow: "inset 0 0 0 0.5px rgba(255,234,234,0.4), 0 0 8px rgba(255,234,234,0.2)",
                }}
                suppressHydrationWarning
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
