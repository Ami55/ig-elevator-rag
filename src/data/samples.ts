/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SamplePreset } from '../types';

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'ai-health',
    title: 'AI in Clinical Diagnostics',
    domain: 'Healthcare & AI',
    description: 'Contains heavy zombie facts ("AI is revolutionizing healthcare") and ambiguous pronouns ("this", "it").',
    initialEstimatedScore: 3.4,
    content: `Artificial intelligence is changing modern medicine in many exciting ways. It offers great potential for doctors and hospital systems. This is because computers can process a lot of data quickly.

It helps clinicians detect diseases earlier than before. They use it every day to look at patient records and scans. This leads to better outcomes and saves time. Furthermore, it is very important for reducing healthcare costs in the future.

Modern technology makes hospitals more efficient. They are adopting it rapidly across various departments. Because of this, patients will receive better care and doctors will make fewer mistakes.`
  },
  {
    id: 'cloud-devops',
    title: 'Kubernetes Multi-Cluster Orchestration',
    domain: 'Enterprise DevOps',
    description: 'Generic SaaS marketing fluff converted to definitive engineering blueprints.',
    initialEstimatedScore: 4.1,
    content: `Kubernetes is the leading container orchestration platform in the cloud today. It empowers enterprise teams to scale workloads seamlessly. This provides high availability and fault tolerance.

When managing multiple clusters, it can be quite complicated. Teams often struggle with it because they do not have unified network policies. This causes security vulnerabilities and makes troubleshooting hard.

Adopting automated service mesh architectures is essential. It connects microservices across different geographical cloud regions. Therefore, it ensures resilient distributed systems for global operations.`
  },
  {
    id: 'finance-macro',
    title: 'Quantitative Easing & Inflationary Pressure',
    domain: 'Macroeconomics',
    description: 'Vague economic claims rewritten into atomic mathematical & institutional realities.',
    initialEstimatedScore: 3.8,
    content: `Central banks use monetary policy tools to manage economic stability. They adjust interest rates when markets experience turbulence. This influences borrowing costs for businesses and consumers.

When they inject liquidity into the banking system, it increases money supply. It often leads to asset price appreciation. Many economists argue that this creates unintended inflationary pressures over time.

Financial institutions must monitor these shifts closely. It helps them hedge against bond yield volatility and currency depreciation. Because of this, capital preservation strategies become paramount during macro cycle transitions.`
  }
];
