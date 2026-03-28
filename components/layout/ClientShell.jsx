'use client';
import { useEffect, useRef } from 'react';
import { ScrollParallaxProvider, useScrollParallax } from '@/contexts/ScrollParallaxContext';
import ParallaxScene from '@/components/effects/ParallaxScene';
import CustomCursor from '@/components/effects/CustomCursor';
import ThemeColorCycler from '@/components/effects/ThemeColorCycler';
import { motion } from 'framer-motion';

/**
 * Parallax-driven star background wrapper.
 * Reads from ScrollParallaxContext and applies translateY to the
 * star-layer and blob containers without touching their z-index stacks.
 */
function ParallaxBackgroundLayers() {
  const { starsY, blobsY } = useScrollParallax();

  return (
    <>
      {/* Offset the star wrapper with scroll parallax */}
      <motion.div
        className="parallax-stars-wrapper"
        style={{ translateY: starsY }}
        aria-hidden="true"
      />
      {/* Offset the blob wrapper — mid-layer speed */}
      <motion.div
        className="parallax-blobs-wrapper"
        style={{ translateY: blobsY }}
        aria-hidden="true"
      />
    </>
  );
}

/**
 * Client shell — wraps children in:
 *   ScrollParallaxProvider (provides scroll progress)
 *   ParallaxScene (applies 3D tilt to page content)
 */
export default function ClientShell({ children }) {
  // Unified light source: track mouse position as CSS custom properties
  useEffect(() => {
    let rafId = null;
    let pendingX = 0.5;
    let pendingY = 0.5;

    const onMouseMove = (e) => {
      pendingX = e.clientX / window.innerWidth;
      pendingY = e.clientY / window.innerHeight;

      if (rafId !== null) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--light-x', pendingX.toFixed(4));
        document.documentElement.style.setProperty('--light-y', pendingY.toFixed(4));
        rafId = null;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    // Suppress Spline runtime onFrame errors (scene object loses 'position'
    // reference during the animation loop). We match on the error message
    // and stack frame name since webpack bundles obscure the source path.
    const isSplineError = (error, messageStr) => {
      const msg = (error && error.message) || messageStr || '';
      return msg.includes("reading 'position'");
    };

    // Capture-phase listener runs before Next.js dev overlay listener.
    const handler = (event) => {
      if (isSplineError(event.error, event.message)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', handler, { capture: true });

    // Also patch window.onerror — returning true suppresses the error entirely.
    const origOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (isSplineError(error, message)) return true;
      return origOnError ? origOnError.call(window, message, source, lineno, colno, error) : false;
    };

    return () => {
      window.removeEventListener('error', handler, { capture: true });
      window.onerror = origOnError;
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ThemeColorCycler />
      <ScrollParallaxProvider>
        <ParallaxScene>
          {children}
        </ParallaxScene>
      </ScrollParallaxProvider>
    </>
  );
}
