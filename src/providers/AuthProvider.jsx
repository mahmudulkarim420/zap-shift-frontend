"use client";

import React, { createContext, useEffect, useState } from "react";
import { authApi } from "@/api/auth";

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
      // Handle expected 401 errors silently (user not logged in on initial load)
      console.error("Failed to fetch current user", e);
      setError(null); // Don't persist error for not-logged-in case

      setUser(null);
      setUserRole(null);
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

      if (data.success && data.user) {
        setUser(data.user);
        setUserRole(data.user.role);
        return data;
      }

      throw new Error(data.message || "Registration failed");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
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

      if (data.success && data.user) {
        setUser(data.user);
        setUserRole(data.user.role);
        return data;
      }

      throw new Error(data.message || "Rider registration failed");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || "Rider registration failed";
      setError(errorMessage);
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

      // Handle successful login response
      if (data && data.success && data.user) {
        setUser(data.user);
        setUserRole(data.user.role);

        // CRITICAL: Synchronize session before navigation
        await refreshUser();

        return { success: true, user: data.user };
      }

      // If we get here, the response wasn't successful
      throw new Error(data?.message || "Login failed");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || "Login failed";
      console.error("Login error:", errorMessage);
      setError(errorMessage);
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
      console.error("Logout error:", err);
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

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
