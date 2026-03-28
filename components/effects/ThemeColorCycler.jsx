'use client';
import { useEffect } from 'react';

const COLORS = ['#E61A42', '#E56B1A', '#D8AC1A', '#1AAF42', '#1A5DD8', '#5E1AAF', '#AF1ACA'];

export default function ThemeColorCycler() {
  useEffect(() => {
    let i = 0;
    // Set initial meta tag or find existing one
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }

    meta.setAttribute('content', COLORS[0]);

    const interval = setInterval(() => {
      i = (i + 1) % COLORS.length;
      meta.setAttribute('content', COLORS[i]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
