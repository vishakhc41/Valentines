"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";

interface CelebrationShowerProps {
  active: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'confetti' | 'text' | 'firework';
  color: string;
  opacity: number;
  text?: string;
  life?: number;
  maxLife?: number;
}

export function CelebrationShower({ active }: CelebrationShowerProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const idCounterRef = useRef<number>(0);
  const fireworkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const windowSizeRef = useRef({ width: 1920, height: 1080 });

  // Memoize color arrays
  const heartColors = useMemo(() => ['#ff80b5', '#f03572', '#ff1493', '#ffb3d9'], []);
  const confettiColors = useMemo(() => ['#ff80b5', '#f5cba7', '#f03572', '#ffe0f0', '#b31245', '#ffdec8'], []);
  const textColors = useMemo(() => ['#ff80b5', '#ff1493', '#f03572', '#ffb3d9'], []);
  const fireworkColors = useMemo(() => ['#ff80b5', '#ff1493', '#f03572', '#f5cba7', '#ffb3d9', '#ffe0f0', '#b31245'], []);

  // Update window size
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateSize = () => {
      windowSizeRef.current = { width: window.innerWidth, height: window.innerHeight };
    };
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      idCounterRef.current = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fireworkIntervalRef.current) clearInterval(fireworkIntervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    // Initialize particles
    const initParticles = (): Particle[] => {
      const newParticles: Particle[] = [];
      const width = windowSizeRef.current.width;
      
      // Hearts
      for (let i = 0; i < 60; i++) {
        newParticles.push({
          id: idCounterRef.current++,
          x: Math.random() * width,
          y: -50 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 1.5 + Math.random() * 2.5,
          size: 20 + Math.random() * 25,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 4,
          type: 'heart',
          color: heartColors[Math.floor(Math.random() * heartColors.length)],
          opacity: 0.8,
        });
      }

      // Confetti
      for (let i = 0; i < 70; i++) {
        newParticles.push({
          id: idCounterRef.current++,
          x: Math.random() * width,
          y: -50 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 3,
          vy: 2 + Math.random() * 3,
          size: 4 + Math.random() * 6,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          type: 'confetti',
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          opacity: 0.9,
        });
      }

      // Text particles
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: idCounterRef.current++,
          x: Math.random() * width,
          y: -50 - Math.random() * 100,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 1.2 + Math.random() * 2,
          size: 24 + Math.random() * 16,
          rotation: (Math.random() - 0.5) * 15,
          rotationSpeed: (Math.random() - 0.5) * 2,
          type: 'text',
          color: textColors[Math.floor(Math.random() * textColors.length)],
          opacity: 0.9,
          text: Math.random() > 0.5 ? 'I LOVE YOUUU' : 'UMMMAAAA',
        });
      }

      return newParticles;
    };

    setParticles(initParticles());

    // Add new particles periodically
    intervalRef.current = setInterval(() => {
      setParticles((prev) => {
        if (prev.length >= 250) return prev;
        
        const newParticles: Particle[] = [];
        const width = windowSizeRef.current.width;
        
        // Add some hearts
        for (let i = 0; i < 8; i++) {
          newParticles.push({
            id: idCounterRef.current++,
            x: Math.random() * width,
            y: -50,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 1.5 + Math.random() * 2.5,
            size: 20 + Math.random() * 25,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4,
            type: 'heart',
            color: heartColors[Math.floor(Math.random() * heartColors.length)],
            opacity: 0.8,
          });
        }

        // Add some confetti
        for (let i = 0; i < 10; i++) {
          newParticles.push({
            id: idCounterRef.current++,
            x: Math.random() * width,
            y: -50,
            vx: (Math.random() - 0.5) * 3,
            vy: 2 + Math.random() * 3,
            size: 4 + Math.random() * 6,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            type: 'confetti',
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            opacity: 0.9,
          });
        }

        // Add some text particles randomly
        if (Math.random() > 0.6) {
          for (let i = 0; i < 2; i++) {
            newParticles.push({
              id: idCounterRef.current++,
              x: Math.random() * width,
              y: -50,
              vx: (Math.random() - 0.5) * 1.2,
              vy: 1.2 + Math.random() * 2,
              size: 24 + Math.random() * 16,
              rotation: (Math.random() - 0.5) * 15,
              rotationSpeed: (Math.random() - 0.5) * 2,
              type: 'text',
              color: textColors[Math.floor(Math.random() * textColors.length)],
              opacity: 0.9,
              text: Math.random() > 0.5 ? 'I LOVE YOUUU' : 'UMMMAAAA',
            });
          }
        }

        return [...prev, ...newParticles];
      });
    }, 500);

    // Optimized animation loop
    const animate = () => {
      if (!active) return;
      
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        
        const { height, width } = windowSizeRef.current;
        const newParticles: Particle[] = [];
        newParticles.length = 0; // Pre-allocate
        
        for (let i = 0; i < prev.length; i++) {
          const particle = prev[i];
          const newParticle = { ...particle };
          
          // Update position
          newParticle.x += newParticle.vx;
          newParticle.y += newParticle.vy;
          newParticle.rotation += newParticle.rotationSpeed;
          
          // Wrap around horizontally
          if (newParticle.x < -50) newParticle.x = width + 50;
          if (newParticle.x > width + 50) newParticle.x = -50;
          
          // Update opacity
          if (newParticle.type === 'firework') {
            if (newParticle.life !== undefined && newParticle.maxLife !== undefined) {
              newParticle.life += 1;
              newParticle.opacity = Math.max(0, 1 - (newParticle.life / newParticle.maxLife));
              newParticle.vx *= 0.98;
              newParticle.vy *= 0.98;
              newParticle.vy += 0.1;
            }
          } else {
            if (newParticle.y < 0) {
              newParticle.opacity = Math.min(1, (newParticle.y + 100) / 100);
            } else if (newParticle.y > height) {
              newParticle.opacity = Math.max(0, 1 - (newParticle.y - height) / 100);
            } else {
              newParticle.opacity = newParticle.type === 'text' ? 0.9 : 0.8;
            }
          }
          
          // Filter visible particles
          if (newParticle.type === 'firework') {
            if (newParticle.opacity > 0 && newParticle.life !== undefined && newParticle.maxLife !== undefined && newParticle.life < newParticle.maxLife) {
              newParticles.push(newParticle);
            }
          } else {
            if (newParticle.y > -100 && newParticle.y < height + 100 && newParticle.opacity > 0) {
              newParticles.push(newParticle);
            }
          }
        }
        
        return newParticles;
      });
      
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Create firework explosions periodically
    fireworkIntervalRef.current = setInterval(() => {
      const { width, height } = windowSizeRef.current;
      
      const fireworkX = Math.random() * width;
      const fireworkY = 100 + Math.random() * (height * 0.6);
      
      const fireworkParticles: Particle[] = [];
      
      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40;
        const speed = 3 + Math.random() * 5;
        fireworkParticles.push({
          id: idCounterRef.current++,
          x: fireworkX,
          y: fireworkY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: 4 + Math.random() * 6,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          type: 'firework',
          color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
          opacity: 1,
          life: 0,
          maxLife: 80 + Math.random() * 40,
        });
      }
      
      setParticles((prev) => [...prev, ...fireworkParticles]);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fireworkIntervalRef.current) clearInterval(fireworkIntervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, heartColors, confettiColors, textColors, fireworkColors]);

  if (!active || particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
          }}
        >
          {particle.type === 'heart' ? (
            <div
              className="relative"
              style={{
                width: particle.size,
                height: particle.size,
              }}
            >
              {/* Heart path for clip-path */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")',
                  WebkitClipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")',
                  background: "radial-gradient(circle at center, #ffeaea 0%, #ffb3d9 30%, #ff80b5 60%, #f03572 85%, #b31245 100%)",
                }}
              />
              {/* Subtle outline/halo */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")',
                  WebkitClipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")',
                  background: "transparent",
                  boxShadow: "inset 0 0 0 0.5px rgba(255,234,234,0.4), 0 0 8px rgba(255,234,234,0.2)",
                }}
              />
            </div>
          ) : particle.type === 'text' ? (
            <div
              className="font-serif font-bold whitespace-nowrap"
              style={{
                fontSize: `${particle.size}px`,
                color: particle.color,
                textShadow: `0 0 10px ${particle.color}, 0 0 20px ${particle.color}, 0 0 30px rgba(255, 128, 181, 0.8)`,
              }}
            >
              {particle.text}
            </div>
          ) : particle.type === 'firework' ? (
            <div
              className="rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}, 0 0 ${particle.size * 9}px rgba(255, 128, 181, 0.6)`,
              }}
            />
          ) : (
            <div
              className="rounded-sm"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 8px ${particle.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
