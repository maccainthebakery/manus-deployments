/* ============================================================
   Routing Intelligence Section — Claude as Smart Router
   Shows the NetSuite (real-time) vs BigQuery (analytical) decision
   table and the routing logic embedded in the system prompt.
   Design: white background, asymmetric layout, NRMA navy/cyan palette
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Clock, BarChart3, Zap, GitBranch, Database, Layers, FileText, TrendingUp, DollarSign, Package } from "lucide-react";

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

const rows = [
  {
    aspect: "Data Freshness",
    netsuite: "Live transactions, inventory, orders, GL — seconds old",
    bigquery: "Aggregated, cleaned, time-partitioned history",
    superpower: "Routes to the right source based on your prompt's time horizon",
  },
  {
    aspect: "Best Use Cases",
    netsuite: "Operational 'now' questions — invoice status, open POs, live GL",
    bigquery: "Trend, cohort, forecasting, cross-system analytics",
    superpower: "Natural language → SQL + reasoning, no manual query writing",
  },
  {
    aspect: "Volume & Complexity",
    netsuite: "Smaller, transactional queries — precise record lookups",
    bigquery: "Massive scans, joins across years, ML feature tables",
    superpower: "Handles heavy analytical lifting without you writing SQL",
  },
  {
    aspect: "Cost Profile",
    netsuite: "Cheaper per transaction — ideal for point-in-time lookups",
    bigquery: "Pay-per-query, but cheaper at scale for large aggregations",
    superpower: "Can optimise queries before execution to minimise cost",
  },
];

const routingExamples = [
  {
    icon: Clock,
    label: "Real-time → NetSuite",
    query: "What is the status of invoice #INV-2024-8821?",
    route: "NetSuite MCP",
    reason: "Point-in-time operational record — live data required",
    color: "var(--nrma-blue)",
  },
  {
    icon: FileText,
    label: "Real-time → NetSuite",
    query: "List all open purchase orders for the Parks business unit over $50k.",
    route: "NetSuite MCP",
    reason: "Live procurement records — current approval status needed, not historical",
    color: "var(--nrma-blue)",
  },
  {
    icon: Package,
    label: "Real-time → NetSuite",
    query: "What's the current cash balance across all NRMA entity bank accounts?",
    route: "NetSuite MCP",
    reason: "Live GL balance — must reflect today's transactions, not yesterday's snapshot",
    color: "var(--nrma-blue)",
  },
  {
    icon: BarChart3,
    label: "Analytical → BigQuery",
    query: "Show me Parks revenue trend vs budget for the last 18 months.",
    route: "BigQuery Semantic Layer",
    reason: "Historical aggregation across time — analytical layer is optimal",
    color: "oklch(0.55 0.15 150)",
  },
  {
    icon: TrendingUp,
    label: "Analytical → BigQuery",
    query: "Which business unit has had the highest variance to budget over the last 3 financial years?",
    route: "BigQuery Semantic Layer",
    reason: "Multi-year cross-BU aggregation — exactly what the analytical layer is built for",
    color: "oklch(0.55 0.15 150)",
  },
  {
    icon: DollarSign,
    label: "Analytical → BigQuery",
    query: "What's our average debtor days by business unit for FY24 vs FY25?",
    route: "BigQuery Semantic Layer",
    reason: "Derived metric across historical AR data — pre-governed in the semantic layer",
    color: "oklch(0.55 0.15 150)",
  },
  {
    icon: GitBranch,
    label: "Hybrid → Both",
    query: "How does today's SIXT fleet utilisation compare to our 12-month average?",
    route: "NetSuite + BigQuery",
    reason: "Today's figure from NetSuite; historical average from BigQuery — merged in reasoning",
    color: "var(--nrma-cyan)",
  },
  {
    icon: Zap,
    label: "Hybrid → Both",
    query: "Is this month's Roadside operating cost tracking above or below the same period last year?",
    route: "NetSuite + BigQuery",
    reason: "Month-to-date actuals from NetSuite; prior year same-period from BigQuery — compared in one answer",
    color: "var(--nrma-cyan)",
  },
];

export default function RoutingIntelligence() {
  const { ref, inView } = useInView();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <section
      id="routing"
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="container">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-16">
          <span
            className="hidden md:block text-8xl font-bold leading-none select-none"
            style={{ color: "var(--nrma-tint)", fontFamily: "var(--font-display)" }}
          >
            02b
          </span>
          <div>
            <div className="mono-label mb-3">Dual-Channel Routing Intelligence</div>
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
              Claude as the
              <br />
              Smart Router
            </h2>
            <p
              className="text-gray-600 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Both channels are valid and complementary. NetSuite is the source-of-truth for
              real-time operational data. BigQuery is the analytical and historical layer.
              Claude doesn't care which system it talks to — it just needs clean, governed
              access and the right context to route intelligently.
            </p>
          </div>
        </div>

        {/* Routing decision examples */}
        <div
          className={`grid md:grid-cols-3 gap-5 mb-14 transition-all duration-600 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {routingExamples.map((ex, i) => {
            const Icon = ex.icon;
            return (
              <div
                key={ex.label}
                className="rounded-xl p-6 card-lift"
                style={{
                  border: `1.5px solid ${ex.color}30`,
                  background: `${ex.color}08`,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                    style={{ background: ex.color }}
                  >
                    <Icon size={15} color="white" />
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: ex.color, fontFamily: "var(--font-mono)" }}
                  >
                    {ex.label}
                  </span>
                </div>

                <div
                  className="text-sm leading-relaxed mb-4 italic"
                  style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  "{ex.query}"
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight size={12} style={{ color: ex.color }} />
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{
                      background: ex.color,
                      color: "white",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {ex.route}
                  </span>
                </div>

                <p
                  className="text-xs text-gray-500 leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {ex.reason}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div
          className={`rounded-2xl overflow-hidden mb-12 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ border: "1px solid oklch(0.90 0.02 264)" }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-4 gap-0"
            style={{ background: "var(--nrma-navy)" }}
          >
            {["Aspect", "NetSuite (Real-time)", "BigQuery (Analytical)", "Claude's Superpower"].map((h, i) => (
              <div
                key={h}
                className="p-4 text-xs font-semibold"
                style={{
                  color: i === 0 ? "rgba(255,255,255,0.5)" : i === 3 ? "var(--nrma-cyan)" : "white",
                  fontFamily: "var(--font-mono)",
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : undefined,
                }}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {rows.map((row, i) => (
            <div
              key={row.aspect}
              className="grid grid-cols-4 gap-0 cursor-pointer transition-colors duration-150"
              style={{
                background: activeRow === i ? "oklch(0.97 0.015 264)" : i % 2 === 0 ? "white" : "oklch(0.99 0.005 264)",
                borderBottom: i < rows.length - 1 ? "1px solid oklch(0.93 0.01 264)" : undefined,
              }}
              onMouseEnter={() => setActiveRow(i)}
              onMouseLeave={() => setActiveRow(null)}
            >
              <div
                className="p-4 text-xs font-semibold"
                style={{
                  color: "var(--nrma-navy)",
                  fontFamily: "var(--font-mono)",
                  borderRight: "1px solid oklch(0.93 0.01 264)",
                }}
              >
                {row.aspect}
              </div>
              <div
                className="p-4 text-xs leading-relaxed text-gray-600"
                style={{ fontFamily: "var(--font-body)", borderRight: "1px solid oklch(0.93 0.01 264)" }}
              >
                {row.netsuite}
              </div>
              <div
                className="p-4 text-xs leading-relaxed text-gray-600"
                style={{ fontFamily: "var(--font-body)", borderRight: "1px solid oklch(0.93 0.01 264)" }}
              >
                {row.bigquery}
              </div>
              <div
                className="p-4 text-xs leading-relaxed"
                style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-body)", fontWeight: 500 }}
              >
                {row.superpower}
              </div>
            </div>
          ))}
        </div>

        {/* System prompt routing rule callout */}
        <div
          className={`rounded-xl p-6 md:p-8 transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ background: "var(--nrma-navy)" }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-8 h-8 rounded shrink-0 flex items-center justify-center mt-0.5"
              style={{ background: "var(--nrma-cyan)" }}
            >
              <Zap size={15} color="var(--nrma-navy)" />
            </div>
            <div>
              <div
                className="text-xs mb-3"
                style={{ color: "var(--nrma-cyan)", fontFamily: "var(--font-mono)" }}
              >
                SYSTEM PROMPT — ROUTING DECISION TREE (3 CHANNELS)
              </div>
              <div
                className="rounded-lg p-4 mb-4 text-sm leading-relaxed"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  lineHeight: 1.7,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ color: "var(--nrma-cyan)" }}>IF</span> the question involves anything in the <span style={{ color: "#fbbf24" }}>last 24 hours</span> or a <span style={{ color: "#fbbf24" }}>live record lookup</span> (invoice, PO, GL entry, inventory) → <span style={{ color: "#4ade80" }}>use NetSuite MCP</span><br /><br />
                <span style={{ color: "var(--nrma-cyan)" }}>IF</span> the question involves <span style={{ color: "#fbbf24" }}>trends, comparisons, forecasts, or data older than 24h</span> → <span style={{ color: "#4ade80" }}>use NRMA Data Semantic Layer MCP (BigQuery)</span><br /><br />
                <span style={{ color: "var(--nrma-cyan)" }}>IF</span> the question requires <span style={{ color: "#fbbf24" }}>both</span> (today vs historical average) → <span style={{ color: "#4ade80" }}>query both, merge in reasoning</span><br /><br />
                <span style={{ color: "var(--nrma-cyan)" }}>IF</span> the question requires an <span style={{ color: "#fbbf24" }}>action</span> (create PO, post GL, send approval, trigger workflow) → <span style={{ color: "#4ade80" }}>invoke NRMA Workflow Semantic Layer (n8n)</span>
              </div>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
              >
                This routing logic lives in the AI client's system prompt — no code required. Claude and Perplexity both honour it. Three read channels (NetSuite, BigQuery, hybrid) plus one action channel (n8n workflows). The key is being intentional so you don't mix real-time and historical data, or trigger write actions without approval routing.
              </p>
            </div>
          </div>
        </div>

        {/* GCP + Claude complementary stack callout */}
        <div
          className={`mt-8 rounded-xl overflow-hidden transition-all duration-700 delay-400 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ border: "1px solid oklch(0.90 0.02 264)" }}
        >
          <div
            className="px-6 py-3 flex items-center gap-2"
            style={{ background: "oklch(0.97 0.015 264)", borderBottom: "1px solid oklch(0.90 0.02 264)" }}
          >
            <Layers size={13} style={{ color: "var(--nrma-blue)" }} />
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-mono)" }}
            >
              THE COMPLEMENTARY STACK — TWO SEMANTIC LAYERS + TWO AI CLIENTS
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6" style={{ borderRight: "1px solid oklch(0.90 0.02 264)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                  style={{ background: "#1A73E8" }}
                >
                  <Database size={13} color="white" />
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#1A73E8", fontFamily: "var(--font-mono)" }}
                >
                  GCP Application Integration — The Engine
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                Handles the plumbing: reliable nightly/hourly sync of GL, orders, inventory, and custom records from NetSuite into BigQuery. Enterprise-grade for high-volume extracts, transformations, and CDC. Not designed for interactive use — designed for reliability at scale.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Nightly ETL", "CDC", "NetSuite → BigQuery", "High-volume"].map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "#1A73E820", color: "#1A73E8", fontFamily: "var(--font-mono)" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                  style={{ background: "var(--nrma-navy)" }}
                >
                  <Zap size={13} color="var(--nrma-cyan)" />
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-mono)" }}
                >
                  Claude Desktop + Perplexity — The Brain
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                The smart front-end on top of the pipeline. Your analyst opens Claude Desktop and talks to the data instead of building Saved Searches or SuiteQL queries. Can even help you build or debug the GCP flows: "Here's the integration I want — generate the flow JSON for me."
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Interactive", "Ad-hoc queries", "Natural language", "Exploration"].map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--nrma-tint)", color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div
            className="px-6 py-3 text-xs text-center"
            style={{
              background: "oklch(0.97 0.015 264)",
              borderTop: "1px solid oklch(0.90 0.02 264)",
              color: "var(--nrma-navy)",
              fontFamily: "var(--font-body)",
            }}
          >
            <strong>They don't compete.</strong> GCP keeps BigQuery clean and current. Claude and Perplexity make it conversational. They're the new stack.
          </div>
        </div>
      </div>
    </section>
  );
}
