'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Spline from '@splinetool/react-spline/next';
import { useScroll, useTransform, motion } from 'framer-motion';

const LoadingScreen = dynamic(() => import('../effects/LoadingScreen'), { ssr: false });

export default function SplineHero() {
  const [dark, setDark] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [windowHeight, setWindowHeight] = useState(800);
  const sectionRef = useRef(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, windowHeight], [0, -windowHeight * 0.4]);
  const textOpacity = useTransform(scrollY, [0, windowHeight * 0.4], [1, 0]);

  // #F0EDEA is the page bg — it auto-inverts to the dark bg in dark mode
  const c = '#F0EDEA';

  return (
    <section
      ref={sectionRef}
      style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}
    >
      <Spline
        key={dark ? 'dark' : 'light'}
        scene={dark ? '/scenedark.splinecode' : '/scene.splinecode'}
        style={{ width: '100%', height: '100%' }}
        onLoad={() => setSplineLoaded(true)}
      />

      {/* Hero text overlay — bottom-left, parallax scroll */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '7rem',   /* bottom-28 */
          left: '3rem',     /* left-12 */
          zIndex: 5,
          pointerEvents: 'none',
          y: textY,
          opacity: textOpacity,
          mixBlendMode: dark ? 'screen' : 'normal',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: dark ? 'rgba(255, 255, 255, 0.93)' : 'rgba(255, 255, 255, 0.28)',
            textShadow: '0 2px 24px rgba(0,0,0,0.12)',
          }}
        >
          JIABEI HAN
        </div>
        <div
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: dark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.2)',
            textShadow: '0 1px 12px rgba(0,0,0,0.1)',
            marginTop: '0.75rem',
          }}
        >
          Capital Markets&nbsp;&nbsp;·&nbsp;&nbsp;WashU &apos;26
        </div>
      </motion.div>

      {/* Bottom — eased multi-stop fade, very tall in dark mode */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: dark ? '55vh' : '220px',
          background: `linear-gradient(to bottom,
            transparent 0%,
            ${c}10 20%,
            ${c}30 40%,
            ${c}60 60%,
            ${c}90 80%,
            ${c} 100%
          )`,
          pointerEvents: 'none',
          transition: 'height 0.8s ease',
        }}
      />

      {/* Left vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          width: dark ? '220px' : '100px',
          background: `linear-gradient(to right, ${c} 0%, ${c}80 30%, transparent 100%)`,
          pointerEvents: 'none',
          transition: 'width 0.8s ease',
        }}
      />

      {/* Right vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, bottom: 0, right: 0,
          width: dark ? '220px' : '100px',
          background: `linear-gradient(to left, ${c} 0%, ${c}80 30%, transparent 100%)`,
          pointerEvents: 'none',
          transition: 'width 0.8s ease',
        }}
      />

      {/* Top vignette — dark mode only */}
      {dark && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '160px',
            background: `linear-gradient(to bottom, ${c} 0%, ${c}80 40%, transparent 100%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Loading screen — fixed position, doesn't affect layout */}
      {showLoader && (
        <LoadingScreen
          loaded={splineLoaded}
          onExitComplete={() => requestAnimationFrame(() => setShowLoader(false))}
        />
      )}
    </section>
  );
}
