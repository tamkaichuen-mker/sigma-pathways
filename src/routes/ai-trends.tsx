import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Cell } from "recharts";

export const Route = createFileRoute("/ai-trends")({ component: AiTrendsPage });

const data = [
  { name: "Software Developer", risk: 18, reason: "AI augments developers, doesn't replace them" },
  { name: "Data Analyst", risk: 35, reason: "Repetitive analysis automatable" },
  { name: "UX/UI Designer", risk: 22, reason: "Creative judgment still required" },
  { name: "Cybersecurity Analyst", risk: 12, reason: "Threat landscape evolves faster than AI" },
  { name: "Business Analyst", risk: 41, reason: "Reporting tasks increasingly automated" },
  { name: "Digital Marketer", risk: 38, reason: "AI content generation widespread" },
  { name: "Registered Nurse", risk: 8, reason: "Physical and emotional patient care" },
  { name: "Mechanical Engineer", risk: 29, reason: "Design tools augmented by AI" },
  { name: "Financial Analyst", risk: 52, reason: "Quant tasks automatable" },
  { name: "Content Writer", risk: 61, reason: "Generative AI handles many text tasks" },
  { name: "Graphic Designer", risk: 44, reason: "AI image tools growing" },
  { name: "Customer Service Rep", risk: 71, reason: "Chatbots handle Tier-1 cases" },
  { name: "Data Entry Clerk", risk: 89, reason: "Highly automatable" },
  { name: "Translator", risk: 63, reason: "Neural translation strong" },
  { name: "Truck Driver", risk: 55, reason: "Autonomous tech approaching" },
];

function color(r: number) { return r < 30 ? "#00D4AA" : r <= 60 ? "#FF6B35" : "#ef4444"; }

function AiTrendsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<"All" | "Low" | "Medium" | "High">("All");

  const filtered = useMemo(() => data.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter === "Low" && d.risk >= 30) return false;
    if (riskFilter === "Medium" && (d.risk < 30 || d.risk > 60)) return false;
    if (riskFilter === "High" && d.risk <= 60) return false;
    return true;
  }), [search, riskFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">AI Career Impact Analyzer</h1>
      <p className="text-muted-foreground mt-2">See how AI is reshaping every occupation.</p>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search any occupation, skill, or industry..." className="w-full px-4 py-3 bg-input border border-border rounded-xl" />
        <div className="flex flex-wrap gap-2 mt-4">
          {(["All","Low","Medium","High"] as const).map((r) => (
            <button key={r} onClick={() => setRiskFilter(r)} className={`px-4 py-1.5 rounded-full text-sm transition ${riskFilter === r ? "btn-gradient text-white" : "border border-border"}`}>{r}</button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Showing {filtered.length} occupations</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-4">AI Disruption Risk by Occupation</h2>
        <div style={{ width: "100%", height: Math.max(300, filtered.length * 35) }}>
          <ResponsiveContainer>
            <BarChart data={filtered} layout="vertical" margin={{ left: 60, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
              <XAxis type="number" domain={[0, 100]} stroke="#888" />
              <YAxis type="category" dataKey="name" width={140} stroke="#888" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#1A1A2E", border: "1px solid #2A2A3E" }} formatter={(v: any, _n, p: any) => [`${v}% — ${p.payload.reason}`, "Risk"]} />
              <Bar dataKey="risk" radius={[0, 8, 8, 0]}>
                {filtered.map((d, i) => <Cell key={i} fill={color(d.risk)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {([["Low Risk","Low","🟢","Resilient to AI for the next decade."],["Medium Risk","Medium","🟡","Tasks partially augmented or automated."],["High Risk","High","🔴","Highly automatable — re-skill recommended."]] as const).map(([t, f, e, d]) => (
          <button key={t} onClick={() => setRiskFilter(f as any)} className="bg-card border border-border rounded-2xl p-5 text-left card-hover">
            <div className="text-2xl">{e}</div>
            <h3 className="font-bold mt-2">{t}</h3>
            <p className="text-sm text-muted-foreground mt-1">{d}</p>
            <ul className="text-xs mt-3 space-y-1">{data.filter((x) => f === "Low" ? x.risk < 30 : f === "Medium" ? x.risk >= 30 && x.risk <= 60 : x.risk > 60).slice(0, 4).map((x) => <li key={x.name}>• {x.name}</li>)}</ul>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-3">AI-Proof Skills</h3>
          <div className="flex flex-wrap gap-2">{["Empathy","Leadership","Creativity","Critical Thinking","Strategic Vision","Negotiation","Ethics","Mentorship"].map((s) => <span key={s} className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-sm">{s}</span>)}</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-bold mb-3">AI-Amplifying Skills</h3>
          <div className="flex flex-wrap gap-2">{["Prompt Engineering","ML Basics","Data Literacy","AI Tooling","Workflow Automation","Domain Expertise"].map((s) => <span key={s} className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm">{s}</span>)}</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 mt-6">
        <h3 className="font-bold mb-3">Location Impact</h3>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-muted-foreground"><th className="p-2">Region</th><th className="p-2">AI Adoption</th><th className="p-2">Tech Density</th><th className="p-2">Avg Risk</th></tr></thead>
          <tbody>
            {[["North America","High","Very High","42%"],["Europe","High","High","38%"],["Asia-Pacific","Medium","High","45%"],["Southeast Asia","Growing","Medium","48%"],["Latin America","Emerging","Low","52%"]].map((r) => (
              <tr key={r[0]} className="border-b border-border"><td className="p-2">{r[0]}</td><td className="p-2">{r[1]}</td><td className="p-2">{r[2]}</td><td className="p-2">{r[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}