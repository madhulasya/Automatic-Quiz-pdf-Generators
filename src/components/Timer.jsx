import React, { useEffect, useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

export const Timer = ({ totalSeconds, onTimeUp, isRunning = true }) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isUrgent = timeLeft <= 60;
  const isWarning = timeLeft <= 180 && !isUrgent;
  const percentLeft = Math.max(0, (timeLeft / totalSeconds) * 100);

  return (
    <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 shadow-xs ${
      isUrgent
        ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
        : isWarning
        ? 'bg-amber-50 border-amber-300 text-amber-800'
        : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {isUrgent ? (
        <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
      ) : (
        <Clock className={`w-4 h-4 ${isWarning ? 'text-amber-600' : 'text-brand-600'}`} />
      )}

      <div className="flex flex-col">
        <span className="font-mono font-bold text-sm tracking-wider leading-none">
          {formattedTime}
        </span>
      </div>

      {/* Mini linear indicator */}
      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden ml-1 hidden sm:block border border-slate-200">
        <div
          className={`h-full transition-all duration-1000 rounded-full ${
            isUrgent ? 'bg-rose-600' : isWarning ? 'bg-amber-500' : 'bg-brand-600'
          }`}
          style={{ width: `${percentLeft}%` }}
        />
      </div>
    </div>
  );
};
