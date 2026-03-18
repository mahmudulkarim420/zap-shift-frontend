'use client';

import React, { createContext, useEffect, useState } from 'react';
import { authApi } from '@/api/auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await authApi.getMe();

      if (result.success && result.data) {
        setUser(result.data);
        setUserRole(result.data.role);
        return result;
      } else {
        setUser(null);
        setUserRole(null);
        return result;
      }
    } catch (e) {
      console.error('Failed to fetch current user', e);
      setUser(null);
      setUserRole(null);
      setError(e?.response?.data?.message || e.message || 'Failed to fetch user');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authApi.register(userData);

      if (data.success) {
        await refreshUser();
        return data;
      }

      throw new Error(data.message || 'Registration failed');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerRider = async (riderData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authApi.registerRider(riderData);

      if (data.success) {
        await refreshUser();
        return data;
      }

      throw new Error(data.message || 'Rider registration failed');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Rider registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authApi.login(email, password);

      if (data.success) {
        await refreshUser();
        return data;
      }

      throw new Error(data.message || 'Login failed');
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setUserRole(null);
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    userRole,
    loading,
    error,
    registerUser,
    registerRider,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;