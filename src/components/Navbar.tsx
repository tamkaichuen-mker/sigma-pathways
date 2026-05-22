import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Search, Bell, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/community", label: "Community" },
  { to: "/classes", label: "Classes" },
  { to: "/skill-tree", label: "Skill Tree" },
  { to: "/trends", label: "Trends" },
  { to: "/universities", label: "Universities" },
  { to: "/talent-pool", label: "Talent Pool" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate({ to: "/jobs", search: q ? { skill: q } : {} });
    setSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-1 shrink-0">
          <span className="text-gradient">Σ</span>
          <span className="text-white">SigmaJob</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to as any}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "text-white bg-primary/15" : "text-muted-foreground hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <form onSubmit={submitSearch} className="flex items-center">
            {searchOpen ? (
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search jobs, skills..."
                className="px-3 py-2 rounded-lg bg-input border border-border text-sm w-56"
              />
            ) : (
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-muted transition"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </form>
          <button aria-label="Notifications" className="p-2 rounded-lg hover:bg-muted transition relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF6B35]" />
          </button>
          <Link
            to="/post-job"
            className="btn-gradient px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Post a Job
          </Link>
          <Link
            to="/profile/$username"
            params={{ username: "me" }}
            className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold"
          >
            S
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-background z-50 lg:hidden animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-xl font-bold"><span className="text-gradient">Σ</span> SigmaJob</span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-lg hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/post-job"
              onClick={() => setOpen(false)}
              className="btn-gradient mt-4 px-4 py-3 rounded-xl text-center font-semibold"
            >
              Post a Job
            </Link>
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-lg hover:bg-muted"
            >
              Settings
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}