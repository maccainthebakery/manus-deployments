/* ============================================================
   Semantic Layer Section — NRMA AI | Automation Team
   Design: NRMA navy/blue palette, Playfair Display headings
   Two semantic layers: Data (BigQuery/Cube.dev) + Workflow (n8n)
   ============================================================ */
import { useState, useRef, useEffect } from "react";
import { CheckCircle2, AlertCircle, XCircle, Database, Workflow, ArrowRight } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

type Status = "yes" | "partial" | "no";

function StatusIcon({ status }: { status: Status }) {
  if (status === "yes") return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
  if (status === "partial") return <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />;
  return <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />;
}

const dataCompareRows: { dimension: string; cube: { status: Status; note: string }; native: { status: Status; note: string } }[] = [
  { dimension: "MCP Endpoint", cube: { status: "yes", note: "Native MCP server built-in (Premium+)" }, native: { status: "partial", note: "Via Google BigQuery MCP — Claude Desktop validated ✓" } },
  { dimension: "Multi-Warehouse Support", cube: { status: "yes", note: "BigQuery, Snowflake, Redshift, Postgres" }, native: { status: "partial", note: "Optimised for BigQuery; others via federation" } },
  { dimension: "Governed Metric Definitions", cube: { status: "yes", note: "YAML data model — one definition of revenue, occupancy, cost" }, native: { status: "partial", note: "Looker LookML provides governance; ad-hoc queries can bypass" } },
  { dimension: "Row / Column-Level Security", cube: { status: "yes", note: "Built-in access policies — role, user, and tenant level" }, native: { status: "partial", note: "BigQuery IAM available but requires separate config per query path" } },
  { dimension: "Query Caching & Performance", cube: { status: "yes", note: "Cube Store pre-aggregations — sub-second on large datasets" }, native: { status: "no", note: "Direct BigQuery queries — slot consumption and latency vary" } },
  { dimension: "Setup & Licensing Cost", cube: { status: "partial", note: "Open-source core; MCP requires Premium plan (CCU-based pricing)" }, native: { status: "yes", note: "No extra cost — included in existing GCP spend" } },
  { dimension: "NRMA Recommendation", cube: { status: "partial", note: "Review when footprint expands multi-cloud" }, native: { status: "yes", note: "Start here — zero cost, already connected, architect recommended" } },
];

const workflowRows: { capability: string; description: string; example: string }[] = [
  { capability: "Named Action Catalogue", description: "Agents invoke named workflows, not raw APIs. Abstracts all system complexity.", example: "create_purchase_order\nroute_for_approval\npost_to_gl" },
  { capability: "Multi-Step Sequencing", description: "n8n handles dependencies, ordering, and conditional branching across systems.", example: "Create PO → check budget → route approval → post GL → notify finance" },
  { capability: "Human-in-the-Loop", description: "Approval checkpoints before any financial write action executes.", example: "Pause workflow → send Teams approval card → resume on confirm" },
  { capability: "Error Handling & Retry", description: "Automatic retry logic, dead-letter queues, and alerting on failure.", example: "NetSuite timeout → retry 3× → alert AI & Automation team" },
  { capability: "Cross-System Triggers", description: "Oracle GFS, Newbook, and M365 actions where no native MCP adaptor exists.", example: "Newbook booking confirmed → sync revenue to BigQuery → update GL" },
];

export default function SemanticLayer() {
  const { ref, inView } = useInView();
  const [activeLayer, setActiveLayer] = useState<"data" | "workflow">("data");

  return (
    <section
      id="semantic-layer"
      ref={ref}
      className="py-24"
      style={{ background: "white" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-12">
          <span
            className="hidden md:block text-8xl font-bold leading-none select-none"
            style={{ color: "oklch(0.93 0.02 264)", fontFamily: "var(--font-display)" }}
          >
            04
          </span>
          <div>
            <div className="mono-label mb-3">Semantic Layers</div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "var(--nrma-navy)",
                lineHeight: 1.15,
              }}
            >
              Two Governed Surfaces.
              <br />
              One Clean Interface.
            </h2>
            <p className="text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Agents never touch raw APIs or schemas directly. They interact through two governed semantic layers:
              a <strong>Data Semantic Layer</strong> for analytical queries, and a <strong>Workflow Semantic Layer</strong> for operational actions.
            </p>
          </div>
        </div>

        {/* Two-layer toggle cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Data Semantic Layer */}
          <FadeUp delay={0}>
            <button
              onClick={() => setActiveLayer("data")}
              className={`w-full text-left rounded-2xl p-7 border-2 transition-all duration-300 ${
                activeLayer === "data"
                  ? "border-[#003087] shadow-lg"
                  : "border-slate-200 hover:border-[#003087]/40"
              }`}
              style={{ background: activeLayer === "data" ? "oklch(0.97 0.015 264)" : "white" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--nrma-navy)" }}>
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="mono-label text-xs">Layer 3A</div>
                  <h3 className="font-bold text-lg" style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-display)" }}>
                    Data Semantic Layer
                  </h3>
                </div>
                {activeLayer === "data" && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-mono bg-[#003087] text-white">Active</span>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                Governs <strong>what the data means</strong> — metric definitions, business logic, and consistent joins across the BigQuery data lake. Exposed as the NRMA Data Semantic Layer MCP. Agents query governed metrics, not raw tables.
              </p>
              <div className="flex flex-wrap gap-2">
                {["BigQuery Native ✓", "Cube.dev Trial", "Governed Metrics", "MCP Endpoint", "Analytical"].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full font-mono" style={{ background: "var(--nrma-tint)", color: "var(--nrma-blue)" }}>{t}</span>
                ))}
              </div>
            </button>
          </FadeUp>

          {/* Workflow Semantic Layer */}
          <FadeUp delay={80}>
            <button
              onClick={() => setActiveLayer("workflow")}
              className={`w-full text-left rounded-2xl p-7 border-2 transition-all duration-300 ${
                activeLayer === "workflow"
                  ? "border-[#1A73E8] shadow-lg"
                  : "border-slate-200 hover:border-[#1A73E8]/40"
              }`}
              style={{ background: activeLayer === "workflow" ? "oklch(0.97 0.02 220)" : "white" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#1A73E8" }}>
                  <Workflow className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="mono-label text-xs">Layer 3B</div>
                  <h3 className="font-bold text-lg" style={{ color: "#1A73E8", fontFamily: "var(--font-display)" }}>
                    Workflow Semantic Layer
                  </h3>
                </div>
                {activeLayer === "workflow" && (
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-mono bg-[#1A73E8] text-white">Active</span>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                Governs <strong>what actions can be taken</strong> — a catalogue of named workflows the AI can invoke. Agents call{" "}
                <code className="text-xs bg-slate-100 px-1 rounded">create_purchase_order</code>, not a raw NetSuite REST endpoint.
                Sequencing, approvals, and error handling built in.
              </p>
              <div className="flex flex-wrap gap-2">
                {["n8n", "Workflow Catalogue", "Write Actions", "Approval Routing", "Human-in-Loop"].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full font-mono" style={{ background: "oklch(0.95 0.02 220)", color: "#1A73E8" }}>{t}</span>
                ))}
              </div>
            </button>
          </FadeUp>
        </div>

        {/* Detail panel — Data Semantic Layer */}
        {activeLayer === "data" && (
          <FadeUp delay={0} className="mb-10">
            <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100" style={{ background: "oklch(0.97 0.015 264)" }}>
                <h3 className="font-bold text-xl" style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-display)" }}>
                  Data Semantic Layer — Cube.dev vs BigQuery Native
                </h3>
                <p className="text-sm text-slate-500 mt-1">Both under active evaluation. BigQuery native is connected and the architect-recommended starting point.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "var(--nrma-navy)" }} className="text-white">
                      <th className="text-left px-5 py-4 font-semibold w-1/3">Dimension</th>
                      <th className="text-left px-5 py-4 font-semibold w-1/3">Cube.dev (Trial)</th>
                      <th className="text-left px-5 py-4 font-semibold w-1/3">BigQuery Native Semantic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCompareRows.map((row, i) => (
                      <tr key={row.dimension} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
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
              <div className="flex items-center gap-6 px-5 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Supported</span>
                <span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-amber-400" /> Partial / Conditional</span>
                <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4 text-red-400" /> Not available</span>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Detail panel — Workflow Semantic Layer */}
        {activeLayer === "workflow" && (
          <FadeUp delay={0} className="mb-10">
            <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100" style={{ background: "oklch(0.97 0.02 220)" }}>
                <h3 className="font-bold text-xl" style={{ color: "#1A73E8", fontFamily: "var(--font-display)" }}>
                  Workflow Semantic Layer — n8n as the Operational Interface
                </h3>
                <p className="text-sm text-slate-500 mt-1">n8n provides a governed catalogue of named actions. Agents never call raw APIs — they invoke workflows with built-in sequencing, approvals, and error handling.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#1A73E8" }} className="text-white">
                      <th className="text-left px-5 py-4 font-semibold w-1/4">Capability</th>
                      <th className="text-left px-5 py-4 font-semibold w-2/5">What It Does</th>
                      <th className="text-left px-5 py-4 font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflowRows.map((row, i) => (
                      <tr key={row.capability} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        <td className="px-5 py-4 font-semibold text-slate-800 align-top">{row.capability}</td>
                        <td className="px-5 py-4 text-slate-600 align-top leading-relaxed">{row.description}</td>
                        <td className="px-5 py-4 align-top">
                          <code className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded leading-relaxed block whitespace-pre-line">{row.example}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        )}

        {/* Bottom callout — why two layers */}
        <FadeUp delay={160}>
          <div className="rounded-2xl p-8 md:p-10" style={{ background: "var(--nrma-navy)" }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mono-label text-white/60 mb-3">The Governing Principle</div>
                <h3 className="font-bold text-2xl text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  Agents interact with governed surfaces, not raw systems.
                </h3>
                <p className="text-blue-100 leading-relaxed text-sm" style={{ fontFamily: "var(--font-body)" }}>
                  Without the Data Semantic Layer, every AI query is a raw SQL call — inconsistent, ungoverned, and brittle as schemas change.
                  Without the Workflow Semantic Layer, write actions are either blocked entirely or dangerously unguarded.
                  Together they give Claude and Perplexity a stable, business-logic-aware interface to both{" "}
                  <strong className="text-white">read</strong> and <strong className="text-white">act</strong>.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-4">
                  <Database className="w-6 h-6 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">Data Semantic Layer (3A)</div>
                    <div className="text-blue-200 text-xs leading-relaxed">BigQuery / Cube.dev · Governed metrics · Analytical queries · MCP endpoint</div>
                  </div>
                </div>
                <div className="flex items-center justify-center py-1">
                  <ArrowRight className="w-5 h-5 text-white/30" />
                </div>
                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-4">
                  <Workflow className="w-6 h-6 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">Workflow Semantic Layer (3B)</div>
                    <div className="text-blue-200 text-xs leading-relaxed">n8n · Named action catalogue · Write actions · Approval routing · Human-in-loop</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
