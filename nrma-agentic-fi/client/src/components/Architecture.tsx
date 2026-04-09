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
    tier: "Layer 1",
    title: "Agentic Layer",
    tool: "Perplexity Computer for Enterprise",
    description:
      "The central reasoning engine. LLM-agnostic — routes to Claude, GPT-4o, or Sonar depending on query type. Orchestrates all downstream semantic layers via MCP and REST.",
    color: "#003087",
    tags: ["Perplexity Computer", "MCP Protocol", "LLM Agnostic", "Shortcut.ai"],
  },
  {
    tier: "Layer 2A",
    title: "Data Lake Semantic Layer",
    tool: "Looker or Cube.dev → Google BigQuery",
    description:
      "Purpose-built semantic layer defining business metrics, dimensions, and KPIs before data reaches the agentic layer. Translates raw data into business concepts like 'occupancy rate' or 'revenue per unit'.",
    color: "#0055D4",
    tags: ["Looker", "Cube.dev", "Google BigQuery", "Metrics Layer"],
  },
  {
    tier: "Layer 2B",
    title: "ERP Semantic Layer",
    tool: "n8n → NetSuite · Oracle GFS · Newbook",
    description:
      "n8n acts strictly as the API abstraction layer for non-Microsoft ERPs only. Normalises the complex REST/SOAP interfaces of NetSuite, Oracle GFS, and Newbook into clean, queryable endpoints.",
    color: "#0078D4",
    tags: ["n8n", "Oracle NetSuite", "Oracle GFS", "Newbook PMS"],
  },
  {
    tier: "Layer 2C",
    title: "Microsoft 365 Native",
    tool: "Native MS Connectors (hosted by NRMA)",
    description:
      "NRMA already hosts all Microsoft connectors. SharePoint, OneDrive, Power Automate, and Teams integrate directly with the agentic layer — no middleware required.",
    color: "#0099CC",
    tags: ["SharePoint", "OneDrive", "Power Automate", "Teams"],
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
              Each layer has a precise, non-overlapping role. The agentic layer reasons.
              The semantic layers translate. The source systems provide truth.
              Hover any node to explore the architecture.
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
              v1.0 · April 2026
            </div>
          </div>

          <ArchDiagram />
        </div>

        {/* Why Perplexity + Layer cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Why Perplexity callout */}
          <div
            className={`rounded-xl p-6 lg:col-span-1 transition-all duration-500 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ background: "var(--nrma-navy)" }}
          >
            <div className="mono-label text-white/60 mb-3">Why Perplexity Computer?</div>
            <ul className="space-y-3">
              {[
                "LLM-agnostic — routes to the best model per query",
                "Built-in web search + document grounding",
                "Enterprise data connectors via MCP",
                "CTO already onboarded on Perplexity Enterprise",
                "No single-vendor lock-in",
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
