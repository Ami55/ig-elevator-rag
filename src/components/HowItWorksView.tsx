/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Link2, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Database, 
  Zap, 
  Search, 
  FileText,
  ChevronRight,
  Play
} from 'lucide-react';

interface HowItWorksViewProps {
  onTryPreset?: (presetId: string) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onTryPreset }) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="p-6 rounded-3xl border border-indigo-500/25 bg-indigo-500/5 dark:bg-indigo-500/10">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider">
          <Play size={15} /> Practical Instructions
        </div>
        <h2 className="text-lg font-bold mt-2 text-slate-900 dark:text-white">How to use IG-Elevator</h2>
        <ol className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><strong>1. Add the draft:</strong> Paste one article section or a focused group of paragraphs into Raw Draft Input.</li>
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><strong>2. Set the entity:</strong> Enter the precise product, service, person, system, or topic the passage must remain anchored to.</li>
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><strong>3. Choose strictness:</strong> Start with Rigorous. Use Hyper only when the claims can be fact-checked carefully.</li>
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><strong>4. Run the protocol:</strong> Select Elevate to IG 9+ &amp; RAG-Ready and keep the page open until processing completes.</li>
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><strong>5. Review every change:</strong> Inspect Zombie Facts, Context Bridges, Atomic Sandwiches, the diff, and forensic audit before accepting copy.</li>
          <li className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"><strong>6. Verify and publish:</strong> Fact-check generated statistics and claims, then copy the final Markdown into your CMS or RAG pipeline.</li>
        </ol>
        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">Important: IG, RAG-readiness, entity-density, and ambiguity scores are diagnostic estimates—not measurements from Google, ChatGPT, or a vector database.</p>
      </section>
      {/* Hero Overview */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 shadow-sm">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-emerald-500/10 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Sparkles size={12} /> The Answer Economy Standard
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How IG-Elevator Re-architects Content for AI Search & RAG
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Modern search engines (SearchGPT, Perplexity, Google SGE) and vector-based RAG pipelines ignore generic SEO fluff. They require <strong>high Information Gain (IG 9+)</strong> and <strong>zero-ambiguity semantic entities</strong>. Here is the 3-step transformation protocol:
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveStep(1)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
              activeStep === 1
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300 shadow-sm ring-1 ring-rose-500/20'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${activeStep === 1 ? 'bg-rose-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <ShieldAlert size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">Step 01</span>
              <strong className="text-xs font-bold block">Purge the Zombies</strong>
              <span className="text-[11px] opacity-80 block mt-0.5">Eliminate low-entropy fluff</span>
            </div>
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
              activeStep === 2
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300 shadow-sm ring-1 ring-cyan-500/20'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${activeStep === 2 ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <Link2 size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">Step 02</span>
              <strong className="text-xs font-bold block">Bridge Context-Debt</strong>
              <span className="text-[11px] opacity-80 block mt-0.5">SPO pronoun grounding</span>
            </div>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
              activeStep === 3
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 shadow-sm ring-1 ring-amber-500/20'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <div className={`p-2 rounded-xl shrink-0 ${activeStep === 3 ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <Layers size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">Step 03</span>
              <strong className="text-xs font-bold block">Atomic Sandwiches</strong>
              <span className="text-[11px] opacity-80 block mt-0.5">3-layer paragraph anatomy</span>
            </div>
          </button>
        </div>
      </div>

      {/* Dynamic Interactive Step Details */}
      <div className="space-y-6">
        
        {/* Step 1 Interactive Display */}
        {activeStep === 1 && (
          <div className="p-6 rounded-3xl border border-rose-500/20 bg-rose-500/5 dark:bg-rose-500/10 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert size={15} />
                  <span>Protocol Step 1: Zombie Fact Extermination</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Why "Zombie Facts" Destroy AI Search Ranking
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  A <strong>Zombie Fact</strong> is a generic, ungrounded statement that repeats common knowledge without contributing novel entropy or indexable facts. In LLM answer engines, these lower your overall Information Gain (IG) score.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-600 dark:text-rose-300 font-mono">
                IG Impact: +3.0 to +4.5
              </span>
            </div>

            {/* Interactive Before & After Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bad Example */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-500/30 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <XCircle size={14} /> ✗ Zombie Fact (Generic Fluff)
                  </span>
                  <span className="text-[10px] font-mono opacity-70">IG Score: 2.1</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/5 dark:bg-rose-500/10 font-serif italic text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  "Artificial intelligence is changing modern medicine in many exciting ways. It helps clinicians detect diseases earlier than before."
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  <strong>Diagnostic:</strong> Zero verifiable parameters, zero latency data, pure platitude.
                </p>
              </div>

              {/* Upgraded High-IG Example */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> ✓ Upgraded Forensic Fact
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500">IG Score: 9.6</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 font-serif italic text-xs sm:text-sm text-slate-800 dark:text-emerald-200">
                  "Multimodal pathology vision transformers parse gigapixel biopsy whole-slides in 4.2 seconds, increasing stage-1 micro-metastasis detection sensitivity by 38%."
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                  <strong>Diagnostic:</strong> Verifiable empirical metric, clear modality, statistical delta.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Interactive Display */}
        {activeStep === 2 && (
          <div className="p-6 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/10 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Link2 size={15} />
                  <span>Protocol Step 2: Context-Debt Grounding</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  Solving the "Context Chunking Breakdown" in RAG
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  When vector databases chunk documents (250–500 tokens), vague pronouns like <em>"this"</em>, <em>"it"</em>, or <em>"they"</em> lose their antecedents. Grounding sentences into explicit <strong>Subject-Predicate-Object (SPO)</strong> entities makes every paragraph autonomously retrievable.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-mono">
                RAG Readiness: +40%
              </span>
            </div>

            {/* SPO Visualization Grid */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/20 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
                Pronoun Resolution Architecture
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="w-full sm:w-1/3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-500 block">Fuzzy Pronoun</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">"It empowers them..."</span>
                </div>

                <div className="text-slate-400 font-mono text-xs">──► [SPO Mapper] ──►</div>

                <div className="w-full sm:w-2/3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-[9px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block">Subject</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Kubernetes Cilium CNI</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <span className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block">Predicate</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">enforces eBPF security for</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Object</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">distributed microservices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 Interactive Display */}
        {activeStep === 3 && (
          <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Layers size={15} />
                  <span>Protocol Step 3: The Atomic Sandwich Structure</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  The Gold-Standard 3-Layer Paragraph Anatomy
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  Every paragraph synthesized by the engine adheres strictly to the <strong>Top Bun</strong>, <strong>Meat</strong>, and <strong>Bottom Bun</strong> formula. This guarantees dense readability for human experts and machine extractors alike.
                </p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 font-mono">
                Target: IG 9.2 - 9.8+
              </span>
            </div>

            {/* 3D Sandwich Layers Breakdown */}
            <div className="space-y-3">
              {/* Layer 1: Top Bun */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 flex items-start gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                  🍞 1
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      Top Bun: The Atomic Fact (The 'What')
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Layer 1</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    A distinct, standalone statement of empirical truth or technical premise that requires no prior context to understand.
                  </p>
                </div>
              </div>

              {/* Layer 2: Meat */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/30 flex items-start gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                  🥩 2
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Meat: Information Gain (The Expert 'So What')
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold">High Entropy / Core Value</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    The non-obvious causality, mathematical rigor, or clinical/engineering mechanism that generative AI engines cite as an authoritative source.
                  </p>
                </div>
              </div>

              {/* Layer 3: Bottom Bun */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/30 flex items-start gap-4 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                  🍞 3
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                      Bottom Bun: Structural Anchor (Connecting Entity)
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">RAG Hook</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Tethers the expert insight directly back to the target entity, workflow, or system without creating cross-chunk context-debt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RAG Engine Comparison Table */}
      <div className="p-6 rounded-3xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
          <Database size={16} className="text-indigo-500" />
          Conventional Content vs. IG-Elevated RAG Content
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono">
                <th className="pb-3 pr-4">Dimension</th>
                <th className="pb-3 px-4 text-rose-500">Legacy SEO Content</th>
                <th className="pb-3 pl-4 text-emerald-500">IG-Elevated Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 pr-4 font-bold">Information Gain (IG)</td>
                <td className="py-3 px-4 text-slate-500">Low (2.0 - 4.0), repeats web baseline</td>
                <td className="py-3 pl-4 font-semibold text-emerald-600 dark:text-emerald-400 font-mono">High (9.2 - 9.8+), novel mechanisms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">Pronoun Context-Debt</td>
                <td className="py-3 px-4 text-slate-500">High ("this", "it", "they" cause chunking drop)</td>
                <td className="py-3 pl-4 font-semibold text-emerald-600 dark:text-emerald-400">Zero (Explicit SPO entity resolution)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">Paragraph Structure</td>
                <td className="py-3 px-4 text-slate-500">Wandering narratives, generic intros</td>
                <td className="py-3 pl-4 font-semibold text-emerald-600 dark:text-emerald-400">Structured Atomic Sandwiches</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">AI Citation Likelihood</td>
                <td className="py-3 px-4 text-slate-500">Filtered out by LLM deduplication</td>
                <td className="py-3 pl-4 font-semibold text-emerald-600 dark:text-emerald-400">Primary citation candidate in SGE / Perplexity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Decision & Action Framework Section */}
      <div className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-4">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
          <Zap size={16} />
          <span>Decision & Action Framework: What You Do With The Output</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          How Decisions Are Made & Concrete Action Steps
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <strong className="text-xs font-bold text-slate-900 dark:text-white block">
              1. Decide on Claim Removal
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              The engine identifies low-entropy platitudes ("Zombie Facts"). <strong>Action:</strong> Accept replacement with empirical mechanisms and quantified deltas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <strong className="text-xs font-bold text-slate-900 dark:text-white block">
              2. Decide on Entity Anchoring
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Resolve ambiguous pronouns into explicit SPO triples. <strong>Action:</strong> Verify core entity naming across every standalone paragraph.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <strong className="text-xs font-bold text-slate-900 dark:text-white block">
              3. Deploy to Vector DB / CMS
            </strong>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Export chunks as individual vectors (1 chunk = 1 Atomic Sandwich) with SPO metadata, or publish directly as citation-ready articles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
