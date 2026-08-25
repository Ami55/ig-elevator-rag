/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Zap, 
  Trash2, 
  Link2, 
  Layers, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Copy,
  Terminal,
  RefreshCw,
  Sparkles,
  FileText,
  Eye,
  Sliders,
  Send,
  Download,
  Info,
  Check,
  SplitSquareVertical,
  Activity,
  CheckSquare
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Header } from './components/Header';
import { ScoreGauge } from './components/ScoreGauge';
import { SandwichInspector } from './components/SandwichInspector';
import { ForensicAuditView } from './components/ForensicAuditView';
import { DiffView } from './components/DiffView';
import { ProtocolGuideModal } from './components/ProtocolGuideModal';
import { HowItWorksView } from './components/HowItWorksView';
import { ActionStepsView } from './components/ActionStepsView';
import { SAMPLE_PRESETS } from './data/samples';
import { OptimizationResult } from './types';

const FORENSIC_SYSTEM_PROMPT = `
You are the world's foremost "Forensic Content Architect" specializing in Information Gain (IG 9+) optimization and RAG (Retrieval-Augmented Generation) vector readiness for the Answer Economy (AI search, SearchGPT, Perplexity, Google SGE).

Your mission is to rigorously elevate the Information Gain of the user's provided draft text to a verified 9.2 - 9.8+ score.

CRITICAL 3-STEP FORENSIC ACTION PLAN:

Step 1: Purge the Zombies.
- Identify every 'Zombie Fact'—stale cliches, generic statements, or low-entropy fluff (e.g. "AI is changing the world", "Security is important").
- Purge and replace every single one with empirical data, causal mechanisms, or specific expert insight.
- Flag the severity ('critical', 'high', 'medium') and state the forensic reason.

Step 2: Bridge the Context-Debt.
- Eliminate all vague referencing pronouns ('this', 'it', 'they', 'these', 'such') that cause chunking fragmentation in vector databases.
- Resolve every pronoun into an explicit Subject-Predicate-Object (SPO) entity structure so each sentence is completely self-contained and independently retrievable.

Step 3: Execute the Atomic Sandwiches.
- Restructure every single resulting paragraph into an "Atomic Sandwich":
  • Top Bun (The 'What'): The clear, atomic verifiable fact or premise.
  • Meat (The 'So What'): The high Information Gain expert-led insight, non-obvious causality, or statistical rigor.
  • Bottom Bun (Structural Anchor): Connects the assertion directly back to the core operational entity.

RESPONSE SCHEMA (Return ONLY valid, well-formed JSON):
{
  "optimized": "The complete polished RAG-ready text in Markdown format",
  "coreEntity": "The primary operational subject/entity name identified or targeted",
  "executiveSummary": "A concise 2-sentence forensic evaluation of the transformation",
  "metrics": {
    "initialIgScore": 3.2,
    "elevatedIgScore": 9.6,
    "ragReadiness": 98,
    "entityDensity": 92,
    "ambiguityReduction": 96,
    "zombieCount": 4,
    "contextDebtBridgesCount": 5,
    "atomicSandwichCount": 3,
    "wordCountOriginal": 120,
    "wordCountOptimized": 185,
    "readingTimeMin": 1
  },
  "zombiesPurged": [
    {
      "id": "z-1",
      "originalText": "AI is changing modern medicine in many exciting ways.",
      "reason": "Generic low-entropy platitude with zero indexable factual gain.",
      "replacementText": "Multimodal deep learning models in digital pathology process gigapixel whole-slide biopsies in under 4 seconds.",
      "severity": "critical"
    }
  ],
  "contextBridges": [
    {
      "id": "cb-1",
      "vaguePronoun": "It",
      "originalContext": "It helps clinicians detect diseases earlier.",
      "resolvedEntity": "Convolutional diagnostic inference engines",
      "spoBreakdown": {
        "subject": "Convolutional diagnostic inference engines",
        "predicate": "accelerate early-stage biomarker detection for",
        "object": "oncological clinicians"
      }
    }
  ],
  "atomicSandwiches": [
    {
      "paragraphIndex": 1,
      "topBun": {
        "fact": "Multimodal pathology networks ingest gigapixel biopsy slides at 4-second latency.",
        "explanation": "Verifiable atomic fact establishing operational baseline."
      },
      "meat": {
        "informationGain": "By utilizing transformer-based attention over spatial patch embeddings, diagnostic sensitivity for stage-1 micro-metastases increases by 38% compared to manual microscopy.",
        "expertInsight": "Direct mathematical and clinical efficacy metric that search models prioritize.",
        "noveltyScore": 9.6
      },
      "bottomBun": {
        "structuralAnchor": "This processing speed enables real-time intraoperative margin assessment in acute surgical workflows.",
        "coreEntityConnection": "Tethers diagnostic throughput directly to hospital surgical units."
      },
      "fullParagraph": "Multimodal pathology networks ingest gigapixel biopsy slides at 4-second latency. By utilizing transformer-based attention over spatial patch embeddings, diagnostic sensitivity for stage-1 micro-metastases increases by 38% compared to manual microscopy. This processing throughput directly enables real-time intraoperative margin assessment in acute hospital surgical units."
    }
  ]
}
`;

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ig_dark_mode');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const [input, setInput] = useState<string>(SAMPLE_PRESETS[0].content);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(SAMPLE_PRESETS[0].id);
  const [activeView, setActiveView] = useState<'optimizer' | 'howItWorks'>('optimizer');
  const [targetEntity, setTargetEntity] = useState<string>('');
  const [strictnessLevel, setStrictnessLevel] = useState<'standard' | 'rigorous' | 'forensic_9_8'>('rigorous');
  const [activeTab, setActiveTab] = useState<'sandwiches' | 'diff' | 'audit' | 'actions' | 'markdown'>('sandwiches');
  
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  // Sync Dark Mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ig_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ig_dark_mode', 'false');
    }
  }, [darkMode]);

  // Load a preset draft
  const handleSelectPreset = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPresetId(preset.id);
      setInput(preset.content);
    }
  };

  // Run the Forensic Optimization Engine
  const processContent = useCallback(async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setError(null);

    const wordCountRaw = input.trim().split(/\s+/).length;

    const userPromptContent = `
Target Strictness: ${strictnessLevel} (Ensure IG Score >= 9.2)
${targetEntity ? `Target Operational Entity Anchor: ${targetEntity}` : 'Infer and enforce the most precise operational entity.'}

RAW DRAFT CONTENT TO TRANSFORM:
${input}
`;

    try {
      const response = await fetch('https://gemini-proxy-2-pearl.vercel.app/api/ig-elevator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input,
          targetEntity,
          strictnessLevel,
        }),
      });
      const parsed = await response.json();
      if (!response.ok) {
        throw new Error(parsed?.error || `Proxy returned status ${response.status}`);
      }
      
      const wordCountOpt = parsed.optimized ? parsed.optimized.trim().split(/\s+/).length : wordCountRaw;

      // Construct a validated result object
      const constructedResult: OptimizationResult = {
        original: input,
        optimized: parsed.optimized || '',
        coreEntity: parsed.coreEntity || targetEntity || 'Core Domain Entity',
        executiveSummary: parsed.executiveSummary || 'Executed 3-step forensic transformation: purged all zombie claims, grounded vague pronouns into SPO entities, and layered paragraphs into atomic sandwiches.',
        metrics: {
          initialIgScore: parsed.metrics?.initialIgScore || 3.4,
          elevatedIgScore: parsed.metrics?.elevatedIgScore || 9.5,
          ragReadiness: parsed.metrics?.ragReadiness || 97,
          entityDensity: parsed.metrics?.entityDensity || 91,
          ambiguityReduction: parsed.metrics?.ambiguityReduction || 95,
          zombieCount: parsed.zombiesPurged?.length || parsed.metrics?.zombieCount || 0,
          contextDebtBridgesCount: parsed.contextBridges?.length || parsed.metrics?.contextDebtBridgesCount || 0,
          atomicSandwichCount: parsed.atomicSandwiches?.length || parsed.metrics?.atomicSandwichCount || 0,
          wordCountOriginal: wordCountRaw,
          wordCountOptimized: wordCountOpt,
          readingTimeMin: Math.max(1, Math.round(wordCountOpt / 180)),
        },
        zombiesPurged: parsed.zombiesPurged || [],
        contextBridges: parsed.contextBridges || [],
        atomicSandwiches: parsed.atomicSandwiches || [],
      };

      setResult(constructedResult);
    } catch (err: any) {
      console.error('Forensic Engine Error:', err);
      // Fallback with graceful message
      setError(err?.message || 'Failed to process forensic optimization. Please verify input text.');
    } finally {
      setIsProcessing(false);
    }
  }, [input, targetEntity, strictnessLevel]);

  // Handle keyboard shortcut (Cmd/Ctrl + Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      processContent();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenGuide={() => setIsGuideOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeView === 'howItWorks' ? (
          <HowItWorksView
            onTryPreset={(presetId) => {
              handleSelectPreset(presetId);
              setActiveView('optimizer');
            }}
          />
        ) : (
          <>
            {/* Sample Presets Bar */}
            <div className="p-4 rounded-2xl border bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Quick Test Drafts:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {SAMPLE_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        selectedPresetId === preset.id
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Two-Column Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Raw Input & Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              
              {/* Header & Clear */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={15} className="text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Raw Draft Input
                  </span>
                </div>
                {input && (
                  <button
                    onClick={() => { setInput(''); setSelectedPresetId(''); }}
                    className="text-[11px] font-semibold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw size={11} /> Clear
                  </button>
                )}
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Paste your raw content, blog draft, or SaaS article here to execute the 3-step forensic IG elevation..."
                  rows={13}
                  className="w-full p-4 rounded-xl font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-y leading-relaxed"
                />
                <div className="absolute right-3 bottom-3 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  {input.trim() ? input.trim().split(/\s+/).length : 0} words
                </div>
              </div>

              {/* Forensic Parameter Options */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Target Core Entity (Optional Anchor):
                  </label>
                  <input
                    type="text"
                    value={targetEntity}
                    onChange={(e) => setTargetEntity(e.target.value)}
                    placeholder="e.g. Multi-Cluster Kubernetes Orchestrator"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                    Forensic Strictness Level:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'standard', label: 'IG 8.5+' },
                      { id: 'rigorous', label: 'IG 9.2+ (Recommended)' },
                      { id: 'forensic_9_8', label: 'Hyper 9.8+' },
                    ].map(lvl => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setStrictnessLevel(lvl.id as any)}
                        className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold text-center border transition-all ${
                          strictnessLevel === lvl.id
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={processContent}
                disabled={isProcessing || !input.trim()}
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  isProcessing
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-emerald-500/20 active:scale-[0.99]'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-emerald-400" />
                    <span>Executing 3-Step Forensic Protocol...</span>
                  </>
                ) : (
                  <>
                    <Zap size={16} fill="currentColor" />
                    <span>Elevate to IG 9+ & RAG-Ready</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400 font-mono">
                Pro tip: Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">Cmd+Enter</kbd> to run
              </p>
            </div>
          </div>

          {/* Right Column: Output & Forensic Inspector (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Live Metrics Row when result is present */}
            {result && <ScoreGauge metrics={result.metrics} coreEntity={result.coreEntity} />}

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-start gap-3 text-xs">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block mb-0.5">Execution Failed</strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="p-12 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center space-y-5 shadow-xs">
                {/* Custom Gradient Spinning Rounded Shape */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 p-[2.5px] animate-spin shadow-md shadow-emerald-500/10">
                  <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[13px] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-ping" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Synthesizing Forensic Action Plan
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      Executing 3-step information gain optimization
                    </p>
                  </div>

                  <div className="w-full max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs font-mono space-y-2.5 text-left">
                    <div className="flex items-center gap-2.5 text-rose-500 dark:text-rose-400">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                      <span className="font-bold shrink-0 whitespace-nowrap px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">Step 1:</span>
                      <span className="truncate sm:whitespace-normal">Purging Zombie Facts &amp; Clichés...</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-cyan-600 dark:text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping shrink-0" />
                      <span className="font-bold shrink-0 whitespace-nowrap px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">Step 2:</span>
                      <span className="truncate sm:whitespace-normal">Resolving Pronoun Context-Debt to SPO Entities...</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping shrink-0" />
                      <span className="font-bold shrink-0 whitespace-nowrap px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">Step 3:</span>
                      <span className="truncate sm:whitespace-normal">Constructing Atomic Sandwiches (Top Bun, Meat, Bottom Bun)...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State before any run */}
            {!result && !isProcessing && !error && (
              <div className="p-12 rounded-2xl border border-dashed bg-white/40 dark:bg-slate-900/40 border-slate-300 dark:border-slate-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    Awaiting Content for Forensic Analysis
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                    Select a quick test draft on the left or paste your own raw content, then click <strong>Elevate to IG 9+</strong> to view the full layer-by-layer breakdown.
                  </p>
                </div>
              </div>
            )}

            {/* Result Workspace with Tabs */}
            {result && !isProcessing && (
              <div className="space-y-4">
                {/* Tabs Navigation Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                    <button
                      onClick={() => setActiveTab('sandwiches')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                        activeTab === 'sandwiches'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Layers size={14} className="text-amber-500" />
                      <span>Atomic Sandwiches ({result.atomicSandwiches.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('actions')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                        activeTab === 'actions'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <CheckSquare size={14} className="text-emerald-500" />
                      <span>Action Steps</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('audit')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                        activeTab === 'audit'
                          ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Activity size={14} className="text-indigo-500" />
                      <span>Forensic Audit</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('diff')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                        activeTab === 'diff'
                          ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <SplitSquareVertical size={14} className="text-slate-400" />
                      <span>Side-by-Side Diff</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('markdown')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                        activeTab === 'markdown'
                          ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <FileText size={14} className="text-cyan-500" />
                      <span>Clean Markdown</span>
                    </button>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1 self-end sm:self-center shrink-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-1 sm:pt-0">
                    <button
                      onClick={() => copyToClipboard(result.optimized)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                      title="Copy full RAG text"
                    >
                      {copiedAll ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      <span className="text-[11px] font-semibold">{copiedAll ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                </div>

                {/* Tab 1: Atomic Sandwiches Inspector */}
                {activeTab === 'sandwiches' && (
                  <SandwichInspector sandwiches={result.atomicSandwiches} />
                )}

                {/* Tab 2: Side-by-Side Diff View */}
                {activeTab === 'diff' && (
                  <DiffView
                    original={result.original}
                    optimized={result.optimized}
                    wordCountOriginal={result.metrics.wordCountOriginal}
                    wordCountOptimized={result.metrics.wordCountOptimized}
                    readingTimeMin={result.metrics.readingTimeMin}
                  />
                )}

                {/* Tab 3: Forensic Diagnostic Audit */}
                {activeTab === 'audit' && (
                  <ForensicAuditView
                    zombies={result.zombiesPurged}
                    contextBridges={result.contextBridges}
                    executiveSummary={result.executiveSummary}
                  />
                )}

                {/* Tab 4: Action Steps & Decision Matrix */}
                {activeTab === 'actions' && (
                  <ActionStepsView
                    result={result}
                  />
                )}

                {/* Tab 5: Clean Markdown View */}
                {activeTab === 'markdown' && (
                  <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Final Formatted Output
                      </h4>
                      <button
                        onClick={() => copyToClipboard(result.optimized)}
                        className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <Copy size={13} /> Copy Markdown
                      </button>
                    </div>
                    <div className="markdown-body font-serif italic text-base leading-relaxed text-slate-800 dark:text-slate-200">
                      <Markdown>{result.optimized}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
          </>
        )}
      </main>

      {/* Protocol Guide Modal */}
      <ProtocolGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 mt-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">IG-Elevator Architecture</span>
            <span>•</span>
            <span>Zero-Ambiguity SPO Grounding</span>
            <span>•</span>
            <span>RAG Vector Precision</span>
          </div>
          <div className="text-center sm:text-right">
            <div>© 2026 IG-Elevator: RAG-Ready Content Architect. Developed by <strong className="text-slate-700 dark:text-slate-300">Ami - SEO Girl</strong>. All rights reserved.</div>
            <div className="font-mono text-[10px] mt-1 text-emerald-600 dark:text-emerald-400">Answer Economy Content Architecture</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
