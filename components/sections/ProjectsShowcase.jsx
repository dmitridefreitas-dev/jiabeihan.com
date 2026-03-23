'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TextReveal from '@/components/effects/TextReveal';
import TiltCard from '@/components/effects/TiltCard';
import { heroProjects } from '@/data/projects';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

function ProjectCard({ project, index, isActive }) {
  return (
    <TiltCard
      className={`relative flex-shrink-0 w-[85vw] md:w-[55vw] lg:w-[40vw] h-[48vh] shimmer-card overflow-hidden ${
        isActive ? 'animated-border-card' : 'academic-card'
      }`}
      style={{ borderRadius: '8px' }}
    >
      {/* Gradient background — each card has its own color */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{ background: project.gradient || 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)' }}
        aria-hidden="true"
      />

      <motion.div
        className="w-full h-full flex flex-col justify-end p-8 md:p-10 overflow-hidden rounded-lg relative z-10"
        animate={{
          opacity: isActive ? 1 : 0.5,
          scale: isActive ? 1 : 0.97,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Index watermark */}
        <p
          className="absolute top-6 right-8 font-serif font-bold select-none pointer-events-none"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            color: isActive ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.07)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </p>

        {/* Active indicator dot */}
        {isActive && (
          <motion.div
            className="absolute top-6 left-7 w-1.5 h-1.5 rounded-full dot-pulse"
            style={{ backgroundColor: '#DC2626' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">
            {project.metric}
          </p>
          <h3 className="font-serif font-bold text-lg md:text-xl text-foreground leading-tight mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-muted/80 max-w-xs leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bottom line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: isActive
              ? 'linear-gradient(90deg, rgba(220,38,38,0.6), rgba(153,27,27,0.4), transparent)'
              : 'linear-gradient(90deg, rgba(220,38,38,0.2), rgba(153,27,27,0.1), transparent)',
          }}
        />
      </motion.div>
    </TiltCard>
  );
}

export default function ProjectsShowcase() {
  const [current, setCurrent] = useState(0);
  const constraintsRef = useRef(null);
  const projects = heroProjects;
  const total = projects.length;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  // Card widths: mobile = 85vw + 24px gap, desktop = 40vw + 32px gap (capped at 632)
  const cardStep = typeof window !== 'undefined'
    ? (window.innerWidth < 768
        ? window.innerWidth * 0.85 + 24
        : Math.min(window.innerWidth * 0.4 + 32, 632))
    : 632;

  return (
    <section
      className="section-full flex-col"
      aria-label="Research Showcase"
      style={{ minHeight: '100vh', gap: 0 }}
    >
      {/* Header */}
      <div className="w-full px-6 lg:px-12 mb-12">
        <div className="flex items-end justify-between max-w-7xl mx-auto">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-4"
            >
              Selected Research
            </motion.p>
            <h2 className="font-serif font-bold text-headline text-foreground will-change-transform">
              <TextReveal splitBy="word" staggerDelay={0.07}>
                Research Highlights
              </TextReveal>
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={prev}
              disabled={current === 0}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 text-muted hover:text-accent hover:border-accent/40 transition-all disabled:opacity-25 rounded-lg"
              aria-label="Previous project"
              data-cursor="expand"
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={next}
              disabled={current === total - 1}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 text-muted hover:text-accent hover:border-accent/40 transition-all disabled:opacity-25 rounded-lg"
              aria-label="Next project"
              data-cursor="expand"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div ref={constraintsRef} className="w-full overflow-hidden pl-6 lg:pl-12">
        <motion.div
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={constraintsRef}
          animate={{ x: -(current * cardStep) }}
          transition={{ type: 'spring', stiffness: 300, damping: 40 }}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50 && current < total - 1) next();
            if (offset.x > 50 && current > 0) prev();
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isActive={i === current}
            />
          ))}
        </motion.div>
      </div>

      {/* Dots + counter */}
      <div className="w-full px-6 lg:px-12 mt-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex gap-1 items-center">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Go to project ${i + 1}`}
              >
                <span
                  className="block transition-all"
                  style={{
                    width: i === current ? 24 : 6,
                    height: 2,
                    background: i === current
                      ? 'linear-gradient(90deg, #DC2626, #991B1B)'
                      : 'rgba(220,38,38,0.2)',
                    borderRadius: 2,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              </button>
            ))}
          </div>

          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors"
            data-cursor="expand"
          >
            View All Research
            <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
