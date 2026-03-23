'use client';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  target,
  rel,
  variant = 'default',
  size = 'default',
  disabled = false,
  type = 'button',
  asChild = false,
}) {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(0.3);

  const baseStyles =
    'relative inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider transition-colors transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50';

  const variants = {
    default:
      'bg-accent text-white hover:bg-red-700 shadow-[0_2px_16px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_24px_rgba(220,38,38,0.35)]',
    outline:
      'border border-accent/40 text-accent hover:bg-red-50 hover:border-accent/70',
    ghost: 'text-muted hover:text-foreground hover:bg-gray-100/80',
  };

  const sizes = {
    default: 'h-11 px-6 py-2 rounded-lg',
    sm: 'h-9 px-4 rounded-md text-xs',
    lg: 'h-14 px-8 py-3 rounded-lg text-base',
    icon: 'h-10 w-10 rounded-full',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href, target, rel } : { type, disabled };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      <Tag onClick={onClick} className={classes} {...linkProps}>
        {content}
      </Tag>
    </motion.div>
  );
}
