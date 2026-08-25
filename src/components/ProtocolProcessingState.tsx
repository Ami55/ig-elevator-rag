/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Link2, Layers, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface ProtocolProcessingStateProps {
  coreEntity?: string;
}

export const ProtocolProcessingState: React.FC<ProtocolProcessingStateProps> = ({ coreEntity }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Cycle through active steps to provide dynamic visual feedback
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < 2 ? prev + 1 : 0));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Purging Zombie Facts & Clichés',
      subtitle: 'Exterminating low-entropy fluff & ungrounded platitudes',
      icon: ShieldAlert,
      color: 'rose',
      bgClass: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300',
      badgeClass: 'bg-rose-500 text-white',
      accentColor: 'text-rose-500',
      tag: 'Step 01: Purge'
    },
    {
      id: 2,
      title: 'Resolving Pronoun Context-Debt',
      subtitle: 'Mapping fuzzy pronouns into explicit Subject-Predicate-Object triples',
      icon: Link2,
      color: 'cyan',
      bgClass: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300',
      badgeClass: 'bg-cyan-500 text-white',
      accentColor: 'text-cyan-500',
      tag: 'Step 02: SPO Ground'
    },
    {
      id: 3,
      title: 'Constructing Atomic Sandwiches',
      subtitle: 'Synthesizing Top Bun (Fact), Meat (IG Gain), and Bottom Bun (Anchor)',
      icon: Layers,
      color: 'amber',
      bgClass: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300',
      badgeClass: 'bg-amber-500 text-white',
      accentColor: 'text-amber-500',
      tag: 'Step 03: 3-Layer RAG'
    }
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
      {/* Header with main animated spinner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Loader2 size={20} className="animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                Protocol Active
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Synthesizing High-IG Document Structure
            </h3>
          </div>
        </div>

        {coreEntity && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Sparkles size={12} className="text-indigo-500" />
            <span>Target: <strong>{coreEntity}</strong></span>
          </div>
        )}
      </div>

      {/* 3 Step Pipeline Visual Cards */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = currentStepIndex === idx;
          const isDone = currentStepIndex > idx;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                isActive
                  ? `${step.bgClass} shadow-xs ring-1 ring-black/5 dark:ring-white/5`
                  : isDone
                  ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              {/* Step Icon Badge */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? step.badgeClass
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </div>

              {/* Step Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{step.title}</span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 animate-pulse">
                        Processing...
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-mono uppercase font-semibold text-slate-400 dark:text-slate-500 shrink-0">
                    {step.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {step.subtitle}
                </p>

                {/* Animated active progress track */}
                {isActive && (
                  <div className="mt-2.5 w-full bg-black/5 dark:bg-white/10 rounded-full h-1 overflow-hidden">
                    <div className="bg-current h-full rounded-full w-2/3 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Micro Status Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-2 px-1">
        <span>Target Information Gain: <strong>9.2 - 9.8+ IG</strong></span>
        <span>Output: <strong>Atomic Sandwich Chunks</strong></span>
      </div>
    </div>
  );
};
