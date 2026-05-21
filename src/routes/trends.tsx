import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, LineChart, Line, Legend } from "recharts";
import { useState } from "react";

export const Route = createFileRoute("/trends")({ component: TrendsPage });

const inDemand = [
  { name: "Software Developer", count: 3120 }, { name: "Data Analyst", count: 2440 },
  { name: "Nurse", count: 2010 }, { name: "Designer", count: 1820 },
  { name: "PM", count: 1610 }, { name: "Marketer", count: 1480 },
  { name: "Cybersec", count: 1250 }, { name: "Engineer", count: 1180 },
  { name: "Analyst", count: 1080 }, { name: "Sales", count: 980 },
];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const volumeData = months.map((m, i) => ({
  month: m,
  Software: 800 + i * 30 + Math.round(Math.random() * 100),
  Data: 600 + i * 20 + Math.round(Math.random() * 100),
  Design: 500 + i * 10 + Math.round(Math.random() * 80),
  PM: 400 + i * 15 + Math.round(Math.random() * 80),
  Marketing: 450 + i * 12 + Math.round(Math.random() * 80),
}));

function TrendsPage() {
  const [active, setActive] = useState<string[]>(["Software","Data","Design","PM","Marketing"]);
  const toggle = (k: string) => setActive((a) => a.includes(k) ? a.filter((x) => x !== k) : [...a, k]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Occupation Trends</h1>
      <p className="text-muted-foreground mt-2">Live data on careers and skills worldwide.</p>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-4">Top 10 Most In-Demand</h2>
        <div style={{ height: 380 }}>
          <ResponsiveContainer>
            <BarChart data={inDemand} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid stroke="#2A2A3E" strokeDasharray="3 3" />
              <XAxis type="number" stroke="#888" />
              <YAxis type="category" dataKey="name" stroke="#888" width={110} />
              <Tooltip contentStyle={{ background: "#1A1A2E", border: "1px solid #2A2A3E" }} />
              <Bar dataKey="count" fill="#6C63FF" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-4">Posting Volume — Last 12 months</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {["Software","Data","Design","PM","Marketing"].map((k) => (
            <button key={k} onClick={() => toggle(k)} className={`px-3 py-1 rounded-full text-xs ${active.includes(k) ? "btn-gradient" : "border border-border"}`}>{k}</button>
          ))}
        </div>
        <div style={{ height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={volumeData}>
              <CartesianGrid stroke="#2A2A3E" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ background: "#1A1A2E", border: "1px solid #2A2A3E" }} />
              <Legend />
              {active.includes("Software") && <Line dataKey="Software" stroke="#6C63FF" strokeWidth={2} />}
              {active.includes("Data") && <Line dataKey="Data" stroke="#00D4AA" strokeWidth={2} />}
              {active.includes("Design") && <Line dataKey="Design" stroke="#FF6B35" strokeWidth={2} />}
              {active.includes("PM") && <Line dataKey="PM" stroke="#facc15" strokeWidth={2} />}
              {active.includes("Marketing") && <Line dataKey="Marketing" stroke="#ef4444" strokeWidth={2} />}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-4">Top Skills Demand</h2>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-muted-foreground border-b border-border"><th className="p-2">#</th><th className="p-2">Skill</th><th className="p-2">Demand</th><th className="p-2">YoY</th><th className="p-2">Salary +</th></tr></thead>
          <tbody>
            {[["1","Python","Very High","+18%","+12%"],["2","React","Very High","+22%","+15%"],["3","AWS","High","+25%","+18%"],["4","Figma","High","+14%","+10%"],["5","SQL","High","+8%","+6%"],["6","TypeScript","High","+30%","+14%"],["7","Power BI","Medium","+12%","+8%"],["8","Kubernetes","High","+28%","+20%"]].map((r) => (
              <tr key={r[1]} className="border-b border-border"><td className="p-2">{r[0]}</td><td className="p-2 font-semibold">{r[1]}</td><td className="p-2">{r[2]}</td><td className="p-2 text-secondary">{r[3]}</td><td className="p-2 text-[#FF6B35]">{r[4]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {["AI Engineer","Prompt Engineer","Sustainability Manager","Robotics Specialist"].map((r) => (
          <div key={r} className="bg-card border border-border rounded-2xl p-5">
            <span className="text-xs px-2 py-1 rounded bg-[#FF6B35]/15 text-[#FF6B35]">Emerging</span>
            <h3 className="font-bold mt-3">{r}</h3>
            <p className="text-xs text-muted-foreground mt-1">Growing 3x faster than market average.</p>
          </div>
        ))}
      </div>
    </div>
  );
}