/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AtomicSandwich } from '../types';
import { Layers, Sparkles, Link2, Check, Copy, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface SandwichInspectorProps {
  sandwiches: AtomicSandwich[];
}

export const SandwichInspector: React.FC<SandwichInspectorProps> = ({ sandwiches }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(prev => prev === idx ? null : idx);
  };

  const copyParagraph = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!sandwiches || sandwiches.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-400">
        <Layers size={32} className="mx-auto mb-2 opacity-40" />
        <p className="text-sm font-medium">No Atomic Sandwiches constructed yet.</p>
        <p className="text-xs text-slate-500 mt-1">Run the forensic elevation engine to generate structured paragraphs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Informational Banner */}
      <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0">
          <Info size={16} />
        </div>
        <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <strong className="text-amber-600 dark:text-amber-400 font-semibold block mb-0.5">
            The Atomic Sandwich Architecture (Step 3)
          </strong>
          Each paragraph is partitioned into:
          <span className="font-mono text-amber-700 dark:text-amber-300 mx-1">Top Bun</span> (Atomic Fact),
          <span className="font-mono text-emerald-700 dark:text-emerald-300 mx-1">Meat</span> (Expert Information Gain), and
          <span className="font-mono text-cyan-700 dark:text-cyan-300 mx-1">Bottom Bun</span> (Structural Entity Anchor).
        </div>
      </div>

      {/* Sandwiches List */}
      <div className="space-y-4">
        {sandwiches.map((sandwich, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div 
              key={index}
              className="rounded-2xl border transition-all duration-200 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md"
            >
              {/* Header Bar */}
              <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center text-xs font-mono font-bold">
                    #{sandwich.paragraphIndex || index + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <span>Atomic Sandwich #{index + 1}</span>
                      {sandwich.meat?.noveltyScore && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-semibold border border-emerald-500/20 flex items-center gap-1">
                          <Sparkles size={10} /> IG Novelty {sandwich.meat.noveltyScore}/10
                        </span>
                      )}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => copyParagraph(sandwich.fullParagraph, index)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    title="Copy full paragraph"
                  >
                    {copiedIndex === index ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => toggleExpand(index)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                    title={isExpanded ? "Collapse Anatomy" : "Expand Anatomy"}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {/* Full Assembled Paragraph */}
              <div className="p-4 sm:p-5 text-sm sm:text-base font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-900/30">
                "{sandwich.fullParagraph}"
              </div>

              {/* Layer Anatomy Breakdown (Always visible or toggleable) */}
              <div className="p-4 sm:p-5 space-y-3">
                {/* 1. TOP BUN */}
                <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      🥪 Top Bun: The Atomic Fact (The 'What')
                    </span>
                    <span className="text-[10px] font-mono text-amber-700/70 dark:text-amber-300/70">
                      Verifiable Ground Truth
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
                    {sandwich.topBun?.fact || sandwich.fullParagraph.split('.')[0] + '.'}
                  </p>
                  {sandwich.topBun?.explanation && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                      ↳ {sandwich.topBun.explanation}
                    </p>
                  )}
                </div>

                {/* 2. MEAT */}
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      🥩 Meat: Information Gain (The Expert 'So What')
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700/70 dark:text-emerald-300/70">
                      High Entropy / Novel Value
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-emerald-100">
                    {sandwich.meat?.informationGain || sandwich.meat?.expertInsight || 'Expert insight delivering non-obvious causality and statistical/technical precision.'}
                  </p>
                  {sandwich.meat?.expertInsight && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                      ↳ <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Expert Angle:</strong> {sandwich.meat.expertInsight}
                    </p>
                  )}
                </div>

                {/* 3. BOTTOM BUN */}
                <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/10 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                      🍞 Bottom Bun: Structural Layer (Entity Anchor)
                    </span>
                    <span className="text-[10px] font-mono text-cyan-700/70 dark:text-cyan-300/70">
                      Zero-Ambiguity RAG Hook
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Link2 size={13} className="text-cyan-500 shrink-0" />
                    <span>{sandwich.bottomBun?.structuralAnchor || sandwich.bottomBun?.coreEntityConnection || 'Tethers context back to the core operational entity.'}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
