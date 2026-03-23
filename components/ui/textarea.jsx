import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      'flex min-h-[80px] w-full rounded-lg px-3 py-2 text-sm transition-colors resize-none',
      'bg-white/5 border border-white/10 text-foreground placeholder:text-muted',
      'focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
