import { useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { clearSession as clearStoredSession, readSession, writeSession } from '../api/sessionStorage';

/**
 * Hook for managing user session
 */
export function useSession() {
  const [session, setSession] = useState(() => readSession());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadSession = async () => {
      try {
        const stored = readSession();
        if (!stored?.accessToken) {
          if (!cancelled) {
            setSession(stored);
            setLoading(false);
          }
          return;
        }

        const user = await authApi.getCurrentUser();
        if (!cancelled) {
          setSession(writeSession({ ...stored, user }));
          setError(null);
        }
      } catch (error) {
        console.error('Failed to load session:', error);
        clearStoredSession();
        if (!cancelled) {
          setSession(null);
          setError(error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateSession = (newSession) => {
    setSession(writeSession(newSession));
  };

  const clearSession = () => {
    clearStoredSession();
    setSession(null);
  };

  return {
    session,
    loading,
    error,
    updateSession,
    clearSession,
  };
}

