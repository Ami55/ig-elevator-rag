/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, ShieldCheck, Sun, Moon, Cpu, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenGuide: () => void;
  activeView: 'optimizer' | 'howItWorks';
  setActiveView: (view: 'optimizer' | 'howItWorks') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  darkMode, 
  setDarkMode, 
  onOpenGuide,
  activeView,
  setActiveView 
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-[1.5px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-emerald-400">
              <Layers size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-slate-900 dark:text-white">
                IG<span className="text-emerald-500">.</span>ELEVATOR
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Sparkles size={10} /> RAG 9+ Target
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Forensic Content Engine for the Answer Economy
            </p>
          </div>
        </div>

        {/* Center / Navigation Views */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveView('optimizer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'optimizer'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu size={14} />
            <span>Optimizer</span>
          </button>
          <button
            onClick={() => setActiveView('howItWorks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeView === 'howItWorks'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen size={14} />
            <span>How It Works</span>
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all"
            title="View RAG & IG Protocol Guide"
          >
            <BookOpen size={14} className="text-indigo-500" />
            <span className="hidden sm:inline">Protocol Guide</span>
          </button>

          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
