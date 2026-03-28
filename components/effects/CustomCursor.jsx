'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 18 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 18 });
  const ringSize = useMotionValue(32);
  const dotSize = useMotionValue(8);
  const ringSizeSpring = useSpring(ringSize, { stiffness: 300, damping: 25 });
  const dotSizeSpring = useSpring(dotSize, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Don't activate on touch/stylus devices
    if (window.matchMedia('(hover: none)').matches) return;
    setMounted(true);

    const isInteractive = (el) => el?.closest('a, button, [data-cursor="expand"], [role="button"]');

    const onMove = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };

    const onOver = (e) => {
      if (isInteractive(e.target)) { ringSize.set(56); dotSize.set(4); setHovering(true); }
    };
    const onOut = (e) => {
      if (isInteractive(e.target)) { ringSize.set(32); dotSize.set(8); setHovering(false); }
    };
    const onDown = () => { ringSize.set(hovering ? 40 : 16); dotSize.set(5); };
    const onUp = () => { ringSize.set(hovering ? 56 : 32); dotSize.set(hovering ? 4 : 8); };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    window.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mouseup', onUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [hovering]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-foreground mix-blend-difference"
        style={{
          x: cursorX, y: cursorY,
          translateX: '-50%', translateY: '-50%',
          width: dotSizeSpring, height: dotSizeSpring,
        }}
        aria-hidden="true"
      />
      {/* Ring — spring lag */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full ${hovering ? 'holo-border' : ''}`}
        style={{
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          width: ringSizeSpring, height: ringSizeSpring,
          border: '1px solid',
          borderColor: hovering ? undefined : 'rgba(0,68,204,0.35)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
