/**
 * FoundationSetup.tsx
 * Design: Executive Command Centre — NRMA deep blue (#003087) on white
 * Role-filtered step-by-step guide for NetSuite admins and SO team
 * to establish the MCP plumbing before Perplexity integration
 */

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Settings,
  Users,
  Layers,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Plug,
  FlaskConical,
  AlertCircle,
  Info,
} from "lucide-react";

type Role = "all" | "admin" | "team";

interface Step {
  id: number;
  role: "admin" | "team" | "both";
  phase: string;
  title: string;
  description: string;
  details: (string | undefined)[];
  note?: string;
  code?: string;
  badge?: string;
}

const steps: Step[] = [
  {
    id: 1,
    role: "admin",
    phase: "NetSuite Sandbox",
    title: "Install the MCP Standard Tools SuiteApp",
    description:
      "Deploy Oracle's free MCP Standard Tools SuiteApp into your NetSuite sandbox account. This exposes the pre-built tools for SuiteQL queries, record reads, saved searches, and reports — no custom development required.",
    details: [
      "Log into your NetSuite sandbox account (not production)",
      "Navigate to SuiteApp Marketplace (Customisation > SuiteApp Marketplace)",
      "Search for MCP Standard Tools",
      "Click Install — the SuiteApp is free with no additional Oracle licensing",
      "Confirm installation completes without errors",
    ],
    badge: "Free — No Licensing Cost",
    note:
      'The AI Connector Service is not a paid feature. Oracle confirmed: NetSuite AI Connector Service is not a paid feature. MCP Standard Tools is a free SuiteApp.',
  },
  {
    id: 2,
    role: "admin",
    phase: "NetSuite Sandbox",
    title: "Enable Required Account Features",
    description:
      "Three features must be enabled in the sandbox account before the MCP connector will function. These are standard NetSuite platform features.",
    details: [
      "Go to Setup → Company → Enable Features → SuiteCloud tab",
      "Enable Server SuiteScript",
      "Enable REST Web Services",
      "Enable OAuth 2.0",
      "Save changes",
    ],
    note:
      'Do not use the Administrator role for the MCP connection — Oracle explicitly states it will not work. A custom role is required (see next step).',
  },
  {
    id: 3,
    role: "admin",
    phase: "NetSuite Sandbox",
    title: "Create a Dedicated MCP Integration Role",
    description:
      "Create a custom NetSuite role with read-only financial permissions for the AI integration. This is the security boundary — the AI can only see what this role can see.",
    details: [
      "Go to Setup → Users/Roles → Manage Roles → New",
      "Name the role: AI Integration — Read Only (or similar)",
      "Assign permissions: MCP Server Connection, OAuth 2.0 Access Tokens",
      "Add read permissions for: Transactions, Financial Reports, Saved Searches, SuiteQL",
      "Do NOT grant write or delete permissions for the PoV",
      "Assign the role to the integration user account",
    ],
    note:
      'Role-based security means the AI cannot access data beyond what this role permits. Start restrictive — you can expand permissions after the PoV validates the approach.',
  },
  {
    id: 4,
    role: "admin",
    phase: "NetSuite Sandbox",
    title: "Create the OAuth 2.0 Integration Record",
    description:
      "Register Perplexity as an authorised OAuth 2.0 client in NetSuite. This generates the Client ID and Client Secret needed for the Perplexity connector setup.",
    details: [
      "Go to Setup → Integration → Manage Integrations → New",
      "Name: Perplexity AI Connector — Sandbox",
      "Enable: Authorization Code Grant with PKCE",
      "Set Token-Based Authentication: Enabled",
      "Redirect URI: https://www.perplexity.ai/oauth/callback (confirm with SO team)",
      "Save and note the Client ID and Client Secret — share securely with SO team",
    ],
    code: "MCP Server URL format:\nhttps://<sandboxaccountid>.suitetalk.api.netsuite.com/services/mcp/v1/all\n\nReplace <sandboxaccountid> with your sandbox account ID\n(found in Setup → Company → Company Information)",
    note:
      'The /all suffix is required. Without it, the connection will appear disconnected even if OAuth succeeds.',
  },
  {
    id: 5,
    role: "admin",
    phase: "NetSuite Sandbox",
    title: "Validate the MCP Endpoint is Reachable",
    description:
      "Before handing over to the SO team, confirm the MCP server URL responds correctly. A simple browser or curl test confirms the endpoint is live.",
    details: [
      "Open a browser and navigate to your MCP server URL (you will be prompted to authenticate)",
      "Confirm the OAuth login flow completes without errors",
      "Confirm the endpoint returns a list of available tools",
      "Document the sandbox account ID and MCP URL for the SO team",
      "Share the Client ID, Client Secret, and MCP URL securely (not via email — use a password manager or secure channel)",
    ],
    badge: "Handover Point",
    note:
      'Once this step is complete, the NetSuite admin work is done. The SO team takes over from here.',
  },
  {
    id: 6,
    role: "team",
    phase: "Perplexity Enterprise",
    title: "Add NetSuite as a Custom Remote Connector",
    description:
      "In your Perplexity Enterprise tenant, add the NetSuite sandbox as a custom MCP remote connector. You will need the MCP URL, Client ID, and Client Secret from the NetSuite admin.",
    details: [
      "Log into app.perplexity.ai with your Enterprise account",
      "Go to Settings → Connectors → Add Custom Remote Connector",
      "Enter the NetSuite MCP Server URL provided by the admin",
      "Select OAuth 2.0 as the authentication method",
      "Enter the Client ID and Client Secret",
      "Complete the OAuth authorisation flow — you will be redirected to NetSuite to approve",
      "Confirm the connector shows as Connected",
    ],
    note:
      'Perplexity supports the MCP 2025-06-18 protocol with Streamable HTTP transport and OAuth 2.0 PKCE — fully compatible with NetSuite requirements.',
  },
  {
    id: 7,
    role: "team",
    phase: "Perplexity Enterprise",
    title: "Verify Tool Discovery",
    description:
      "Confirm Perplexity can see and describe all available NetSuite MCP tools. This is the first validation that the full stack is working end-to-end.",
    details: [
      "Open a new Perplexity Computer session",
      "Enable the NetSuite connector for the session",
      "Run the first test prompt (see below)",
      "Confirm Perplexity returns a list of tools including SuiteQL query, record read, saved search",
      'If no tools appear, check with the admin that the /all suffix is in the URL',
    ],
    code: 'Test Prompt 1 — Connectivity:\n"List all available tools from the NetSuite connector and describe what each one does."\n\nExpected: Perplexity returns netsuite_suiteql_query,\nnetsuite_get_record, netsuite_saved_search with descriptions.',
    badge: "Test Call 1",
  },
  {
    id: 8,
    role: "team",
    phase: "Perplexity Enterprise",
    title: "Run Live Financial Data Query",
    description:
      "Validate that SuiteQL executes correctly and returns live sandbox financial data. This confirms role-based security is working and data is flowing through the MCP layer.",
    details: [
      "Run the second test prompt in a Perplexity Computer session",
      "Confirm the response includes actual data from the sandbox (not a hallucination)",
      "Check that the data respects the role permissions set by the admin",
      "Note any subsidiaries or cost centres visible — these should match the role's access scope",
    ],
    code: 'Test Prompt 2 — Data Access:\n"Using NetSuite, show me total revenue by subsidiary\nfor the current financial year to date, in AUD."\n\nExpected: Perplexity calls netsuite_suiteql_query,\nreturns a table of subsidiaries with AUD revenue figures.',
    badge: "Test Call 2",
  },
  {
    id: 9,
    role: "team",
    phase: "Perplexity Enterprise",
    title: "Validate Analyst-Grade Reasoning",
    description:
      "The final validation test confirms Perplexity can orchestrate multiple sequential MCP calls, synthesise the results, and produce a financial analyst-style narrative — not just a data dump.",
    details: [
      "Run the third test prompt in a Perplexity Computer session",
      "Confirm Perplexity makes multiple tool calls (visible in the reasoning trace)",
      "Confirm the output includes a narrative explanation, not just raw numbers",
      "Capture the output — this is your CTO demo material",
      "Document any data quality issues or gaps for the admin to address",
    ],
    code: 'Test Prompt 3 — Reasoning:\n"Compare total operating costs for Q3 FY2025 vs Q3 FY2024\nusing NetSuite data. Identify the top 3 cost categories\nthat increased year-on-year and suggest possible drivers."\n\nExpected: Multi-step reasoning, comparative table,\nnarrative analysis with suggested drivers.',
    badge: "Test Call 3 — CTO Demo",
    note:
      'This is the money shot. If Perplexity returns a coherent analyst-grade narrative from live NetSuite sandbox data, the PoV is proven and you have a compelling case for production rollout.',
  },
];

const roleFilters: { value: Role; label: string; icon: ReactNode; desc: string }[] = [
  {
    value: "all",
    label: "Full Setup Guide",
    icon: <Layers className="w-4 h-4" />,
    desc: "All steps for both teams",
  },
  {
    value: "admin",
    label: "NetSuite Admin",
    icon: <Settings className="w-4 h-4" />,
    desc: "Sandbox plumbing & OAuth",
  },
  {
    value: "team",
    label: "SO Team",
    icon: <Users className="w-4 h-4" />,
    desc: "Perplexity connector & test calls",
  },
];

const phaseColors: Record<string, string> = {
  "NetSuite Sandbox": "bg-blue-100 text-blue-800",
  "Perplexity Enterprise": "bg-indigo-100 text-indigo-800",
};

const badgeColors: Record<string, string> = {
  "Free — No Licensing Cost": "bg-emerald-100 text-emerald-800",
  "Handover Point": "bg-amber-100 text-amber-800",
  "Test Call 1": "bg-violet-100 text-violet-800",
  "Test Call 2": "bg-violet-100 text-violet-800",
  "Test Call 3 — CTO Demo": "bg-rose-100 text-rose-800",
};

export default function FoundationSetup() {
  const [activeRole, setActiveRole] = useState<Role>("all");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const filteredSteps = steps.filter(
    (s) => activeRole === "all" || s.role === activeRole || s.role === "both"
  );

  return (
    <section id="foundation" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #003087 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-[#003087]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#003087]">
              Getting Started
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="text-4xl lg:text-5xl font-bold text-[#003087] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Foundation Setup
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl leading-relaxed">
                Before Perplexity Computer can interrogate NetSuite data, two teams need to
                establish the plumbing. NetSuite admins configure the sandbox and OAuth layer.
                The SO team connects the Perplexity Enterprise tenant and validates the stack
                with three test calls.
              </p>
            </div>
            {/* Cost callout */}
            <div className="flex-shrink-0 bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Zero Additional Cost</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  NetSuite MCP is free. Perplexity Enterprise covers the AI layer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {roleFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveRole(filter.value)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                activeRole === filter.value
                  ? "bg-[#003087] border-[#003087] text-white shadow-lg shadow-blue-900/20"
                  : "bg-white border-slate-200 text-slate-600 hover:border-[#003087] hover:text-[#003087]"
              }`}
            >
              {filter.icon}
              <span>{filter.label}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeRole === filter.value
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {filter.desc}
              </span>
            </button>
          ))}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRole}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {filteredSteps.map((step, idx) => {
              const isExpanded = expandedStep === step.id;
              const isAdmin = step.role === "admin";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                    isExpanded
                      ? "border-[#003087] shadow-lg shadow-blue-900/10"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Step header — always visible */}
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className="w-full text-left px-6 py-5 flex items-start gap-5 bg-white hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Step number */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        isAdmin
                          ? "bg-[#003087] text-white"
                          : "bg-indigo-600 text-white"
                      }`}
                    >
                      {step.id}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {/* Phase badge */}
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${phaseColors[step.phase]}`}
                        >
                          {step.phase}
                        </span>
                        {/* Role badge */}
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            isAdmin
                              ? "bg-blue-50 text-blue-700"
                              : "bg-indigo-50 text-indigo-700"
                          }`}
                        >
                          {isAdmin ? "NetSuite Admin" : "SO Team"}
                        </span>
                        {/* Special badge */}
                        {step.badge && (
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColors[step.badge] || "bg-slate-100 text-slate-700"}`}
                          >
                            {step.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {step.description}
                      </p>
                    </div>

                    {/* Expand icon */}
                    <div
                      className={`flex-shrink-0 mt-1 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                    >
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 bg-slate-50/60 border-t border-slate-100">
                          {/* Checklist */}
                          <div className="mb-5">
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="w-4 h-4 text-[#003087]" />
                              <span className="text-xs font-semibold uppercase tracking-wider text-[#003087]">
                                Steps
                              </span>
                            </div>
                            <ol className="space-y-2.5">
                              {step.details.map((detail, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#003087]/10 text-[#003087] text-xs font-bold flex items-center justify-center mt-0.5">
                                    {i + 1}
                                  </span>
                                  <span className="text-sm text-slate-700 leading-relaxed">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Code block */}
                          {step.code && (
                            <div className="mb-5">
                              <div className="flex items-center gap-2 mb-2">
                                <Terminal className="w-4 h-4 text-slate-500" />
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                  Reference
                                </span>
                              </div>
                              <pre className="bg-[#001a4d] text-blue-100 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre-wrap">
                                {step.code}
                              </pre>
                            </div>
                          )}

                          {/* Note */}
                          {step.note && (
                            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-amber-800 leading-relaxed">
                                {step.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom callout */}
        <div className="mt-12 bg-gradient-to-r from-[#003087] to-[#0050b3] rounded-2xl p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">
              Sandbox First. Production Never Touched.
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              The entire PoV runs against the NetSuite sandbox environment. Production data is
              never exposed during validation. Once all three test calls return clean results,
              the architecture is proven and a controlled production rollout can be scoped with
              full confidence.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-3">
            <Plug className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Zero Production Risk</span>
          </div>
        </div>
      </div>
    </section>
  );
}
