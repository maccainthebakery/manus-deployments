/**
 * QuickJump.tsx
 * Design: Executive Command Centre — NRMA deep blue on white
 * Two prominent sticky quick-jump buttons that appear after scrolling past the hero,
 * allowing users to jump directly to "What Can You Ask?" or "Foundation Setup"
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Wrench, ArrowRight } from "lucide-react";

export default function QuickJump() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~80% of the viewport height (past the hero)
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-2"
        >
          {/* Backdrop pill */}
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl shadow-slate-900/10 rounded-full px-3 py-2">
            {/* Label */}
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1 pr-2 hidden sm:block">
              Jump to
            </span>

            {/* Button 1 — What Can You Ask */}
            <button
              onClick={() => scrollTo("#usecases")}
              className="group flex items-center gap-2 bg-[#003087] hover:bg-[#00246b] text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/30 hover:scale-105 active:scale-95"
            >
              <MessageSquareText className="w-4 h-4 flex-shrink-0" />
              <span>What Can You Ask?</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-200 mx-1" />

            {/* Button 2 — Foundation Setup */}
            <button
              onClick={() => scrollTo("#foundation")}
              className="group flex items-center gap-2 bg-white hover:bg-slate-50 text-[#003087] border-2 border-[#003087] text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/15 hover:scale-105 active:scale-95"
            >
              <Wrench className="w-4 h-4 flex-shrink-0" />
              <span>Foundation Setup</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all duration-150" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
