import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import { Toaster } from 'react-hot-toast';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { QuizList } from './pages/QuizList';
import { QuizTake } from './pages/QuizTake';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

// Root route redirect helper
const RootRedirect = () => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

// Public route helper (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return currentUser ? <Navigate to="/dashboard" replace /> : children;
};

export const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                {/* Root Route */}
                <Route path="/" element={<RootRedirect />} />

                {/* Public Auth Routes */}
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <PublicRoute>
                      <ForgotPassword />
                    </PublicRoute>
                  }
                />

                {/* Protected Application Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quizzes"
                  element={
                    <ProtectedRoute>
                      <QuizList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quiz/:id"
                  element={
                    <ProtectedRoute>
                      <QuizTake />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />

            {/* Notification Toaster */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#0f172a',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#0f172a',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#f43f5e',
                    secondary: '#0f172a',
                  },
                },
              }}
            />
          </div>
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
