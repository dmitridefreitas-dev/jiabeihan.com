'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME_CHARS = ['J', '.', ' ', 'H', 'A', 'N'];
const SUBTITLE = 'FINANCE & COMPUTER SCIENCE';

export default function LoadingScreen({ loaded, onExitComplete }) {
  const [phase, setPhase] = useState(0); // 0=line, 1=name, 2=subtitle, 3=exit
  const [typedCount, setTypedCount] = useState(0);
  const [flashIndex, setFlashIndex] = useState(-1);
  const [minElapsed, setMinElapsed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const startTime = useRef(Date.now());

  // Phase sequencing
  useEffect(() => {
    // Phase 1 → 2: line draws (0–1.2s), then start typing name
    const t1 = setTimeout(() => setPhase(1), 1200);
    // Phase 2 → 3: name done typing (6 chars × 200ms = 1.2s after t1), fade subtitle
    const t2 = setTimeout(() => setPhase(2), 2600);
    // Mark minimum 4s elapsed — give the scene time to breathe
    const t3 = setTimeout(() => setMinElapsed(true), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Type name characters one by one
  useEffect(() => {
    if (phase < 1) return;
    if (typedCount >= NAME_CHARS.length) return;

    const interval = 200; // ms per character — deliberate, unhurried
    const t = setTimeout(() => {
      setFlashIndex(typedCount);
      setTypedCount(c => c + 1);
      // Remove flash after brief moment
      setTimeout(() => setFlashIndex(-1), 180);
    }, interval);
    return () => clearTimeout(t);
  }, [phase, typedCount]);

  // Trigger exit when loaded + min elapsed
  useEffect(() => {
    if (loaded && minElapsed && !exiting) {
      setExiting(true);
    }
  }, [loaded, minElapsed, exiting]);

  return (
    <AnimatePresence>
      {!exiting && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            backgroundColor: '#F0EDEA',
            overflow: 'hidden',
          }}
        >
          {/* Center content */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              textAlign: 'center',
            }}
          >
            {/* Name — types above the line */}
            <div
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#1C1C28',
                marginBottom: '8px',
                height: '16px',
                display: 'flex',
                justifyContent: 'center',
                gap: '0',
              }}
            >
              {NAME_CHARS.slice(0, typedCount).map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    color: flashIndex === i ? '#1A5DD8' : '#1C1C28',
                  }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  style={{
                    display: 'inline-block',
                    color: flashIndex === i ? '#1A5DD8' : '#1C1C28',
                  }}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </div>

            {/* ROYGBIV horizontal line */}
            <div style={{ position: 'relative', height: '1px', width: '100%' }}>
              <motion.div
                className="holo-line"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ height: '1px', borderRadius: '1px' }}
              />
            </div>

            {/* Subtitle — fades in below line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#5A5A6E',
                marginTop: '8px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {SUBTITLE}
            </motion.div>
          </div>
        </div>
      )}
      {exiting && (
        <>
          {/* Top half slides up */}
          <motion.div
            key="top"
            initial={{ y: 0 }}
            animate={{ y: '-100vh' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => onExitComplete && onExitComplete()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '50vh',
              backgroundColor: '#F0EDEA',
              zIndex: 9998,
            }}
          />
          {/* Bottom half slides down */}
          <motion.div
            key="bottom"
            initial={{ y: 0 }}
            animate={{ y: '100vh' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50vh',
              backgroundColor: '#F0EDEA',
              zIndex: 9998,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
