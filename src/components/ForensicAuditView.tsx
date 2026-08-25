/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ZombieFact, ContextBridge } from '../types';
import { Trash2, Link2, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle, Search } from 'lucide-react';

interface ForensicAuditViewProps {
  zombies: ZombieFact[];
  contextBridges: ContextBridge[];
  executiveSummary?: string;
}

export const ForensicAuditView: React.FC<ForensicAuditViewProps> = ({
  zombies,
  contextBridges,
  executiveSummary
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'zombies' | 'context'>('all');

  const filteredZombies = zombies.filter(z => 
    z.originalText.toLowerCase().includes(filterQuery.toLowerCase()) ||
    z.reason.toLowerCase().includes(filterQuery.toLowerCase()) ||
    z.replacementText.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredBridges = contextBridges.filter(b => 
    b.vaguePronoun.toLowerCase().includes(filterQuery.toLowerCase()) ||
    b.resolvedEntity.toLowerCase().includes(filterQuery.toLowerCase()) ||
    b.originalContext.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      {executiveSummary && (
        <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-400">
            <ShieldCheck size={16} />
            <h4 className="text-xs font-bold uppercase tracking-wider">Forensic Audit Assessment</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {executiveSummary}
          </p>
        </div>
      )}

      {/* Filter and Tab Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 self-start">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'all' 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Logs ({zombies.length + contextBridges.length})
          </button>
          <button
            onClick={() => setActiveSubTab('zombies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'zombies' 
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trash2 size={12} />
            Zombie Purges ({zombies.length})
          </button>
          <button
            onClick={() => setActiveSubTab('context')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'context' 
                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20' 
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Link2 size={12} />
            Context Bridges ({contextBridges.length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search diagnostic items..."
            className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Step 1: Zombie Purges */}
      {(activeSubTab === 'all' || activeSubTab === 'zombies') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Trash2 size={14} />
              Step 1: Zombie Facts Exterminated ({filteredZombies.length})
            </h4>
            <span className="text-[11px] text-slate-400">Zero tolerance for generic filler</span>
          </div>

          {filteredZombies.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">No matching zombie facts found.</p>
          ) : (
            <div className="space-y-2.5">
              {filteredZombies.map((zombie, idx) => (
                <div 
                  key={zombie.id || idx}
                  className="p-4 rounded-xl border bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {zombie.severity || 'high'} severity
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {zombie.reason}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* Before */}
                    <div className="p-2.5 rounded-lg bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/15">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
                        ✗ Purged Zombie Fact:
                      </span>
                      <p className="text-xs font-serif italic text-slate-700 dark:text-slate-300 line-through opacity-80">
                        "{zombie.originalText}"
                      </p>
                    </div>

                    {/* After */}
                    <div className="p-2.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                        ✓ Upgraded High-IG Replacement:
                      </span>
                      <p className="text-xs font-serif text-slate-800 dark:text-emerald-200 font-medium">
                        "{zombie.replacementText}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 2: Context-Debt Bridges */}
      {(activeSubTab === 'all' || activeSubTab === 'context') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Link2 size={14} />
              Step 2: Context-Debt Grounding Map ({filteredBridges.length})
            </h4>
            <span className="text-[11px] text-slate-400">Subject-Predicate-Object (SPO) Resolution</span>
          </div>

          {filteredBridges.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-2">No matching pronoun bridges found.</p>
          ) : (
            <div className="space-y-2.5">
              {filteredBridges.map((bridge, idx) => (
                <div 
                  key={bridge.id || idx}
                  className="p-4 rounded-xl border bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                        "{bridge.vaguePronoun}"
                      </span>
                      <ArrowRight size={13} className="text-slate-400" />
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-500/20">
                        {bridge.resolvedEntity}
                      </span>
                    </div>
                  </div>

                  {bridge.originalContext && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 italic">
                      Context: "{bridge.originalContext}"
                    </div>
                  )}

                  {/* SPO Breakdown if present */}
                  {bridge.spoBreakdown && (
                    <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                      <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Subject</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{bridge.spoBreakdown.subject || bridge.resolvedEntity}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Predicate</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{bridge.spoBreakdown.predicate || 'executes'}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/50">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Object</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{bridge.spoBreakdown.object || 'target system'}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
