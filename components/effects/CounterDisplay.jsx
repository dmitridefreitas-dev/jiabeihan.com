'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

function MicroSparkline() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true" style={{ opacity: 0.5 }}>
      <polyline
        points="0,12 4,9 8,7 11,5 15,3 20,1"
        stroke="#1A5DD8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CounterDisplay({ value, label, delay = 0 }) {
  const { ref, display } = useCountUp(value, 2);
  const [done, setDone] = useState(false);
  const hasSuffix = String(value).includes('+');

  useEffect(() => {
    if (display === value && !done) setDone(true);
  }, [display, value, done]);

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative border-l-2 border-r-2 border-accent px-6 py-2 rounded-none overflow-hidden">
        <motion.span
          ref={ref}
          className="font-serif font-bold relative block"
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontFeatureSettings: '"tnum" 1',
            color: '#1C1C28',
            textShadow: done ? '0 0 20px rgba(200,127,150,0.2)' : 'none',
          }}
          animate={done ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {String(display).replace('+', '')}
          {hasSuffix && (
            <sup
              className="text-accent"
              style={{ fontSize: '0.42em', marginLeft: '0.06em', verticalAlign: 'super', lineHeight: 0 }}
            >
              +
            </sup>
          )}
          {!done && (
            <span
              className="text-accent"
              style={{
                fontSize: '0.35em',
                marginLeft: '0.1em',
                animation: 'blink-cursor 0.8s step-end infinite',
                display: 'inline',
                opacity: 1,
              }}
            >|</span>
          )}
        </motion.span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted text-center max-w-[14ch]">
          {label}
        </span>
        <MicroSparkline />
      </div>
    </div>
  );
}
