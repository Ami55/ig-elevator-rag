/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, ShieldAlert, Link2, Layers, CheckCircle2, Sparkles } from 'lucide-react';

interface ProtocolGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProtocolGuideModal: React.FC<ProtocolGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                The RAG-Ready & IG 9+ Blueprint
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Architecting content for the AI Answer Economy (SearchGPT, SGE, RAG engines)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          {/* Objective Overview */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <Sparkles size={18} className="text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">
                Objective: Elevate IG to 9+ for RAG-Readiness
              </h4>
              <p className="text-xs">
                In the AI Answer Economy, search models prioritize <strong>Information Gain (IG)</strong>—novel, expert insights that don't repeat common training data—while RAG retrievers demand self-contained semantic vectors with zero pronoun ambiguity.
              </p>
            </div>
          </div>

          {/* Step 1 */}
          <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert size={16} />
              <span>Step 1: Purge the Zombies</span>
            </div>
            <p className="text-xs">
              <strong>Zombie Facts</strong> are generic, low-entropy statements (e.g. <em>"AI is revolutionizing how we work"</em> or <em>"Security is vital for clouds"</em>). They inflate token counts without giving LLMs any unique indexable knowledge. Every zombie fact must be deleted or replaced with empirical, causal data.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/10 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Link2 size={16} />
              <span>Step 2: Bridge the Context-Debt</span>
            </div>
            <p className="text-xs">
              <strong>Context-Debt</strong> occurs when sentences rely on fuzzy pronouns (<em>this, it, they, these</em>) to borrow meaning from preceding sentences. Chunking algorithms in RAG pipelines break context when chunks are split. Resolving every pronoun into explicit <strong>Subject-Predicate-Object (SPO)</strong> entities makes every paragraph independently retrievable.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Layers size={16} />
              <span>Step 3: Execute the Atomic Sandwiches</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/30">
                <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">🥪 Top Bun (The 'What')</span>
                The Atomic Fact: A distinct, verifiable statement of truth.
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/30">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">🥩 Meat (The 'So What')</span>
                The Information Gain: High-novelty, expert-driven implication or mechanism.
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-500/30">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">🍞 Bottom Bun (Structure)</span>
                Structural Anchor: Connects causality directly to the primary operational entity.
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            Got It, Proceed
          </button>
        </div>
      </div>
    </div>
  );
};
