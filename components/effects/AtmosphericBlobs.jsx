'use client';
import { useEffect, useRef } from 'react';

/**
 * Lava-lamp style atmospheric glows that drift organically and subtly
 * lean toward the pointer. Uses requestAnimationFrame + direct DOM style
 * mutations — zero React re-renders, zero Framer Motion overhead here.
 *
 * All keyframe CSS lives in globals.css (blob-drift-*) to avoid
 * SSR hydration mismatches from inline <style> tags.
 */

const BLOBS = [
  // [x%, y%, w, h, color (pastel light), driftDuration, opacityBase, phase]
  ['18%', '12%',  '55vw', '55vw', 'rgba(220,38,38,0.07)',   28, 0.7, 0],
  ['68%', '8%',   '45vw', '45vw', 'rgba(153,27,27,0.05)',  36, 0.6, 1],
  ['5%',  '52%',  '40vw', '40vw', 'rgba(239,68,68,0.05)',   22, 0.6, 2],
  ['72%', '55%',  '50vw', '50vw', 'rgba(220,38,38,0.04)',   42, 0.5, 3],
  ['40%', '80%',  '35vw', '35vw', 'rgba(127,29,29,0.04)', 18, 0.5, 4],
];

// lerp factor for mouse bias (how fast blobs "lean" toward cursor)
const MOUSE_LERP = 0.03;
// max px blob centers shift toward mouse
const MAX_SHIFT = typeof window !== 'undefined' ? window.innerWidth * 0.03 : 40;

export default function AtmosphericBlobs() {
  const containerRef = useRef(null);
  const stateRef = useRef({
    mouseX: 0.5,
    mouseY: 0.5,
    blobOffsets: BLOBS.map(() => ({ x: 0, y: 0, tx: 0, ty: 0 })),
    rafId: null,
    reduced: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const s = stateRef.current;
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = containerRef.current;
    if (!container) return;

    const blobEls = Array.from(container.querySelectorAll('.atm-blob'));
    const maxShift = window.innerWidth * 0.03;

    const onMove = (e) => {
      if (s.reduced) return;
      s.mouseX = e.clientX / window.innerWidth;
      s.mouseY = e.clientY / window.innerHeight;
    };

    const loop = () => {
      if (!s.reduced) {
        blobEls.forEach((el, i) => {
          const off = s.blobOffsets[i];
          // Each blob has a different "gravity" toward mouse — distance from blob center matters
          const blobCx = BLOBS[i][0].includes('%')
            ? parseFloat(BLOBS[i][0]) / 100
            : 0.5;
          const blobCy = BLOBS[i][1].includes('%')
            ? parseFloat(BLOBS[i][1]) / 100
            : 0.5;

          // Vector from blob center to mouse (normalized), then scale to px
          const dx = (s.mouseX - blobCx) * maxShift;
          const dy = (s.mouseY - blobCy) * maxShift;

          off.tx = dx;
          off.ty = dy;
          off.x += (off.tx - off.x) * MOUSE_LERP;
          off.y += (off.ty - off.y) * MOUSE_LERP;

          el.style.transform = `translate(${off.x}px, ${off.y}px)`;
        });
      }
      s.rafId = requestAnimationFrame(loop);
    };

    s.rafId = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(s.rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        contain: 'layout style paint',
      }}
    >
      {BLOBS.map(([x, y, w, h, color, dur, opacity, phase], i) => (
        <div
          key={i}
          className={`atm-blob atm-blob-${phase}`}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: w,
            height: h,
            background: color,
            borderRadius: '50%',
            filter: 'blur(120px)',
            opacity,
            willChange: 'transform',
            animationDuration: `${dur}s`,
          }}
        />
      ))}
    </div>
  );
}
