/* ============================================================
   Navbar — NRMA Executive Command Centre
   White background, NRMA navy text, sticky with blur on scroll
   ============================================================ */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "The Opportunity", href: "#opportunity" },
  { label: "Architecture", href: "#architecture" },
  { label: "Semantic Layer", href: "#semantic-layer" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Foundation Setup", href: "#foundation" },
  { label: "Get Started", href: "#cta" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-blue-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "var(--nrma-navy)" }}
            >
              N
            </div>
            <div>
              <div
                className="font-semibold text-sm leading-tight"
                style={{ color: "var(--nrma-navy)", fontFamily: "var(--font-body)" }}
              >
                NRMA AI | Automation Team
              </div>
              <div className="mono-label" style={{ fontSize: "0.6rem" }}>
                NRMA Group Technology
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                  link.label === "Get Started"
                    ? "text-white px-4 py-2 rounded"
                    : "hover:bg-blue-50"
                }`}
                style={
                  link.label === "Get Started"
                    ? { background: "var(--nrma-navy)", color: "white" }
                    : { color: "var(--nrma-navy)" }
                }
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded"
            style={{ color: "var(--nrma-navy)" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-blue-100 shadow-lg">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left px-3 py-3 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
                style={{ color: "var(--nrma-navy)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
