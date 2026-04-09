/* ============================================================
   ArchDiagram — Polished Inline Architecture Diagram
   NRMA AI | Automation Team
   Custom SVG-based layered diagram with hover tooltips,
   animated connector lines, and NRMA blue/white branding.
   ============================================================ */
import { useState } from "react";

interface NodeDef {
  id: string;
  label: string;
  sublabel?: string;
  tier: "agentic" | "semantic-data" | "semantic-erp" | "ms365" | "source" | "consumer";
  tooltip: string;
}

const nodes: NodeDef[] = [
  {
    id: "perplexity",
    label: "Perplexity Computer",
    sublabel: "Enterprise Agent",
    tier: "agentic",
    tooltip: "LLM-agnostic agentic layer. Routes queries to Claude, GPT-4o, or Sonar. Orchestrates all downstream semantic layers via MCP and REST.",
  },
  {
    id: "shortcut",
    label: "Shortcut.ai",
    sublabel: "Consumer",
    tier: "consumer",
    tooltip: "Downstream consumer of the agentic layer. Triggers workflow automation based on financial intelligence outputs.",
  },
  {
    id: "looker",
    label: "Looker / Cube.dev",
    sublabel: "Data Semantic Layer",
    tier: "semantic-data",
    tooltip: "Purpose-built semantic layer for BigQuery. Defines business metrics, KPIs, and dimensions before data reaches the agentic layer.",
  },
  {
    id: "n8n",
    label: "n8n",
    sublabel: "ERP Semantic Layer",
    tier: "semantic-erp",
    tooltip: "API abstraction layer for non-Microsoft ERPs only. Normalises NetSuite, Oracle GFS, and Newbook REST/SOAP interfaces into clean queryable endpoints.",
  },
  {
    id: "ms365",
    label: "MS 365 Connectors",
    sublabel: "Native — Hosted by NRMA",
    tier: "ms365",
    tooltip: "NRMA hosts all Microsoft connectors natively. SharePoint, OneDrive, Power Automate, and Teams connect directly to the agentic layer — no middleware.",
  },
  {
    id: "bigquery",
    label: "Google BigQuery",
    sublabel: "Data Lake",
    tier: "source",
    tooltip: "Primary data lake. Exposes structured analytics data via Looker or Cube.dev semantic layer.",
  },
  {
    id: "netsuite",
    label: "Oracle NetSuite",
    sublabel: "ERP",
    tier: "source",
    tooltip: "Core financial ERP. REST API / SOAP. Already proven via Zapier and Replit console integration.",
  },
  {
    id: "gfs",
    label: "Oracle GFS",
    sublabel: "ERP",
    tier: "source",
    tooltip: "Oracle Global Financial System. REST API / OIC. Used across corporate and SIXT financial operations.",
  },
  {
    id: "newbook",
    label: "Newbook PMS",
    sublabel: "Property Management",
    tier: "source",
    tooltip: "Parks property management system. REST API. Provides occupancy, bookings, and revenue data.",
  },
  {
    id: "sharepoint",
    label: "SharePoint / OneDrive",
    sublabel: "Document Store",
    tier: "source",
    tooltip: "Microsoft document intelligence source. Surfaces unstructured financial data from Excel and Word files via native MS connectors.",
  },
];

const tierConfig = {
  agentic: { bg: "#003087", text: "#ffffff", border: "#0055D4", label: "Agentic Layer" },
  consumer: { bg: "#ffffff", text: "#003087", border: "#003087", label: "Consumers" },
  "semantic-data": { bg: "#0055D4", text: "#ffffff", border: "#0078D4", label: "Data Semantic Layer" },
  "semantic-erp": { bg: "#0078D4", text: "#ffffff", border: "#0099CC", label: "ERP Semantic Layer" },
  ms365: { bg: "#0099CC", text: "#ffffff", border: "#00BBDD", label: "Microsoft 365 Native" },
  source: { bg: "#f0f5ff", text: "#003087", border: "#b3cdf5", label: "Source Systems" },
};

interface TooltipState {
  id: string;
  x: number;
  y: number;
}

export default function ArchDiagram() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleMouseEnter = (id: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = (e.currentTarget as HTMLElement)
      .closest(".arch-diagram-container")
      ?.getBoundingClientRect();
    if (!containerRect) return;
    setTooltip({
      id,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
    });
    setHovered(id);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setHovered(null);
  };

  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="arch-diagram-container relative w-full select-none" style={{ fontFamily: "var(--font-body)" }}>
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: Math.min(tooltip.x, 520),
            top: tooltip.y - 8,
            transform: "translate(-50%, -100%)",
            maxWidth: 260,
          }}
        >
          <div
            className="rounded-lg px-4 py-3 shadow-xl text-sm leading-relaxed"
            style={{
              background: "#003087",
              color: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div className="font-semibold mb-1" style={{ color: "white" }}>
              {getNode(tooltip.id).label}
            </div>
            {getNode(tooltip.id).tooltip}
            {/* Arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid #003087",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Row 1: Agentic + Consumer ── */}
      <div className="flex gap-4 justify-center mb-0">
        <DiagramNode node={getNode("perplexity")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} wide />
        <DiagramNode node={getNode("shortcut")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} />
      </div>

      {/* Connector row 1→2 */}
      <ConnectorRow count={3} />

      {/* ── Row 2: Three semantic layers ── */}
      <div className="grid grid-cols-3 gap-4 mb-0">
        <DiagramNode node={getNode("looker")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} />
        <DiagramNode node={getNode("n8n")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} />
        <DiagramNode node={getNode("ms365")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} />
      </div>

      {/* Connector row 2→3 */}
      <ConnectorRow count={4} />

      {/* ── Row 3: Source systems ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <DiagramNode node={getNode("bigquery")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} small />
        <DiagramNode node={getNode("netsuite")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} small />
        <DiagramNode node={getNode("gfs")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} small />
        <DiagramNode node={getNode("newbook")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} small />
      </div>

      {/* SharePoint row */}
      <div className="mt-3 flex justify-center">
        <div className="w-full sm:w-1/2">
          <DiagramNode node={getNode("sharepoint")} hovered={hovered} onEnter={handleMouseEnter} onLeave={handleMouseLeave} small />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {(Object.entries(tierConfig) as [string, typeof tierConfig[keyof typeof tierConfig]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2 text-xs" style={{ color: "#555", fontFamily: "var(--font-mono)" }}>
            <div className="w-3 h-3 rounded-sm" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }} />
            {cfg.label}
          </div>
        ))}
      </div>

      {/* Hover hint */}
      <p className="text-center text-xs mt-3" style={{ color: "#aaa", fontFamily: "var(--font-mono)" }}>
        Hover any node for details
      </p>
    </div>
  );
}

function DiagramNode({
  node,
  hovered,
  onEnter,
  onLeave,
  wide,
  small,
}: {
  node: NodeDef;
  hovered: string | null;
  onEnter: (id: string, e: React.MouseEvent) => void;
  onLeave: () => void;
  wide?: boolean;
  small?: boolean;
}) {
  const cfg = tierConfig[node.tier];
  const isHovered = hovered === node.id;

  return (
    <div
      onMouseEnter={(e) => onEnter(node.id, e)}
      onMouseLeave={onLeave}
      className="rounded-xl cursor-pointer transition-all duration-200"
      style={{
        background: cfg.bg,
        border: `2px solid ${isHovered ? "rgba(255,255,255,0.5)" : cfg.border}`,
        padding: small ? "10px 12px" : "14px 18px",
        boxShadow: isHovered
          ? `0 8px 32px -8px ${cfg.bg}88, 0 0 0 3px ${cfg.border}44`
          : "0 2px 8px -2px rgba(0,0,0,0.12)",
        transform: isHovered ? "translateY(-3px)" : "none",
        width: wide ? "auto" : "100%",
        flex: wide ? "1 1 auto" : undefined,
      }}
    >
      <div
        className="font-semibold leading-tight"
        style={{
          color: cfg.text,
          fontSize: small ? "0.75rem" : "0.85rem",
          fontFamily: "var(--font-body)",
        }}
      >
        {node.label}
      </div>
      {node.sublabel && (
        <div
          style={{
            color: node.tier === "source" ? "#6b8cbf" : "rgba(255,255,255,0.65)",
            fontSize: "0.65rem",
            fontFamily: "var(--font-mono)",
            marginTop: 2,
            letterSpacing: "0.05em",
          }}
        >
          {node.sublabel}
        </div>
      )}
    </div>
  );
}

function ConnectorRow({ count }: { count: number }) {
  return (
    <div className="flex justify-around items-center py-2 px-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4" style={{ background: "#b3cdf5" }} />
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M4 6L0 0h8L4 6z" fill="#b3cdf5" />
          </svg>
        </div>
      ))}
    </div>
  );
}
