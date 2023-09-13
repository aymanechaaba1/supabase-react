import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
import { User } from '@supabase/supabase-js';

type UserContext = {
  user: User | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, session) => {
      switch (e) {
        case 'SIGNED_IN':
          setUser(session?.user);
          break;
        case 'SIGNED_OUT':
          setUser(undefined);
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
