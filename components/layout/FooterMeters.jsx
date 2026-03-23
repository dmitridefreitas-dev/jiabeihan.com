'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const METERS = [
  { label: 'Research Hours', baseVal: 74, unit: '%', color: '#DC2626' },
  { label: 'Coffee Consumed', baseVal: 88, unit: '%', color: '#991B1B' },
];

export default function FooterMeters() {
  const [values, setValues] = useState(METERS.map((m) => m.baseVal));

  useEffect(() => {
    const id = setInterval(() => {
      setValues(METERS.map((m) => {
        const delta = Math.random() * 8 - 4;
        return Math.max(20, Math.min(98, m.baseVal + delta));
      }));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-8">
      {METERS.map((meter, i) => (
        <div key={meter.label} className="flex flex-col gap-1.5 min-w-[120px]">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {meter.label}
            </span>
            <span className="font-mono text-xs text-muted">
              {Math.round(values[i])}{meter.unit}
            </span>
          </div>
          <div className="h-[2px] bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: meter.color, opacity: 0.5 }}
              animate={{ width: `${values[i]}%` }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 ml-auto">
        <span
          className="dot-pulse w-1.5 h-1.5 rounded-full bg-accent inline-block"
          style={{ backgroundColor: '#DC2626' }}
        />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          p &lt; 0.05
        </span>
      </div>
    </div>
  );
}
