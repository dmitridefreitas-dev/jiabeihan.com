import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded-lg px-3 py-2 text-sm transition-colors',
      'bg-white/5 border border-white/10 text-foreground placeholder:text-muted',
      'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
