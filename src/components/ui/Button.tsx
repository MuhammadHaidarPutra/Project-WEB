import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold' | 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/25 focus:ring-blue-500',
      blue:
        'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/30 focus:ring-blue-500 font-bold',
      gold:
        'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white hover:from-blue-700 hover:to-blue-700 shadow-lg shadow-blue-500/30 focus:ring-blue-500 font-bold',
      secondary:
        'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 focus:ring-slate-900',
      white:
        'bg-white text-slate-950 hover:bg-blue-50 hover:text-blue-600 shadow-lg border border-slate-200/80 font-bold focus:ring-blue-500',
      outline:
        'border border-slate-300 bg-transparent text-slate-800 hover:bg-slate-100 hover:border-slate-400 focus:ring-blue-500',
      ghost:
        'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm focus:ring-rose-500',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
