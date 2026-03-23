'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from '@/components/effects/TextReveal';
import MagneticButton from '@/components/effects/MagneticButton';
import { ArrowDown } from 'lucide-react';

// Math symbols — faint, academic, slow-drifting
const MATH_SHAPES = [
  {
    label: '∂',
    className: 'float-geo-slow font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', top: '16%', left: '5%', color: 'rgba(26,26,46,0.055)', animationDuration: '11s' },
  },
  {
    label: '∑',
    className: 'float-geo font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(2rem, 4vw, 3.5rem)', top: '20%', right: '6%', color: 'rgba(220,38,38,0.055)', animationDelay: '1.5s', animationDuration: '9s' },
  },
  {
    label: '∇',
    className: 'float-geo-reverse font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', bottom: '28%', left: '4%', color: 'rgba(153,27,27,0.05)', animationDelay: '0.8s', animationDuration: '12s' },
  },
  {
    label: 'ℝ',
    className: 'float-geo font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', bottom: '22%', right: '5%', color: 'rgba(26,26,46,0.045)', animationDelay: '2s', animationDuration: '8s' },
  },
  {
    label: '∫',
    className: 'float-geo-slow font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', top: '52%', right: '9%', color: 'rgba(239,68,68,0.048)', animationDelay: '3s', animationDuration: '13s' },
  },
  {
    label: '∈',
    className: 'float-geo-reverse font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(1.2rem, 2vw, 2rem)', top: '62%', left: '8%', color: 'rgba(220,38,38,0.04)', animationDelay: '1.2s', animationDuration: '10s' },
  },
  {
    label: '⊂',
    className: 'float-geo font-serif select-none pointer-events-none absolute',
    style: { fontSize: 'clamp(1rem, 1.8vw, 1.8rem)', top: '35%', left: '3%', color: 'rgba(26,26,46,0.035)', animationDelay: '4s', animationDuration: '14s' },
  },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const geoOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const geoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Soft blue aurora at top — academic blue instead of purple */}
      <div
        className="absolute pointer-events-none animate-aurora-shift"
        style={{
          top: '-25%',
          left: '50%',
          width: '140%',
          height: '80%',
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.07) 0%, rgba(239,68,68,0.04) 40%, rgba(153,27,27,0.02) 65%, transparent 85%)',
          transformOrigin: 'center top',
        }}
        aria-hidden="true"
      />

      {/* Floating math symbols */}
      <motion.div
        style={{ opacity: geoOpacity, y: geoY }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {MATH_SHAPES.map((shape, i) => (
          <motion.span
            key={i}
            className={shape.className}
            style={shape.style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 + i * 0.18, duration: 1.2 }}
          >
            {shape.label}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 flex flex-col items-center text-center px-6 gpu"
      >
        {/* Label — mono eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.45em] text-accent mb-8"
        >
          Portfolio — Available Fall 2027
        </motion.p>

        {/* Name — Playfair serif with glow */}
        <h1
          className="font-serif font-bold text-display text-foreground text-balance will-change-transform"
          style={{ animation: 'glow-text-pulse 5s ease-in-out infinite' }}
        >
          <TextReveal splitBy="word" delay={0.4} staggerDelay={0.1}>
            Xinshi Feng
          </TextReveal>
        </h1>

        {/* Thin rule divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="neon-line w-20 my-7 origin-left"
        />

        {/* Subtitle — blue gradient shift */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="font-mono text-xs uppercase tracking-[0.3em] max-w-sm"
          style={{
            background: 'linear-gradient(90deg, #DC2626, #EF4444, #991B1B, #DC2626)',
            backgroundSize: '300% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-shift-subtitle 6s ease infinite',
          }}
        >
          Computer Science &amp; Mathematics
        </motion.p>

        {/* Institution */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-muted mt-3"
        >
          Washington University in St. Louis
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton href="/projects" data-cursor="expand">
            View Research
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost" data-cursor="expand">
            Get in Touch
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — min 44×44 touch target */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center gap-2 text-muted hover:text-accent transition-colors"
        aria-label="Scroll down"
        data-cursor="expand"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
        <span className="font-mono text-xs uppercase tracking-[0.3em]">Scroll</span>
      </motion.button>
    </section>
  );
}
