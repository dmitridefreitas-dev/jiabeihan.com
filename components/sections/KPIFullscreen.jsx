'use client';
import { motion } from 'framer-motion';
import CounterDisplay from '@/components/effects/CounterDisplay';
import { kpiMetrics } from '@/data/constants';

export default function KPIFullscreen() {
  return (
    <section
      className="section-full"
      aria-label="Key Metrics"
      style={{ minHeight: '100vh' }}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-accent text-center mb-20"
        >
          By The Numbers
        </motion.p>

        {/* 2×2 metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 justify-items-center">
          {kpiMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <CounterDisplay value={metric.value} label={metric.label} delay={i * 0.1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
