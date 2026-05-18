/* ============================================================
   Home Page — NRMA Agentic Financial Intelligence
   Assembles all sections in order
   ============================================================ */
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Opportunity from "@/components/Opportunity";
import Architecture from "@/components/Architecture";
import UseCases from "@/components/UseCases";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import FoundationSetup from "@/components/FoundationSetup";
import SemanticLayer from "@/components/SemanticLayer";
import RoutingIntelligence from "@/components/RoutingIntelligence";
import ToolLandscape from "@/components/ToolLandscape";
import QuickJump from "@/components/QuickJump";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <QuickJump />
      <Hero />
      <Opportunity />
      <Architecture />
      <RoutingIntelligence />
      <SemanticLayer />
      <UseCases />
      <Roadmap />
      <ToolLandscape />
      <FoundationSetup />
      <Footer />
    </div>
  );
}
