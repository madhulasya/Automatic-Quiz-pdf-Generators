import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_QUIZZES } from '../data/quizzes';
import toast from 'react-hot-toast';

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load quizzes and attempts from localStorage
  useEffect(() => {
    let storedQuizzes = getStorageItem(STORAGE_KEYS.QUIZ_DATA, null);
    if (!storedQuizzes || !Array.isArray(storedQuizzes) || storedQuizzes.length === 0) {
      storedQuizzes = INITIAL_QUIZZES;
      setStorageItem(STORAGE_KEYS.QUIZ_DATA, INITIAL_QUIZZES);
    }
    setQuizzes(storedQuizzes);

    const storedAttempts = getStorageItem(STORAGE_KEYS.ATTEMPTS, []);
    setAttempts(storedAttempts);
    setLoading(false);
  }, []);

  /**
   * Get quiz by ID
   */
  const getQuizById = (id) => {
    return quizzes.find(q => q.id === id) || null;
  };

  /**
   * Record a new quiz attempt
   */
  const recordAttempt = ({
    userEmail,
    userName,
    quizId,
    quizTitle,
    score,
    totalPoints,
    percentage,
    passed,
    answers = {},
    timeSpentSeconds = 0,
  }) => {
    const attemptId = `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newAttempt = {
      id: attemptId,
      userEmail: userEmail.toLowerCase(),
      userName,
      quizId,
      quizTitle,
      score,
      totalPoints,
      percentage: Math.round(percentage * 10) / 10,
      passed,
      answers,
      timeSpentSeconds,
      date: new Date().toISOString(),
    };

    const currentAttempts = getStorageItem(STORAGE_KEYS.ATTEMPTS, []);
    const updatedAttempts = [newAttempt, ...currentAttempts];
    setStorageItem(STORAGE_KEYS.ATTEMPTS, updatedAttempts);
    setAttempts(updatedAttempts);

    return newAttempt;
  };

  /**
   * Get all attempts for a given user email
   */
  const getUserAttempts = (email) => {
    if (!email) return [];
    const normalized = email.toLowerCase();
    return attempts.filter(a => a.userEmail === normalized);
  };

  /**
   * Get a specific attempt by ID
   */
  const getAttemptById = (id) => {
    return attempts.find(a => a.id === id) || null;
  };

  /**
   * Calculate statistics for a user
   */
  const getUserStats = (email) => {
    const userAttempts = getUserAttempts(email);
    const totalAttempts = userAttempts.length;

    if (totalAttempts === 0) {
      return {
        totalAttempts: 0,
        uniqueQuizzesTaken: 0,
        averageScore: 0,
        certificatesEarned: 0,
        passRate: 0,
        recentAttempts: [],
        bestScoresByQuiz: {},
      };
    }

    const uniqueQuizIds = new Set(userAttempts.map(a => a.quizId));
    const passedAttempts = userAttempts.filter(a => a.passed);
    const uniquePassedQuizzes = new Set(passedAttempts.map(a => a.quizId));
    const totalScoreSum = userAttempts.reduce((acc, curr) => acc + curr.percentage, 0);
    const averageScore = Math.round(totalScoreSum / totalAttempts);
    const passRate = Math.round((passedAttempts.length / totalAttempts) * 100);

    const bestScoresByQuiz = {};
    userAttempts.forEach(att => {
      if (!bestScoresByQuiz[att.quizId] || att.percentage > bestScoresByQuiz[att.quizId].percentage) {
        bestScoresByQuiz[att.quizId] = att;
      }
    });

    return {
      totalAttempts,
      uniqueQuizzesTaken: uniqueQuizIds.size,
      averageScore,
      certificatesEarned: uniquePassedQuizzes.size,
      passRate,
      recentAttempts: userAttempts.slice(0, 5),
      bestScoresByQuiz,
    };
  };

  /**
   * Reset local storage data back to defaults
   */
  const resetQuizData = () => {
    setStorageItem(STORAGE_KEYS.QUIZ_DATA, INITIAL_QUIZZES);
    setStorageItem(STORAGE_KEYS.ATTEMPTS, []);
    setQuizzes(INITIAL_QUIZZES);
    setAttempts([]);
    toast.success('Quiz data and test attempts reset to default');
  };

  const value = {
    quizzes,
    attempts,
    loading,
    getQuizById,
    recordAttempt,
    getUserAttempts,
    getAttemptById,
    getUserStats,
    resetQuizData,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
