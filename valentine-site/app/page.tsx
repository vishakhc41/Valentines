"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { HeartParticles } from "./components/HeartParticles";
import { Preloader } from "./components/Preloader";
import { Timeline } from "./components/Timeline";
import { LoveCounter } from "./components/LoveCounter";
import { LoveLetter } from "./components/LoveLetter";
import { ValentineProposal } from "./components/ValentineProposal";
import { CelebrationShower } from "./components/CelebrationShower";

export default function Home() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const celebrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const loveScrollRef = useRef<HTMLDivElement | null>(null);
  const [loveScrollActive, setLoveScrollActive] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem("valentine-music-on")
      : null;
    if (stored === "true") {
      setMusicOn(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("valentine-music-on", musicOn ? "true" : "false");
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .catch(() => {
          // autoplay might fail; user can toggle again
        });
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  // Preload celebration audio on mount
  useEffect(() => {
    if (typeof window === "undefined" || !celebrationAudioRef.current) return;
    const audio = celebrationAudioRef.current;
    audio.preload = "auto";
    // Load the audio
    audio.load();
  }, []);

  useEffect(() => {
    if (!loveScrollRef.current || typeof window === "undefined") return;

    const target = loveScrollRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once it comes meaningfully into view, start the scroll and keep it going
        if (entry.isIntersecting) {
          setLoveScrollActive(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToJourney = useCallback(() => {
    const el = document.getElementById("timeline");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const onSonyClick = useCallback(() => {
    const el = document.getElementById("sony-name");
    if (!el) return;
    el.animate(
      [
        { transform: "scale(1)", textShadow: "0 0 0px rgba(255,128,181,0.0)" },
        {
          transform: "scale(1.09)",
          textShadow: "0 0 22px rgba(255,128,181,0.9)",
        },
        { transform: "scale(1)", textShadow: "0 0 0px rgba(255,128,181,0.0)" },
      ],
      {
        duration: 750,
        easing: "ease-in-out",
      }
    );
  }, []);

  const handleYes = useCallback(() => {
    setCelebrationActive(true);
    // Play celebration audio when Yes is clicked
    if (celebrationAudioRef.current) {
      const audio = celebrationAudioRef.current;
      // Reset to beginning to ensure clean playback
      audio.currentTime = 0;
      audio.volume = 0.8;
      
      // Pause background music temporarily if playing
      const wasMusicPlaying = musicOn && audioRef.current && !audioRef.current.paused;
      if (wasMusicPlaying && audioRef.current) {
        audioRef.current.pause();
      }
      
      // Play the celebration audio
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            // Resume background music when celebration audio ends
            audio.onended = () => {
              if (wasMusicPlaying && audioRef.current) {
                audioRef.current.play().catch(() => {});
              }
            };
          })
          .catch((error) => {
            // If play fails, try to resume background music
            if (wasMusicPlaying && audioRef.current) {
              audioRef.current.play().catch(() => {});
            }
            console.error("Error playing celebration audio:", error);
          });
      }
    }
  }, [musicOn]);

  return (
    <>
      <Preloader />
      <HeartParticles />
      <CelebrationShower active={celebrationActive} />
      <audio
        ref={audioRef}
        loop
        className="hidden"
        src="/music.mp3"
      />
      <audio
        ref={celebrationAudioRef}
        className="hidden"
        preload="auto"
        src="/Untitled video - Made with Clipchamp (1).m4a"
      />

      <main className="relative z-10 min-h-screen valentine-gradient">
        {/* Top chrome: subtle nav */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-center bg-gradient-to-b from-black/80 via-black/50 to-transparent pb-6 pt-4 backdrop-blur-md">
          <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#f7c0d9]">
              <span className="h-1 w-1 rounded-full bg-[#ff80b5] shadow-[0_0_10px_rgba(255,128,181,0.9)]" />
              <span>Our private little universe</span>
            </div>
          </div>
        </div>

        {/* HERO */}
        <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,#ff80b522,transparent_60%),radial-gradient(circle_at_85%_20%,#f5cba729,transparent_65%)]" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-[11px] uppercase tracking-[0.3em] text-[#f7c0d9]"
              >
                A cinematic Valentine for you
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.85, ease: "easeOut" }}
                className="font-serif text-4xl font-semibold leading-tight text-[#fff0f7] sm:text-5xl lg:text-6xl"
              >
                <span
                  id="sony-name"
                  onClick={onSonyClick}
                  className="cursor-pointer bg-gradient-to-r from-[#ff80b5] via-[#f5cba7] to-[#ff80b5] bg-clip-text text-transparent"
                >
                  Sony
                </span>
                , this is our story{" "}
                <span className="align-middle text-[#ff80b5]">❤️</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.85, ease: "easeOut" }}
                className="max-w-lg text-sm leading-relaxed text-[#f1d5e0] sm:text-[0.97rem]"
              >
                Crafted by{" "}
                <span className="font-semibold text-[#f5cba7]">
                  your dear Mandan
                </span>{" "}
                for the girl who turned ordinary days into scenes I never want
                to stop replaying. This isn&apos;t just a website—it&apos;s a
                little universe where every animation, every glow, every detail
                is a quiet I love you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <button onClick={scrollToJourney} className="btn-primary">
                  Our journey
                </button>
                <a href="#love-letter" className="btn-ghost">
                  Read my letter
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.8, ease: "easeOut" }}
                className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#e5c8d4]"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-8 rounded-full bg-[#ff80b5]" />
                  <span>Started talking · 10 June 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-8 rounded-full bg-[#f5cba7]" />
                  <span>Got together · 21 October</span>
                </div>
              </motion.div>
            </div>

            {/* Hero visual: glowing heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
              className="relative mt-4 h-64 flex-1 sm:h-80 lg:h-96"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[300px] sm:w-[300px] lg:h-[300px] lg:w-[300px]"
                  style={{
                    clipPath: 'path("M150,268.74l-18.12-16.5C67.5,192,24.99,153.51,24.99,106.26 C24.99,67.74,55.26,37.5,93.75,37.5c21.75,0,42.63,10.14,56.25,26.13C163.62,47.64,184.5,37.5,206.25,37.5 C244.74,37.5,275.01,67.74,275.01,106.26c0,47.25-42.51,85.74-106.89,144.24L150,268.74z")',
                    WebkitClipPath: 'path("M150,268.74l-18.12-16.5C67.5,192,24.99,153.51,24.99,106.26 C24.99,67.74,55.26,37.5,93.75,37.5c21.75,0,42.63,10.14,56.25,26.13C163.62,47.64,184.5,37.5,206.25,37.5 C244.74,37.5,275.01,67.74,275.01,106.26c0,47.25-42.51,85.74-106.89,144.24L150,268.74z")',
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 50px rgba(255,128,181,0.75)",
                      "0 0 80px rgba(245,203,167,0.8)",
                      "0 0 50px rgba(255,128,181,0.75)",
                    ],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Heart path for clip-path - scaled to 300x300 coordinate system */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: 'path("M150,268.74l-18.12-16.5C67.5,192,24.99,153.51,24.99,106.26 C24.99,67.74,55.26,37.5,93.75,37.5c21.75,0,42.63,10.14,56.25,26.13C163.62,47.64,184.5,37.5,206.25,37.5 C244.74,37.5,275.01,67.74,275.01,106.26c0,47.25-42.51,85.74-106.89,144.24L150,268.74z")',
                      WebkitClipPath: 'path("M150,268.74l-18.12-16.5C67.5,192,24.99,153.51,24.99,106.26 C24.99,67.74,55.26,37.5,93.75,37.5c21.75,0,42.63,10.14,56.25,26.13C163.62,47.64,184.5,37.5,206.25,37.5 C244.74,37.5,275.01,67.74,275.01,106.26c0,47.25-42.51,85.74-106.89,144.24L150,268.74z")',
                      background: "radial-gradient(circle at center, #ffeaea 0%, #ffb3d9 30%, #ff80b5 60%, #f03572 85%, #b31245 100%)",
                    }}
                  />
                  {/* Subtle outline/halo */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: 'path("M150,268.74l-18.12-16.5C67.5,192,24.99,153.51,24.99,106.26 C24.99,67.74,55.26,37.5,93.75,37.5c21.75,0,42.63,10.14,56.25,26.13C163.62,47.64,184.5,37.5,206.25,37.5 C244.74,37.5,275.01,67.74,275.01,106.26c0,47.25-42.51,85.74-106.89,144.24L150,268.74z")',
                      WebkitClipPath: 'path("M150,268.74l-18.12-16.5C67.5,192,24.99,153.51,24.99,106.26 C24.99,67.74,55.26,37.5,93.75,37.5c21.75,0,42.63,10.14,56.25,26.13C163.62,47.64,184.5,37.5,206.25,37.5 C244.74,37.5,275.01,67.74,275.01,106.26c0,47.25-42.51,85.74-106.89,144.24L150,268.74z")',
                      background: "transparent",
                      boxShadow: "inset 0 0 0 1px rgba(255,234,234,0.4), 0 0 20px rgba(255,234,234,0.3), 0 0 40px rgba(255,192,203,0.2)",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Timeline />
        <LoveCounter />

        {/* I love you thiiiiiiis much section */}
        <section
          ref={loveScrollRef}
          className="relative mx-auto mt-10 mb-8 flex min-h-[35vh] max-w-5xl flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 text-xs uppercase tracking-[0.3em] text-[#f7c0d9]"
          >
            How much I love you
          </motion.p>

          <div className="relative flex h-[30vh] w-full items-center overflow-hidden rounded-[999px] border border-[#ff80b544] bg-black/40 px-6 shadow-[0_0_60px_rgba(255,128,181,0.55)] backdrop-blur">
            <div
              className={`whitespace-nowrap text-center font-semibold text-[#ffe4f3] text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${
                loveScrollActive ? "love-scroll" : ""
              }`}
            >
              I LOVE YOU THIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS MUCHHH 💖
              &nbsp;&nbsp;&nbsp;&nbsp;
              I LOVE YOU THIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS MUCHHH 💖
            </div>
          </div>
        </section>

        <LoveLetter />

        {/* Valentine Proposal */}
        <ValentineProposal onYes={handleYes} />
      </main>
    </>
  );
}

