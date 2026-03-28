'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from '@/components/effects/MagneticButton';

export default function NotFound() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '6rem 1.5rem' }}>
      {/* Giant 404 */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif font-bold select-none"
        style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'rgba(0,68,204,0.08)' }}
        aria-hidden="true"
      >
        404
      </motion.p>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginTop: '-4rem' }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
          PAGE NOT FOUND
        </p>
        <p className="font-serif text-xl text-secondary" style={{ fontStyle: 'italic' }}>
          This page doesn&apos;t exist yet.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mt-1">
          Like an unissued bond.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <MagneticButton href="/" variant="ghost" className="text-sm px-8 py-3">
          Return to Portfolio
        </MagneticButton>
      </motion.div>
    </section>
  );
}
