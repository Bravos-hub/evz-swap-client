import React from 'react';

export interface EvzButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  disabled?: boolean;
  className?: string;
}

/**
 * Reusable button component
 * Pulled out of repeated JSX pieces
 */
function EvzButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  ...props 
}: EvzButtonProps): JSX.Element {
  const baseClasses = 'evz-button';
  const variantClasses = `evz-button--${variant}`;
  const disabledClasses = disabled ? 'evz-button--disabled' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default EvzButton;

