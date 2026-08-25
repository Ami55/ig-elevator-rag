/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OptimizationMetrics } from '../types';
import { ShieldAlert, Cpu, Sparkles, Zap, ArrowUpRight } from 'lucide-react';

interface ScoreGaugeProps {
  metrics: OptimizationMetrics;
  coreEntity?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ metrics, coreEntity }) => {
  const isHighScore = metrics.elevatedIgScore >= 9.0;
  const igDelta = metrics.elevatedIgScore - metrics.initialIgScore;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
      {/* 1. IG Score Card */}
      <div className="p-4 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-emerald-500/40">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
              <Sparkles size={13} className="text-emerald-500 shrink-0" />
              Information Gain
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
              +{igDelta > 0 ? igDelta.toFixed(1) : '0.0'} IG
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
              {metrics.elevatedIgScore.toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-slate-400">/ 10.0</span>
            {isHighScore && (
              <span className="ml-auto text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                Target 9+ Met
              </span>
            )}
          </div>
        </div>

        <div className="pt-2">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, (metrics.elevatedIgScore / 10) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 block font-medium">
            Baseline: {metrics.initialIgScore.toFixed(1)} → Elevated
          </span>
        </div>
      </div>

      {/* 2. RAG Readiness Card */}
      <div className="p-4 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-cyan-500/40">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
              <Cpu size={13} className="text-cyan-500 shrink-0" />
              RAG Readiness
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shrink-0">
              Vector Ready
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-slate-900 dark:text-white">
              {metrics.ragReadiness}%
            </span>
            <span className="text-xs font-semibold text-slate-400">Grounding</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-cyan-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${metrics.ragReadiness}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 block font-medium">
            Autonomous chunk retrieval
          </span>
        </div>
      </div>

      {/* 3. Zombies Purged Card (Step 1) */}
      <div className="p-4 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-rose-500/40">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
              <ShieldAlert size={13} className="text-rose-500 shrink-0" />
              Zombie Purge
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 shrink-0">
              Step 01
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-rose-600 dark:text-rose-400">
              {metrics.zombieCount}
            </span>
            <span className="text-xs font-semibold text-slate-400">Claims Purged</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-rose-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: '100%' }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 block font-medium">
            Zero low-entropy fluff remaining
          </span>
        </div>
      </div>

      {/* 4. Atomic Sandwiches Card (Step 2 & 3) */}
      <div className="p-4 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-amber-500/40">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
              <Zap size={13} className="text-amber-500 shrink-0" />
              Atomic Units
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
              {metrics.contextDebtBridgesCount} SPO Bridges
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-amber-600 dark:text-amber-400">
              {metrics.atomicSandwichCount}
            </span>
            <span className="text-xs font-semibold text-slate-400">Sandwiches</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, metrics.atomicSandwichCount * 33.3)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 block font-medium truncate">
            Entity: {coreEntity || 'Explicit Entity'}
          </span>
        </div>
      </div>
    </div>
  );
};
