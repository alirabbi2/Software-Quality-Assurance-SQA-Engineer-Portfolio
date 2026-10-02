import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginWithOAuth: (provider: 'google' | 'github') => Promise<void>;
  loginAsAdmin: (password?: string) => boolean;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('rabbi_portfolio_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('rabbi_portfolio_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rabbi_portfolio_auth_user');
    }
  }, [user]);

  const loginWithOAuth = async (provider: 'google' | 'github') => {
    // Simulate OAuth handshake
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockProfiles: Record<'google' | 'github', UserProfile> = {
      google: {
        id: 'usr_goog_' + Math.random().toString(36).substring(7),
        name: 'Technical Recruiter',
        email: 'recruiter@techventures.io',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'recruiter',
        provider: 'google',
      },
      github: {
        id: 'usr_gh_' + Math.random().toString(36).substring(7),
        name: 'QA Hiring Lead',
        email: 'qa.lead@devcorp.net',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        role: 'recruiter',
        provider: 'github',
      },
    };

    setUser(mockProfiles[provider]);
    setIsAuthModalOpen(false);
  };

  const loginAsAdmin = (password?: string) => {
    // Demo admin login (passcode "admin123" or empty for demo accessibility)
    if (!password || password.trim() === 'admin123' || password.trim() === 'admin' || password.trim() === 'rabbi') {
      const adminProfile: UserProfile = {
        id: 'admin_rabbi_001',
        name: 'Md. Akher Ali Rabbi (Admin)',
        email: 'alirabbi.engr@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        role: 'admin',
        provider: 'google',
      };
      setUser(adminProfile);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loginWithOAuth,
        loginAsAdmin,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
