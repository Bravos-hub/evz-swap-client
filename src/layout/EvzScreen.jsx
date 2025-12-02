import React from 'react';

/**
 * Shared layout wrapper used by almost every screen
 * Provides consistent styling and structure
 */
function EvzScreen({ children, className = '', centered = false }) {
  return (
    <div className="evz-app">
      <div className={`evz-screen ${centered ? 'evz-screen--center' : ''} ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default EvzScreen;

