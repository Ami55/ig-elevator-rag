/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AtomicSandwich {
  paragraphIndex: number;
  topBun: {
    fact: string;
    explanation: string;
  };
  meat: {
    informationGain: string;
    expertInsight: string;
    noveltyScore: number;
  };
  bottomBun: {
    structuralAnchor: string;
    coreEntityConnection: string;
  };
  fullParagraph: string;
}

export interface ZombieFact {
  id: string;
  originalText: string;
  reason: string;
  replacementText: string;
  severity: 'high' | 'medium' | 'critical';
}

export interface ContextBridge {
  id: string;
  vaguePronoun: string;
  originalContext: string;
  resolvedEntity: string;
  spoBreakdown: {
    subject: string;
    predicate: string;
    object: string;
  };
}

export interface OptimizationMetrics {
  initialIgScore: number;
  elevatedIgScore: number;
  ragReadiness: number; // 0 - 100%
  entityDensity: number; // e.g. 88%
  ambiguityReduction: number; // e.g. 94%
  zombieCount: number;
  contextDebtBridgesCount: number;
  atomicSandwichCount: number;
  wordCountOriginal: number;
  wordCountOptimized: number;
  readingTimeMin: number;
}

export interface OptimizationResult {
  original: string;
  optimized: string;
  coreEntity: string;
  metrics: OptimizationMetrics;
  zombiesPurged: ZombieFact[];
  contextBridges: ContextBridge[];
  atomicSandwiches: AtomicSandwich[];
  executiveSummary: string;
}

export interface SamplePreset {
  id: string;
  title: string;
  domain: string;
  description: string;
  initialEstimatedScore: number;
  content: string;
}
