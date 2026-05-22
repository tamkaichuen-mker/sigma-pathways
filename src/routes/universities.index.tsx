import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { universities } from "@/data/universities";
import { MapPin, Award, Sparkles } from "lucide-react";

export const Route = createFileRoute("/universities/")({
  component: UniversitiesPage,
  validateSearch: (s: Record<string, unknown>) => ({
    field: typeof s.field === "string" ? s.field : undefined,
  }),
});

function UniversitiesPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [scholarship, setScholarship] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);

  const countries = ["All", ...Array.from(new Set(universities.map((u) => u.country)))];

  const filtered = useMemo(() => universities.filter((u) => {
    if (search && !`${u.name} ${u.city} ${u.specializations.join(" ")}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (country !== "All" && u.country !== country) return false;
    if (scholarship && !u.scholarship) return false;
    return true;
  }), [search, country, scholarship]);

  const toggle = (id: string) => setCompare((c) => c.includes(id) ? c.filter((x) => x !== id) : c.length >= 3 ? c : [...c, id]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">University Finder</h1>
          <p className="text-muted-foreground mt-2">{filtered.length} universities worldwide</p>
        </div>
        {compare.length > 0 && (
          <Link to="/universities/compare" search={{ ids: compare.join(",") } as any} className="btn-gradient px-4 py-2 rounded-xl text-sm font-semibold">
            Compare ({compare.length})
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[28%_1fr] gap-6">
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4 sticky top-20 h-fit">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search universities..." className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm" />
          <div>
            <label className="text-sm font-semibold">Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm">
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={scholarship} onChange={(e) => setScholarship(e.target.checked)} className="accent-primary" />
            Scholarships available
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((u) => (
            <div key={u.id} className="bg-card border border-border rounded-2xl p-5 card-hover flex flex-col">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">{u.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{u.name}</h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {u.city}, {u.country}</div>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs px-2 py-1 rounded bg-primary/15 text-primary"><Award className="w-3 h-3" /> {u.qsLabel}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {u.specializations.slice(0, 3).map((s) => <span key={s} className="text-xs px-2 py-0.5 rounded border border-border">{s}</span>)}
              </div>
              <div className="mt-3 text-sm">
                <span className="text-muted-foreground">Tuition:</span> <span className="font-semibold text-secondary">{u.tuition}</span>
              </div>
              {u.scholarship && <div className="mt-1 text-xs text-[#FF6B35] font-semibold">★ Scholarships</div>}
              <div className="mt-4 flex gap-2 items-center">
                <Link to="/universities/$id" params={{ id: u.id }} className="btn-gradient flex-1 text-center px-3 py-2 rounded-lg text-sm font-semibold">View Details</Link>
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="checkbox" checked={compare.includes(u.id)} onChange={() => toggle(u.id)} className="accent-primary" />
                  Compare
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}