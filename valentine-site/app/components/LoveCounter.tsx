"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState, useMemo, memo } from "react";
import { HeartHandshake, Hourglass } from "lucide-react";

const FIRST_TALK = new Date("2025-06-10T00:00:00");
const TOGETHER_DAY = new Date("2025-10-21T00:00:00");

function calculateDays(from: Date, to: Date) {
  const diff = to.getTime() - from.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

const AnimatedNumber = memo(function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { stiffness: 80, damping: 18 });

  useEffect(() => {
    spring.set(value);
    const unsubscribe = spring.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return () => unsubscribe();
  }, [spring, value]);

  return (
    <span className="tabular-nums tracking-[0.15em] text-[#ffe9f3]">
      {display.toString().padStart(3, "0")}
    </span>
  );
});

export function LoveCounter() {
  const [daysSinceTalk, setDaysSinceTalk] = useState(0);
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const today = new Date();
    setDaysSinceTalk(calculateDays(FIRST_TALK, today));
    setDaysTogether(calculateDays(TOGETHER_DAY, today));
  }, []);

  return (
    <section
      id="love-counter"
      className="valentine-section relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <div className="absolute inset-0 -z-10 drifting-hearts-bg opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel relative overflow-hidden rounded-3xl px-5 py-7 sm:px-8 sm:py-9"
      >
        <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_30%_0%,#ff80b53b,transparent_60%)]" />
        <div className="pointer-events-none absolute -left-16 -bottom-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_10%_0%,#f5cba736,transparent_65%)]" />

        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-sm">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#f7c0d9]">
              Our love in numbers
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#ffe9f3] sm:text-[2.1rem]">
              Every day with you, Sony, has its own heartbeat.
            </h2>
            <p className="mt-3 text-sm text-[#e5c8d4] sm:text-[0.95rem]">
              These numbers are just a tiny way of counting something I
              feel much more deeply: how every single day with you, from
              that first conversation to right now, has meant the world
              to me.
            </p>
          </div>

          <div className="relative grid w-full max-w-xs grid-cols-1 gap-4 text-center sm:max-w-sm sm:grid-cols-2">
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-[#ff80b53b] bg-black/20 px-4 py-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#2a0514]">
                <Hourglass className="h-4 w-4 text-[#f5cba7]" />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#f7c0d9]">
                Days since
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#e5c8d4]">
                we first started talking
              </p>
              <p className="mt-3 font-serif text-2xl font-semibold">
                <AnimatedNumber value={daysSinceTalk} />
              </p>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-[#ff80b53b] bg-black/25 px-4 py-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#2a0514]">
                <HeartHandshake className="h-4 w-4 text-[#ff80b5]" />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#f7c0d9]">
                Days together
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#e5c8d4]">
                since we chose each other
              </p>
              <p className="mt-3 font-serif text-2xl font-semibold">
                <AnimatedNumber value={daysTogether} />
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
