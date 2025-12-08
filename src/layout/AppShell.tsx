import React from 'react';

export interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Optional: global header / nav / toasts
 * Can be used to wrap the entire app with global UI elements
 */
function AppShell({ children }: AppShellProps): JSX.Element {
  return (
    <div className="evz-app-shell">
      {/* Global header/nav can go here */}
      {children}
      {/* Global toasts/notifications can go here */}
    </div>
  );
}

export default AppShell;

