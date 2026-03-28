'use client';
import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline/next';

export default function SplineHero() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // #F0EDEA is the page bg — it auto-inverts to the dark bg in dark mode
  const c = '#F0EDEA';

  return (
    <section style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Spline
        key={dark ? 'dark' : 'light'}
        scene={dark ? '/scenedark.splinecode' : '/scene.splinecode'}
        style={{ width: '100%', height: '100%' }}
      />

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
    </section>
  );
}
