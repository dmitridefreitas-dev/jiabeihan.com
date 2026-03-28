'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const ATMOSPHERE_MAP = {
  hero: {
    '--atm-primary':   'rgba(200,127,150,0.08)',
    '--atm-secondary': 'rgba(126,212,188,0.05)',
    '--atm-intensity': '1',
  },
  work: {
    '--atm-primary':   'rgba(200,127,150,0.06)',
    '--atm-secondary': 'rgba(232,197,96,0.04)',
    '--atm-intensity': '0.85',
  },
  skills: {
    '--atm-primary':   'rgba(195,181,232,0.06)',
    '--atm-secondary': 'rgba(200,127,150,0.04)',
    '--atm-intensity': '0.75',
  },
  timeline: {
    '--atm-primary':   'rgba(126,212,188,0.06)',
    '--atm-secondary': 'rgba(200,127,150,0.04)',
    '--atm-intensity': '0.8',
  },
  cta: {
    '--atm-primary':   'rgba(200,127,150,0.09)',
    '--atm-secondary': 'rgba(195,181,232,0.06)',
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
