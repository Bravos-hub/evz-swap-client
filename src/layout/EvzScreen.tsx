import React from 'react';

export interface EvzScreenProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

/**
 * Shared layout wrapper used by almost every screen
 * Provides consistent styling and structure
 */
function EvzScreen({ children, className = '', centered = false }: EvzScreenProps): JSX.Element {
  return (
    <div className="evz-app">
      <div className={`evz-screen ${centered ? 'evz-screen--center' : ''} ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default EvzScreen;

