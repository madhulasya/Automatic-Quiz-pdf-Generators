import React from 'react';
import { ShieldCheck, HardDrive, Terminal } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Terminal className="w-4 h-4 text-brand-600" />
            <span>DevQuiz Engine</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">Frontend-Only Architecture</span>
        </div>

        {/* Center offline / privacy status */}
        <div className="flex items-center gap-3 text-slate-500">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
            <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Offline & LocalStorage</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Client-Side PDF Generator</span>
          </div>
        </div>

        {/* Right copyright */}
        <div className="text-slate-400 text-center md:text-right">
          © {new Date().getFullYear()} DevQuiz. Built for technical assessments & certifications.
        </div>
      </div>
    </footer>
  );
};
