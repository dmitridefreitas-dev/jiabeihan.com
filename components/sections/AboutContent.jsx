'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TextReveal from '@/components/effects/TextReveal';
import MagneticButton from '@/components/effects/MagneticButton';
import ExperienceModal from '@/components/modals/ExperienceModal';
import { education } from '@/data/education';
import { experiences } from '@/data/experiences';
import { skillCategories } from '@/data/skills';
import { socialLinks } from '@/data/constants';
import { ArrowUpRight, Github, Linkedin, FileText, BookOpen, Coffee, Dumbbell, Music } from 'lucide-react';

const storyParagraphs = [
  "I'm a double major in Computer Science and Mathematics at Washington University in St. Louis (McKelvey School of Engineering), graduating May 2026.",
  "My current research focus is de Rham cohomology and smooth manifolds, working under the supervision of Professor Yanli Song. I find beauty in how abstract topology and differential geometry describe the shape of spaces.",
  "I also have published work in evolutionary game theory — applying Q-learning to model how conditional cooperation emerges and evolves in populations, published in Physical Review E.",
  "I'm looking for Math PhD programs and research internships starting Fall 2027, in pure mathematics, applied math, or theoretical machine learning.",
];

const researchExps = experiences.filter((e) => e.type === 'research');
const teachingExps = experiences.filter((e) => e.type === 'teaching');

const personalInterests = [
  {
    icon: BookOpen,
    title: 'Mathematics',
    description: 'Fascinated by pure mathematics — topology, analysis, and abstract algebra outside of coursework.',
  },
  {
    icon: Coffee,
    title: 'Coffee & Study Culture',
    description: 'A firm believer in good coffee and deep focus sessions. Always on the lookout for the best study spots.',
  },
  {
    icon: Dumbbell,
    title: 'Fitness',
    description: 'Regular gym-goer who believes physical discipline and mental discipline are closely connected.',
  },
  {
    icon: Music,
    title: 'Music',
    description: 'Enjoys listening to and exploring music across genres as a way to decompress after intense study sessions.',
  },
];

export default function AboutContent() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="section-full flex-col text-center px-6 pt-24"
        aria-label="About hero"
        style={{ minHeight: '100vh' }}
      >
        {/* Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mb-10"
        >
          {/* Rotating gradient ring */}
          <div className="headshot-ring-outer" aria-hidden="true" />
          {/* Pulsing glow ring */}
          <div className="headshot-glow-pulse" aria-hidden="true" />
          {/* Image container */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden ring-1 ring-gray-200 headshot-container"
            style={{ boxShadow: '0 0 50px rgba(220,38,38,0.18)' }}
          >
            <Image
              src="/images/headshot.jpeg"
              alt="Xinshi Feng"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </motion.div>

        <h1 className="font-serif font-bold text-display text-foreground will-change-transform text-balance">
          <TextReveal splitBy="word" delay={0.3} staggerDelay={0.1}>
            Xinshi Feng
          </TextReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-accent mt-6"
        >
          CS &amp; Math · WashU · Available Fall 2027
        </motion.p>

        {/* IBM Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {['Git & GitHub', 'HTML/CSS/JS', 'Cloud Computing', 'Software Engineering'].map((cert) => (
            <span
              key={cert}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted bg-gray-50 border border-gray-200 rounded px-2 py-1"
            >
              IBM · {cert}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Content Grid ── */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-20 lg:gap-y-32 lg:max-w-[1400px] lg:mx-auto px-6 lg:px-12 py-24 relative items-start">

        {/* ── Row 1: Background (Left) | Teaching & Leadership (Right) ── */}
        
        {/* Background */}
        <section className="flex flex-col mb-24 lg:mb-0" aria-label="Background">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-12 self-start"
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
                className="text-subhead text-foreground leading-snug font-sans"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </section>

        {/* Teaching & Leadership */}
        <section className="mb-24 lg:mb-0" aria-label="Teaching & Leadership">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-12"
          >
            Teaching &amp; Leadership
          </motion.p>

          <div className="relative border-l border-gray-200 pl-8 flex flex-col gap-0">
            {teachingExps.map((exp, i) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className="py-7 relative group cursor-pointer hover:bg-red-50/40 transition-colors rounded-xl px-5 -mx-5"
                role="button"
                tabIndex={0}
                data-cursor="expand"
                onClick={() => setSelectedExperience(exp)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(exp)}
              >
                <div
                  className="absolute left-[-34px] top-9 w-2.5 h-2.5 rounded-full border-2 border-white group-hover:opacity-100 transition-all"
                  style={{ backgroundColor: 'rgba(153,27,27,0.5)' }}
                />
                <p className="font-mono text-xs uppercase tracking-[0.25em] mb-2" style={{ color: '#991B1B' }}>
                  {exp.date}
                </p>
                <h3 className="font-serif font-bold text-base md:text-lg text-foreground mb-1 group-hover:text-red-700 transition-colors leading-snug">
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

        {/* ── Row 2: Education & Research (Left) | Proficiency (Right) ── */}

        <div className="flex flex-col mb-24 lg:mb-0">
          {/* Education */}
          <section aria-label="Education">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-12"
            >
              Education
            </motion.p>

            <div className="relative border-l border-gray-200 pl-8 flex flex-col gap-0">
              {education.map((edu, i) => (
                <motion.article
                  key={edu.school}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="py-7 relative"
                >
                  <div className="absolute left-[-34px] top-9 w-2.5 h-2.5 rounded-full bg-accent/60 border-2 border-white" />
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-1.5">
                    {edu.years}
                  </p>
                  <h3 className="font-serif font-bold text-xl md:text-2xl text-foreground mb-1">
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

          {/* Research (tightly follows Education) */}
          <section className="pt-0 lg:-mt-[1px]" aria-label="Research">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-12 hidden lg:block invisible"
            >
              {/* Spacer matching the label height */}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-12 mt-12 lg:hidden"
            >
              Research
            </motion.p>

            <div className="relative border-l border-gray-200 pl-8 flex flex-col gap-0">
              {researchExps.map((exp, i) => (
                <motion.article
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07 }}
                  className="py-8 relative group cursor-pointer hover:bg-red-50/40 transition-colors rounded-xl px-5 -mx-5"
                  role="button"
                  tabIndex={0}
                  data-cursor="expand"
                  onClick={() => setSelectedExperience(exp)}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedExperience(exp)}
                >
                  <div className="absolute left-[-34px] top-10 w-2.5 h-2.5 rounded-full bg-accent/50 border-2 border-white group-hover:bg-accent transition-colors" />
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
                  {exp.paperLink && (
                    <a
                      href={exp.paperLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs uppercase tracking-[0.2em] text-accent border border-accent/25 hover:border-accent/60 rounded px-2 py-1 transition-colors"
                    >
                      <FileText className="h-3 w-3" /> arXiv Paper
                    </a>
                  )}
                </motion.article>
              ))}
            </div>
          </section>
        </div>

        {/* Skills Proficiency */}
        <section aria-label="Skills Proficiency">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-12"
          >
            Proficiency
          </motion.p>

          <div className="flex flex-col gap-10">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.06 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-5">
                  {cat.title}
                </p>
                <div className="flex flex-col gap-4">
                  {cat.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <span className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/90">
                          {skill.name}
                        </span>
                        <span className="font-mono text-xs text-accent/70">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-[2px] bg-gray-100 rounded">
                        <motion.div
                          className="h-full rounded"
                          style={{ background: 'linear-gradient(90deg, #DC2626, #991B1B)' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: si * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Philosophy Quote ── */}
      <section
        className="section-full px-6"
        aria-label="Philosophy"
        style={{ minHeight: '70vh' }}
      >
        <blockquote className="max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif italic text-subhead text-foreground leading-relaxed"
          >
            &ldquo;Mathematics is not about numbers, equations, computations, or algorithms: 
            it is about understanding.&rdquo;
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted mt-6"
          >
            — William Paul Thurston
          </motion.p>
        </blockquote>
      </section>

      {/* ── Personal Interests ── */}
      <section className="py-32 px-6 lg:px-12" aria-label="Personal Interests">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted mb-16 text-center"
          >
            Outside the Classroom
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {personalInterests.map((interest, i) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="academic-card p-7 rounded-xl flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-foreground mb-1.5">
                      {interest.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="section-full flex-col text-center px-6"
        aria-label="Connect"
        style={{ minHeight: '60vh' }}
      >
        <h2 className="font-serif font-bold text-headline text-foreground text-balance mb-10 will-change-transform">
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
          <MagneticButton
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="lg"
            data-cursor="expand"
          >
            <Github className="h-4 w-4" />
            GitHub
          </MagneticButton>
        </motion.div>
      </section>

      {/* Experience Modal */}
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
