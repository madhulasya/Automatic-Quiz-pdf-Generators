import { INITIAL_QUIZZES } from '../data/quizzes';

export const STORAGE_KEYS = {
  USERS: 'quiz_users',
  CURRENT_USER: 'quiz_currentUser',
  QUIZ_DATA: 'quiz_data',
  ATTEMPTS: 'quiz_attempts',
};

// Safely get item from localStorage with fallback
export const getStorageItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === undefined) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

// Safely set item in localStorage
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

// Remove item
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// Initialize quiz data and seed default demo user if desired
export const initializeLocalStorage = () => {
  // 1. Seed Quizzes
  const existingQuizzes = getStorageItem(STORAGE_KEYS.QUIZ_DATA, null);
  if (!existingQuizzes || !Array.isArray(existingQuizzes) || existingQuizzes.length === 0) {
    setStorageItem(STORAGE_KEYS.QUIZ_DATA, INITIAL_QUIZZES);
  }

  // 2. Ensure users array exists
  const existingUsers = getStorageItem(STORAGE_KEYS.USERS, null);
  if (!existingUsers || !Array.isArray(existingUsers)) {
    // Seed an initial demo account for testing ease
    const demoUser = {
      name: 'Alex Rivera',
      email: 'demo@devquiz.io',
      password: 'password123',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    };
    setStorageItem(STORAGE_KEYS.USERS, [demoUser]);
  }

  // 3. Ensure attempts array exists
  const existingAttempts = getStorageItem(STORAGE_KEYS.ATTEMPTS, null);
  if (!existingAttempts || !Array.isArray(existingAttempts)) {
    setStorageItem(STORAGE_KEYS.ATTEMPTS, []);
  }
};
