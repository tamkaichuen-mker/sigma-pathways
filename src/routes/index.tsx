import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Briefcase, GitBranch, FileSearch, Bot, MessagesSquare, BookOpen,
  GraduationCap, HandHeart, Brain, TrendingUp, Cpu, Users, ArrowRight,
  MapPin, Building2, CheckCircle2
} from "lucide-react";
import { jobs } from "@/data/jobs";

export const Route = createFileRoute("/")({
  component: Index,
});

const stats = [
  { label: "Jobs", value: "12,400+", to: "/jobs" },
  { label: "Companies", value: "8,200+", to: "/jobs" },
  { label: "Professionals", value: "54,000+", to: "/network" },
  { label: "Classes", value: "1,800+", to: "/classes" },
  { label: "Universities", value: "420+", to: "/universities" },
];

const features = [
  { icon: Briefcase, title: "Smart Job Board", desc: "AI-curated jobs worldwide", to: "/jobs" },
  { icon: GitBranch, title: "Career Skill Tree", desc: "Visualize your growth path", to: "/skill-tree" },
  { icon: FileSearch, title: "AI Resume Analyzer", desc: "Instant Gemini-powered audit", to: "/resume-analyzer" },
  { icon: Bot, title: "AI Career Coach", desc: "Chat with your AI mentor", to: "/career-coach" },
  { icon: MessagesSquare, title: "Community Forum", desc: "Reddit-style discussions", to: "/community" },
  { icon: BookOpen, title: "Class Marketplace", desc: "Learn from top tutors", to: "/classes" },
  { icon: GraduationCap, title: "University Finder", desc: "Find your school globally", to: "/universities" },
  { icon: HandHeart, title: "Community Exchange", desc: "Earn hours, help others", to: "/exchange" },
  { icon: Brain, title: "Personality Test", desc: "Discover your strengths", to: "/personality-test" },
  { icon: TrendingUp, title: "Job Trends", desc: "Real-time market data", to: "/trends" },
  { icon: Cpu, title: "AI Impact Analyzer", desc: "Future-proof your career", to: "/ai-trends" },
  { icon: Users, title: "Talent Pool", desc: "Get discovered by employers", to: "/talent-pool" },
];

const trendingPosts = [
  { id: "1", title: "How I landed my first remote dev job in 3 months", category: "Career Advice", upvotes: 421, comments: 87 },
  { id: "2", title: "Should I pursue a Master's in Data Science?", category: "Study & Learn", upvotes: 312, comments: 64 },
  { id: "3", title: "Anonymous Petronas interview experience", category: "Job Hunting", upvotes: 287, comments: 53 },
];

function Index() {
  const trending = jobs.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-float-slow" />
          <div className="absolute top-40 right-1/3 w-40 h-40 rotate-45 bg-[#FF6B35]/10 blur-2xl animate-float" />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Worldwide career platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
            Your Career.{" "}
            <span className="text-gradient">Systemized.</span>{" "}
            <span className="text-gradient">Amplified.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find jobs, grow skills, discover universities, and let AI guide your career — built for the world.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/jobs" className="btn-gradient px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              Find Jobs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/universities" className="px-6 py-3 rounded-xl font-semibold border border-border hover:border-primary transition">
              Explore Universities
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s) => (
            <Link
              key={s.label}
              to={s.to as any}
              className="bg-card border border-border rounded-2xl p-5 text-center card-hover"
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Everything for your career — in one platform</h2>
          <p className="text-muted-foreground mt-3">12 powerful tools that work together.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to as any}
              className="bg-card border border-border rounded-2xl p-6 card-hover group"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-4 text-sm text-primary inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING JOBS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Trending Jobs</h2>
            <p className="text-muted-foreground mt-2">Hot opportunities right now.</p>
          </div>
          <Link to="/jobs" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trending.map((j) => (
            <Link
              key={j.id}
              to="/jobs/$id"
              params={{ id: j.id }}
              className="bg-card border border-border rounded-2xl p-5 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">
                  {j.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{j.title}</h3>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Building2 className="w-3 h-3" /> {j.company}
                    {j.verified && <CheckCircle2 className="w-3 h-3 text-secondary" />}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary">{j.workMode}</span>
                    <span className="px-2 py-1 rounded-md bg-muted">{j.jobType}</span>
                    <span className="px-2 py-1 rounded-md bg-muted inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {j.location}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-secondary">{j.salary}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING POSTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Hot in Community</h2>
            <p className="text-muted-foreground mt-2">Real talk from real professionals.</p>
          </div>
          <Link to="/community" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trendingPosts.map((p) => (
            <Link
              key={p.id}
              to="/community/$id"
              params={{ id: p.id }}
              className="bg-card border border-border rounded-2xl p-5 card-hover"
            >
              <span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary">{p.category}</span>
              <h3 className="font-semibold mt-3">{p.title}</h3>
              <div className="text-xs text-muted-foreground mt-4 flex gap-4">
                <span>▲ {p.upvotes}</span>
                <span>💬 {p.comments}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">Work Smarter. Grow Faster. Connect Better.</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Join the worldwide platform that systemizes your career growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/skill-tree" className="btn-gradient px-6 py-3 rounded-xl font-semibold">Start Your Skill Tree</Link>
            <Link to="/resume-analyzer" className="btn-cta px-6 py-3 rounded-xl font-semibold">Analyze My Resume</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
