import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getUniversity } from "@/data/universities";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Award, MapPin, Star } from "lucide-react";

export const Route = createFileRoute("/universities/$id")({
  component: UniDetail,
});

const tabs = ["Overview", "Courses", "Scholarships", "Rankings", "Reviews"] as const;

function UniDetail() {
  const { id } = Route.useParams();
  const u = getUniversity(id);
  const [tab, setTab] = useState<typeof tabs[number]>("Overview");

  if (!u) return <div className="p-20 text-center"><Link to="/universities" className="text-primary">Back to universities</Link></div>;

  const rankHistory = [2019, 2020, 2021, 2022, 2023, 2024, 2025].map((y, i) => ({ year: y, rank: Math.max(1, u.qsRank + (3 - i) * 5) }));

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-white">{u.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{u.name}</h1>
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {u.city}, {u.country}</div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded bg-primary/15 text-primary text-sm"><Award className="w-4 h-4" /> {u.qsLabel}</span>
              {u.scholarship && <span className="px-3 py-1 rounded bg-[#FF6B35]/15 text-[#FF6B35] text-sm">Scholarships</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Follow</button>
            <button className="px-4 py-2 rounded-lg border border-border text-sm">Compare</button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 ${tab === t ? "border-primary text-white" : "border-transparent text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6 bg-card border border-border rounded-2xl p-6">
        {tab === "Overview" && (
          <div className="space-y-4 text-sm">
            <p className="text-muted-foreground">{u.name} is a {u.qsLabel} institution renowned for excellence in {u.specializations.join(", ")}. With {u.intlStudents} international students and an employability rate of {u.employability}%, graduates rank among the most sought-after globally.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Student Population" value="28,400" />
              <Stat label="Employability" value={`${u.employability}%`} />
              <Stat label="Faculty Ratio" value={u.studentFacultyRatio} />
              <Stat label="Intl Students" value={u.intlStudents} />
            </div>
            <h3 className="font-bold mt-4">Known For</h3>
            <div className="flex flex-wrap gap-2">{u.knownFor.map((k) => <span key={k} className="px-3 py-1 rounded border border-border text-sm">{k}</span>)}</div>
            <h3 className="font-bold mt-4">Top Hiring Employers</h3>
            <div className="flex flex-wrap gap-2">{u.topEmployers.map((e) => <span key={e} className="px-3 py-1 rounded bg-muted text-sm">{e}</span>)}</div>
          </div>
        )}
        {tab === "Courses" && (
          <div className="space-y-3">
            {u.studyLevels.map((lvl) => (
              <details key={lvl} className="bg-background border border-border rounded-xl">
                <summary className="px-4 py-3 cursor-pointer font-semibold">{lvl}</summary>
                <div className="p-4 space-y-2 text-sm">
                  {u.specializations.map((s) => (
                    <div key={s} className="p-3 bg-card border border-border rounded-lg">
                      <div className="font-semibold">{lvl} in {s}</div>
                      <div className="text-xs text-muted-foreground">Faculty of {s} · 3 years · {u.tuition}/yr</div>
                      <div className="mt-1 text-xs">Related: <Link to="/skill-tree" className="text-primary hover:underline">View Skill Tree</Link></div>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
        {tab === "Scholarships" && (
          <div className="grid md:grid-cols-2 gap-3">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <h3 className="font-bold">Merit Scholarship {i}</h3>
                <p className="text-sm text-muted-foreground mt-1">Up to 50% tuition</p>
                <p className="text-xs mt-2">Eligibility: CGPA 3.5+ · Deadline: Aug 31</p>
              </div>
            ))}
          </div>
        )}
        {tab === "Rankings" && (
          <div>
            <h3 className="font-bold mb-3">QS World Ranking History</h3>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={rankHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
                  <XAxis dataKey="year" stroke="#888" />
                  <YAxis stroke="#888" reversed />
                  <Tooltip contentStyle={{ background: "#1A1A2E", border: "1px solid #2A2A3E" }} />
                  <Line type="monotone" dataKey="rank" stroke="#6C63FF" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {tab === "Reviews" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xl font-bold">{u.satisfaction}<Star className="w-5 h-5 fill-current text-secondary" /></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <div className="flex justify-between text-xs text-muted-foreground"><span>Anonymous student</span><span>2 months ago</span></div>
                <p className="text-sm mt-2">Great campus life, strong faculty, supportive community. Career services helped me land my first internship.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background border border-border rounded-xl p-3">
      <div className="text-lg font-bold text-gradient">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}