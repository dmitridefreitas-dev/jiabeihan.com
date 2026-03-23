'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HorizontalScroll from '@/components/effects/HorizontalScroll';
import TiltCard from '@/components/effects/TiltCard';
import SkillDetailModal from '@/components/modals/SkillDetailModal';
import { skillsData } from '@/data/skills';

function SkillSlide({ skill, onClick, className = '' }) {
  return (
    <TiltCard
      className={`skill-glow-border shimmer-card flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[35vw] h-[60vh] lg:h-screen flex flex-col justify-center px-10 md:px-16 border-r border-gray-200/70 last:border-r-0 cursor-pointer group bg-white/60 hover:bg-white transition-colors ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      data-cursor="expand"
    >
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent mb-6">
        {skill.category}
      </p>
      <h3 className="font-serif font-bold text-xl md:text-2xl text-foreground mb-5 will-change-transform group-hover:text-accent transition-colors duration-300">
        {skill.name}
      </h3>
      <p className="text-xs md:text-sm text-muted max-w-xs leading-relaxed">
        {skill.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {skill.keyFeatures.slice(0, 3).map((f, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-widest text-muted border-b border-muted/20 pb-0.5"
          >
            {f}
          </span>
        ))}
      </div>
      <motion.p
        className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent border border-accent/30 hover:border-accent/70 rounded px-3 py-1.5 w-fit transition-colors"
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        View Details →
      </motion.p>
    </TiltCard>
  );
}

export default function SkillsHorizontal() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [dragLeft, setDragLeft] = useState(-2000);
  const trackRef = useRef(null);

  // Measure actual track width after mount for correct drag constraints
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setDragLeft(-(trackWidth - viewportWidth + 48)); // +48 for px-6 on both sides
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const duplicatedSkills = [...skillsData, ...skillsData];

  return (
    <section aria-label="Skills" className="overflow-hidden">
      {/* Header */}
      <div className="pt-12 pb-4 flex items-end px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-muted"
        >
          Tools &amp; Languages —{' '}
          <span className="hidden lg:inline">Scroll to explore</span>
          <span className="lg:hidden">Swipe to explore</span>
        </motion.p>
      </div>

      {/* Desktop: Horizontal Scroll with edge fade masks */}
      <div className="hidden lg:block scroll-fade-edges">
        <HorizontalScroll pages={2}>
          {skillsData.map((skill) => (
            <SkillSlide
              key={skill.name}
              skill={skill}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}
        </HorizontalScroll>
      </div>

      {/* Mobile/Tablet: Draggable */}
      <div className="lg:hidden relative pb-20">
        <div className="scroll-fade-edges overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-4 px-6"
            drag="x"
            dragConstraints={{ right: 0, left: dragLeft }}
            dragElastic={0.08}
            style={{ width: 'max-content' }}
          >
            {skillsData.map((skill) => (
              <SkillSlide
                key={skill.name}
                skill={skill}
                className="!h-[50vh] !w-[75vw] !px-8"
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </motion.div>
        </div>

        {/* Infinite marquee with edge blur */}
        <div className="mt-12 overflow-hidden whitespace-nowrap border-y border-gray-200/60 py-8 scroll-fade-edges">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ width: 'max-content' }}
          >
            {duplicatedSkills.map((skill, i) => (
              <span
                key={`${skill.name}-${i}`}
                className="font-serif font-bold text-4xl md:text-6xl uppercase tracking-tighter hover:text-accent/60 transition-colors cursor-pointer"
                style={{ color: 'rgba(26,26,46,0.15)' }}
                onClick={() => setSelectedSkill(skill)}
              >
                {skill.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Desktop marquee strip below horizontal scroll */}
      <div className="hidden lg:block mt-8 overflow-hidden border-y border-gray-200/60 py-5 scroll-fade-edges">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...skillsData, ...skillsData, ...skillsData].map((skill, i) => (
            <span
              key={`marquee-${skill.name}-${i}`}
              className="font-mono text-xs uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors cursor-pointer"
              onClick={() => setSelectedSkill(skill)}
            >
              {skill.name}
            </span>
          ))}
        </motion.div>
      </div>

      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </section>
  );
}
