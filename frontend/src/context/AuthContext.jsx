import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('nsb_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authService.getProfile();
      if (data && data.id) {
        setUser(data);
      } else {
        localStorage.removeItem('nsb_token');
      }
    } catch {
      localStorage.removeItem('nsb_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  const login = useCallback(async (email, password) => {
    const { data } = await authService.login({ email, password });
    if (data.token) {
      localStorage.setItem('nsb_token', data.token);
      setUser(data.user);
      return data.user;
    }
    throw new Error('Token not received');
  }, []);

  const register = useCallback(async (formData) => {
    const { data } = await authService.register(formData);
    if (data.token) {
      localStorage.setItem('nsb_token', data.token);
      setUser(data.user);
      return data.user;
    }
    throw new Error('Token not received');
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('nsb_token');
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    isAuth: !!user,
    isAdmin: user?.role === 'ADMIN',
  }), [user, loading, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
