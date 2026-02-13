"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface ValentineProposalProps {
  onYes: () => void;
}

export function ValentineProposal({ onYes }: ValentineProposalProps) {
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleNo = useCallback(() => {
    if (hasAccepted) return;
    
    setShowWrongAnswer(true);
    
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPosition({ x: randomX, y: randomY });
    
    setTimeout(() => {
      setShowWrongAnswer(false);
      setTimeout(() => {
        setNoButtonPosition({ x: 0, y: 0 });
      }, 500);
    }, 3000);
  }, [hasAccepted]);

  const handleYes = useCallback(() => {
    if (hasAccepted) return;
    setHasAccepted(true);
    onYes();
  }, [hasAccepted, onYes]);

  const handleNoHover = useCallback(() => {
    const randomX = (Math.random() - 0.5) * 150;
    const randomY = (Math.random() - 0.5) * 150;
    setNoButtonPosition({ x: randomX, y: randomY });
  }, []);

  return (
    <>
      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-32 pt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative flex flex-col items-center gap-8"
        >
          {/* Glowing, pulsing heart with text inside */}
          <motion.div
            className="relative flex h-[400px] w-[400px] items-center justify-center"
            style={{
              clipPath: 'path("M200,358.32l-24.16-22C90,256,33.32,204.68,33.32,141.68 C33.32,90.32,73.68,50,125,50c29,0,56.84,13.52,75,34.84C218.16,63.52,246,50,275,50 C326.32,50,366.68,90.32,366.68,141.68c0,63-56.68,114.32-142.52,192.32L200,358.32z")',
              WebkitClipPath: 'path("M200,358.32l-24.16-22C90,256,33.32,204.68,33.32,141.68 C33.32,90.32,73.68,50,125,50c29,0,56.84,13.52,75,34.84C218.16,63.52,246,50,275,50 C326.32,50,366.68,90.32,366.68,141.68c0,63-56.68,114.32-142.52,192.32L200,358.32z")',
            }}
            animate={{
              scale: [1, 1.08, 1],
              filter: [
                "brightness(1) drop-shadow(0 0 40px rgba(255,128,181,0.8))",
                "brightness(1.15) drop-shadow(0 0 80px rgba(255,128,181,1)) drop-shadow(0 0 120px rgba(245,203,167,0.9))",
                "brightness(1) drop-shadow(0 0 40px rgba(255,128,181,0.8))",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Heart path for clip-path - scaled to 400x400 coordinate system with darker colors */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'path("M200,358.32l-24.16-22C90,256,33.32,204.68,33.32,141.68 C33.32,90.32,73.68,50,125,50c29,0,56.84,13.52,75,34.84C218.16,63.52,246,50,275,50 C326.32,50,366.68,90.32,366.68,141.68c0,63-56.68,114.32-142.52,192.32L200,358.32z")',
                WebkitClipPath: 'path("M200,358.32l-24.16-22C90,256,33.32,204.68,33.32,141.68 C33.32,90.32,73.68,50,125,50c29,0,56.84,13.52,75,34.84C218.16,63.52,246,50,275,50 C326.32,50,366.68,90.32,366.68,141.68c0,63-56.68,114.32-142.52,192.32L200,358.32z")',
                background: "radial-gradient(circle at center, #ff80b5 0%, #f03572 25%, #d91e5f 50%, #b31245 75%, #8b0e35 100%)",
              }}
            />
            {/* Subtle outline/halo */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'path("M200,358.32l-24.16-22C90,256,33.32,204.68,33.32,141.68 C33.32,90.32,73.68,50,125,50c29,0,56.84,13.52,75,34.84C218.16,63.52,246,50,275,50 C326.32,50,366.68,90.32,366.68,141.68c0,63-56.68,114.32-142.52,192.32L200,358.32z")',
                WebkitClipPath: 'path("M200,358.32l-24.16-22C90,256,33.32,204.68,33.32,141.68 C33.32,90.32,73.68,50,125,50c29,0,56.84,13.52,75,34.84C218.16,63.52,246,50,275,50 C326.32,50,366.68,90.32,366.68,141.68c0,63-56.68,114.32-142.52,192.32L200,358.32z")',
                background: "transparent",
                boxShadow: "inset 0 0 0 1px rgba(255,234,234,0.4), 0 0 20px rgba(255,234,234,0.3), 0 0 40px rgba(255,192,203,0.2)",
              }}
            />
            {/* Text inside heart */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="relative z-10 font-serif text-center font-semibold text-white px-6 py-2"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                lineHeight: '1.2',
                textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)",
                maxWidth: '90%',
              }}
            >
              Will you be my valentine?
            </motion.h2>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative flex gap-4 items-center justify-center"
          >
            <motion.button
              onClick={handleYes}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3 text-base relative z-10"
              animate={hasAccepted ? { scale: 1.2 } : {}}
            >
              Yes
            </motion.button>
            {!hasAccepted && (
              <motion.button
                onClick={handleNo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost px-8 py-3 text-base relative z-10"
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                onMouseEnter={handleNoHover}
              >
                No
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Wrong answer popup */}
      <AnimatePresence>
        {showWrongAnswer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowWrongAnswer(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="glass-panel relative mx-4 max-w-md rounded-2xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-2xl font-semibold text-[#ff80b5] sm:text-3xl"
              >
                endhuvadaa, wrong answer shundapiiiii
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
