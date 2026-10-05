import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS, initializeLocalStorage } from '../utils/storage';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and load currentUser on initial mount
  useEffect(() => {
    initializeLocalStorage();
    const storedUser = getStorageItem(STORAGE_KEYS.CURRENT_USER, null);
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Helper to fetch current users list
  const getUsers = () => {
    return getStorageItem(STORAGE_KEYS.USERS, []);
  };

  /**
   * User Signup
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  const signup = async (name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      toast.error('Please fill in all fields.');
      return { success: false, message: 'All fields are required.' };
    }

    const users = getUsers();
    const existing = users.find(u => u.email.toLowerCase() === trimmedEmail);

    if (existing) {
      const errorMsg = 'Email already registered. Please login or use a different email.';
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }

    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      password,
      joinedAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setStorageItem(STORAGE_KEYS.USERS, updatedUsers);

    // Auto login
    const userSession = {
      name: newUser.name,
      email: newUser.email,
      joinedAt: newUser.joinedAt,
    };
    setStorageItem(STORAGE_KEYS.CURRENT_USER, userSession);
    setCurrentUser(userSession);

    toast.success(`Welcome to DevQuiz, ${newUser.name}!`);
    return { success: true, user: userSession };
  };

  /**
   * User Login
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password);

    if (!user) {
      const errorMsg = 'Invalid email or password';
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }

    const userSession = {
      name: user.name,
      email: user.email,
      joinedAt: user.joinedAt || new Date().toISOString(),
    };

    setStorageItem(STORAGE_KEYS.CURRENT_USER, userSession);
    setCurrentUser(userSession);

    toast.success(`Welcome back, ${user.name}!`);
    return { success: true, user: userSession };
  };

  /**
   * Forgot Password / Reset Password
   * @param {string} email
   * @param {string} newPassword
   */
  const forgotPassword = async (email, newPassword) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === trimmedEmail);

    if (userIndex === -1) {
      const errorMsg = 'Email not found';
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }

    users[userIndex].password = newPassword;
    setStorageItem(STORAGE_KEYS.USERS, users);

    toast.success('Password updated successfully! Please log in.');
    return { success: true };
  };

  /**
   * Check if email exists for forgot password verification step
   */
  const verifyEmailExists = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = getUsers();
    return users.some(u => u.email.toLowerCase() === trimmedEmail);
  };

  /**
   * Update current user profile
   */
  const updateProfile = (name, newPassword = null) => {
    if (!currentUser) return { success: false };

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === currentUser.email.toLowerCase());

    if (userIndex !== -1) {
      users[userIndex].name = name.trim();
      if (newPassword && newPassword.trim()) {
        users[userIndex].password = newPassword;
      }
      setStorageItem(STORAGE_KEYS.USERS, users);

      const updatedSession = {
        ...currentUser,
        name: name.trim(),
      };
      setStorageItem(STORAGE_KEYS.CURRENT_USER, updatedSession);
      setCurrentUser(updatedSession);

      toast.success('Profile updated successfully');
      return { success: true, user: updatedSession };
    }
    return { success: false };
  };

  /**
   * User Logout
   */
  const logout = () => {
    removeStorageItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    forgotPassword,
    verifyEmailExists,
    updateProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
