import React from 'react';

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
}) {
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

