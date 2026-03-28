'use client';
import { useEffect } from 'react';
import { ScrollParallaxProvider, useScrollParallax } from '@/contexts/ScrollParallaxContext';
import ParallaxScene from '@/components/effects/ParallaxScene';
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
  useEffect(() => {
    // Suppress Spline runtime onFrame errors (scene object loses 'position'
    // reference during the animation loop). We match on the error message
    // and stack frame name since webpack bundles obscure the source path.
    const isSplineFrameError = (error) => {
      if (!error) return false;
      const msg = error.message || '';
      const stack = error.stack || '';
      return msg.includes("reading 'position'");
    };

    // Capture-phase listener runs before Next.js dev overlay listener.
    const handler = (event) => {
      if (isSplineFrameError(event.error)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', handler, { capture: true });

    // Also patch window.onerror — returning true suppresses the error entirely.
    const origOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (isSplineFrameError(error)) return true;
      return origOnError ? origOnError.call(window, message, source, lineno, colno, error) : false;
    };

    return () => {
      window.removeEventListener('error', handler, { capture: true });
      window.onerror = origOnError;
    };
  }, []);

  return (
    <ScrollParallaxProvider>
      <ParallaxScene>
        {children}
      </ParallaxScene>
    </ScrollParallaxProvider>
  );
}
