import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { Timer } from '../components/Timer';
import { CodeBlock } from '../components/CodeBlock';
import { triggerConfetti } from '../components/Confetti';
import { downloadCertificate } from '../utils/certificateGenerator';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  RotateCcw, 
  Download, 
  Award, 
  LayoutDashboard, 
  AlertCircle, 
  HelpCircle,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send,
  Eye,
  BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';

export const QuizTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuizById, recordAttempt } = useQuiz();
  const { currentUser } = useAuth();

  const quiz = getQuizById(id);

  // States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [flagged, setFlagged] = useState({}); // { [questionId]: boolean }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [startTime] = useState(Date.now());
  const [showJumpDrawer, setShowJumpDrawer] = useState(false);

  // If quiz doesn't exist
  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white">Quiz Not Found</h2>
        <p className="text-sm text-slate-400 mt-1 mb-6">The requested technical assessment does not exist or has been modified.</p>
        <Link
          to="/quizzes"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Quizzes
        </Link>
      </div>
    );
  }

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;

  // Option index mapping
  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (letter) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: letter,
    }));
  };

  const toggleFlagQuestion = (qId) => {
    setFlagged(prev => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  // Submit assessment
  const submitQuiz = useCallback(() => {
    if (isSubmitted) return;

    let correctCount = 0;
    let totalPoints = 0;

    questions.forEach((q) => {
      const points = q.points || 1;
      totalPoints += points;
      const userAnswer = answers[q.id];
      // Compare answers
      if (userAnswer && userAnswer.toUpperCase() === q.correctAnswer.toUpperCase()) {
        correctCount += points;
      }
    });

    const percentage = totalPoints > 0 ? (correctCount / totalPoints) * 100 : 0;
    const passed = percentage >= quiz.passingScore;
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    const result = recordAttempt({
      userEmail: currentUser.email,
      userName: currentUser.name,
      quizId: quiz.id,
      quizTitle: quiz.title,
      score: correctCount,
      totalPoints,
      percentage,
      passed,
      answers,
      timeSpentSeconds,
    });

    setAttemptResult(result);
    setIsSubmitted(true);
    setShowConfirmModal(false);

    if (passed) {
      triggerConfetti();
      toast.success(`Congratulations! You passed with ${Math.round(percentage)}%!`);
    } else {
      toast.error(`Assessment complete. Score: ${Math.round(percentage)}%. Keep practicing!`);
    }
  }, [answers, currentUser, isSubmitted, questions, quiz, recordAttempt, startTime]);

  // Handle timeout
  const handleTimeUp = useCallback(() => {
    toast('Time has expired! Submitting assessment...', {
      icon: '⏰',
      duration: 4000,
    });
    submitQuiz();
  }, [submitQuiz]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSubmitted || showConfirmModal) return;

      // Number keys 1-4
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < (currentQuestion?.options?.length || 0)) {
          handleSelectOption(optionLetters[idx]);
        }
      }
      // Letters A, B, C, D
      if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        handleSelectOption(e.key.toUpperCase());
      }
      // Arrow navigation
      if (e.key === 'ArrowRight' && currentQuestionIdx < totalQuestions - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentQuestionIdx > 0) {
        setCurrentQuestionIdx(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, currentQuestionIdx, isSubmitted, showConfirmModal, totalQuestions]);

  const handleDownloadCert = () => {
    if (!attemptResult) return;
    downloadCertificate({
      userName: currentUser.name,
      quizTitle: quiz.title,
      percentage: attemptResult.percentage,
      date: attemptResult.date,
      certificateId: attemptResult.id.replace('att_', 'DQ-CERT-').toUpperCase(),
    });
    toast.success('Certificate downloaded!');
  };

  const handleRetake = () => {
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setAttemptResult(null);
    setCurrentQuestionIdx(0);
  };

  // ================= RESULTS VIEW =================
  if (isSubmitted && attemptResult) {
    const passed = attemptResult.passed;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
        {/* Hero Result Banner */}
        <div className={`rounded-3xl p-8 border text-center relative overflow-hidden shadow-2xl ${
          passed
            ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-500/30'
            : 'bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-900 border-rose-500/30'
        }`}>
          {/* Subtle background glow */}
          <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            passed ? 'bg-emerald-500/20' : 'bg-rose-500/20'
          }`} />

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-900 border border-slate-700 shadow-xl mb-2">
              {passed ? (
                <Award className="w-10 h-10 text-emerald-400 animate-bounce" />
              ) : (
                <XCircle className="w-10 h-10 text-rose-400" />
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {passed ? 'Assessment Passed with Distinction!' : 'Assessment Not Passed'}
            </h1>

            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {passed
                ? `Outstanding work! You scored above the ${quiz.passingScore}% threshold for "${quiz.title}".`
                : `You scored ${attemptResult.percentage}%. The passing threshold is ${quiz.passingScore}%. Review the questions below and try again!`}
            </p>

            {/* Score Pill Breakdown */}
            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
              <div className="px-6 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Score</span>
                <span className={`text-3xl font-extrabold font-mono ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {attemptResult.percentage}%
                </span>
              </div>

              <div className="px-6 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Correct Answers</span>
                <span className="text-3xl font-extrabold font-mono text-white">
                  {attemptResult.score} <span className="text-base text-slate-500 font-normal">/ {attemptResult.totalPoints}</span>
                </span>
              </div>

              <div className="px-6 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Time Taken</span>
                <span className="text-3xl font-extrabold font-mono text-slate-200">
                  {Math.floor(attemptResult.timeSpentSeconds / 60)}m {attemptResult.timeSpentSeconds % 60}s
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {passed && (
                <button
                  onClick={handleDownloadCert}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified Certificate (PDF)</span>
                </button>
              )}

              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Assessment</span>
              </button>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-sm border border-slate-800 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Question Review Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-brand-400" />
                <span>Question Review & Explanations</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Review your answers against the verified engineering solutions
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {attemptResult.score}/{attemptResult.totalPoints} Correct
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isCorrect = userAns && userAns.toUpperCase() === q.correctAnswer.toUpperCase();
              const isSkipped = !userAns;

              return (
                <div
                  key={q.id}
                  className={`glass-card rounded-2xl p-6 border transition-all ${
                    isCorrect
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : isSkipped
                      ? 'border-amber-500/30 bg-amber-950/10'
                      : 'border-rose-500/30 bg-rose-950/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        Q{idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {q.questionText}
                      </span>
                    </div>

                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Correct
                        </span>
                      ) : isSkipped ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Unanswered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 text-xs font-semibold">
                          <XCircle className="w-3.5 h-3.5" />
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Code snippet if any */}
                  {q.codeSnippet && (
                    <CodeBlock code={q.codeSnippet} language={quiz.category.toLowerCase()} />
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                    {q.options.map((opt, optIdx) => {
                      const letter = optionLetters[optIdx];
                      const isUserChoice = userAns === letter;
                      const isCorrectChoice = q.correctAnswer === letter;

                      let optStyle = 'bg-slate-900/60 border-slate-800 text-slate-300';
                      if (isCorrectChoice) {
                        optStyle = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 font-medium';
                      } else if (isUserChoice && !isCorrect) {
                        optStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border flex items-start gap-3 text-xs transition-colors ${optStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[11px] flex-shrink-0 ${
                            isCorrectChoice
                              ? 'bg-emerald-500 text-white'
                              : isUserChoice
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {letter}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation box */}
                  {q.explanation && (
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-300">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ================= ACTIVE QUIZ ARENA VIEW =================
  const currentLetter = answers[currentQuestion.id];
  const isFlagged = !!flagged[currentQuestion.id];
  const isLastQuestion = currentQuestionIdx === totalQuestions - 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header & Timer Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Quiz Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            to="/quizzes"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Exit Quiz"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight">
              {quiz.title}
            </h1>
            <p className="text-xs text-slate-400">
              Question {currentQuestionIdx + 1} of {totalQuestions} • {answeredCount} Answered
            </p>
          </div>
        </div>

        {/* Right Timer & Palette Trigger */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowJumpDrawer(!showJumpDrawer)}
            className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors sm:hidden"
          >
            {showJumpDrawer ? 'Hide Grid' : 'Question Grid'}
          </button>

          <Timer
            totalSeconds={quiz.timeLimit * 60}
            onTimeUp={handleTimeUp}
            isRunning={!isSubmitted}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-slate-700/50">
        <div
          className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentQuestionIdx + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Navigation Palette (Desktop & Toggled Mobile) */}
      <div className={`${showJumpDrawer ? 'block' : 'hidden sm:block'} glass-card rounded-2xl p-4 border border-slate-800`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Quick Navigation Palette
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Unanswered
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const hasAnswer = answers[q.id] !== undefined;
            const isQFlagged = flagged[q.id];
            const isCurrent = currentQuestionIdx === idx;

            let badgeStyle = 'bg-slate-800/80 text-slate-400 border-slate-700 hover:border-slate-500';
            if (isCurrent) {
              badgeStyle = 'ring-2 ring-brand-400 bg-brand-600 text-white font-bold';
            } else if (isQFlagged) {
              badgeStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold';
            } else if (hasAnswer) {
              badgeStyle = 'bg-brand-500/20 text-brand-300 border-brand-500/40 font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIdx(idx)}
                className={`w-9 h-9 rounded-xl border text-xs font-mono transition-all flex items-center justify-center relative ${badgeStyle}`}
              >
                <span>{idx + 1}</span>
                {isQFlagged && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
        {/* Question Header & Flag button */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
              QUESTION {currentQuestionIdx + 1} OF {totalQuestions}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white pt-2 leading-relaxed">
              {currentQuestion.questionText}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => toggleFlagQuestion(currentQuestion.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              isFlagged
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>

        {/* Code Snippet (if available) */}
        {currentQuestion.codeSnippet && (
          <CodeBlock code={currentQuestion.codeSnippet} language={quiz.category.toLowerCase()} />
        )}

        {/* Options List */}
        <div className="space-y-3 mt-6">
          {currentQuestion.options.map((option, optIdx) => {
            const letter = optionLetters[optIdx];
            const isSelected = currentLetter === letter;

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(letter)}
                className={`w-full p-4 rounded-xl border text-left flex items-start gap-3.5 transition-all duration-150 transform active:scale-[0.99] ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-500/20 to-indigo-500/20 border-brand-500 text-white shadow-lg shadow-brand-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                }`}>
                  {letter}
                </span>

                <div className="flex-1 text-sm pt-0.5 leading-relaxed">
                  {option}
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Keyboard hint */}
        <p className="text-[11px] text-slate-500 mt-4 text-center hidden sm:block">
          💡 Tip: Press keys <span className="font-mono text-slate-400 font-semibold">1-4</span> or <span className="font-mono text-slate-400 font-semibold">A-D</span> on your keyboard to select an option, and <span className="font-mono text-slate-400 font-semibold">Arrow Keys</span> to navigate.
        </p>

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIdx === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {isLastQuestion ? (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Assessment</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentQuestionIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-md shadow-brand-500/20"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ready to submit?</h3>
                <p className="text-xs text-slate-400">Please confirm your completion</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Total Questions:</span>
                <span className="font-bold text-white">{totalQuestions}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Questions Answered:</span>
                <span className="font-bold text-emerald-400">{answeredCount}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Questions Unanswered:</span>
                <span className="font-bold text-rose-400">{totalQuestions - answeredCount}</span>
              </div>
            </div>

            {totalQuestions - answeredCount > 0 && (
              <p className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                ⚠️ You have {totalQuestions - answeredCount} unanswered questions. They will count as 0 points.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Review Answers
              </button>
              <button
                type="button"
                onClick={submitQuiz}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
