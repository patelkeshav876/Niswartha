import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mock';
import { initializeBackendData } from '../lib/initData';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAdmin: boolean;
  isDonor: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Default to donor user for demo purposes
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]);
  const [loading, setLoading] = useState(true);

  const isAdmin = currentUser?.role === 'admin';
  const isDonor = currentUser?.role === 'donor';

  useEffect(() => {
    // Initialize backend data on first load (optional, won't block app)
    initializeBackendData()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isAdmin, isDonor, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}