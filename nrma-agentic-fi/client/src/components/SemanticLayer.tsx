/**
 * SemanticLayer.tsx
 * Design: Executive Command Centre — NRMA deep blue (#003087) on white
 * Fonts: Playfair Display (headings) / DM Sans (body)
 * Purpose: Compare Cube.dev vs BigQuery native semantic layer — active trial, May 2026
 * Rhombus AI removed — not in scope for current evaluation
 */

import { motion, type Transition } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Layers, Zap, Database, ArrowDown, ArrowRight, FlaskConical } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  }),
};

type Status = "yes" | "no" | "partial";

interface CompareRow {
  dimension: string;
  cube: { status: Status; note: string };
  native: { status: Status; note: string };
}

const compareRows: CompareRow[] = [
  {
    dimension: "Native MCP Server",
    cube: { status: "yes", note: "Remote HTTPS endpoint, OAuth 2.0 PKCE — connects directly to Claude Desktop and Perplexity" },
    native: { status: "partial", note: "Accessible via BigQuery API; Claude Desktop connected directly via Google MCP. No dedicated MCP endpoint for Perplexity yet." },
  },
  {
    dimension: "Governed Metric Definitions",
    cube: { status: "yes", note: "YAML/JS data model — one definition of revenue, occupancy, cost applied everywhere, version-controlled" },
    native: { status: "partial", note: "Looker-native LookML models provide some governance; ad-hoc queries bypass definitions" },
  },
  {
    dimension: "Row / Column-Level Security",
    cube: { status: "yes", note: "Built-in access policies — role, user, and tenant level" },
    native: { status: "partial", note: "BigQuery IAM and column-level security available but requires separate configuration per query path" },
  },
  {
    dimension: "Query Caching & Performance",
    cube: { status: "yes", note: "Cube Store pre-aggregations — sub-second responses on large BigQuery datasets" },
    native: { status: "no", note: "Queries run against BigQuery directly; slot consumption and latency depend on dataset size" },
  },
  {
    dimension: "AI Client Compatibility",
    cube: { status: "yes", note: "MCP endpoint compatible with both Claude Desktop and Perplexity Computer" },
    native: { status: "partial", note: "Claude Desktop validated ✓. Perplexity connectivity to BigQuery native layer not yet confirmed." },
  },
  {
    dimension: "Setup Complexity",
    cube: { status: "partial", note: "Requires data model build effort; YAML schema definition before queries work well" },
    native: { status: "yes", note: "Zero additional setup — Claude Desktop connects directly via Google's BigQuery MCP. Already working." },
  },
  {
    dimension: "Cost",
    cube: { status: "partial", note: "Free tier (dev only); MCP requires Premium+ plan — CCU-based pricing, contact sales" },
    native: { status: "yes", note: "No additional cost beyond existing BigQuery usage. Already included in Google Cloud spend." },
  },
  {
    dimension: "Open Source / Self-Hosted Option",
    cube: { status: "yes", note: "Cube Core is fully open source and self-hostable" },
    native: { status: "no", note: "Google Cloud managed service only; no self-hosted option" },
  },
];

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "yes") return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />;
  if (status === "no") return <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />;
  return <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />;
};

const archSteps = [
  {
    icon: Database,
    label: "Google BigQuery",
    sublabel: "Raw data lake",
    color: "bg-slate-100 border-slate-300 text-slate-700",
    iconColor: "text-slate-500",
  },
  {
    icon: FlaskConical,
    label: "Semantic Layer (Trial Decision)",
    sublabel: "Cube.dev vs BigQuery native — evaluating now",
    badge: "Trial Active",
    badgeColor: "bg-amber-100 text-amber-700",
    color: "bg-amber-50 border-amber-300 text-amber-800",
    iconColor: "text-amber-500",
  },
  {
    icon: Layers,
    label: "MCP Endpoint",
    sublabel: "Cube.dev MCP (trial) or BigQuery MCP (Claude validated)",
    badge: "Key Decision",
    badgeColor: "bg-blue-100 text-[#003087]",
    color: "bg-blue-50 border-[#003087]/30 text-[#003087]",
    iconColor: "text-[#003087]",
  },
  {
    icon: ArrowRight,
    label: "Claude Desktop + Perplexity Computer",
    sublabel: "Both AI clients validated on NetSuite MCP",
    badge: "Validated ✓",
    badgeColor: "bg-emerald-100 text-emerald-800",
    color: "bg-[#003087] border-[#003087] text-white",
    iconColor: "text-white",
  },
];

export default function SemanticLayer() {
  return (
    <section id="semantic-layer" className="py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#003087] bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-4">
            BigQuery Semantic Layer — Trial
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#003087] leading-tight mb-4">
            Cube.dev vs BigQuery Native
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Cube.dev trial is now active. Claude Desktop is already connected to BigQuery's inbuilt semantic layer. The key question: does the governance and MCP compatibility of Cube.dev justify the additional layer?
          </p>
          {/* Live status pill */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-800">Trial in progress — May 2026</span>
              <span className="text-sm text-emerald-700">Claude Desktop → BigQuery native ✓ &nbsp;|&nbsp; Cube.dev trial active</span>
            </div>
          </div>
        </motion.div>

        {/* Architecture Flow */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          <h3 className="text-center text-sm font-semibold tracking-widest uppercase text-slate-400 mb-8">
            Where the Decision Sits in the Stack
          </h3>
          <div className="flex flex-col items-center gap-0">
            {archSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center w-full max-w-lg">
                <div className={`w-full border-2 rounded-xl px-6 py-4 flex items-center gap-4 shadow-sm ${step.color}`}>
                  <step.icon className={`w-6 h-6 flex-shrink-0 ${step.iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-base">{step.label}</span>
                      {step.badge && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${step.badgeColor}`}>
                          {step.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-75 mt-0.5">{step.sublabel}</p>
                  </div>
                </div>
                {i < archSteps.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <ArrowDown className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-6 max-w-lg mx-auto">
            The semantic layer decision determines whether both AI clients can connect consistently, with governed metrics and security, or whether each client queries BigQuery independently.
          </p>
        </motion.div>

        {/* Role Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              name: "Cube.dev",
              role: "Governed Semantic Layer",
              tagline: "Centralised metric definitions + native MCP endpoint",
              description:
                "Cube defines business metrics once — revenue, occupancy rate, cost per unit — in a version-controlled data model, then exposes them via a native MCP endpoint. Both Claude Desktop and Perplexity can connect to the same governed definitions. Adds row-level security, caching, and pre-aggregations on top of BigQuery. Trial is currently active.",
              verdict: "Trial active — evaluating MCP compatibility and governance value",
              verdictColor: "bg-amber-50 text-amber-800 border-amber-200",
              headerColor: "bg-[#003087] text-white",
              pros: ["Native MCP server (Premium+)", "Governed metric definitions", "Row/column-level security", "Pre-aggregation caching", "Open source (Cube Core)", "Both AI clients can connect"],
              cons: ["MCP requires Premium plan (paid)", "Requires data model build effort", "CCU-based pricing — contact sales", "Additional layer to maintain"],
            },
            {
              name: "BigQuery Native Semantic",
              role: "Inbuilt Semantic Layer",
              tagline: "Claude Desktop already connected — zero additional setup",
              description:
                "BigQuery's inbuilt semantic layer (BI Engine / Looker-native LookML) is already working with Claude Desktop via Google's BigQuery MCP. No additional infrastructure, no additional cost. The trade-off is less formal metric governance and uncertainty around Perplexity connectivity — Claude Desktop is the validated client today.",
              verdict: "Claude Desktop validated ✓ — Perplexity connectivity TBC",
              verdictColor: "bg-blue-50 text-[#003087] border-blue-200",
              headerColor: "bg-slate-700 text-white",
              pros: ["Zero additional cost", "Already working with Claude Desktop", "No setup overhead", "No additional infrastructure", "Google-managed reliability"],
              cons: ["Less formal metric governance", "Perplexity connectivity not yet confirmed", "No query caching layer", "Ad-hoc queries bypass metric definitions"],
            },
          ].map((tool, i) => (
            <motion.div
              key={tool.name}
              className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 2}
            >
              <div className={`px-6 py-5 ${tool.headerColor}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold">{tool.name}</h3>
                    <p className="text-sm opacity-80 mt-0.5">{tool.role}</p>
                  </div>
                </div>
                <p className="text-sm mt-2 opacity-90 italic">{tool.tagline}</p>
              </div>
              <div className="px-6 py-5 bg-white">
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{tool.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Strengths</p>
                    <ul className="space-y-1.5">
                      {tool.pros.map((p) => (
                        <li key={p} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">Limitations</p>
                    <ul className="space-y-1.5">
                      {tool.cons.map((c) => (
                        <li key={c} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={`rounded-lg border px-4 py-2.5 text-xs font-semibold ${tool.verdictColor}`}>
                  {tool.verdict}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={4}
          className="mb-10"
        >
          <h3 className="font-display text-2xl font-bold text-[#003087] mb-6 text-center">
            Feature Comparison
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#003087] text-white">
                  <th className="text-left px-5 py-4 font-semibold w-1/3">Dimension</th>
                  <th className="text-left px-5 py-4 font-semibold w-1/3">Cube.dev (Trial)</th>
                  <th className="text-left px-5 py-4 font-semibold w-1/3">BigQuery Native Semantic</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.dimension}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-5 py-4 font-medium text-slate-800 align-top">{row.dimension}</td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-start gap-2">
                        <StatusIcon status={row.cube.status} />
                        <span className="text-slate-600 leading-snug">{row.cube.note}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-start gap-2">
                        <StatusIcon status={row.native.status} />
                        <span className="text-slate-600 leading-snug">{row.native.note}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-6 mt-4 justify-center text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Supported</span>
            <span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-400" /> Partial / Conditional</span>
            <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4 text-red-400" /> Not available</span>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={5}
          className="rounded-2xl bg-[#003087] text-white p-8 text-center"
        >
          <h3 className="font-display text-2xl font-bold mb-3">The Trial Decision</h3>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
            The semantic layer decision only affects the analytical channel. Real-time operational queries (invoice lookups, live GL, last 24h transactions) always route to NetSuite MCP regardless of which semantic layer wins. If Cube.dev confirms MCP compatibility and manageable governance overhead, it becomes the single analytical semantic layer for both AI clients. If BigQuery native proves sufficient, the simpler zero-cost path wins.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#foundation"
              className="inline-flex items-center gap-2 bg-white text-[#003087] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors"
            >
              View Foundation Setup
            </a>
            <a
              href="#use-cases"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
            >
              See What You Can Ask
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
