import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Code2, 
  LayoutDashboard, 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Award,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Quizzes', path: '/quizzes', icon: BookOpen },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link 
            to={currentUser ? '/dashboard' : '/login'} 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-1.5">
                Dev<span className="text-brand-400">Quiz</span>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  Engine
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-brand-400' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Section / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 200)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    {currentUser.name
                      ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                      : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                      {currentUser.email}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-medium text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{currentUser.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Your Profile
                    </Link>

                    <Link
                      to="/quizzes"
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Award className="w-4 h-4 text-brand-400" />
                      Browse Quizzes
                    </Link>

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 px-4 py-2 rounded-lg shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-b border-slate-800 bg-slate-900/95 backdrop-blur-lg">
          {currentUser ? (
            <>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/60 flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white text-xs">
                  {currentUser.name
                    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    : 'U'}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-400">{currentUser.email}</div>
                </div>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                      active
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 mt-2"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-500"
              >
                Sign Up Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
