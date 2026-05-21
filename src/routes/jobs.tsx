import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { jobs } from "@/data/jobs";
import { MapPin, Building2, CheckCircle2, Bookmark, Filter, X } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  component: JobsPage,
  validateSearch: (s: Record<string, unknown>) => ({
    skill: typeof s.skill === "string" ? s.skill : undefined,
  }),
});

const workModes = ["On-site", "Remote", "Hybrid"] as const;
const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"] as const;
const industries = ["All", "Technology", "Energy", "Design", "E-commerce", "Healthcare", "Banking", "Fintech", "Tech", "Media", "Telecom", "Consulting"];

function JobsPage() {
  const { skill } = useSearch({ from: "/jobs" });
  const [search, setSearch] = useState(skill ?? "");
  const [industry, setIndustry] = useState("All");
  const [location, setLocation] = useState("");
  const [modes, setModes] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [salary, setSalary] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (search && !(`${j.title} ${j.company} ${j.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase()))) return false;
      if (industry !== "All" && j.industry !== industry) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (modes.length && !modes.includes(j.workMode)) return false;
      if (types.length && !types.includes(j.jobType)) return false;
      if (j.salaryMax < salary) return false;
      return true;
    });
  }, [search, industry, location, modes, types, salary]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const clear = () => {
    setSearch(""); setIndustry("All"); setLocation(""); setModes([]); setTypes([]); setSalary(1000);
  };

  const Filters = (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-5 sticky top-20">
      <div>
        <label className="text-sm font-semibold">Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Job title, skill, company..."
          className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm"
        />
      </div>
      <div>
        <label className="text-sm font-semibold">Industry</label>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm">
          {industries.map((i) => <option key={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-semibold">Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Worldwide" className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm" />
      </div>
      <div>
        <label className="text-sm font-semibold">Work Mode</label>
        <div className="mt-2 space-y-2">
          {workModes.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={modes.includes(m)} onChange={() => toggle(modes, setModes, m)} className="accent-primary" />
              {m}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Job Type</label>
        <div className="mt-2 space-y-2">
          {jobTypes.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={types.includes(t)} onChange={() => toggle(types, setTypes, t)} className="accent-primary" />
              {t}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Min Salary: <span className="text-primary">RM{salary.toLocaleString()}</span></label>
        <input type="range" min={1000} max={30000} step={500} value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full mt-2 accent-primary" />
      </div>
      <div className="flex gap-2">
        <button className="btn-gradient flex-1 py-2 rounded-lg text-sm font-semibold">Apply Filters</button>
        <button onClick={clear} className="px-3 py-2 rounded-lg border border-border text-sm">Clear All</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Find Your Next Job</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} opportunities worldwide</p>
      </div>

      <div className="md:hidden mb-4">
        <button onClick={() => setShowFilters(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border">
          <Filter className="w-4 h-4" /> Show Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[28%_1fr] gap-6">
        <div className="hidden md:block">{Filters}</div>

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-background overflow-auto p-4 md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)}><X /></button>
            </div>
            {Filters}
          </div>
        )}

        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No jobs match your filters.</p>
              <button onClick={clear} className="mt-4 text-primary hover:underline">Clear filters</button>
            </div>
          )}
          {filtered.map((j) => (
            <div key={j.id} className="bg-card border border-border rounded-2xl p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-white font-bold shrink-0">
                  {j.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to="/jobs/$id" params={{ id: j.id }} className="font-semibold text-lg hover:text-primary">{j.title}</Link>
                      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3" /> {j.company}
                        {j.verified && <CheckCircle2 className="w-3 h-3 text-secondary" />}
                      </div>
                    </div>
                    <button aria-label="Save" className="p-2 hover:bg-muted rounded-lg">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">{j.workMode}</span>
                    <span className="px-2 py-1 rounded-md bg-muted">{j.jobType}</span>
                    <span className="px-2 py-1 rounded-md bg-muted inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {j.location}
                    </span>
                    <span className="px-2 py-1 rounded-md text-secondary bg-secondary/10 font-semibold">{j.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {j.skills.slice(0, 4).map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-md border border-border">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">{j.posted}</span>
                    <Link to="/jobs/$id" params={{ id: j.id }} className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}