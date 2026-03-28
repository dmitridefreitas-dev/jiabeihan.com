'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

export default function CounterDisplay({ value, label, delay = 0 }) {
  const { ref, display } = useCountUp(value, 2);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (display === value && !done) {
      setDone(true);
    }
    return () => clearTimeout(timerRef.current);
  }, [display, value, done]);

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative border-l-2 border-r-2 border-accent px-6 py-2 rounded-none overflow-hidden">
        <motion.span
          ref={ref}
          className="font-serif font-bold text-display gpu relative block"
          style={{
            color: '#1C1C28',
            textShadow: done ? '0 0 20px rgba(200,127,150,0.2)' : 'none',
          }}
          animate={done ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {display}
        </motion.span>
      </div>

      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted text-center max-w-[14ch]">
        {label}
      </span>
    </div>
  );
}
