/* ============================================================
   Opportunity Section — The Strategic Case
   White background, asymmetric layout, large section number
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Database, Brain, Zap } from "lucide-react";

const DATA_VIZ = "https://d2xsxph8kpxj0f.cloudfront.net/103634151/CmuVA5ApCb5wTs9cfXR3Hi/nrma-data-visual-3pebTYbKbQJa2KGsDsMto7.webp";

const pillars = [
  {
    icon: Brain,
    title: "LLM-Agnostic Reasoning",
    body: "Perplexity Computer routes queries to the best available model — Claude, GPT-4o, Sonar — without lock-in. Your investment is in the architecture, not a single vendor.",
  },
  {
    icon: Database,
    title: "Multi-ERP Unification",
    body: "NetSuite, Oracle GFS, and Newbook each hold fragments of the financial truth. The agentic layer unifies them into a single conversational interface for the first time.",
  },
  {
    icon: TrendingUp,
    title: "Financial Analyst Capability",
    body: "Ask natural language questions — 'What is our parks revenue vs. budget YTD?' — and receive synthesised, cited answers drawn from live ERP and BigQuery data.",
  },
  {
    icon: Zap,
    title: "Built on Existing Infrastructure",
    body: "Your Microsoft 365 connectors, SharePoint, Power Automate, and Google BigQuery are already in place. This strategy layers intelligence on top, not alongside.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Opportunity() {
  const { ref, inView } = useInView();

  return (
    <section id="opportunity" className="py-24 bg-white" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div className="flex items-start gap-6 mb-16">
          <span
            className="hidden md:block text-8xl font-bold leading-none select-none"
            style={{ color: "var(--nrma-tint)", fontFamily: "var(--font-display)" }}
          >
            01
          </span>
          <div>
            <div className="mono-label mb-3">The Strategic Opportunity</div>
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
              A Goldmine Hidden
              <br />
              Across Three ERPs
            </h2>
            <p
              className="text-gray-600 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
            >
              NRMA Group Technology operates across Roadside, Parks, SIXT, Marine, Energy,
              Coral Adventures, and Corporate — each with its own ERP, its own data, and its
              own reporting cadence. The opportunity is to create a single agentic layer that
              speaks to all of them simultaneously.
            </p>
          </div>
        </div>

        {/* Two-column: pillars + image */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`layer-card p-5 rounded-r-lg transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p.icon
                  size={20}
                  className="mb-3"
                  style={{ color: "var(--nrma-blue)" }}
                />
                <h4
                  className="font-semibold text-sm mb-2"
                  style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}
                >
                  {p.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          <div
            className={`relative rounded-xl overflow-hidden transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <img
              src={DATA_VIZ}
              alt="Data intelligence visualisation"
              className="w-full h-72 md:h-96 object-cover rounded-xl"
            />
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.22 0.08 264 / 0.4) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-6 left-6">
              <div className="mono-label text-white/80 mb-1">Current State</div>
              <div
                className="text-white font-semibold text-lg"
                style={{ fontFamily: "var(--font-display)" }}
              >
                3 ERPs. 1 Question.
                <br />
                Zero unified answer.
              </div>
            </div>
          </div>
        </div>

        {/* Challenge callout */}
        <div
          className={`mt-16 p-8 rounded-xl transition-all duration-700 delay-400 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ background: "var(--nrma-tint)", borderLeft: "4px solid var(--nrma-blue)" }}
        >
          <div className="mono-label mb-2">The Core Challenge</div>
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl"
            style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}
          >
            "What is our total group revenue this month, broken down by business unit, compared
            to the same period last year, adjusted for FX?" — This question currently requires
            three separate logins, two Excel exports, and a finance analyst with half a day to
            spare. With the agentic layer, it becomes a 10-second conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
