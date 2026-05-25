/* ============================================================
   Architecture Section — The Technical Blueprint
   NRMA AI | Automation Team
   Features the polished inline ArchDiagram component
   with layer description cards below it.
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import ArchDiagram from "./ArchDiagram";

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

const layers = [
  {
    tier: "Layer 1 — UX",
    title: "Conversational Interface",
    tool: "Microsoft Copilot (M365) · Claude Desktop · Perplexity Computer",
    description:
      "Microsoft Copilot is the broad workforce interface — embedded in Teams, Outlook, and Office for everyday finance users. Claude Desktop and Perplexity Computer serve the AI & Automation team as validated power-user clients. Claude acts as the Merging & Reasoning Agent behind the scenes; Perplexity as the research assistant with live web context.",
    color: "#003087",
    tags: ["Microsoft Copilot", "Claude Desktop", "Perplexity Computer", "M365"],
  },
  {
    tier: "Layer 2 — Orchestration",
    title: "Master Agent / Intent Router",
    tool: "Agentic Framework (n8n orchestration)",
    description:
      "A master agent understands user intent and routes to the appropriate sub-agent: transactional queries → NetSuite MCP; aggregated/analytical queries → NRMA Data Semantic Layer MCP; operational workflows → NRMA Workflow Semantic Layer (n8n). The Merging & Reasoning Agent (Claude) synthesises multi-source results before returning to the user.",
    color: "#0055D4",
    tags: ["Master Agent", "Intent Router", "Sub-Agents", "Session Memory", "n8n"],
  },
  {
    tier: "Layer 3A — Data Semantic",
    title: "Data Semantic Layer (Analytical)",
    tool: "BigQuery Native Semantic · Cube.dev (trial)",
    description:
      "Governs metric definitions, pre-aggregated business logic, and consistent joins across the BigQuery data lake. Exposed as the NRMA Data Semantic Layer MCP — agents query governed metrics, not raw tables. Claude Desktop is currently connected to BigQuery's native semantic layer; Cube.dev trial is evaluating multi-warehouse portability.",
    color: "#0078D4",
    tags: ["BigQuery Native", "Cube.dev Trial", "Governed Metrics", "MCP Endpoint"],
  },
  {
    tier: "Layer 3B — Workflow Semantic",
    title: "Workflow Semantic Layer (Operational)",
    tool: "n8n — Workflow Automation",
    description:
      "n8n acts as the operational semantic layer: a governed catalogue of actions the AI can invoke — create PO, route for approval, post to GL, trigger notifications. Agents call named workflows, not raw APIs. Provides sequencing, error handling, retry logic, and human-in-the-loop checkpoints before any financial write action executes.",
    color: "#1A73E8",
    tags: ["n8n", "Workflow Catalogue", "Write Actions", "Approval Routing", "Human-in-Loop"],
  },
  {
    tier: "Layer 4 — Sources",
    title: "Source Systems + ETL Pipeline",
    tool: "NetSuite ERP · Oracle GFS · Newbook · GCP BigQuery",
    description:
      "NetSuite ERP (Oracle AI Connector MCP, read + write via SuiteTalk), Oracle GFS, and Newbook PMS are the operational sources. GCP Application Integration (iPaaS) handles nightly/hourly ELT sync → BigQuery, maintaining Raw / Transform / Curated layers. Microsoft 365 (SharePoint, Teams, Power Automate) connects natively.",
    color: "#0099CC",
    tags: ["NetSuite ERP", "Oracle GFS", "Newbook", "GCP ETL", "BigQuery", "M365"],
  },
];

export default function Architecture() {
  const { ref, inView } = useInView();

  return (
    <section
      id="architecture"
      ref={ref}
      className="py-24 diagonal-top"
      style={{ background: "oklch(0.97 0.015 264)" }}
    >
      <div className="container">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-16">
          <span
            className="hidden md:block text-8xl font-bold leading-none select-none"
            style={{ color: "oklch(0.90 0.03 264)", fontFamily: "var(--font-display)" }}
          >
            02
          </span>
          <div>
            <div className="mono-label mb-3">Technical Architecture</div>
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
              A Layered Intelligence
              <br />
              Stack
            </h2>
            <p
              className="text-gray-600 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Four layers, two semantic surfaces, one governed interface. The UX layer converses. The orchestration layer routes and reasons. The semantic layers translate — data for analytics, workflows for actions. The source systems provide truth.
            </p>
          </div>
        </div>

        {/* Polished inline architecture diagram */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ border: "1px solid oklch(0.90 0.02 264)" }}
        >
          {/* Diagram header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="mono-label mb-1">NRMA AI | Automation Team</div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}
              >
                Agentic Financial Intelligence — Architecture Overview
              </h3>
            </div>
            <div
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "var(--nrma-tint)",
                color: "var(--nrma-blue)",
                fontFamily: "var(--font-mono)",
                border: "1px solid var(--nrma-light)",
              }}
            >
              v1.1 · May 2026
            </div>
          </div>

          <ArchDiagram />
        </div>

        {/* AI Clients + Layer cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Clients callout */}
          <div
            className={`rounded-xl p-6 lg:col-span-1 transition-all duration-500 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ background: "var(--nrma-navy)" }}
          >
            <div className="mono-label text-white/60 mb-3">Integration Status — May 2026</div>
            <ul className="space-y-3">
              {[
                "Claude Desktop + Perplexity both validated ✓",
                "Oracle NetSuite AI Connector (MCP): read + write validated ✓",
                "GCP Application Integration: nightly ETL → BigQuery ✓",
                "Cube.dev trial active — semantic layer evaluation",
                "Claude Desktop → BigQuery native semantic layer ✓",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-white/80">
                  <span style={{ color: "var(--nrma-cyan)" }} className="mt-0.5 shrink-0">→</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Layer summary cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {layers.map((layer, i) => (
              <div
                key={layer.tier}
                className={`rounded-xl p-5 card-lift transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  background: "white",
                  borderLeft: `3px solid ${layer.color}`,
                  boxShadow: "0 2px 12px -4px rgba(0,48,135,0.10)",
                  transitionDelay: `${(i + 1) * 100}ms`,
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: layer.color, color: "white", fontFamily: "var(--font-mono)" }}
                  >
                    {layer.tier}
                  </span>
                </div>
                <h4
                  className="font-semibold text-sm mb-1"
                  style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}
                >
                  {layer.title}
                </h4>
                <div
                  className="text-xs mb-2"
                  style={{ color: layer.color, fontFamily: "var(--font-mono)" }}
                >
                  {layer.tool}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{layer.description}</p>
                <div className="flex flex-wrap gap-1">
                  {layer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: "var(--nrma-tint)",
                        color: "var(--nrma-blue)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
