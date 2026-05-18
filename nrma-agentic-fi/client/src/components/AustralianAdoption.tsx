/* ============================================================
   AustralianAdoption.tsx
   Design: Executive Command Centre — NRMA deep blue on white
   Purpose: Silence internal data sovereignty objections by showing
   peer Australian organisations — with far greater regulatory exposure —
   that have already formally adopted Claude enterprise.
   Sources: Anthropic Sydney office announcement (Mar 2026),
   Australian Govt MOU (Mar 2026), CommBank AI report (Feb 2026),
   Xero–Anthropic partnership (Mar 2026), Canva–Anthropic (Apr 2026)
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { Shield, Building2, ChevronRight, ExternalLink } from "lucide-react";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface Organisation {
  name: string;
  sector: string;
  size: "Large" | "Mid-Market" | "Scale-up";
  sizeColor: string;
  what: string;
  riskContext: string;
  source: string;
  sourceUrl: string;
  date: string;
  highlight: boolean;
}

const orgs: Organisation[] = [
  {
    name: "Commonwealth Bank of Australia",
    sector: "Financial Services",
    size: "Large",
    sizeColor: "#003087",
    what: "Formally published Australia's first bank AI adoption report (Feb 2026). Anthropic named CBA as a key Australian enterprise customer at the Sydney office launch. CBA's 'Compass AI' (Generative AI) is live in production, answering 500,000+ questions since July 2024 across frontline banking teams.",
    riskContext: "Australia's largest bank. Processes 20M+ payments daily. Subject to APRA CPS 234, AUSTRAC, and ASIC oversight. Data classification requirements far exceed NRMA's.",
    source: "CommBank Newsroom + Anthropic Sydney Office Announcement",
    sourceUrl: "https://www.commbank.com.au/articles/newsroom/2026/02/cba-approach-to-adopting-ai-report-announcement.html",
    date: "Feb 2026",
    highlight: true,
  },
  {
    name: "Quantium",
    sector: "Data Analytics / Financial Services",
    size: "Mid-Market",
    sizeColor: "#0055D4",
    what: "Explicitly named by Anthropic as an Australian enterprise customer at the Sydney office launch (Mar 2026). Quantium provides data analytics and AI services to Woolworths, major banks, and insurers — handling some of Australia's most sensitive consumer financial data.",
    riskContext: "Handles consumer financial and health data for Australia's largest retailers and financial institutions. Privacy Act, CDR, and sector-specific data obligations apply.",
    source: "Anthropic Sydney Office Announcement",
    sourceUrl: "https://w.media/anthropic-opens-sydney-office-as-it-explores-ai-infrastructure-expansion/",
    date: "Mar 2026",
    highlight: true,
  },
  {
    name: "Xero",
    sector: "Accounting / SMB Financial Software",
    size: "Large",
    sizeColor: "#003087",
    what: "Signed a multi-year partnership with Anthropic (Mar 2026) to embed Claude directly into Xero's accounting, payroll, and payments platform. Live integration giving millions of small businesses AI-powered financial intelligence inside their accounting software.",
    riskContext: "Holds financial records, payroll data, and tax information for 4M+ businesses globally including hundreds of thousands of Australian SMBs. ATO data obligations apply.",
    source: "Xero–Anthropic Partnership Announcement",
    sourceUrl: "https://blog.xero.com/news-events/anthropic-xero-partnership-claude-ai/",
    date: "Mar 2026",
    highlight: false,
  },
  {
    name: "Canva",
    sector: "SaaS / Creative Technology",
    size: "Large",
    sizeColor: "#003087",
    what: "Anthropic named Canva as a key Australian enterprise customer at the Sydney office launch. Canva subsequently announced a formal collaboration with Anthropic (Apr 2026) to bring Canva into Claude Design — integrating Canva's design tools directly into the Claude AI platform.",
    riskContext: "200M+ users globally. Handles creative IP, brand assets, and business data. Australian HQ with global data flows.",
    source: "Anthropic Sydney Office + Canva–Anthropic Collaboration",
    sourceUrl: "https://www.businesswire.com/news/home/20260410843169/en/Canva-Announces-Anthropic-Collaboration-to-Bring-AI-Powered-Design-to-Millions",
    date: "Mar–Apr 2026",
    highlight: false,
  },
  {
    name: "PwC Australia",
    sector: "Professional Services",
    size: "Large",
    sizeColor: "#003087",
    what: "PwC expanded its global Anthropic alliance (May 2026) to deploy Claude Code and Claude Cowork across its workforce, starting with finance and engineering teams. 30,000 PwC professionals being trained and certified on Claude. PwC Australia is part of this global rollout.",
    riskContext: "Handles M&A, audit, tax, and regulatory data for ASX-listed companies and government. Among the most sensitive professional data environments in Australia.",
    source: "PwC–Anthropic Alliance Expansion",
    sourceUrl: "https://www.pwc.com/us/en/about-us/newsroom/press-releases/anthropic-pwc-expand-alliance-agentic-enterprise.html",
    date: "May 2026",
    highlight: false,
  },
  {
    name: "Australian Federal Government",
    sector: "Government",
    size: "Large",
    sizeColor: "#003087",
    what: "Signed a formal Memorandum of Understanding with Anthropic (Mar 2026) covering AI safety research, economic index data sharing, and collaboration on Australia's National AI Plan. Anthropic CEO Dario Amodei met Prime Minister Albanese in Canberra to formalise the agreement.",
    riskContext: "The highest data classification environment in Australia. ASD, ISM, and Protective Security Policy Framework obligations. If the Australian Government is comfortable formalising a partnership with Anthropic, the data sovereignty question is answered at the highest level.",
    source: "Anthropic + Australian Government MOU",
    sourceUrl: "https://www.anthropic.com/news/australia-MOU",
    date: "Mar 2026",
    highlight: true,
  },
];

const sectorGroups = [
  { label: "Financial Services", count: 2, desc: "CBA, Quantium" },
  { label: "Accounting & Payroll", count: 1, desc: "Xero" },
  { label: "Technology & SaaS", count: 1, desc: "Canva" },
  { label: "Professional Services", count: 1, desc: "PwC" },
  { label: "Government", count: 1, desc: "Australian Federal Govt" },
];

export default function AustralianAdoption() {
  const { ref, inView } = useInView(0.06);
  const [expanded, setExpanded] = useState<string | null>("Commonwealth Bank of Australia");

  return (
    <section id="australian-adoption" ref={ref} className="py-20 md:py-28" style={{ background: "oklch(0.97 0.015 264)" }}>
      <div className="container max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="mono-label mb-4" style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}>
            AUSTRALIAN ENTERPRISE ADOPTION
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 700,
            color: "var(--nrma-navy)",
            lineHeight: 1.15,
          }}>
            If CommBank and the Federal Government
            <br />
            <span style={{ color: "var(--nrma-blue)" }}>have navigated the data question — so can NRMA.</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            The organisations below operate under <strong>significantly greater regulatory and data classification obligations</strong> than NRMA. All have formally adopted Claude enterprise. The data sovereignty question is not theoretical — it has been answered in production.
          </p>
        </div>

        {/* Sector summary pills */}
        <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {sectorGroups.map(s => (
            <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ background: "white", border: "1px solid oklch(0.88 0.025 264)", color: "var(--nrma-navy)", fontFamily: "var(--font-mono)" }}>
              <Building2 size={11} />
              <span className="font-semibold">{s.label}</span>
              <span style={{ color: "#6b7280" }}>— {s.desc}</span>
            </div>
          ))}
        </div>

        {/* Organisation accordion cards */}
        <div className={`space-y-3 mb-12 transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {orgs.map((org) => {
            const isOpen = expanded === org.name;
            return (
              <div
                key={org.name}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: "white",
                  border: `1.5px solid ${isOpen ? "var(--nrma-blue)" : "oklch(0.90 0.02 264)"}`,
                  boxShadow: isOpen ? "0 4px 24px -8px rgba(0,48,135,0.15)" : "0 1px 4px -1px rgba(0,0,0,0.06)",
                }}
              >
                {/* Card header — always visible */}
                <button
                  className="w-full text-left px-5 py-4 flex items-start gap-4"
                  onClick={() => setExpanded(isOpen ? null : org.name)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-sm md:text-base" style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}>
                        {org.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${org.sizeColor}12`, color: org.sizeColor, fontFamily: "var(--font-mono)" }}>
                        {org.size}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "oklch(0.95 0.015 264)", color: "#6b7280", fontFamily: "var(--font-mono)" }}>
                        {org.sector}
                      </span>
                      {org.highlight && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#dcfce7", color: "#16a34a", fontFamily: "var(--font-mono)" }}>
                          Named by Anthropic
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500" style={{ fontFamily: "var(--font-mono)" }}>{org.date} · {org.source}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="shrink-0 mt-1 transition-transform duration-200"
                    style={{ color: "var(--nrma-blue)", transform: isOpen ? "rotate(90deg)" : "none" }}
                  />
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t" style={{ borderColor: "oklch(0.92 0.02 264)" }}>
                    <div className="grid md:grid-cols-2 gap-5 pt-4">
                      <div>
                        <div className="text-xs font-semibold mb-2" style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}>
                          WHAT THEY'VE DONE
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                          {org.what}
                        </p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: "#dc2626", fontFamily: "var(--font-mono)" }}>
                          <Shield size={11} />
                          THEIR REGULATORY EXPOSURE
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)" }}>
                          {org.riskContext}
                        </p>
                        <a
                          href={org.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                          style={{ color: "var(--nrma-blue)", fontFamily: "var(--font-mono)" }}
                        >
                          <ExternalLink size={11} />
                          View source
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sovereignty callout */}
        <div className={`rounded-xl overflow-hidden transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ background: "var(--nrma-navy)" }}>
          <div className="px-6 md:px-8 py-7">
            <div className="text-xs mb-4" style={{ color: "var(--nrma-cyan)", fontFamily: "var(--font-mono)" }}>
              THE DATA SOVEREIGNTY ARGUMENT — SETTLED
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Government-Level Endorsement",
                  desc: "The Australian Federal Government signed a formal MOU with Anthropic in March 2026. If the highest data classification environment in Australia is comfortable with this partnership, NRMA's internal risk threshold is well within scope.",
                  accent: "var(--nrma-cyan)",
                },
                {
                  title: "APRA-Regulated Banks Are Live",
                  desc: "Commonwealth Bank — subject to APRA CPS 234, AUSTRAC, and ASIC oversight, processing 20M payments daily — has Claude in production and published a formal AI adoption report. NRMA's financial data obligations are materially lower.",
                  accent: "#60a5fa",
                },
                {
                  title: "AWS Bedrock Sydney Path Exists",
                  desc: "For teams requiring strict in-region processing, Claude is available via AWS Bedrock in ap-southeast-2 (Sydney). NRMA's existing AWS Marketplace subscription likely already grants Bedrock model access — a configuration change, not a new procurement.",
                  accent: "#fbbf24",
                },
              ].map(item => (
                <div key={item.title}>
                  <div className="text-xs font-semibold mb-2" style={{ color: item.accent, fontFamily: "var(--font-mono)" }}>
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

      </div>
    </section>
  );
}
