'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession, getMe } from '@/lib/api/clientApi';
import Loader from '@/components/Loader/Loader';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const sessionActive = await checkSession();
        if (sessionActive) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        clearIsAuthenticated();
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}

export default AuthProvider;
