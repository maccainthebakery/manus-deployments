/* ============================================================
   Use Cases Section — Concrete Financial Intelligence Scenarios
   White background, tabbed interface, conversational examples
   ============================================================ */
import { useState, useRef, useEffect } from "react";

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

const cases = [
  {
    id: "revenue",
    label: "Revenue Analysis",
    unit: "Group Finance",
    question: "What is our total group revenue YTD across all business units, compared to budget and prior year?",
    answer:
      "Group revenue YTD (AUD) stands at $142.3M against a budget of $138.7M (+2.6%). Parks is the strongest performer at 108% of budget. SIXT is tracking at 94% due to Q1 fleet availability constraints. Coral Adventures is ahead at 112% driven by summer season demand. Roadside is in line at 101%.",
    sources: ["Oracle NetSuite", "Oracle GFS", "Newbook PMS"],
    tags: ["Cross-ERP", "Budget vs Actual", "AUD"],
  },
  {
    id: "parks",
    label: "Parks Occupancy",
    unit: "Parks Business Unit",
    question: "Show me occupancy rates across all NRMA Holiday Parks for the last 30 days, with a forecast for the next 60 days.",
    answer:
      "Average occupancy across 25 parks over the last 30 days was 78.4%, up 6.2pp year-on-year. Hunter Valley and Port Macquarie are at capacity. Forecast for the next 60 days shows 71% average, with Easter weekend projected at 94% system-wide. Recommend dynamic pricing review for mid-week slots.",
    sources: ["Newbook PMS", "Google BigQuery"],
    tags: ["Newbook", "Forecasting", "Occupancy"],
  },
  {
    id: "sixt",
    label: "SIXT Fleet Cost",
    unit: "SIXT Car Rental",
    question: "What is our fleet depreciation and maintenance cost per vehicle for SIXT this quarter, and how does it compare to our revenue per vehicle?",
    answer:
      "Average cost per vehicle this quarter is AUD $1,847 (depreciation $1,240 + maintenance $607). Average revenue per vehicle is AUD $3,214, yielding a gross margin of 42.5% per unit. Fleet utilisation is 81.3%. Vehicles aged 24+ months are generating 18% lower revenue per day — recommend accelerating the rotation cycle.",
    sources: ["Oracle GFS", "Oracle NetSuite"],
    tags: ["SIXT", "Fleet Analytics", "Margin"],
  },
  {
    id: "sharepoint",
    label: "Document Intelligence",
    unit: "Corporate Finance",
    question: "Summarise the key financial commitments and risk items from the board papers uploaded to SharePoint this month.",
    answer:
      "Three board papers uploaded this month reference a total of AUD $8.4M in capital commitments: $4.1M for Parks infrastructure (approved), $2.8M for SIXT fleet refresh (pending approval), and $1.5M for Energy backbone upgrade (approved). Two risk items flagged: FX exposure on SIXT European leases, and a regulatory compliance cost for Marine operations estimated at $340K.",
    sources: ["SharePoint", "OneDrive"],
    tags: ["Document AI", "SharePoint", "Risk"],
  },
  {
    id: "energy",
    label: "Energy Costs",
    unit: "Energy Backbone",
    question: "How are our energy costs trending across all sites, and what is the impact on our operating margin?",
    answer:
      "Energy costs across all NRMA sites are up 11.2% YTD versus prior year, driven by grid tariff increases. Parks sites account for 68% of total energy spend. Operating margin impact is -0.8pp group-wide. BigQuery analysis of smart meter data shows 14 sites with above-average consumption patterns — automated alerts have been triggered for 6 of these.",
    sources: ["Google BigQuery", "Oracle NetSuite"],
    tags: ["BigQuery", "Energy", "Margin Impact"],
  },
];

export default function UseCases() {
  const [active, setActive] = useState(cases[0].id);
  const { ref, inView } = useInView();
  const activeCase = cases.find((c) => c.id === active)!;

  return (
    <section id="usecases" className="py-24 bg-white" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-16">
          <span
            className="hidden md:block text-8xl font-bold leading-none select-none"
            style={{ color: "var(--nrma-tint)", fontFamily: "var(--font-display)" }}
          >
            03
          </span>
          <div>
            <div className="mono-label mb-3">Financial Intelligence Use Cases</div>
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
              What You Can Ask
              <br />
              the Agent
            </h2>
            <p
              className="text-gray-600 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              These are real financial questions that currently require manual effort across
              multiple systems. With the agentic layer, they become instant conversations.
            </p>
          </div>
        </div>

        {/* Tab navigation */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                active === c.id
                  ? { background: "var(--nrma-navy)", color: "white", fontFamily: "var(--font-body)" }
                  : { background: "var(--nrma-tint)", color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Active case display */}
        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Question */}
          <div
            className="rounded-xl p-8"
            style={{ background: "var(--nrma-tint)" }}
          >
            <div className="mono-label mb-3" style={{ color: "var(--nrma-blue)" }}>
              {activeCase.unit} — User Query
            </div>
            <div
              className="text-lg leading-relaxed mb-6"
              style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              "{activeCase.question}"
            </div>
            <div className="flex flex-wrap gap-2">
              {activeCase.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: "white",
                    color: "var(--nrma-blue)",
                    fontFamily: "var(--font-mono)",
                    border: "1px solid var(--nrma-light)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Answer */}
          <div
            className="rounded-xl p-8"
            style={{ background: "var(--nrma-navy)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--nrma-cyan)", color: "var(--nrma-navy)" }}
              >
                P
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)" }}
              >
                Perplexity Computer — Synthesised Response
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-body)" }}
            >
              {activeCase.answer}
            </p>
            <div>
              <div
                className="text-xs mb-2"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}
              >
                Sources consulted:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCase.sources.map((src) => (
                  <span
                    key={src}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
