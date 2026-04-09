/* ============================================================
   Hero — NRMA Executive Command Centre
   Full-bleed navy hero with network background image,
   large Playfair Display headline, animated KPI strip
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/103634151/CmuVA5ApCb5wTs9cfXR3Hi/nrma-hero-bg-k4JgDoMqGC8ftU7gLcXiun.webp";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const stats = [
  { value: 6, suffix: "+", label: "Business Units" },
  { value: 3, suffix: "", label: "ERP Systems" },
  { value: 1, suffix: "", label: "Unified AI Layer" },
  { value: 100, suffix: "%", label: "LLM Agnostic" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollDown = () => {
    const el = document.querySelector("#opportunity");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: "var(--nrma-navy)",
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.35,
        }}
      />

      {/* Diagonal bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-white"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`mono-label text-white/70 mb-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            NRMA AI | Automation Team &mdash; Group Technology Strategy
          </div>

          {/* Headline */}
          <h1
            className={`text-white mb-6 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Agentic Financial
            <br />
            <span style={{ color: "var(--nrma-cyan)" }}>Intelligence</span>
            <br />
            for NRMA
          </h1>

          {/* Sub-headline */}
          <p
            className={`text-white/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ fontFamily: "var(--font-body)", fontWeight: 300 }}
          >
            A unified agentic layer — powered by Perplexity Computer — connecting
            NetSuite, Oracle GFS, Newbook, BigQuery, and Microsoft 365 to deliver
            financial analyst-grade insights across every business unit.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <button
              onClick={() => document.querySelector("#opportunity")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "var(--nrma-mid)", fontFamily: "var(--font-body)" }}
            >
              Explore the Opportunity
            </button>
            <button
              onClick={() => document.querySelector("#architecture")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded text-sm font-semibold border border-white/40 text-white transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              View Architecture
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} visible={visible} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
}

function StatCard({ stat, visible }: { stat: typeof stats[0]; visible: boolean }) {
  const count = useCountUp(stat.value, 1600, visible);
  return (
    <div className="text-center">
      <div className="stat-number text-white">
        {count}{stat.suffix}
      </div>
      <div className="mono-label text-white/60 mt-1">{stat.label}</div>
    </div>
  );
}
