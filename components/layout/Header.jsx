'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import MagneticButton from '@/components/effects/MagneticButton';
import { socialLinks, contactInfo } from '@/data/constants';

const NAV_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

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
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 relative z-10" data-cursor="expand">
          <motion.span
            className="font-serif text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-200"
            whileHover={{ scale: 1.04 }}
          >
            J. Han
          </motion.span>
          <span className="hidden sm:block font-mono text-sm uppercase tracking-[0.2em] text-muted mt-0.5">
            — finance
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-mono text-xs uppercase tracking-[0.25em] font-bold transition-colors duration-200 ${
                  isActive ? 'holo-nav-active' : 'text-muted hover:text-accent'
                }`}
                data-cursor="expand"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4 relative z-10">
          <button
            onClick={toggleTheme}
            className="text-muted hover:text-accent transition-colors relative w-4 h-4 flex items-center justify-center"
            aria-label="Toggle dark mode"
            data-cursor="expand"
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <Sun className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <Moon className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
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
            href={`mailto:${contactInfo.email}`}
            className="text-muted hover:text-accent transition-colors"
            aria-label="Email"
            data-cursor="expand"
          >
            <Mail className="h-4 w-4" />
          </a>
          <MagneticButton href="https://drive.google.com/file/d/1DalgRC93YUuKqW7EOCM9Fff1c6nwfgDX/view?usp=drive_link" target="_blank" rel="noopener noreferrer" variant="ghost" className="text-sm px-4 py-1.5" data-cursor="expand">
            Resume
          </MagneticButton>
        </div>

        <button
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-foreground transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          data-cursor="expand"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border px-6 py-8 flex flex-col gap-6"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-[0.3em] font-bold transition-colors py-2 min-h-[44px] flex items-center ${isActive ? 'holo-nav-active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-accent transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={`mailto:${contactInfo.email}`} aria-label="Email" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
