import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { universities, getUniversity } from "@/data/universities";
import { callGemini } from "@/lib/gemini";
import { AiKeyBanner } from "@/components/AiKeyBanner";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/universities/compare")({
  component: ComparePage,
  validateSearch: (s: Record<string, unknown>) => ({ ids: typeof s.ids === "string" ? s.ids : "" }),
});

function ComparePage() {
  const { ids } = useSearch({ from: "/universities/compare" });
  const initial = ids ? ids.split(",").slice(0, 3) : [];
  const [picks, setPicks] = useState<string[]>([initial[0] || universities[0].id, initial[1] || universities[1].id, initial[2] || universities[2].id]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const set = (i: number, v: string) => { const p = [...picks]; p[i] = v; setPicks(p); };
  const unis = picks.map(getUniversity).filter(Boolean) as any[];

  const rows: { label: string; key: keyof typeof unis[0]; best?: "min" | "max" }[] = [
    { label: "QS World Ranking", key: "qsRank", best: "min" },
    { label: "Location", key: "city" },
    { label: "Country", key: "country" },
    { label: "Annual Tuition", key: "tuition" },
    { label: "Scholarship", key: "scholarship" },
    { label: "Graduate Employability", key: "employability", best: "max" },
    { label: "Student-Faculty Ratio", key: "studentFacultyRatio" },
    { label: "Intl Students", key: "intlStudents" },
    { label: "Satisfaction", key: "satisfaction", best: "max" },
  ];

  const aiCompare = async () => {
    setLoading(true); setAnalysis("");
    try {
      const out = await callGemini(`Compare these universities. Provide: (1) Best for career outcomes, (2) Best value with scholarships, (3) Strongest subject ranking, (4) Overall recommendation with brief reasoning.\n\n${unis.map((u, i) => `Uni ${i+1}: ${u.name} | ${u.qsLabel} | ${u.tuition} | Employability ${u.employability}% | Specialties: ${u.specializations.join(", ")}`).join("\n")}`);
      setAnalysis(out);
    } catch (e: any) {
      toast.error(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold">Compare Universities</h1>
      <AiKeyBanner />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        {picks.map((p, i) => (
          <select key={i} value={p} onChange={(e) => set(i, e.target.value)} className="px-3 py-2 bg-card border border-border rounded-xl text-sm">
            {universities.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto bg-card border border-border rounded-2xl">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border"><th className="text-left p-3"></th>{unis.map((u) => <th key={u.id} className="text-left p-3">{u.name}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => {
              const values = unis.map((u) => u[r.key]);
              let bestIdx = -1;
              if (r.best && typeof values[0] === "number") {
                bestIdx = r.best === "min" ? values.indexOf(Math.min(...values as number[])) : values.indexOf(Math.max(...values as number[]));
              }
              return (
                <tr key={r.label} className="border-b border-border">
                  <td className="p-3 text-muted-foreground">{r.label}</td>
                  {values.map((v, i) => (
                    <td key={i} className={`p-3 ${i === bestIdx ? "bg-secondary/10 text-secondary font-semibold" : ""}`}>
                      {typeof v === "boolean" ? (v ? "✓" : "—") : String(v)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button onClick={aiCompare} disabled={loading} className="mt-6 btn-gradient px-5 py-3 rounded-xl font-semibold inline-flex items-center gap-2 disabled:opacity-50">
        <Sparkles className="w-4 h-4" /> {loading ? "Analyzing..." : "Get AI Analysis"}
      </button>

      {analysis && (
        <div className="mt-6 bg-card border border-border rounded-2xl p-6 whitespace-pre-wrap text-sm">{analysis}</div>
      )}
    </div>
  );
}