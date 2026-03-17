'use client';

import React, { createContext, useEffect, useState } from 'react';
import { authApi } from '@/api/auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('zap-shift-user');
    const storedToken = localStorage.getItem('zap-shift-token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserRole(parsedUser.role);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem('zap-shift-user');
      }
    }
    setLoading(false);
  }, []);

  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const data = await authApi.register(userData);
      if (data.success) {
        saveAuth(data);
        return data;
      }
      throw new Error(data.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const registerRider = async (riderData) => {
    setLoading(true);
    try {
      const data = await authApi.registerRider(riderData);
      if (data.success) {
        saveAuth(data);
        return data;
      }
      throw new Error(data.message || 'Rider registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      if (data.success) {
        saveAuth(data);
        return data;
      }
      throw new Error(data.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('zap-shift-user');
    localStorage.removeItem('zap-shift-token');
    setUser(null);
    setUserRole(null);
    return Promise.resolve();
  };

  const saveAuth = (data) => {
    localStorage.setItem('zap-shift-user', JSON.stringify(data.user));
    localStorage.setItem('zap-shift-token', data.token);
    setUser(data.user);
    setUserRole(data.user.role);
  };

  const googleLogin = () => {
     console.warn("Google Login not yet connected to backend");
     return Promise.reject("Google Login not implemented on backend");
  };

  const authInfo = {
    user,
    userRole,
    loading,
    registerUser,
    registerRider,
    login,
    logout,
    googleLogin
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
