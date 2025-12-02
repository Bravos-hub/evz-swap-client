import React from 'react';

/**
 * Optional: global header / nav / toasts
 * Can be used to wrap the entire app with global UI elements
 */
function AppShell({ children }) {
  return (
    <div className="evz-app-shell">
      {/* Global header/nav can go here */}
      {children}
      {/* Global toasts/notifications can go here */}
    </div>
  );
}

export default AppShell;

