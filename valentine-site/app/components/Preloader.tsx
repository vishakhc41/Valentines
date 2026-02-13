"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "valentine-preloader-seen";

/**
 * Cinematic preloader that:
 * 1. Draws a heart outline
 * 2. Fills it with glowing light
 * 3. Beats once
 * 4. Splits into two halves to reveal the site
 *
 * Runs once per browser session.
 */
export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<"draw" | "fill" | "beat" | "split">(
    "draw"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timers: number[] = [];

    // Move through animation stages in sequence
    timers.push(
      window.setTimeout(() => setStage("fill"), 1600), // after outline draw
    );
    timers.push(
      window.setTimeout(() => setStage("beat"), 2400), // after fill
    );
    timers.push(
      window.setTimeout(() => setStage("split"), 3400), // after beat
    );
    timers.push(
      window.setTimeout(() => setVisible(false), 4700), // after split
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#2a0514_0,#050308_60%,#02010a_100%)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Soft vignette and grain */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]" />

          {/* Central heart animation */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <svg
              width="220"
              height="200"
              viewBox="0 0 220 200"
              className="relative drop-shadow-[0_0_45px_rgba(255,128,181,0.5)]"
            >
              <defs>
                <linearGradient
                  id="heartStroke"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff80b5" />
                  <stop offset="50%" stopColor="#f5cba7" />
                  <stop offset="100%" stopColor="#ff4b8b" />
                </linearGradient>
                <radialGradient
                  id="heartFill"
                  cx="50%"
                  cy="35%"
                  r="70%"
                >
                  <stop offset="0%" stopColor="#ffbcd8" />
                  <stop offset="45%" stopColor="#ff4b8b" />
                  <stop offset="100%" stopColor="#2a0514" />
                </radialGradient>
              </defs>

              {/* Outline path that draws itself (clean, symmetrical heart) */}
              <motion.path
                d="M110 170 C 80 140, 40 120, 40 80 C 40 55, 60 40, 80 40 C 95 40, 110 50, 110 65 C 110 50, 125 40, 140 40 C 160 40, 180 55, 180 80 C 180 120, 140 140, 110 170 Z"
                fill="none"
                stroke="url(#heartStroke)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: stage === "draw" ? 1 : 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />

              {/* Fill glow */}
              <motion.path
                d="M110 170 C 80 140, 40 120, 40 80 C 40 55, 60 40, 80 40 C 95 40, 110 50, 110 65 C 110 50, 125 40, 140 40 C 160 40, 180 55, 180 80 C 180 120, 140 140, 110 170 Z"
                fill="url(#heartFill)"
                initial={{ opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }}
                animate={
                  stage === "fill" || stage === "beat" || stage === "split"
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              {/* Heart beat */}
              <motion.g
                transform="translate(0, 0)"
                animate={
                  stage === "beat"
                    ? {
                        scale: [1, 1.1, 1],
                        transformOrigin: "50% 50%",
                      }
                    : { scale: 1 }
                }
                transition={
                  stage === "beat"
                    ? { duration: 0.7, ease: "easeInOut" }
                    : { duration: 0.3 }
                }
              >
                <motion.circle
                  cx="110"
                  cy="85"
                  r="52"
                  fill="transparent"
                  stroke="rgba(255,128,181,0.3)"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    stage === "beat"
                      ? { opacity: [0, 0.8, 0], scale: [0.6, 1.3, 1.5] }
                      : { opacity: 0, scale: 0.6 }
                  }
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              </motion.g>
            </svg>
          </motion.div>

          {/* Split panels revealing the site */}
          <AnimatePresence>
            {stage === "split" && (
              <>
                <motion.div
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_0%_0%,#3d0a1c_0,#050308_60%,#02010a_100%)]"
                  initial={{ x: 0 }}
                  animate={{ x: "-120%" }}
                  exit={{ x: "-120%" }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                />
                <motion.div
                  className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_100%_0%,#3d0a1c_0,#050308_60%,#02010a_100%)]"
                  initial={{ x: 0 }}
                  animate={{ x: "120%" }}
                  exit={{ x: "120%" }}
                  transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


