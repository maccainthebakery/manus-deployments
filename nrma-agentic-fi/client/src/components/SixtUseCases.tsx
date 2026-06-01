/* ============================================================
   SIXT AI Use Cases Section
   5 AI models: Demand Forecasting, Labour Forecasting,
   Fleet Intelligence, Integrated Intelligence, Profitability Forecasting
   Each card shows routing channel: Analytical / Hybrid
   Full 10-column detail table on card expand
   Design: dark navy header, white cards, NRMA palette
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, BarChart3, Users, Truck, Zap, DollarSign, Clock, GitBranch, Database } from "lucide-react";

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

type RoutingChannel = "analytical" | "hybrid";

interface UseCase {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  routing: RoutingChannel;
  routingNote: string;
  accentColor: string;
  users: string;
  frequency: string;
  forum: string;
  driver: string;
  accountability: string;
  dataInputs: string;
  aiCapability: string;
  decisions: string;
  operationalImpact: string;
  financialROI: string;
}

const useCases: UseCase[] = [
  {
    id: "demand",
    icon: BarChart3,
    title: "Demand Forecasting",
    subtitle: "Price-aware demand forecasts by location, date & vehicle segment",
    routing: "analytical",
    routingNote: "Historical bookings, pricing trends & external events — all time-series data served from BigQuery semantic layer",
    accentColor: "oklch(0.50 0.18 240)",
    users: "Revenue Management, Pricing, Fleet Planning, Exec",
    frequency: "Daily / Weekly (with monthly outlooks)",
    forum: "Demand and Supply Meeting",
    driver: "Commercial Finance",
    accountability: "GM Sales and Marketing",
    dataInputs: "Bookings, pricing & external events; fleet availability",
    aiCapability: "Price-aware demand forecasts by location, date & vehicle segment",
    decisions: "Dynamic pricing; fleet capacity planning",
    operationalImpact: "Proactive branch planning; early fleet repositioning; fewer late fixes",
    financialROI: "Higher utilisation (less idle fleet) & increased revenue capture (fewer lost sales)",
  },
  {
    id: "labour",
    icon: Users,
    title: "Labour Forecasting",
    subtitle: "Staffing demand forecasts by location, role & shift",
    routing: "analytical",
    routingNote: "Driven by demand forecast outputs + historical staffing data — no live transactional lookup required",
    accentColor: "oklch(0.52 0.16 160)",
    users: "Operations Leaders, Branch Managers, Workforce Planning",
    frequency: "Weekly / Shift-level (refreshed with demand)",
    forum: "GM Ops and RM's and P&C",
    driver: "Commercial Finance",
    accountability: "GM Ops",
    dataInputs: "Demand forecast outputs; staffing data; service targets",
    aiCapability: "Staffing demand forecasts by location, role & shift",
    decisions: "Proactive rostering; controlled overtime/agency usage",
    operationalImpact: "Right staff at peaks; improved service levels; reduced last-minute changes",
    financialROI: "Lower overtime & agency spend; improved cost-to-serve; better retention",
  },
  {
    id: "fleet",
    icon: Truck,
    title: "Fleet Intelligence",
    subtitle: "Optimised buy / hold / move / sell decisions across lifecycle",
    routing: "hybrid",
    routingNote: "Buy/hold/move/sell needs historical utilisation & cost (BigQuery) plus current fleet availability & live resale data (NetSuite)",
    accentColor: "var(--nrma-cyan)",
    users: "Fleet Management, Finance, Operations, Exec",
    frequency: "Weekly / Monthly (with event-driven updates)",
    forum: "Fleet Meeting",
    driver: "Commercial Finance",
    accountability: "GM Ops",
    dataInputs: "Predicted demand; fleet utilisation, cost & resale data",
    aiCapability: "Optimised buy / hold / move / sell decisions across lifecycle",
    decisions: "Fleet acquisition, rebalancing & de-fleet timing",
    operationalImpact: "Right vehicles in the right place; reduced manual planning",
    financialROI: "Higher fleet utilisation; improved resale yield; faster capital recovery",
  },
  {
    id: "integrated",
    icon: Zap,
    title: "Integrated Intelligence",
    subtitle: "Interconnected models with feedback loops across demand, labour & fleet",
    routing: "hybrid",
    routingNote: "Draws live signals from all three models — some real-time (current fleet position, today's bookings via NetSuite) and some analytical (trend context via BigQuery)",
    accentColor: "oklch(0.55 0.20 30)",
    users: "Executive Leadership, Finance, Operations, Strategy",
    frequency: "Continuous insight (decisions weekly/monthly)",
    forum: "SALT + Heads off",
    driver: "Commercial Finance",
    accountability: "GM Finance",
    dataInputs: "Shared signals across demand, labour & fleet",
    aiCapability: "Interconnected models with feedback loops (each model reinforces others)",
    decisions: "Fully coordinated pricing, staffing & fleet decisions",
    operationalImpact: "End-to-end operational alignment; minimal demand–supply mismatches",
    financialROI: "Compounded ROI potential — maximising revenue while minimising cost (without increasing fleet or headcount)",
  },
  {
    id: "profitability",
    icon: DollarSign,
    title: "Profitability Forecasting",
    subtitle: "Profit & margin forecasts by region and time — the financial capstone",
    routing: "analytical",
    routingNote: "Consumes integrated outputs from the other models — all pre-aggregated; no live record lookup required at this planning level",
    accentColor: "oklch(0.48 0.14 300)",
    users: "CFO & Finance (FP&A), Executive Leadership",
    frequency: "Monthly / Quarterly (planning cycles with scenarios as needed)",
    forum: "SALT + Heads off",
    driver: "Commercial Finance",
    accountability: "GM Finance",
    dataInputs: "Integrated outputs from demand, labour & fleet models (predicted revenue, staffing & fleet costs)",
    aiCapability: "Profit & margin forecasts by region and time (driven by AI demand & cost inputs)",
    decisions: "Enterprise-wide profit scenario planning; ROI tracking & capital allocation decisions",
    operationalImpact: "Unified financial & operational planning; early identification of profit gaps for course correction",
    financialROI: "Enhanced ROI transparency: clear link from operational levers to bottom-line impact; improved profit predictability & stakeholder confidence",
  },
];

const routingConfig = {
  analytical: {
    label: "Analytical → BigQuery",
    icon: Database,
    bg: "oklch(0.95 0.04 160)",
    text: "oklch(0.40 0.14 160)",
    border: "oklch(0.80 0.08 160)",
  },
  hybrid: {
    label: "Hybrid → NetSuite + BigQuery",
    icon: GitBranch,
    bg: "oklch(0.95 0.04 200)",
    text: "var(--nrma-blue)",
    border: "oklch(0.80 0.06 220)",
  },
};

const tableColumns = [
  { key: "users", label: "Who Will Use It" },
  { key: "frequency", label: "How Often" },
  { key: "forum", label: "Forum" },
  { key: "driver", label: "Driver" },
  { key: "accountability", label: "Accountability" },
  { key: "dataInputs", label: "Key Data Inputs" },
  { key: "aiCapability", label: "AI Capability" },
  { key: "decisions", label: "Decisions Enabled" },
  { key: "operationalImpact", label: "Operational Impact" },
  { key: "financialROI", label: "Financial / ROI Outcomes" },
] as const;

function UseCaseCard({ uc, index, inView }: { uc: UseCase; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = uc.icon;
  const routing = routingConfig[uc.routing];
  const RoutingIcon = routing.icon;

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all duration-700`}
      style={{
        borderColor: "oklch(0.90 0.02 264)",
        transitionDelay: `${index * 80}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Card header */}
      <div
        className="p-5 flex items-start gap-4 cursor-pointer select-none"
        style={{ background: "white" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${uc.accentColor}18` }}
        >
          <Icon size={18} style={{ color: uc.accentColor }} />
        </div>

        {/* Title + routing badge */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className="text-base font-semibold"
              style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-display)" }}
            >
              {uc.title}
            </h3>
            {/* Routing badge */}
            <span
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: routing.bg,
                color: routing.text,
                border: `1px solid ${routing.border}`,
                fontFamily: "var(--font-mono)",
              }}
            >
              <RoutingIcon size={10} />
              {routing.label}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-snug" style={{ fontFamily: "var(--font-body)" }}>
            {uc.subtitle}
          </p>
          {/* Routing note */}
          <p
            className="text-xs mt-1.5 leading-relaxed"
            style={{ color: routing.text, fontFamily: "var(--font-body)", opacity: 0.85 }}
          >
            {uc.routingNote}
          </p>
        </div>

        {/* Expand toggle */}
        <button
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "oklch(0.96 0.01 264)", color: "var(--nrma-navy)" }}
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded detail table */}
      {expanded && (
        <div
          className="border-t overflow-x-auto"
          style={{ borderColor: "oklch(0.90 0.02 264)", background: "oklch(0.985 0.008 264)" }}
        >
          <table className="w-full text-xs" style={{ fontFamily: "var(--font-body)", minWidth: "900px" }}>
            <thead>
              <tr style={{ background: "oklch(0.97 0.015 264)", borderBottom: "1px solid oklch(0.88 0.02 264)" }}>
                {tableColumns.map(col => (
                  <th
                    key={col.key}
                    className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                    style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableColumns.map(col => (
                  <td
                    key={col.key}
                    className="px-3 py-3 align-top leading-relaxed"
                    style={{ color: "#374151", borderBottom: "none", verticalAlign: "top" }}
                  >
                    {uc[col.key]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function SixtUseCases() {
  const { ref, inView } = useInView();

  return (
    <section id="sixt-use-cases" ref={ref} className="py-24" style={{ background: "oklch(0.975 0.01 264)" }}>
      <div className="container">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-12">
          <span
            className="hidden md:block text-8xl font-bold leading-none select-none"
            style={{ color: "oklch(0.92 0.02 264)", fontFamily: "var(--font-display)" }}
          >
            05
          </span>
          <div>
            <div
              className="text-xs font-semibold mb-2 tracking-widest"
              style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}
            >
              SIXT CAR RENTAL — AI USE CASES
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-display)" }}
            >
              Five AI Models.<br />One Integrated Intelligence.
            </h2>
            <p className="text-gray-500 max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Each model is independently valuable. Together — with shared signals and feedback loops — they form a compounding intelligence layer that coordinates pricing, staffing, and fleet decisions across the SIXT business in real time.
            </p>
            {/* Routing legend */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "oklch(0.95 0.04 160)", color: "oklch(0.40 0.14 160)", border: "1px solid oklch(0.80 0.08 160)", fontFamily: "var(--font-mono)" }}
              >
                <Database size={10} />
                Analytical → BigQuery Semantic Layer
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "oklch(0.95 0.04 200)", color: "var(--nrma-blue)", border: "1px solid oklch(0.80 0.06 220)", fontFamily: "var(--font-mono)" }}
              >
                <GitBranch size={10} />
                Hybrid → NetSuite + BigQuery
              </span>
            </div>
          </div>
        </div>

        {/* Use case cards */}
        <div className="flex flex-col gap-3 mb-10">
          {useCases.map((uc, i) => (
            <UseCaseCard key={uc.id} uc={uc} index={i} inView={inView} />
          ))}
        </div>

        {/* Integrated intelligence callout */}
        <div
          className={`rounded-xl overflow-hidden transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ background: "var(--nrma-navy)" }}
        >
          <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <Zap size={14} style={{ color: "var(--nrma-cyan)" }} />
            <span className="text-xs font-semibold tracking-widest" style={{ color: "var(--nrma-cyan)", fontFamily: "var(--font-mono)" }}>
              THE COMPOUNDING EFFECT — WHY ALL 5 MODELS TOGETHER
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              {
                icon: BarChart3,
                title: "Models reinforce each other",
                body: "Demand forecasts feed labour forecasts. Labour forecasts feed fleet decisions. Fleet decisions refine demand forecasts. Each model improves the others — the longer they run together, the more accurate the whole system becomes.",
              },
              {
                icon: Clock,
                title: "Decisions become proactive, not reactive",
                body: "Without integrated intelligence, each team optimises in isolation — pricing without knowing fleet availability, rostering without knowing demand peaks. With shared signals, every decision is made with full context.",
              },
              {
                icon: DollarSign,
                title: "Compounded ROI — not additive",
                body: "Individual models each deliver ROI. Together, the compounding effect is multiplicative: maximising revenue capture while minimising fleet idle time, overtime spend, and capital tied up in the wrong vehicles.",
              },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={i}
                  className="p-6"
                  style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : undefined }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ItemIcon size={14} style={{ color: "var(--nrma-cyan)" }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--nrma-cyan)", fontFamily: "var(--font-mono)" }}>
                      {item.title.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
          <div
            className="px-6 py-3 text-xs text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
          >
            Driven by <strong style={{ color: "rgba(255,255,255,0.7)" }}>Commercial Finance</strong> · Accountable to <strong style={{ color: "rgba(255,255,255,0.7)" }}>GM Finance</strong> · Discussed at <strong style={{ color: "rgba(255,255,255,0.7)" }}>SALT + Heads Off</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
