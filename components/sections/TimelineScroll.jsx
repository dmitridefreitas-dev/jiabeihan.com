'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { timeline } from '@/data/constants';

const TYPE_COLORS = {
  finance:   '#CC0022',
  research:  '#CC0022',
  education: '#CC0022',
  activity:  '#CC0022',
};

const left  = timeline.filter((e) => e.type !== 'finance');
const right = timeline.filter((e) => e.type === 'finance');

function Entry({ entry, align = 'left' }) {
  const dot = TYPE_COLORS[entry.type] || '#CC0022';
  const isRight = align === 'right';

  // Typewriter effect for the title
  const entryRef = useRef(null);
  const isInView = useInView(entryRef, { once: true });
  const [displayText, setDisplayText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const fullText = entry.title;
    let i = 0;
    setDisplayText('');
    setTypingDone(false);
    const id = setInterval(() => {
      i += 1;
      setDisplayText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(id);
        setTypingDone(true);
      }
    }, 30);
    return () => clearInterval(id);
  }, [isInView, entry.title]);

  return (
    <motion.div
      ref={entryRef}
      initial={{ opacity: 0, x: isRight ? 28 : -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-1.5 ${isRight ? 'items-start text-left' : 'items-end text-right'}`}
    >
      <div className={`flex items-center gap-2 ${isRight ? '' : 'flex-row-reverse'}`}>
        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 holo-dot" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          {entry.type}
        </span>
      </div>
      <span className="timeline-year-badge inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm" style={{
        background: 'rgba(28,28,40,0.9)',
        color: '#1AAF42',
        letterSpacing: '0.2em',
      }}>
        {entry.year}
      </span>
      <h3 className="font-serif font-bold text-base md:text-lg text-secondary leading-snug max-w-[260px]">
        {displayText}
        {!typingDone && <span className="blink-cursor-char">|</span>}
      </h3>
      <p className="text-sm text-muted leading-relaxed max-w-[260px] line-clamp-2">
        {entry.description}
      </p>
    </motion.div>
  );
}

export default function TimelineScroll() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.3'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const rows = Math.max(left.length, right.length);

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-12" aria-label="Timeline">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs uppercase tracking-[0.4em] text-accent text-center mb-14"
      >
        Career Path
      </motion.p>

      <div className="relative max-w-3xl mx-auto">
        {/* Ghost center line */}
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ left: 'calc(50% - 0.5px)', background: 'rgba(0,68,204,0.08)' }}
        />
        {/* Animated fill line — glass tube */}
        <motion.div
          className="absolute top-0 bottom-0 w-[3px] origin-top"
          style={{ scaleY: lineScaleY, left: 'calc(50% - 1.5px)' }}
        >
          <div className="absolute inset-0 holo-line rounded-full" />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)' }}
          />
        </motion.div>

        <div className="flex flex-col">
          {Array.from({ length: rows }).map((_, rowIdx) => {
            const leftEntry  = left[rowIdx];
            const rightEntry = right[rowIdx];
            const dotColor   = TYPE_COLORS[leftEntry?.type || rightEntry?.type] || '#CC0022';

            return (
              <div key={rowIdx} className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-8 py-9">
                <div className="flex justify-end">
                  {leftEntry && <Entry entry={leftEntry} align="right" />}
                </div>

                <motion.div
                  className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 z-10 holo-dot"
                  style={{ borderColor: '#F0EDEA' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: rowIdx * 0.1 }}
                />

                <div className="flex justify-start">
                  {rightEntry && <Entry entry={rightEntry} align="left" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
