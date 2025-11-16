import React, { createContext, useState, useMemo, ReactNode, useContext } from 'react';
import { CartItem } from '../types';

interface User {
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  orders: CartItem[][];
  login: (email: string) => void;
  logout: () => void;
  addOrder: (order: CartItem[]) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<CartItem[][]>([]);

  const login = (email: string) => {
    setCurrentUser({ email });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addOrder = (newOrder: CartItem[]) => {
    if (currentUser) {
      setOrders(prevOrders => [...prevOrders, newOrder]);
    }
  };

  const value = useMemo(() => ({
    currentUser,
    orders,
    login,
    logout,
    addOrder,
  }), [currentUser, orders]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};