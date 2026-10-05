import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export const CodeBlock = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl font-mono text-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-xs font-medium text-slate-400 pl-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-400" />
            snippet.{language === 'python' ? 'py' : language === 'sql' ? 'sql' : 'js'}
          </span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy code snippet"
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-md transition-all duration-150"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with line numbers */}
      <div className="p-4 overflow-x-auto bg-[#0a0f1d] text-slate-200">
        <pre className="table w-full">
          <code>
            {lines.map((line, idx) => (
              <span key={idx} className="table-row">
                <span className="table-cell select-none text-right pr-4 text-slate-600 text-xs w-8">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre text-slate-200 font-mono">
                  {line || ' '}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
