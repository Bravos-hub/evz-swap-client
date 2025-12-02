import React from 'react';

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
}) {
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

