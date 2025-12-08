import React from 'react';

export interface EvzTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Reusable tag component
 * Pulled out of repeated JSX pieces
 */
function EvzTag({ 
  children, 
  variant = 'default', 
  size = 'medium',
  className = '',
  ...props 
}: EvzTagProps): JSX.Element {
  const baseClasses = 'evz-tag';
  const variantClasses = `evz-tag--${variant}`;
  const sizeClasses = `evz-tag--${size}`;
  
  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default EvzTag;

