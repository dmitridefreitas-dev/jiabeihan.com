'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';
import MagneticButton from '@/components/effects/MagneticButton';
import { socialLinks } from '@/data/constants';

const NAV_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { href: '/projects', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — serif monogram */}
        <Link href="/" className="group flex items-center gap-2 relative z-10" data-cursor="expand">
          <motion.span
            className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
          >
            X. Feng
          </motion.span>
          <span className="hidden sm:block font-mono text-sm uppercase tracking-[0.2em] text-muted mt-0.5">
            — cs &amp; math
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-mono text-xs uppercase tracking-[0.25em] transition-colors duration-200 hover:text-accent"
                style={{ color: isActive ? '#DC2626' : '#6B7280' }}
                data-cursor="expand"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right side — social icons */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
            data-cursor="expand"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="GitHub"
            data-cursor="expand"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={socialLinks.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
            aria-label="arXiv paper"
            data-cursor="expand"
          >
            <FileText className="h-4 w-4" />
          </a>
          <MagneticButton href="/contact" variant="ghost" className="text-sm px-4 py-1.5" data-cursor="expand">
            Get in Touch
          </MagneticButton>
        </div>

        {/* Mobile menu toggle — min 44×44 touch target */}
        <button
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-foreground transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          data-cursor="expand"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/98 backdrop-blur-md border-b border-gray-200 px-6 py-8 flex flex-col gap-6"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.3em] transition-colors py-2 min-h-[44px] flex items-center"
                  style={{ color: isActive ? '#DC2626' : '#1A1A2E' }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-accent transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-accent transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href={socialLinks.arxiv} target="_blank" rel="noopener noreferrer" aria-label="arXiv paper" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-accent transition-colors">
                <FileText className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
