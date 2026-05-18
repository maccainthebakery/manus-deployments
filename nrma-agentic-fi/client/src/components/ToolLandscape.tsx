/* ============================================================
   ToolLandscape.tsx
   Design: Executive Command Centre — NRMA deep blue on white
   AI tool comparison: Claude vs Perplexity vs Copilot vs Gemini vs ChatGPT
   Ranked cards + comparison matrix + strategic callout for NRMA
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { CheckCircle2, Circle, XCircle, Star, AlertTriangle } from "lucide-react";

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

type Score = "strong" | "partial" | "weak" | "na";

interface Tool {
  rank: number;
  name: string;
  vendor: string;
  badge?: string;
  badgeColor?: string;
  tagline: string;
  color: string;
  textColor: string;
  borderColor: string;
  scores: {
    mcp: Score;
    coworker: Score;
    crossSystem: Score;
    bigquery: Score;
    netsuite: Score;
    enterpriseRollout: Score;
  };
  strategic: string;
  nrmaFit: string;
  caveat?: string;
}

const tools: Tool[] = [
  {
    rank: 1,
    name: "Claude Desktop",
    vendor: "Anthropic",
    badge: "Current — Validated",
    badgeColor: "#16a34a",
    tagline: "MCP inventor. Best multi-step reasoning. The AI coworker.",
    color: "#003087",
    textColor: "#ffffff",
    borderColor: "#0055D4",
    scores: {
      mcp: "strong",
      coworker: "strong",
      crossSystem: "strong",
      bigquery: "strong",
      netsuite: "strong",
      enterpriseRollout: "partial",
    },
    strategic: "Anthropic invented MCP and treats it as a first-class primitive. Claude Desktop holds a persistent system prompt, maintains tool connections across sessions, and reasons across NetSuite + BigQuery in a single turn. Claude 3.7 Sonnet's extended thinking mode is purpose-built for the 'compare Q3 vs Q3, identify drivers, suggest actions' query pattern.",
    nrmaFit: "Primary client for power users and the AI & Automation team. Best choice for cross-system financial queries and the routing intelligence pattern.",
    caveat: "Desktop app install required — friction for broad NRMA rollout beyond the core team.",
  },
  {
    rank: 2,
    name: "Perplexity Computer",
    vendor: "Perplexity AI",
    badge: "Current — Validated",
    badgeColor: "#16a34a",
    tagline: "Enterprise-grade. Strong synthesis. Already live.",
    color: "#0055D4",
    textColor: "#ffffff",
    borderColor: "#0078D4",
    scores: {
      mcp: "strong",
      coworker: "strong",
      crossSystem: "strong",
      bigquery: "partial",
      netsuite: "strong",
      enterpriseRollout: "strong",
    },
    strategic: "Perplexity Enterprise supports custom MCP connectors and is already validated on the NetSuite AI Connector. Strong for research-synthesis queries — combining live NetSuite data with external context (market data, industry benchmarks). Web-based, so no desktop install required.",
    nrmaFit: "Complementary to Claude Desktop. Better for research-augmented financial queries. Easier enterprise rollout via browser.",
  },
  {
    rank: 3,
    name: "Microsoft 365 Copilot",
    vendor: "Microsoft",
    badge: "Future — M365 Users",
    badgeColor: "#0078D4",
    tagline: "Best for finance users already in Excel and Teams.",
    color: "#0078D4",
    textColor: "#ffffff",
    borderColor: "#0099CC",
    scores: {
      mcp: "partial",
      coworker: "partial",
      crossSystem: "weak",
      bigquery: "weak",
      netsuite: "weak",
      enterpriseRollout: "strong",
    },
    strategic: "GPT-4o embedded natively in Teams, Excel, Word, and Outlook. The right tool for the non-technical finance user who wants to ask a question inside Excel without leaving their workflow. Copilot Studio allows custom connectors but the story is primarily Microsoft-stack.",
    nrmaFit: "Phase 3+ — broadening access to finance users in M365. Not suited for cross-system queries across NetSuite, BigQuery, and Newbook.",
    caveat: "Largely closed to non-Microsoft data sources. Strong inside M365, weak outside it.",
  },
  {
    rank: 4,
    name: "Gemini / Vertex AI",
    vendor: "Google",
    badge: "Watch — BigQuery Native",
    badgeColor: "#d97706",
    tagline: "Structural BigQuery advantage. MCP maturity catching up.",
    color: "#1A73E8",
    textColor: "#ffffff",
    borderColor: "#4285F4",
    scores: {
      mcp: "partial",
      coworker: "weak",
      crossSystem: "partial",
      bigquery: "strong",
      netsuite: "weak",
      enterpriseRollout: "partial",
    },
    strategic: "Gemini is native to GCP — BigQuery, Vertex AI, Looker, and Gemini are all first-party Google products. Zero connector overhead for BigQuery queries. Gemini 1.5 Pro's 1M token context window is useful for large GL exports and cross-year analysis. Google Agentspace (enterprise agentic product) has native BigQuery + Looker connectors.",
    nrmaFit: "Worth watching as BigQuery native semantic layer matures. If the Cube.dev trial doesn't land and you stay on BigQuery native long-term, Gemini becomes more relevant.",
    caveat: "No desktop AI coworker experience today. MCP support still maturing. More of an API/platform play than a user-facing tool.",
  },
  {
    rank: 5,
    name: "ChatGPT Enterprise",
    vendor: "OpenAI",
    badge: "Monitor",
    badgeColor: "#6b7280",
    tagline: "Strong model. Weaker connector story for your architecture.",
    color: "#374151",
    textColor: "#ffffff",
    borderColor: "#6b7280",
    scores: {
      mcp: "partial",
      coworker: "partial",
      crossSystem: "weak",
      bigquery: "weak",
      netsuite: "weak",
      enterpriseRollout: "strong",
    },
    strategic: "GPT-4o is a strong model with broad enterprise adoption. OpenAI has their own tool-calling spec and MCP support is still maturing — they've been slower to adopt MCP as a standard. The ChatGPT desktop app exists but lacks the persistent system prompt + multi-tool routing pattern that Claude Desktop provides.",
    nrmaFit: "Not recommended for the cross-system financial intelligence use case. Strong for general productivity and content tasks within a Microsoft-adjacent stack.",
    caveat: "OpenAI's connector ecosystem is growing but lags Anthropic for the specific MCP + multi-source routing pattern NRMA needs.",
  },
];

const criteria: { key: keyof Tool["scores"]; label: string; desc: string }[] = [
  { key: "mcp", label: "MCP Support", desc: "Native MCP tool integration" },
  { key: "coworker", label: "AI Coworker UX", desc: "Persistent context, system prompt, session memory" },
  { key: "crossSystem", label: "Cross-System Routing", desc: "NetSuite + BigQuery in a single turn" },
  { key: "bigquery", label: "BigQuery", desc: "Native or MCP BigQuery connectivity" },
  { key: "netsuite", label: "NetSuite", desc: "Oracle AI Connector / MCP validated" },
  { key: "enterpriseRollout", label: "Enterprise Rollout", desc: "Ease of broad NRMA deployment" },
];

function ScoreIcon({ score }: { score: Score }) {
  if (score === "strong") return <CheckCircle2 size={15} className="text-green-600" />;
  if (score === "partial") return <AlertTriangle size={15} className="text-amber-500" />;
  if (score === "weak") return <XCircle size={15} className="text-red-400" />;
  return <Circle size={15} className="text-gray-300" />;
}

function ScoreDot({ score }: { score: Score }) {
  const map: Record<Score, string> = {
    strong: "bg-green-500",
    partial: "bg-amber-400",
    weak: "bg-red-400",
    na: "bg-gray-200",
  };
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${map[score]}`} />;
}

export default function ToolLandscape() {
  const { ref, inView } = useInView(0.08);
  const [selected, setSelected] = useState<string>("Claude Desktop");

  const selectedTool = tools.find(t => t.name === selected)!;

  return (
    <section id="tool-landscape" ref={ref} className="py-20 md:py-28 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div
            className="mono-label mb-4"
            style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}
          >
            AI TOOL LANDSCAPE
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              color: "var(--nrma-navy)",
              lineHeight: 1.15,
            }}
          >
            Claude Leads. Here's Why —
            <br />
            <span style={{ color: "var(--nrma-blue)" }}>and Where the Others Fit.</span>
          </h2>
          <p
            className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Five AI platforms evaluated against NRMA's specific requirements: MCP-native cross-system routing, NetSuite + BigQuery connectivity, and enterprise rollout at scale.
          </p>
        </div>

        {/* Ranked tool cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {tools.map((tool) => (
            <button
              key={tool.name}
              onClick={() => setSelected(tool.name)}
              className="text-left rounded-xl p-4 transition-all duration-200 hover:-translate-y-1"
              style={{
                background: selected === tool.name ? tool.color : "oklch(0.97 0.015 264)",
                border: `2px solid ${selected === tool.name ? tool.borderColor : "oklch(0.90 0.02 264)"}`,
                boxShadow: selected === tool.name ? `0 8px 24px -8px ${tool.color}66` : "0 2px 8px -2px rgba(0,0,0,0.08)",
              }}
            >
              {/* Rank badge */}
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: selected === tool.name ? "rgba(255,255,255,0.2)" : "var(--nrma-navy)",
                    color: "white",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tool.rank}
                </div>
                {tool.rank === 1 && <Star size={13} fill="#fbbf24" stroke="#fbbf24" />}
              </div>
              <div
                className="font-bold text-sm leading-tight mb-0.5"
                style={{
                  color: selected === tool.name ? "white" : "var(--nrma-navy)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {tool.name}
              </div>
              <div
                className="text-xs mb-2"
                style={{
                  color: selected === tool.name ? "rgba(255,255,255,0.65)" : "#6b7280",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tool.vendor}
              </div>
              {tool.badge && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: selected === tool.name ? "rgba(255,255,255,0.15)" : `${tool.badgeColor}18`,
                    color: selected === tool.name ? "white" : tool.badgeColor,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tool.badge}
                </span>
              )}
              {/* Mini score dots */}
              <div className="flex gap-1 mt-3">
                {Object.values(tool.scores).map((s, i) => (
                  <ScoreDot key={i} score={s as Score} />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div
          className={`rounded-2xl overflow-hidden mb-12 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ border: "1px solid oklch(0.90 0.02 264)" }}
        >
          {/* Panel header */}
          <div
            className="px-6 py-5 flex flex-wrap items-start gap-4"
            style={{ background: selectedTool.color }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  #{selectedTool.rank} — {selectedTool.name}
                </span>
                {selectedTool.badge && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "white",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {selectedTool.badge}
                  </span>
                )}
              </div>
              <p className="text-white/75 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                {selectedTool.tagline}
              </p>
            </div>
            {/* Score chips */}
            <div className="flex flex-wrap gap-2">
              {criteria.map(c => (
                <div
                  key={c.key}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                  style={{ background: "rgba(255,255,255,0.12)", color: "white", fontFamily: "var(--font-mono)" }}
                >
                  <ScoreIcon score={selectedTool.scores[c.key]} />
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          {/* Panel body */}
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6" style={{ borderRight: "1px solid oklch(0.90 0.02 264)" }}>
              <div
                className="text-xs font-semibold mb-2"
                style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}
              >
                STRATEGIC ASSESSMENT
              </div>
              <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {selectedTool.strategic}
              </p>
            </div>
            <div className="p-6">
              <div
                className="text-xs font-semibold mb-2"
                style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}
              >
                NRMA FIT
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                {selectedTool.nrmaFit}
              </p>
              {selectedTool.caveat && (
                <div
                  className="rounded-lg p-3 flex items-start gap-2"
                  style={{ background: "oklch(0.97 0.015 264)", border: "1px solid oklch(0.90 0.02 264)" }}
                >
                  <AlertTriangle size={13} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedTool.caveat}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison matrix */}
        <div
          className={`rounded-2xl overflow-hidden mb-10 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ border: "1px solid oklch(0.90 0.02 264)" }}
        >
          <div
            className="px-6 py-3 flex items-center gap-2"
            style={{ background: "var(--nrma-navy)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span
              className="text-xs font-semibold text-white"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              FULL COMPARISON MATRIX
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "oklch(0.97 0.015 264)", borderBottom: "1px solid oklch(0.90 0.02 264)" }}>
                  <th
                    className="text-left px-4 py-3 text-xs font-semibold"
                    style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-mono)", minWidth: 160 }}
                  >
                    CRITERION
                  </th>
                  {tools.map(t => (
                    <th
                      key={t.name}
                      className="px-3 py-3 text-xs font-semibold text-center"
                      style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-mono)", minWidth: 110 }}
                    >
                      {t.name.replace(" Desktop", "").replace(" Enterprise", " Ent.").replace(" Computer", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((c, i) => (
                  <tr
                    key={c.key}
                    style={{
                      background: i % 2 === 0 ? "white" : "oklch(0.985 0.008 264)",
                      borderBottom: "1px solid oklch(0.93 0.015 264)",
                    }}
                  >
                    <td className="px-4 py-3">
                      <div className="font-semibold text-xs" style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}>
                        {c.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                        {c.desc}
                      </div>
                    </td>
                    {tools.map(t => (
                      <td key={t.name} className="px-3 py-3 text-center">
                        <div className="flex justify-center">
                          <ScoreIcon score={t.scores[c.key]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div
            className="px-6 py-3 flex flex-wrap gap-4"
            style={{ background: "oklch(0.97 0.015 264)", borderTop: "1px solid oklch(0.90 0.02 264)" }}
          >
            {[
              { icon: <CheckCircle2 size={13} className="text-green-600" />, label: "Strong" },
              { icon: <AlertTriangle size={13} className="text-amber-500" />, label: "Partial / Maturing" },
              { icon: <XCircle size={13} className="text-red-400" />, label: "Weak / Not suited" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-500" style={{ fontFamily: "var(--font-mono)" }}>
                {l.icon} {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Strategic callout */}
        <div
          className={`rounded-xl p-6 md:p-8 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ background: "var(--nrma-navy)" }}
        >
          <div
            className="text-xs mb-4"
            style={{ color: "var(--nrma-cyan)", fontFamily: "var(--font-mono)" }}
          >
            STRATEGIC IMPLICATION FOR NRMA
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Power Users & AI Team",
                desc: "Claude Desktop + Perplexity Computer cover the analyst and AI & Automation team layer. Cross-system routing, MCP-native, both validated on the Oracle AI Connector.",
                color: "var(--nrma-cyan)",
              },
              {
                title: "Broad Finance User Base",
                desc: "Microsoft 365 Copilot covers the finance users already in Excel and Teams. Phase 3+ rollout — not suited for cross-system queries today, but the right tool for M365-native workflows.",
                color: "#60a5fa",
              },
              {
                title: "Watch: Gemini",
                desc: "If the Cube.dev trial doesn't land and BigQuery native semantic layer becomes the long-term choice, Gemini's first-party GCP integration becomes increasingly relevant. Monitor Google Agentspace.",
                color: "#fbbf24",
              },
            ].map(item => (
              <div key={item.title}>
                <div
                  className="text-xs font-semibold mb-2"
                  style={{ color: item.color, fontFamily: "var(--font-mono)" }}
                >
                  {item.title.toUpperCase()}
                </div>
                <p className="text-sm text-white/75 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
