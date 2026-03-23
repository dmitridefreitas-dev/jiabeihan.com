'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/data/constants';

const TYPE_COLORS = {
  research: '#DC2626',
  teaching: '#991B1B',
  education: '#059669',
  activity: '#D97706',
};

export default function TimelineScroll() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-12" aria-label="Timeline">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs uppercase tracking-[0.4em] text-muted text-center mb-24"
      >
        Journey
      </motion.p>

      <div className="relative max-w-3xl mx-auto">
        {/* Background track line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: 'rgba(220,38,38,0.1)', top: 0 }}
        />
        {/* Animated fill line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px origin-top"
          style={{
            background: 'linear-gradient(to bottom, rgba(220,38,38,0.6), rgba(153,27,27,0.4), rgba(220,38,38,0.2))',
            scaleY: lineScaleY,
            boxShadow: '0 0 6px rgba(220,38,38,0.25)',
          }}
        />

        <div className="flex flex-col gap-0">
          {timeline.map((entry, i) => {
            const dotColor = TYPE_COLORS[entry.type] || '#DC2626';
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="academic-card shimmer-card pl-12 py-12 relative rounded-xl mb-2"
              >
                {/* Pulsing dot on timeline */}
                <motion.div
                  className="absolute left-[-4.5px] top-14 w-2.5 h-2.5 rounded-full dot-pulse border-2 border-white"
                  style={{ backgroundColor: dotColor }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 + 0.3 }}
                />

                {/* Large watermark year */}
                <p
                  className="font-serif font-bold select-none pointer-events-none"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                    lineHeight: 0.9,
                    color: 'rgba(220,38,38,0.05)',
                    letterSpacing: '-0.04em',
                  }}
                  aria-hidden="true"
                >
                  {entry.year.split(' – ')[0]}
                </p>

                <div className="mt-2">
                  <span
                    className="font-mono text-xs uppercase tracking-[0.25em]"
                    style={{ color: dotColor }}
                  >
                    {entry.year} — {entry.type}
                  </span>
                  <h3 className="font-serif font-bold text-xl md:text-2xl text-foreground mt-1.5 mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-body-fluid text-muted max-w-md">
                    {entry.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
