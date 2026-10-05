import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { downloadCertificate } from '../utils/certificateGenerator';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Download, 
  Sparkles, 
  Play, 
  History, 
  Layers,
  ChevronRight,
  Search,
  Zap,
  Code2,
  Atom,
  FileCode,
  Network
} from 'lucide-react';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { quizzes, getUserStats, getUserAttempts } = useQuiz();
  const navigate = useNavigate();

  const [historySearch, setHistorySearch] = useState('');
  const [historyFilter, setHistoryFilter] = useState('ALL'); // 'ALL' | 'PASSED' | 'FAILED'

  const userStats = getUserStats(currentUser?.email);
  const allAttempts = getUserAttempts(currentUser?.email);

  // Filter history
  const filteredAttempts = allAttempts.filter(att => {
    const matchesSearch = att.quizTitle.toLowerCase().includes(historySearch.toLowerCase());
    const matchesFilter = 
      historyFilter === 'ALL' 
        ? true 
        : historyFilter === 'PASSED' 
        ? att.passed 
        : !att.passed;
    return matchesSearch && matchesFilter;
  });

  const handleDownloadCert = (attempt) => {
    try {
      downloadCertificate({
        userName: currentUser.name,
        quizTitle: attempt.quizTitle,
        percentage: attempt.percentage,
        date: attempt.date,
        certificateId: attempt.id.replace('att_', 'DQ-CERT-').toUpperCase(),
      });
      toast.success(`Downloaded certificate for "${attempt.quizTitle}"!`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate certificate.');
    }
  };

  // Quick icon selector
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'javascript': return Code2;
      case 'react': return Atom;
      case 'python': return FileCode;
      case 'algorithms': return Network;
      default: return Sparkles;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Assessment Portal Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, <span className="gradient-text">{currentUser?.name}</span>!
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Select an engineering assessment, test your code prediction and algorithmic thinking, and download accredited PDF certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/quizzes"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All Quizzes</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
            >
              <span>View Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Quizzes Taken */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quizzes Taken</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{userStats.totalAttempts}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{userStats.uniqueQuizzesTaken} unique topics</p>
          </div>
        </div>

        {/* Card 2: Average Score */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Score</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{userStats.averageScore}%</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Overall performance</p>
          </div>
        </div>

        {/* Card 3: Certificates Earned */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Certificates Earned</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{userStats.certificatesEarned}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Verified credentials</p>
          </div>
        </div>

        {/* Card 4: Pass Rate */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pass Rate</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{userStats.passRate}%</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Success frequency</p>
          </div>
        </div>
      </div>

      {/* Featured / Quick Start Quizzes Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            <span>Recommended Quizzes</span>
          </h2>
          <Link
            to="/quizzes"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View All ({quizzes.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quizzes.slice(0, 3).map((quiz) => {
            const Icon = getCategoryIcon(quiz.category);
            const bestAttempt = userStats.bestScoresByQuiz?.[quiz.id];

            return (
              <div
                key={quiz.id}
                className="glass-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {quiz.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{quiz.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{quiz.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{quiz.questions.length} Qs</span>
                    <span>•</span>
                    <span>{quiz.timeLimit}m</span>
                  </div>

                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500 text-brand-300 hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{bestAttempt ? 'Retake' : 'Start'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Feed & Full History Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-brand-400" />
              <span>Assessment History & Certificates</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Review prior attempts, verify scores, and download PDF certificates
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search history..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 w-44"
              />
            </div>

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => setHistoryFilter('ALL')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  historyFilter === 'ALL' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setHistoryFilter('PASSED')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  historyFilter === 'PASSED' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Passed
              </button>
              <button
                onClick={() => setHistoryFilter('FAILED')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  historyFilter === 'FAILED' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Failed
              </button>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {filteredAttempts.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-300">No Assessment Records Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                {allAttempts.length === 0
                  ? "You haven't taken any quizzes yet. Start an assessment to earn your first certified credential!"
                  : "No quiz attempts match your search filters."}
              </p>
              <Link
                to="/quizzes"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-xl shadow-lg transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Your First Quiz</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Quiz Assessment</th>
                    <th className="py-3.5 px-4">Score</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date Completed</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs">
                  {filteredAttempts.map((attempt) => (
                    <tr key={attempt.id} className="hover:bg-slate-800/30 transition-colors">
                      {/* Quiz Title */}
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-white">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2 h-2 rounded-full ${attempt.passed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          <span>{attempt.quizTitle}</span>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-200">
                            {attempt.percentage}%
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            ({attempt.score}/{attempt.totalPoints})
                          </span>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        {attempt.passed ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-semibold text-[11px]">
                            <XCircle className="w-3 h-3" />
                            Failed
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(attempt.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {attempt.passed ? (
                            <button
                              onClick={() => handleDownloadCert(attempt)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-white font-semibold text-xs transition-colors shadow-sm"
                              title="Download PDF Certificate"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Certificate</span>
                            </button>
                          ) : (
                            <Link
                              to={`/quiz/${attempt.quizId}`}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-colors"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Retake</span>
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
