import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Award, 
  Play, 
  CheckCircle2, 
  Filter, 
  Code2, 
  Atom, 
  FileCode, 
  Network, 
  Layout, 
  Database, 
  Boxes, 
  Cpu, 
  FileCheck,
  Zap,
  Sparkles
} from 'lucide-react';

export const QuizList = () => {
  const { quizzes, getUserStats } = useQuiz();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');

  const userStats = getUserStats(currentUser?.email);

  // Extract unique categories
  const categories = ['ALL', ...new Set(quizzes.map(q => q.category))];
  const difficulties = ['ALL', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'ALL' || quiz.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'ALL' || quiz.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'javascript': return Code2;
      case 'react': return Atom;
      case 'python': return FileCode;
      case 'algorithms': return Network;
      case 'web development': return Layout;
      case 'databases': return Database;
      case 'architecture': return Boxes;
      case 'coding logic': return Cpu;
      case 'typescript': return FileCheck;
      default: return Sparkles;
    }
  };

  const getDifficultyBadgeColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'intermediate': return 'bg-brand-500/10 text-brand-400 border-brand-500/20';
      case 'advanced': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Question Bank</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Engineering & Coding Quizzes
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Timed developer assessments with code snippet tracing. Achieve 75%+ to qualify for instant PDF certificate generation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, topics..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Category Pills & Difficulty filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-[1.02]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <span className="text-xs text-slate-400 font-medium">Difficulty:</span>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-slate-800 text-brand-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center border border-slate-800">
          <Filter className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">No quizzes match your filters</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search keywords or category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setSelectedDifficulty('ALL');
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const Icon = getCategoryIcon(quiz.category);
            const bestAttempt = userStats.bestScoresByQuiz?.[quiz.id];
            const hasPassed = bestAttempt && bestAttempt.passed;

            return (
              <div
                key={quiz.id}
                className="glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top color gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Category & Difficulty Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-300 tracking-wide">
                        {quiz.category}
                      </span>
                    </div>

                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyBadgeColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                {/* Metadata & Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-400" />
                      <span>{quiz.timeLimit} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span>Pass: {quiz.passingScore}%</span>
                    </div>
                  </div>

                  {/* Best Attempt Badge if any */}
                  {bestAttempt && (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px]">
                      <span className="text-slate-400">Your Best Score:</span>
                      <span className={`font-mono font-bold flex items-center gap-1 ${
                        hasPassed ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {hasPassed && <CheckCircle2 className="w-3 h-3" />}
                        {bestAttempt.percentage}%
                      </span>
                    </div>
                  )}

                  {/* Start Button */}
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-all transform group-hover:-translate-y-0.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{bestAttempt ? 'Retake Assessment' : 'Start Assessment'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
