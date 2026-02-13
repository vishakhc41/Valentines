"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { memo, useMemo } from "react";

const timelineEvents = [
  {
    date: "10 June 2025",
    title: "The day we started talking",
    description:
      "The first little spark. A message, a smile, and a feeling that maybe this was the start of something special.",
  },
  {
    date: "21 October",
    title: "The day everything changed",
    description:
      "The moment our story truly began. Two hearts choosing each other, and the world feeling a little softer.",
  },
];

const TimelineEvent = memo(function TimelineEvent({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  return (
    <motion.article
      className="relative flex gap-5"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
        delay: index * 0.1,
      }}
    >
      {/* Heart marker */}
      <motion.div
        className="relative mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#2a0514] ring-2 ring-[#ff80b5]/60"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-[#ff80b5]/20"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1.35, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <motion.div
          className="absolute"
          initial={{ scale: 1 }}
          whileInView={{ scale: [1, 1.2, 1] }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3 + index * 0.15,
            duration: 0.9,
            ease: "easeInOut",
          }}
        >
          <Heart className="h-3.5 w-3.5 text-[#ff80b5]" fill="#ff80b5" />
        </motion.div>
      </motion.div>

      {/* Card */}
      <div className="glass-panel relative flex-1 rounded-2xl px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#f7c0d9]/80">
          {event.date}
        </p>
        <h3 className="mt-1 font-serif text-xl font-semibold text-[#ffe9f3] sm:text-2xl">
          {event.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#e5c8d4]">
          {event.description}
        </p>
      </div>
    </motion.article>
  );
});

export function Timeline() {
  const events = useMemo(() => timelineEvents, []);

  return (
    <section
      id="timeline"
      className="valentine-section relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-0"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,#3d0a1c_0,transparent_60%)] opacity-70" />

      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-10 text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-[#f7c0d9]">
          Our timeline
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#ffe9f3] sm:text-4xl">
          The beats of our story
        </h2>
        <p className="mt-3 text-sm text-[#d4b6c1] sm:text-base">
          Every chapter with you, Sony, feels like a scene from the most
          beautiful film I never want to end.
        </p>
      </motion.header>

      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-[#ff80b5] via-[#f5cba7] to-transparent opacity-70" />

        <div className="space-y-10">
          {events.map((event, index) => (
            <TimelineEvent key={event.date} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
