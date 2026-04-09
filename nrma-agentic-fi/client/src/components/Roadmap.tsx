/* ============================================================
   Roadmap Section — Phased Implementation Plan
   Light blue tint background, timeline layout
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { CheckCircle, Circle, Clock } from "lucide-react";

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

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation & Proof of Value",
    duration: "Weeks 1–4",
    status: "ready",
    description:
      "Establish Perplexity Computer Enterprise environment. Connect NetSuite via MCP (already proven via Zapier/Replit). Deliver first working demo: natural language query against live NetSuite financial data. Demonstrate to CTO.",
    deliverables: [
      "Perplexity Computer Enterprise provisioned",
      "NetSuite MCP connector live",
      "First financial query demo",
      "CTO sign-off on approach",
    ],
  },
  {
    phase: "Phase 2",
    title: "BigQuery & Data Lake Integration",
    duration: "Weeks 5–8",
    status: "planned",
    description:
      "Deploy Looker or Cube.dev as the semantic layer in front of Google BigQuery. Define core business metrics (revenue, occupancy, cost per unit) in the semantic layer. Connect to Perplexity via API. Enable cross-ERP + BigQuery queries.",
    deliverables: [
      "Looker or Cube.dev deployed",
      "Core metrics defined in semantic layer",
      "BigQuery ↔ Perplexity integration live",
      "Cross-source query capability demonstrated",
    ],
  },
  {
    phase: "Phase 3",
    title: "Full ERP Coverage",
    duration: "Weeks 9–14",
    status: "planned",
    description:
      "Extend n8n to cover Oracle GFS and Newbook PMS. Connect SharePoint document intelligence via native MS connectors. Enable full group-wide financial queries spanning all three ERPs, BigQuery, and SharePoint simultaneously.",
    deliverables: [
      "Oracle GFS via n8n connected",
      "Newbook PMS via n8n connected",
      "SharePoint document intelligence live",
      "Full group financial query capability",
    ],
  },
  {
    phase: "Phase 4",
    title: "Automation & Scheduled Intelligence",
    duration: "Weeks 15–20",
    status: "future",
    description:
      "Deploy scheduled financial briefings — daily, weekly, monthly — delivered via Teams or email. Build automated anomaly detection for budget variances. Enable Shortcut.ai to consume the intelligence layer for workflow automation triggers.",
    deliverables: [
      "Scheduled financial briefings via Teams",
      "Budget variance anomaly alerts",
      "Shortcut.ai integration live",
      "Executive dashboard prototype",
    ],
  },
];

const statusConfig = {
  ready: { icon: CheckCircle, label: "Ready to Start", color: "oklch(0.55 0.15 150)" },
  planned: { icon: Clock, label: "Planned", color: "var(--nrma-blue)" },
  future: { icon: Circle, label: "Future", color: "oklch(0.65 0.05 264)" },
};

export default function Roadmap() {
  const { ref, inView } = useInView();

  return (
    <section
      id="roadmap"
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
            04
          </span>
          <div>
            <div className="mono-label mb-3">Implementation Roadmap</div>
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
              From Proof of Value
              <br />
              to Group Intelligence
            </h2>
            <p
              className="text-gray-600 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              A pragmatic 20-week path that delivers value at every phase, starting with
              what is already proven — the NetSuite API connection.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "var(--nrma-light)" }}
          />

          <div className="flex flex-col gap-8">
            {phases.map((phase, i) => {
              const cfg = statusConfig[phase.status as keyof typeof statusConfig];
              const Icon = cfg.icon;
              return (
                <div
                  key={phase.phase}
                  className={`md:pl-20 relative transition-all duration-600 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:flex absolute left-4 top-6 w-8 h-8 rounded-full items-center justify-center bg-white border-2"
                    style={{ borderColor: cfg.color }}
                  >
                    <Icon size={14} style={{ color: cfg.color }} />
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm card-lift">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              background: cfg.color,
                              color: "white",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {phase.phase}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--nrma-light)", fontFamily: "var(--font-mono)" }}
                          >
                            {phase.duration}
                          </span>
                        </div>
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}
                        >
                          {phase.title}
                        </h3>
                      </div>
                      <span
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: `${cfg.color}20`,
                          color: cfg.color,
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {cfg.label}
                      </span>
                    </div>

                    <p
                      className="text-sm text-gray-600 leading-relaxed mb-5"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {phase.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2">
                      {phase.deliverables.map((d) => (
                        <div key={d} className="flex items-start gap-2 text-sm text-gray-500">
                          <span style={{ color: "var(--nrma-blue)" }} className="mt-0.5 shrink-0">✓</span>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
