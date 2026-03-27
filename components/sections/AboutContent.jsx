'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import TextReveal from '@/components/effects/TextReveal';
import MagneticButton from '@/components/effects/MagneticButton';
import ExperienceModal from '@/components/modals/ExperienceModal';
import { education } from '@/data/education';
import { experiences } from '@/data/experiences';
import { skillCategories } from '@/data/skills';
import { socialLinks } from '@/data/constants';
import { ArrowUpRight, Linkedin, Trees, Wind, Flower2 } from 'lucide-react';

const storyParagraphs = [
  "I'm pursuing a Bachelor of Science with a double major in Finance and Computer Science at Washington University's Olin Business School, graduating May 2026 with a perfect 4.00 GPA.",
  "My professional experience includes capital markets at U.S. Bank, where I drafted credit memos for 6 approved asset-based finance deals and developed financial models across 8 deals in Retail, Industrials, Power & Utilities, and Energy sectors.",
  "I've also interned in commercial and business banking at U.S. Bank, pitching credit product recommendations for aerospace clients and supporting $30M real estate loan approvals. At Z-Lab for Biophotonics, I built machine learning algorithms to detect cellular movement patterns.",
  "I'm actively seeking opportunities in investment banking, capital markets, and corporate finance.",
];

const financeExps = experiences.filter((e) => e.type === 'finance');
const researchExps = experiences.filter((e) => e.type === 'research');

const personalInterests = [
  {
    icon: Trees,
    title: 'WashU Racing',
    description: 'Business leader managing $120K+ in sponsorships and leading FSAE competition strategy for the race car team.',
  },
  {
    icon: Wind,
    title: 'Teaching & Mentoring',
    description: 'CS Teaching Assistant and Calculus III PLTL Mentor — passionate about helping peers learn and grow.',
  },
  {
    icon: Flower2,
    title: 'Case Competitions',
    description: 'Semifinalist in U.S. Bank AI-focused case competition (top 20 of 120+) and FSAE business presentations.',
  },
];

function InterestCard({ interest, index }) {
  const Icon = interest.icon;
  const cardRef = useRef(null);

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
    mouseY.set((e.clientY - rect.top) / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl"
    >
      {/* Top border sweep */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px origin-left z-20"
        style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, #C4B5FD, transparent)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: index * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative border border-[#160e24] bg-[#080810]/60 p-7 rounded-xl overflow-hidden transition-colors duration-500 group-hover:border-accent/25 flex gap-5 items-start">

        {/* Mouse spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) => `radial-gradient(220px circle at ${x} ${y}, rgba(139,92,246,0.1) 0%, transparent 70%)`
            ),
          }}
          aria-hidden="true"
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div className="flex-shrink-0 relative">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center relative z-10 group-hover:bg-accent/20 transition-colors">
            <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="font-serif font-bold text-base text-foreground mb-1.5 group-hover:text-accent/90 transition-colors">
            {interest.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {interest.description}
          </p>
        </div>

        {/* Bottom accent line — widens on hover */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ background: 'linear-gradient(90deg, #8B5CF6, transparent)' }}
          initial={{ width: 0 }}
          whileHover={{ width: 56 }}
          animate={{ width: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function AboutContent() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  return (
    <>
      <section
        className="section-full flex-col text-center px-6 pt-28 relative overflow-hidden"
        aria-label="About hero"
      >

        <h1 className="font-serif font-bold text-display text-foreground will-change-transform text-balance">
          <TextReveal splitBy="word" delay={0.3} staggerDelay={0.1}>
            Jiabei Han
          </TextReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-accent mt-4"
        >
          {/* Slow glow pulse on the subtitle text */}
          <motion.span
            animate={{
              textShadow: [
                '0 0 0px rgba(139,92,246,0)',
                '0 0 18px rgba(139,92,246,0.7)',
                '0 0 0px rgba(139,92,246,0)',
              ],
              opacity: [1, 0.75, 1],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            style={{ display: 'inline' }}
          >
            Finance &amp; Computer Science · WashU Olin · Available May 2026
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-4 flex flex-wrap justify-center gap-2"
        >
          {['NISA Scholars Award', 'Beta Gamma Sigma'].map((honor) => (
            <span
              key={honor}
              className="font-mono text-xs uppercase tracking-[0.2em] text-accent bg-surface border border-accent/25 rounded px-2 py-1"
            >
              {honor}
            </span>
          ))}
        </motion.div>
      </section>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16 lg:max-w-[1400px] lg:mx-auto px-6 lg:px-12 py-12 relative items-start">

        <section className="flex flex-col mb-12 lg:mb-0" aria-label="Background">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-6 self-start"
          >
            Background
          </motion.p>

          <div className="flex flex-col gap-8">
            {storyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="text-base text-muted leading-relaxed font-sans"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </section>

        <section className="mb-12 lg:mb-0" aria-label="Professional Experience">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-6"
          >
            Professional Experience
          </motion.p>

          <div className="relative border-l border-border pl-8 flex flex-col gap-0">
            {financeExps.map((exp, i) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="py-7 relative group cursor-pointer bg-transparent hover:bg-surface transition-colors rounded-xl px-5 -mx-5"
                role="button"
                tabIndex={0}
                data-cursor="expand"
                onClick={() => setSelectedExperience(exp)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(exp)}
              >
                <div className="absolute left-[-34px] top-9 w-2.5 h-2.5">
                  <div className="absolute inset-0 rounded-full border-2 border-background" style={{ backgroundColor: 'rgba(139,92,246,0.5)' }} />
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] mb-2 text-accent">
                  {exp.date}
                </p>
                <h3 className="font-serif font-bold text-base md:text-lg text-foreground mb-1 group-hover:text-accent transition-colors leading-snug">
                  {exp.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">
                  {exp.organization}
                </p>
                <p className="text-[12px] text-muted leading-relaxed max-w-sm line-clamp-2">
                  {exp.shortDescription}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="flex flex-col mb-12 lg:mb-0">
          <section aria-label="Education">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-6"
            >
              Education
            </motion.p>

            <div className="relative border-l border-border pl-8 flex flex-col gap-0">
              {education.map((edu, i) => (
                <motion.article
                  key={edu.school}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="py-7 relative"
                >
                  <div className="absolute left-[-34px] top-9 w-2.5 h-2.5">
                    <div className="absolute inset-0 rounded-full bg-accent/60 border-2 border-background" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-1.5">
                    {edu.years}
                  </p>
                  <h3 className="font-serif font-bold text-base md:text-lg text-foreground mb-1">
                    {edu.school}
                  </h3>
                  {edu.department && (
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-1">
                      {edu.department}
                    </p>
                  )}
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-3">
                    {edu.degree}
                  </p>
                  {edu.honors && edu.honors.length > 0 && (
                    <ul className="flex flex-col gap-1">
                      {edu.honors.map((h) => (
                        <li key={h} className="font-mono text-xs uppercase tracking-[0.15em] text-muted flex items-start gap-2">
                          <span className="text-accent/40 mt-0.5">·</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              ))}
            </div>
          </section>

          <section className="pt-0 lg:-mt-[1px]" aria-label="Research">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-6 mt-8"
            >
              Research
            </motion.p>

            <div className="relative border-l border-border pl-8 flex flex-col gap-0">
              {researchExps.map((exp, i) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07 }}
                  className="py-8 relative group cursor-pointer bg-transparent hover:bg-surface transition-colors rounded-xl px-5 -mx-5"
                  role="button"
                  tabIndex={0}
                  data-cursor="expand"
                  onClick={() => setSelectedExperience(exp)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(exp)}
                >
                  <div className="absolute left-[-34px] top-10 w-2.5 h-2.5">
                    <div className="absolute inset-0 rounded-full bg-accent/50 border-2 border-background group-hover:bg-accent transition-colors" />
                  </div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
                    {exp.date}
                  </p>
                  <h3 className="font-serif font-bold text-lg md:text-xl text-foreground mb-1 group-hover:text-accent transition-colors leading-snug">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-3">
                    {exp.organization}
                  </p>
                  <p className="text-[13px] text-muted leading-relaxed max-w-md line-clamp-2">
                    {exp.shortDescription}
                  </p>
                </motion.article>
              ))}
            </div>
          </section>
        </div>

        <section aria-label="Skills Proficiency">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-6"
          >
            Proficiency
          </motion.p>

          <div className="flex flex-col gap-7">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.06 }}
              >
                <div className="flex justify-between items-baseline mb-3">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                    {cat.name}
                  </p>
                  <span className="font-mono text-xs text-accent/70">
                    {cat.proficiency}%
                  </span>
                </div>
                <div className="h-[2px] bg-surface rounded">
                  <motion.div
                    className="h-full rounded"
                    style={{ background: 'linear-gradient(90deg, #8B5CF6, #4C1D95)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cat.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <section
        className="section-full px-6"
        aria-label="Philosophy"
      >
        <blockquote className="max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif italic text-subhead text-foreground leading-relaxed"
          >
            &ldquo;The stock market is a device for transferring money from the impatient to the patient.&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted mt-6"
          >
            — Warren Buffett
          </motion.p>
        </blockquote>
      </section>

      <section className="py-16 px-6 lg:px-12" aria-label="Personal Interests">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-8 text-center"
          >
            Outside the Office
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {personalInterests.map((interest, i) => (
              <InterestCard key={interest.title} interest={interest} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-full flex-col text-center px-6"
        aria-label="Connect"
      >
        <h2 className="font-serif font-bold text-headline text-foreground text-balance mb-7 will-change-transform">
          <TextReveal splitBy="word" staggerDelay={0.08}>
            Let&apos;s Connect
          </TextReveal>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton href="/contact" size="lg" data-cursor="expand">
            Get in Touch
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            data-cursor="expand"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </MagneticButton>
        </motion.div>
      </section>

      {selectedExperience && (
        <ExperienceModal
          experience={selectedExperience}
          isOpen={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </>
  );
}
