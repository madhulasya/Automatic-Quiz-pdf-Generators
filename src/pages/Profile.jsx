import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { downloadCertificate } from '../utils/certificateGenerator';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Download, 
  LogOut, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  HardDrive 
} from 'lucide-react';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const { getUserStats, getUserAttempts, resetQuizData } = useQuiz();
  const navigate = useNavigate();

  const [editName, setEditName] = useState(currentUser?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const userStats = getUserStats(currentUser?.email);
  const attempts = getUserAttempts(currentUser?.email);
  const passedAttempts = attempts.filter(a => a.passed);

  // Extract unique passed certificates (latest per quiz)
  const uniqueCertificates = [];
  const seenQuizzes = new Set();
  passedAttempts.forEach(att => {
    if (!seenQuizzes.has(att.quizId)) {
      seenQuizzes.add(att.quizId);
      uniqueCertificates.push(att);
    }
  });

  const memberSinceFormatted = currentUser?.joinedAt
    ? new Date(currentUser.joinedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast.error('Name cannot be empty.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const res = updateProfile(editName, newPassword || null);
    if (res.success) {
      setIsEditing(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDownloadCert = (attempt) => {
    try {
      downloadCertificate({
        userName: currentUser.name,
        quizTitle: attempt.quizTitle,
        percentage: attempt.percentage,
        date: attempt.date,
        certificateId: attempt.id.replace('att_', 'DQ-CERT-').toUpperCase(),
      });
      toast.success(`Certificate downloaded for "${attempt.quizTitle}"!`);
    } catch (error) {
      console.error(error);
      toast.error('Error generating certificate.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & User Details */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-brand-500/20">
              {currentUser?.name
                ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                : 'U'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {currentUser?.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.email}</span>
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Member since {memberSinceFormatted}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Dropdown Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Display Name
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                New Password (Optional)
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep unchanged"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm whitespace-nowrap transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quizzes Completed</p>
            <h3 className="text-2xl font-bold text-slate-900">{userStats.totalAttempts}</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Mastery Score</p>
            <h3 className="text-2xl font-bold text-slate-900">{userStats.averageScore}%</h3>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificates Earned</p>
            <h3 className="text-2xl font-bold text-slate-900">{userStats.certificatesEarned}</h3>
          </div>
        </div>
      </div>

      {/* Certificate Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Earned Certificate Gallery</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accredited, tamper-proof client generated PDF credentials
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
            {uniqueCertificates.length} Valid Credentials
          </span>
        </div>

        {uniqueCertificates.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center border border-slate-200 bg-white shadow-xs">
            <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Certificates Earned Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Pass any technical assessment with 75% or higher to unlock and download your PDF certificate!
            </p>
            <Link
              to="/quizzes"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Browse Technical Quizzes</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueCertificates.map((cert) => (
              <div
                key={cert.id}
                className="glass-card-hover rounded-2xl p-5 border border-slate-200 bg-white flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md"
              >
                {/* Gold header line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Score: {cert.percentage}%
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {cert.quizTitle}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Issued to {currentUser.name} on {new Date(cert.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {cert.id.substring(0, 14)}...
                  </span>

                  <button
                    onClick={() => handleDownloadCert(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs rounded-lg transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Local Data Management / Settings */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 bg-white shadow-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-2">
          <HardDrive className="w-4 h-4 text-brand-600" />
          <span>Local Storage Controls</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4 max-w-xl">
          DevQuiz persists all candidate profiles, answers, attempts, and question sets exclusively in your browser's local cache.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={resetQuizData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Test Data & Quizzes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
