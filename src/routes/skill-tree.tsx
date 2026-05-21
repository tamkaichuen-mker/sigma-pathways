import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { careers } from "@/data/careers";
import { X, Award, Clock, BookOpen, Sparkles, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/skill-tree")({
  component: SkillTreePage,
});

type Status = "mastered" | "in-progress" | "recommended" | "none";
const levelOrder = ["Foundation", "Intermediate", "Advanced", "Expert", "Leadership"] as const;

function statusKey(career: string, skill: string) { return `st:${career}:${skill}`; }

function SkillTreePage() {
  const [careerId, setCareerId] = useState(careers[0].id);
  const career = careers.find((c) => c.id === careerId)!;
  const [statuses, setStatuses] = useState<Record<string, Status>>({});
  const [selected, setSelected] = useState<{ skill: string; level: string } | null>(null);

  useEffect(() => {
    const s: Record<string, Status> = {};
    levelOrder.forEach((l) =>
      career.levels[l].forEach((sk) => {
        s[sk] = (localStorage.getItem(statusKey(career.id, sk)) as Status) || "none";
      })
    );
    // Auto-mark first uncompleted foundation as recommended
    const firstNone = career.levels.Foundation.find((sk) => s[sk] === "none");
    if (firstNone) s[firstNone] = "recommended";
    setStatuses(s);
  }, [careerId]);

  const setStatus = (skill: string, st: Status) => {
    localStorage.setItem(statusKey(career.id, skill), st);
    setStatuses({ ...statuses, [skill]: st });
  };

  const allSkills = levelOrder.flatMap((l) => career.levels[l]);
  const mastered = allSkills.filter((s) => statuses[s] === "mastered").length;
  const progress = Math.round((mastered / allSkills.length) * 100);

  const colorFor = (st: Status) => {
    if (st === "mastered") return "bg-secondary/20 border-secondary text-secondary";
    if (st === "in-progress") return "bg-blue-500/20 border-blue-500 text-blue-400";
    if (st === "recommended") return "bg-[#FF6B35]/20 border-[#FF6B35] text-[#FF6B35]";
    return "bg-muted border-border text-muted-foreground";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Career Skill Tree</h1>
          <p className="text-muted-foreground mt-2">Plan your path from Foundation to Leadership.</p>
        </div>
        <select value={careerId} onChange={(e) => setCareerId(e.target.value)} className="px-4 py-2 bg-card border border-border rounded-xl text-sm">
          {careers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <div className="flex justify-between text-sm mb-2"><span>Progress</span><span className="text-secondary font-semibold">{progress}%</span></div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-3 text-xs mt-4 flex-wrap">
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary" /> Mastered</span>
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500" /> In Progress</span>
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#FF6B35]" /> Recommended</span>
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted" /> Not Started</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-4">
        <p className="md:hidden text-xs text-muted-foreground mb-2">← scroll to explore →</p>
        <div className="flex gap-6 min-w-max">
          {levelOrder.map((level, idx) => (
            <div key={level} className="flex items-center gap-2">
              <div className="w-64">
                <div className="text-xs font-semibold uppercase text-primary tracking-wider mb-3">{level}</div>
                <div className="space-y-3">
                  {career.levels[level].map((skill) => (
                    <button
                      key={skill}
                      onClick={() => setSelected({ skill, level })}
                      className={`w-full text-left px-4 py-3 rounded-xl border ${colorFor(statuses[skill] || "none")} hover:scale-[1.02] transition`}
                    >
                      <div className="text-sm font-medium text-white">{skill}</div>
                      <div className="text-xs mt-1 opacity-80">{statuses[skill] === "mastered" ? "✓ Mastered" : statuses[skill] === "in-progress" ? "● In Progress" : statuses[skill] === "recommended" ? "★ Recommended" : "Not Started"}</div>
                    </button>
                  ))}
                </div>
              </div>
              {idx < levelOrder.length - 1 && <ChevronRight className="w-6 h-6 text-primary/50" />}
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto p-6 animate-fade-in">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
            <span className="inline-block text-xs px-2 py-1 rounded bg-primary/15 text-primary mb-2">{selected.level}</span>
            <h2 className="text-2xl font-bold">{selected.skill}</h2>
            <p className="text-sm text-muted-foreground mt-3">{selected.skill} is a key skill at the {selected.level.toLowerCase()} level for {career.name}s. Mastery unlocks better roles and higher salary bands.</p>
            <p className="text-sm text-muted-foreground mt-2">Most learners reach proficiency in 2-4 months of focused study, combining online courses, projects, and feedback.</p>

            <div className="mt-5 flex gap-2 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full bg-muted">Difficulty: Medium</span>
              <span className="text-xs px-3 py-1 rounded-full bg-muted inline-flex items-center gap-1"><Clock className="w-3 h-3" /> 3 months</span>
            </div>

            <h3 className="font-bold mt-6 mb-2 flex items-center gap-2"><Award className="w-4 h-4 text-secondary" /> Recommended Certifications</h3>
            <div className="space-y-2">
              {["Coursera Specialization", "Industry Certification", "Project Portfolio"].map((c) => (
                <div key={c} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                  <span className="text-sm">{c}</span>
                  <Link to="/classes" search={{ skill: selected.skill } as any} className="text-xs text-primary hover:underline">Find Class</Link>
                </div>
              ))}
            </div>

            <h3 className="font-bold mt-6 mb-2">Jobs using this skill</h3>
            <Link to="/jobs" search={{ skill: selected.skill } as any} className="text-sm text-primary hover:underline">Search jobs with {selected.skill} →</Link>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button onClick={() => setStatus(selected.skill, "mastered")} className="bg-secondary text-secondary-foreground py-2 rounded-lg text-sm font-semibold">Mark Mastered</button>
              <button onClick={() => setStatus(selected.skill, "in-progress")} className="bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold">In Progress</button>
            </div>
            <Link to="/classes" search={{ skill: selected.skill } as any} className="mt-3 w-full inline-flex justify-center items-center gap-2 btn-gradient py-2 rounded-lg text-sm font-semibold">
              <BookOpen className="w-4 h-4" /> Find Classes
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}