"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LETTER_TEXT = `Sony,

I don't know exactly which moment it was that made my heart quietly decide,
"It's her." Maybe it was your laugh. Maybe it was the way you looked at me. Maybe
it was every tiny, ordinary moment that somehow felt softer just because you
were there.

From that first conversation on 10 June 2025, you've turned regular days into
scenes I replay in my head when I miss you. You've taken the loud parts of the
world and made them feel quiet, safe, and warm.

I love the way you care. I love the way you feel everything deeply. I love
the way your presence can calm my overthinking without you even trying. I
love that with you, even silence feels full.

This little love letter is just my way of saying something simple but true:
you matter to me, more than you know. I am grateful for you — for your heart,
your kindness, your patience, your light.

No matter where we are or what changes around us, there is a part of me that
will always be holding your hand in every version of the future I imagine.

With all my love,
Vishakh`;

export function LoveLetter() {
  const [displayText, setDisplayText] = useState("");
  const frameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    const full = LETTER_TEXT;
    const total = full.length;
    const durationMs = 40_000;
    const start = performance.now();
    const throttleMs = 50; // Update every 50ms for better performance

    const loop = (now: number) => {
      // Throttle updates
      if (now - lastUpdateRef.current < throttleMs) {
        frameRef.current = requestAnimationFrame(loop);
        return;
      }
      lastUpdateRef.current = now;

      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const chars = Math.floor(progress * total);
      setDisplayText(full.slice(0, chars));
      if (chars < total) {
        frameRef.current = requestAnimationFrame(loop);
      }
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const rendered = displayText.split("\n").map((line, index) => (
    <p
      key={index}
      className="whitespace-pre-wrap text-sm leading-relaxed text-[#f5dbe6] sm:text-[0.97rem]"
    >
      {line}
    </p>
  ));

  return (
    <section
      id="love-letter"
      className="valentine-section relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <div className="absolute inset-x-0 top-10 -z-10 h-64 bg-[radial-gradient(circle_at_top,#3d0a1c_0,transparent_65%)] opacity-80" />

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-6 text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#f7c0d9]">
          A letter to you
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#ffe9f3] sm:text-[2.15rem]">
          Words my heart wrote for you
        </h2>
      </motion.header>

      <motion.div
        className="glass-panel relative overflow-hidden rounded-3xl px-5 py-6 sm:px-7 sm:py-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute -right-10 top-6 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_20%_0%,#ff80b537,transparent_65%)]" />
        <div className="pointer-events-none absolute -left-14 bottom-0 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_10%_0%,#f5cba736,transparent_65%)]" />

        <div className="relative space-y-3">
          {rendered}
          <span className="typed-cursor align-middle" />
        </div>
      </motion.div>
    </section>
  );
}
