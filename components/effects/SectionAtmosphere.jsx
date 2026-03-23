'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Drop-in section wrapper that sets CSS variables on documentElement
 * when the section enters the viewport. The AtmosphericBlobs (and any other
 * elements using var(--atm-*)) react automatically through CSS.
 *
 * Usage:
 *   <SectionAtmosphere atmosphere="hero">
 *     <HeroSection />
 *   </SectionAtmosphere>
 *
 * atmosphere values: 'hero' | 'work' | 'skills' | 'timeline' | 'cta'
 */

const ATMOSPHERE_MAP = {
  hero: {
    '--atm-primary':   'rgba(220,38,38,0.08)',
    '--atm-secondary': 'rgba(153,27,27,0.05)',
    '--atm-intensity': '1',
  },
  work: {
    '--atm-primary':   'rgba(239,68,68,0.07)',
    '--atm-secondary': 'rgba(220,38,38,0.05)',
    '--atm-intensity': '0.85',
  },
  skills: {
    '--atm-primary':   'rgba(220,38,38,0.06)',
    '--atm-secondary': 'rgba(239,68,68,0.04)',
    '--atm-intensity': '0.75',
  },
  timeline: {
    '--atm-primary':   'rgba(153,27,27,0.06)',
    '--atm-secondary': 'rgba(239,68,68,0.04)',
    '--atm-intensity': '0.8',
  },
  cta: {
    '--atm-primary':   'rgba(220,38,38,0.09)',
    '--atm-secondary': 'rgba(153,27,27,0.06)',
    '--atm-intensity': '1',
  },
};

export default function SectionAtmosphere({ children, atmosphere = 'hero', className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-30% 0px -30% 0px' });

  useEffect(() => {
    if (!isInView || typeof document === 'undefined') return;

    const vars = ATMOSPHERE_MAP[atmosphere] || ATMOSPHERE_MAP.hero;
    const root = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [isInView, atmosphere]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
