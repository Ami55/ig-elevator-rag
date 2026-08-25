/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Copy, 
  ExternalLink, 
  Send, 
  FileDown, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Bookmark,
  Share2,
  Code2,
  Database
} from 'lucide-react';
import { OptimizationResult } from '../types';

interface ActionStepsProps {
  result: OptimizationResult;
  onApplyPreset?: (text: string) => void;
}

export const ActionStepsView: React.FC<ActionStepsProps> = ({ result }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'step-review': true,
    'step-verify-core': false,
    'step-deploy-rag': false,
    'step-update-cms': false,
  });

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate vector metadata JSON payload
  const ragMetadataPayload = JSON.stringify({
    document_id: `rag-doc-${Date.now().toString(36)}`,
    core_entity: result.coreEntity,
    ig_score: result.metrics.elevatedIgScore,
    rag_readiness: `${result.metrics.ragReadiness}%`,
    atomic_sandwiches: result.atomicSandwiches.map((s, idx) => ({
      chunk_index: idx + 1,
      top_bun_fact: s.topBun.fact,
      high_ig_meat: s.meat.informationGain,
      bottom_bun_anchor: s.bottomBun.structuralAnchor,
      full_chunk: s.fullParagraph
    })),
    spo_entities: result.contextBridges.map(b => b.spoBreakdown)
  }, null, 2);

  const completionPercentage = Math.round(
    (Object.values(completedSteps).filter(Boolean).length / Object.keys(completedSteps).length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Decision Engine Summary Header */}
      <div className="p-5 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 via-slate-50 to-emerald-500/5 dark:from-indigo-950/30 dark:via-slate-900 dark:to-emerald-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <ShieldCheck size={13} /> Decision & Execution Engine
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              How & What We Decide: Action Plan for "{result.coreEntity}"
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
              Based on the diagnostic metrics (<strong>IG {result.metrics.elevatedIgScore.toFixed(1)}/10</strong>, <strong>{result.metrics.zombieCount} zombies purged</strong>, <strong>{result.metrics.contextDebtBridgesCount} context bridges resolved</strong>), follow these concrete action steps to deploy to vector databases or publishing CMS.
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block">Progress</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {completionPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Steps Checklist */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <CheckSquare size={15} className="text-emerald-500" />
          Recommended Deployment Steps
        </h4>

        {/* Step 1: Decision on Zombie Purging */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedSteps['step-review']
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleStep('step-review')}
              className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                completedSteps['step-review']
                  ? 'bg-emerald-500 text-white'
                  : 'border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              {completedSteps['step-review'] && <CheckCircle2 size={14} />}
            </button>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-xs font-bold text-slate-900 dark:text-white">
                  1. Approve Content Replacement (Decision: Purge {result.metrics.zombieCount} Low-Entropy Claims)
                </strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold">
                  Entropy Gain: +{(result.metrics.elevatedIgScore - result.metrics.initialIgScore).toFixed(1)} IG
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>What to do:</strong> Replace the {result.metrics.wordCountOriginal}-word raw draft with the {result.metrics.wordCountOptimized}-word high-gain copy. This removes generic statements and adds verifiable metrics.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleCopy(result.optimized, 'full-copy')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                >
                  <Copy size={12} />
                  {copiedSection === 'full-copy' ? 'Copied Markdown!' : 'Copy Elevated Content'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Decision on Core Entity Anchor */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedSteps['step-verify-core']
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleStep('step-verify-core')}
              className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                completedSteps['step-verify-core']
                  ? 'bg-emerald-500 text-white'
                  : 'border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              {completedSteps['step-verify-core'] && <CheckCircle2 size={14} />}
            </button>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-xs font-bold text-slate-900 dark:text-white">
                  2. Verify Subject-Predicate-Object (SPO) Grounding
                </strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold">
                  {result.metrics.contextDebtBridgesCount} Pronouns Grounded
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>What to do:</strong> Verify that ambiguous pronouns ("this", "it", "they") are replaced with explicit entities (e.g. <em>"{result.coreEntity}"</em>). This guarantees individual paragraph chunks remain self-contained in RAG vector search.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Action for Vector Embeddings (RAG Ingestion) */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedSteps['step-deploy-rag']
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleStep('step-deploy-rag')}
              className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                completedSteps['step-deploy-rag']
                  ? 'bg-emerald-500 text-white'
                  : 'border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              {completedSteps['step-deploy-rag'] && <CheckCircle2 size={14} />}
            </button>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Database size={13} className="text-indigo-500" />
                  3. Ingest into Vector Index / Knowledge Base (Pinecone, Chroma, pgvector)
                </strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                  RAG Readiness: {result.metrics.ragReadiness}%
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>What to do:</strong> Chunk the document by <strong>Atomic Sandwich paragraphs</strong> (1 chunk = 1 Atomic Sandwich). Embed chunks with full SPO metadata tags.
              </p>
              
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => handleCopy(ragMetadataPayload, 'rag-json')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 border border-indigo-500/20"
                >
                  <Code2 size={12} />
                  {copiedSection === 'rag-json' ? 'JSON Copied!' : 'Copy RAG Chunk Payload (JSON)'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Action for Web & Content Publishing */}
        <div className={`p-4 rounded-xl border transition-all ${
          completedSteps['step-update-cms']
            ? 'bg-emerald-500/5 border-emerald-500/30'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-start gap-3">
            <button
              onClick={() => toggleStep('step-update-cms')}
              className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                completedSteps['step-update-cms']
                  ? 'bg-emerald-500 text-white'
                  : 'border border-slate-300 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              {completedSteps['step-update-cms'] && <CheckCircle2 size={14} />}
            </button>
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between">
                <strong className="text-xs font-bold text-slate-900 dark:text-white">
                  4. Publish to CMS & Update LLM-Indexable Markup
                </strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  SGE Citation Ready
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>What to do:</strong> Update your blog, technical documentation, or knowledge base with the optimized markdown. Maintain the 3-layer paragraph anatomy so search crawlers can parse the Meat (expert causality) as direct answer cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
