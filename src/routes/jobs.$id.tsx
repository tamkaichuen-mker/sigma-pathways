import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getJob, jobs } from "@/data/jobs";
import { Building2, CheckCircle2, MapPin, Star, Bookmark, Sparkles } from "lucide-react";

export const Route = createFileRoute("/jobs/$id")({
  component: JobDetail,
});

const tabs = ["Overview", "Requirements", "Company", "Anonymous Reviews", "Interview Prep"] as const;
type Tab = typeof tabs[number];

const insights = [
  { label: "Job Market Demand", color: "bg-secondary/20 text-secondary", value: "High" },
  { label: "Stability", color: "bg-secondary/20 text-secondary", value: "Strong" },
  { label: "Flexibility", color: "bg-primary/20 text-primary", value: "Hybrid friendly" },
  { label: "Career Growth", color: "bg-secondary/20 text-secondary", value: "Excellent" },
  { label: "Work-Life Balance", color: "bg-primary/20 text-primary", value: "Good" },
  { label: "AI Disruption Risk", color: "bg-secondary/20 text-secondary", value: "Low (18%)" },
];

function JobDetail() {
  const { id } = Route.useParams();
  const job = getJob(id);
  const [tab, setTab] = useState<Tab>("Overview");
  const [reviewOpen, setReviewOpen] = useState(false);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Job not found</h1>
        <Link to="/jobs" className="text-primary mt-4 inline-block">Back to jobs</Link>
      </div>
    );
  }

  const similar = jobs.filter((j) => j.id !== job.id && j.industry === job.industry).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-8">
        <div>
          {/* Header */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4" /> {job.company}
              {job.verified && <CheckCircle2 className="w-4 h-4 text-secondary" />}
              <span className="mx-2">·</span>
              <MapPin className="w-4 h-4" /> {job.location}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-sm">{job.workMode}</span>
              <span className="px-3 py-1 rounded-full bg-muted text-sm">{job.jobType}</span>
              <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-sm font-semibold">{job.salary}</span>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="btn-gradient px-6 py-3 rounded-xl font-semibold">Apply Now</button>
              <button className="px-4 py-3 rounded-xl border border-border inline-flex items-center gap-2"><Bookmark className="w-4 h-4" /> Save</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition ${
                  tab === t ? "border-primary text-white" : "border-transparent text-muted-foreground hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-card border border-border rounded-2xl p-6">
            {tab === "Overview" && (
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>Join {job.company} as a {job.title}. You'll work on cutting-edge problems that affect millions of users worldwide, collaborating with cross-functional teams to deliver impact.</p>
                <p>This is a {job.workMode.toLowerCase()} {job.jobType.toLowerCase()} role based in {job.location}. We invest heavily in your growth — mentorship, conference budgets, and a clear progression framework.</p>
                <p>You'll own end-to-end product features, ship to production weekly, and have a real voice in technical direction.</p>
                <h3 className="text-white font-bold mt-6">Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Design and build core features in production</li>
                  <li>Collaborate across product, design, and engineering</li>
                  <li>Mentor junior teammates and review code</li>
                  <li>Own architecture decisions on your surface area</li>
                  <li>Participate in on-call rotations</li>
                  <li>Improve developer experience and tooling</li>
                  <li>Contribute to technical documentation</li>
                  <li>Drive engineering best practices</li>
                </ul>
                <h3 className="text-white font-bold mt-6">Benefits</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Competitive salary + equity</li>
                  <li>Comprehensive health insurance</li>
                  <li>Flexible hybrid working</li>
                  <li>Learning budget USD 2,000/year</li>
                  <li>Generous parental leave</li>
                </ul>
              </div>
            )}
            {tab === "Requirements" && (
              <div className="space-y-4 text-sm">
                <div><span className="text-muted-foreground">Education:</span> Bachelor's in Computer Science or related field</div>
                <div><span className="text-muted-foreground">Experience:</span> 4+ years</div>
                <h3 className="font-bold mt-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">{job.skills.map((s) => <span key={s} className="px-3 py-1 rounded-md border border-border">{s}</span>)}</div>
                <h3 className="font-bold mt-4">Nice-to-Have</h3>
                <div className="flex flex-wrap gap-2">{["Open Source", "GraphQL", "Kubernetes"].map((s) => <span key={s} className="px-3 py-1 rounded-md bg-muted">{s}</span>)}</div>
              </div>
            )}
            {tab === "Company" && (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>{job.company} is a leader in {job.industry}, building products used by millions globally.</p>
                <p>Founded with the mission to make the world more productive, we've grown to 2,000+ people across 12 countries.</p>
              </div>
            )}
            {tab === "Anonymous Reviews" && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">4.3</div>
                    <div className="flex justify-center text-secondary"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4" /></div>
                    <div className="text-xs text-muted-foreground mt-1">Based on 128 reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[["Work-Life Balance", 4.2], ["Career Growth", 4.5], ["Management", 4.0], ["Compensation", 4.3], ["Culture", 4.6]].map(([l, v]) => (
                      <div key={l as string} className="flex items-center gap-3 text-xs">
                        <span className="w-32 text-muted-foreground">{l}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full gradient-primary" style={{ width: `${(v as number / 5) * 100}%` }} />
                        </div>
                        <span className="w-8 text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setReviewOpen(true)} className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Write Anonymous Review</button>
                <p className="text-xs text-muted-foreground">100% anonymous.</p>
                {[
                  { role: "Software Engineer (Past)", date: "2 weeks ago", pros: "Great learning, smart teammates, real impact.", cons: "On-call can be intense some weeks." },
                  { role: "Product Designer (Current)", date: "1 month ago", pros: "Flexible WFH, strong design culture.", cons: "Slow promotion cycles." },
                ].map((r, i) => (
                  <div key={i} className="bg-background border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{r.role}</span><span>{r.date}</span>
                    </div>
                    <div className="flex text-secondary mt-1"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                    <p className="text-sm mt-2"><span className="text-secondary font-semibold">Pros:</span> {r.pros}</p>
                    <p className="text-sm mt-1"><span className="text-[#FF6B35] font-semibold">Cons:</span> {r.cons}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "Interview Prep" && (
              <div className="space-y-3">
                {["Technical", "Behavioral", "Culture Fit"].map((section) => (
                  <details key={section} className="bg-background border border-border rounded-xl overflow-hidden group">
                    <summary className="px-4 py-3 cursor-pointer font-semibold">{section} Questions</summary>
                    <div className="p-4 space-y-4">
                      {[1,2,3,4,5].map((q) => (
                        <div key={q} className="space-y-2">
                          <p className="text-sm font-medium">Q{q}. Sample {section.toLowerCase()} question {q}?</p>
                          <textarea placeholder="Type your practice answer..." className="w-full bg-input border border-border rounded-lg p-2 text-sm" rows={3} />
                          <button className="btn-gradient text-xs px-3 py-1.5 rounded-md inline-flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Get AI Feedback
                          </button>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4 lg:sticky lg:top-20 h-fit">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-3">Job Insights</h3>
            <div className="text-sm">
              <div className="text-muted-foreground">Salary range</div>
              <div className="font-semibold">{job.salary}</div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full gradient-primary w-3/4" />
              </div>
              <div className="text-xs text-muted-foreground mt-1">Top 75th percentile</div>
            </div>
            <div className="mt-4 space-y-2">
              {insights.map((i) => (
                <div key={i.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{i.label}</span>
                  <span className={`text-xs px-2 py-1 rounded ${i.color}`}>{i.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold mb-3">Similar Jobs</h3>
            <div className="space-y-3">
              {similar.map((s) => (
                <Link key={s.id} to="/jobs/$id" params={{ id: s.id }} className="block p-3 rounded-xl border border-border hover:border-primary transition">
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.company}</div>
                  <div className="text-xs text-secondary mt-1">{s.salary}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {reviewOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setReviewOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold">Write Anonymous Review</h2>
            <p className="text-xs text-muted-foreground mt-1">100% anonymous.</p>
            <input placeholder="Your role held" className="mt-4 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm" />
            <div className="flex gap-1 mt-3">{[1,2,3,4,5].map((s) => <Star key={s} className="w-6 h-6 text-secondary fill-current cursor-pointer" />)}</div>
            <textarea placeholder="Pros..." rows={3} className="mt-3 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm" />
            <textarea placeholder="Cons..." rows={3} className="mt-3 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm" />
            <div className="flex gap-2 mt-4">
              <button onClick={() => setReviewOpen(false)} className="flex-1 py-2 border border-border rounded-lg">Cancel</button>
              <button onClick={() => setReviewOpen(false)} className="flex-1 btn-gradient py-2 rounded-lg font-semibold">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}