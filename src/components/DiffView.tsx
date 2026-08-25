/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Copy, Check, Sparkles, FileText, ArrowRight, Download, Share2 } from 'lucide-react';

interface DiffViewProps {
  original: string;
  optimized: string;
  wordCountOriginal: number;
  wordCountOptimized: number;
  readingTimeMin: number;
}

export const DiffView: React.FC<DiffViewProps> = ({
  original,
  optimized,
  wordCountOriginal,
  wordCountOptimized,
  readingTimeMin
}) => {
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedOpt, setCopiedOpt] = useState(false);

  const handleCopy = (text: string, type: 'raw' | 'opt') => {
    navigator.clipboard.writeText(text);
    if (type === 'raw') {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } else {
      setCopiedOpt(true);
      setTimeout(() => setCopiedOpt(false), 2000);
    }
  };

  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([optimized], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'rag-elevated-content.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      {/* Quick stats bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <div>
            Original Words: <strong className="text-slate-900 dark:text-white font-mono">{wordCountOriginal}</strong>
          </div>
          <div>→</div>
          <div>
            Optimized Words: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{wordCountOptimized}</strong>
          </div>
          <div className="hidden sm:block">|</div>
          <div className="hidden sm:block">
            Est. Reading Time: <strong className="text-slate-900 dark:text-white font-mono">~{readingTimeMin || 1} min</strong>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all"
            title="Download formatted Markdown"
          >
            <Download size={13} />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Side-by-side panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Original Raw Draft */}
        <div className="rounded-2xl border bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Raw Input (Pre-Forensic)
              </h4>
            </div>
            <button
              onClick={() => handleCopy(original, 'raw')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title="Copy Raw Text"
            >
              {copiedRaw ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
          <div className="p-5 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto max-h-[550px]">
            {original}
          </div>
        </div>

        {/* Right: Elevated High-IG Result */}
        <div className="rounded-2xl border bg-white dark:bg-slate-900/90 border-emerald-500/30 dark:border-emerald-500/30 overflow-hidden flex flex-col shadow-lg shadow-emerald-500/5">
          <div className="p-3.5 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles size={13} />
                RAG-Ready Elevated Output (IG 9+)
              </h4>
            </div>
            <button
              onClick={() => handleCopy(optimized, 'opt')}
              className="p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
              title="Copy Elevated Markdown"
            >
              {copiedOpt ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
          <div className="p-5 sm:p-6 markdown-body text-slate-800 dark:text-slate-200 font-serif italic text-sm sm:text-base leading-relaxed flex-1 overflow-y-auto max-h-[550px]">
            <Markdown>{optimized}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};
