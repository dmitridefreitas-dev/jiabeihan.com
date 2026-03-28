'use client';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { competencies } from '@/data/constants';

function CompCard({ comp, index }) {
  const Icon = comp.icon;
  const num  = String(index + 1).padStart(2, '0');
  const cardRef = useRef(null);

  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const spotlightX = useTransform(springX, [0, 1], ['0%', '100%']);
  const spotlightY = useTransform(springY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top)  / rect.height);
  };
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden"
    >
      {/* Top border — always visible, holo animated */}
      <div className="absolute top-0 left-0 right-0 h-px z-20 holo-line" style={{ opacity: 0.7 }} />


      <div className="relative border border-[#E0DCD7] bg-[#F8F6F4]/60 p-8 rounded-xl overflow-hidden transition-colors duration-500 group-hover:border-accent/25">

        {/* Mouse-tracked spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(260px circle at ${x} ${y}, rgba(0,68,204,0.1) 0%, transparent 70%)`
            ),
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,68,204,0.06) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Ghost index number */}
        <p
          className="absolute top-3 right-5 font-mono font-bold select-none pointer-events-none leading-none"
          style={{ fontSize: '4.5rem', color: 'rgba(0,68,204,0.04)', letterSpacing: '-0.05em' }}
          aria-hidden="true"
        >
          {num}
        </p>

        {/* Icon with pulsing glow ring */}
        <div className="flex items-center gap-2 mb-7 relative">
          <span className="font-mono text-xl leading-none select-none holo-bracket">[</span>

          <div className="relative flex items-center justify-center">
            <Icon className="w-5 h-5 text-accent relative z-10" strokeWidth={1.5} />
          </div>

          <span className="font-mono text-xl leading-none select-none holo-bracket">]</span>
        </div>

        <h3 className="font-serif font-bold text-2xl text-accent mb-3 leading-tight">
          {comp.title}
        </h3>

        <p className="text-sm text-muted leading-relaxed">
          {comp.description}
        </p>

        {/* Bottom accent — animates width on hover */}
        <motion.div
          className="mt-7 h-px"
          style={{ background: 'linear-gradient(90deg, #CC0022, transparent)' }}
          initial={{ width: 0 }}
          whileHover={{ width: 48 }}
          animate={{ width: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function CompetenciesSticky() {
  return (
    <section className="section-full flex-col px-6 lg:px-12" aria-label="Core Competencies">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs uppercase tracking-[0.4em] text-muted text-center mb-12"
      >
        Core Competencies
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
        {competencies.map((comp, i) => (
          <CompCard key={comp.title} comp={comp} index={i} />
        ))}
      </div>
    </section>
  );
}
