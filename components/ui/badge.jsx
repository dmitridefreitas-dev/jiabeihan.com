import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-mono uppercase tracking-wider transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-red-50 text-accent border border-red-200/70',
        secondary: 'bg-gray-50 text-muted border border-gray-200',
        outline: 'border border-gray-200 text-muted',
        destructive: 'bg-red-50 text-destructive border border-red-200',
        award: 'bg-amber-50 text-amber-700 border border-amber-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
