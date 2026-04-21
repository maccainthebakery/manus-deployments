/**
 * SemanticLayer.tsx
 * Design: Executive Command Centre — NRMA deep blue (#003087) on white
 * Fonts: Playfair Display (headings) / DM Sans (body)
 * Purpose: Compare Cube.dev vs Rhombus AI as complementary layers in the BigQuery → Perplexity architecture
 */

import { motion, type Transition } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Layers, Zap, Database, ArrowDown, ArrowRight } from "lucide-react";

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
  rhombus: { status: Status; note: string };
}

const compareRows: CompareRow[] = [
  {
    dimension: "Native MCP Server",
    cube: { status: "yes", note: "Remote HTTPS endpoint, OAuth 2.0 PKCE — connects directly to Perplexity" },
    rhombus: { status: "no", note: "No MCP server documented; requires REST wrapper to reach Perplexity" },
  },
  {
    dimension: "BigQuery Integration",
    cube: { status: "yes", note: "First-class native connector, production-grade with pre-aggregations" },
    rhombus: { status: "yes", note: "Data connection available; AI-assisted pipeline building on BigQuery tables" },
  },
  {
    dimension: "Governed Metric Definitions",
    cube: { status: "yes", note: "YAML/JS data model — one definition of revenue, occupancy, cost applied everywhere" },
    rhombus: { status: "no", note: "No persistent metric definitions; each prompt re-derives logic from raw data" },
  },
  {
    dimension: "Row / Column-Level Security",
    cube: { status: "yes", note: "Built-in access policies — role, user, and tenant level" },
    rhombus: { status: "partial", note: "Project-level access only; fine-grained governance not documented" },
  },
  {
    dimension: "Query Caching & Performance",
    cube: { status: "yes", note: "Cube Store pre-aggregations — sub-second responses on large BigQuery datasets" },
    rhombus: { status: "no", note: "Queries run fresh each time; no caching layer" },
  },
  {
    dimension: "AI-Assisted Data Transformation",
    cube: { status: "partial", note: "Cube D3 AI agents assist with model building, not raw transformation" },
    rhombus: { status: "yes", note: "Core capability — Rhombo AI generates transformation pipelines from prompts" },
  },
  {
    dimension: "Open Source / Self-Hosted Option",
    cube: { status: "yes", note: "Cube Core is fully open source and self-hostable" },
    rhombus: { status: "no", note: "SaaS-only; no self-hosted option" },
  },
  {
    dimension: "Pricing Entry Point",
    cube: { status: "partial", note: "Free tier (dev only); MCP requires Premium+ (CCU-based, contact sales)" },
    rhombus: { status: "yes", note: "Free tier available; paid plans from $29/month — significantly lower entry cost" },
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
    icon: Zap,
    label: "Rhombus AI",
    sublabel: "AI-assisted transformation",
    badge: "Optional",
    badgeColor: "bg-amber-100 text-amber-700",
    color: "bg-amber-50 border-amber-300 text-amber-800",
    iconColor: "text-amber-500",
  },
  {
    icon: Layers,
    label: "Cube.dev",
    sublabel: "Semantic layer + MCP endpoint",
    badge: "Required",
    badgeColor: "bg-blue-100 text-[#003087]",
    color: "bg-blue-50 border-[#003087]/30 text-[#003087]",
    iconColor: "text-[#003087]",
  },
  {
    icon: ArrowRight,
    label: "Perplexity Computer",
    sublabel: "Agentic financial intelligence",
    badge: "Core",
    badgeColor: "bg-[#003087] text-white",
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
            BigQuery Semantic Layer
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#003087] leading-tight mb-4">
            Cube.dev vs Rhombus AI
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Two tools, two distinct roles. Understanding where each fits in the architecture is the key decision before connecting BigQuery to Perplexity Computer.
          </p>
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
            Where Each Tool Sits in the Stack
          </h3>
          <div className="flex flex-col items-center gap-0">
            {archSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center w-full max-w-md">
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
            Rhombus AI is <strong>optional</strong> — it accelerates data preparation. Cube.dev is <strong>required</strong> — it is the only tool with a native MCP endpoint for Perplexity.
          </p>
        </motion.div>

        {/* Role Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              name: "Cube.dev",
              role: "Semantic Layer",
              tagline: "The MCP bridge between BigQuery and Perplexity",
              description:
                "Cube defines business metrics once — revenue, occupancy rate, cost per unit — in a version-controlled data model, then exposes them via a native MCP endpoint. Perplexity connects directly, querying governed, consistent numbers rather than raw SQL. It also adds row-level security, caching, and pre-aggregations on top of BigQuery.",
              verdict: "Required for Perplexity MCP connectivity",
              verdictColor: "bg-blue-50 text-[#003087] border-blue-200",
              headerColor: "bg-[#003087] text-white",
              pros: ["Native MCP server (Premium+)", "Governed metric definitions", "Row/column-level security", "Pre-aggregation caching", "Open source (Cube Core)"],
              cons: ["MCP requires Premium plan (paid)", "Requires data model build effort", "CCU-based pricing — contact sales"],
            },
            {
              name: "Rhombus AI",
              role: "AI-Native Transformation",
              tagline: "AI-assisted pipeline building on raw BigQuery data",
              description:
                "Rhombus uses its Rhombo AI assistant to generate transformation pipelines, clean raw data, and produce analysis-ready datasets from natural language prompts. It is best positioned as a data engineering productivity tool — replacing manual dbt/SQL work — rather than as the governed semantic layer that Perplexity queries.",
              verdict: "Optional — strong fit for data preparation",
              verdictColor: "bg-amber-50 text-amber-800 border-amber-200",
              headerColor: "bg-amber-500 text-white",
              pros: ["AI-assisted pipeline building", "Low entry cost ($0–$99/mo)", "Natural language transformation", "Fast iteration on raw data"],
              cons: ["No MCP server", "No persistent metric governance", "No query caching layer", "Cannot connect directly to Perplexity"],
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
                  <th className="text-left px-5 py-4 font-semibold w-1/3">Cube.dev</th>
                  <th className="text-left px-5 py-4 font-semibold w-1/3">Rhombus AI</th>
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
                        <StatusIcon status={row.rhombus.status} />
                        <span className="text-slate-600 leading-snug">{row.rhombus.note}</span>
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
          <h3 className="font-display text-2xl font-bold mb-3">The Recommended Approach</h3>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed mb-6">
            Use <strong className="text-white">Cube.dev</strong> as the governed semantic layer and MCP endpoint for Perplexity Computer. Optionally layer in <strong className="text-white">Rhombus AI</strong> upstream to accelerate BigQuery data preparation and transformation — the two tools are complementary, not competing.
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
