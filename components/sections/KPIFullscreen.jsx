'use client';
import { motion } from 'framer-motion';
import CounterDisplay from '@/components/effects/CounterDisplay';
import { kpiMetrics } from '@/data/constants';

export default function KPIFullscreen() {
  return (
    <section
      className="section-full"
      aria-label="Key Metrics"
    >
      <div className="container mx-auto px-6 lg:px-12 w-full">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-accent text-center mb-10"
        >
          By The Numbers
        </motion.p>

        {/* 2×2 metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8 justify-items-center items-start">
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

        {/* Bloomberg terminal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#1AAF42', boxShadow: '0 0 4px #1AAF42', animation: 'dot-pulse 2s ease-in-out infinite' }}
          />
          <span className="font-mono uppercase text-muted/40" style={{ fontSize: '9px', letterSpacing: '0.2em' }}>
            Data as of Mar 2026 &nbsp;&middot;&nbsp; Live
          </span>
        </motion.div>
      </div>
    </section>
  );
}
