
import React from 'react';
import { cn } from '@/lib/utils';

interface FuturisticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowing?: boolean;
}

const FuturisticButton = React.forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  ({ className, variant = 'primary', size = 'md', glowing = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          'relative overflow-hidden font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center',
          
          // Size variants
          {
            'text-xs py-2 px-4': size === 'sm',
            'text-sm py-3 px-6': size === 'md',
            'text-base py-4 px-8': size === 'lg',
          },
          
          // Base style for all variants
          'rounded border',
          
          // Glowing effect
          glowing && 'neon-border',
          
          // Variant styles
          {
            'bg-neon-purple/20 border-neon-purple text-white hover:bg-neon-purple/30': variant === 'primary',
            'bg-neon-blue/20 border-neon-blue text-white hover:bg-neon-blue/30': variant === 'secondary',
            'bg-transparent border-white/20 text-white hover:border-white/40': variant === 'outline',
          },
          
          className
        )}
        ref={ref}
        {...props}
      >
        {props.children}
        
        {/* Futuristic hover effect overlay */}
        <span className="absolute inset-0 pointer-events-none">
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-500 ease-out translate-x-[-100%] group-hover:translate-x-[100%]"></span>
        </span>
      </button>
    );
  }
);

FuturisticButton.displayName = 'FuturisticButton';

export default FuturisticButton;
