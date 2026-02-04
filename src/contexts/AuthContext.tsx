import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Set user as always authenticated
  const [isAuthenticated] = useState(true);
  const [user] = useState<User>({
    name: 'John Doe',
    email: 'john.doe@mellominds.com',
    avatar: '/Light-Icon/Iconly/Light-Outline/Profile.svg'
  });

  const logout = () => {
    // No logout functionality needed since we removed login
    console.log('Logout functionality removed');
  };

  const value = {
    isAuthenticated,
    user,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};