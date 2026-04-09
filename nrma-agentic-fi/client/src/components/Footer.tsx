/* ============================================================
   CTA + Footer — NRMA Executive Command Centre
   Navy background, clean footer
   ============================================================ */
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Mail, Linkedin } from "lucide-react";

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

const toolStack = [
  "Perplexity Computer", "Looker / Cube.dev", "Google BigQuery",
  "n8n", "Oracle NetSuite", "Oracle GFS", "Newbook PMS",
  "Microsoft 365", "SharePoint", "Power Automate", "Shortcut.ai",
];

export default function Footer() {
  const { ref, inView } = useInView();

  return (
    <>
      {/* CTA Section */}
      <section
        id="cta"
        ref={ref}
        className="py-24 diagonal-top"
        style={{ background: "var(--nrma-navy)" }}
      >
        <div className="container">
          <div
            className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mono-label text-white/60 mb-4">Next Steps</div>
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Ready to Build the
              <br />
              <span style={{ color: "var(--nrma-cyan)" }}>Proof of Value?</span>
            </h2>
            <p
              className="text-white/75 text-lg mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
            >
              The NetSuite API connection is already proven. Perplexity Enterprise is already
              onboarded. The first working demo is weeks away, not months.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="mailto:ai@nrma.com.au"
                className="flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "var(--nrma-mid)", fontFamily: "var(--font-body)" }}
              >
                <Mail size={16} />
                Start the Conversation
              </a>
              <button
                onClick={() => document.querySelector("#opportunity")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold border border-white/30 text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Review the Architecture
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Tool stack */}
            <div>
              <div className="mono-label text-white/40 mb-4">Technology Stack</div>
              <div className="flex flex-wrap justify-center gap-2">
                {toolStack.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.7)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 border-t"
        style={{ background: "oklch(0.16 0.07 264)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "var(--nrma-blue)" }}
              >
                N
              </div>
              <span
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
              >
                NRMA AI | Automation Team
              </span>
            </div>
            <div
              className="text-xs text-center"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}
            >
              NRMA Group Technology · Roadside · Parks · SIXT · Marine · Energy · Coral Adventures · Corporate
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/nrma"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
