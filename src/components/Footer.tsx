import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="text-xl font-bold">
            <span className="text-gradient">Σ</span> SigmaJob
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            Work Smarter. Grow Faster. Connect Better.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Discover</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
            <li><Link to="/universities" className="hover:text-white">Universities</Link></li>
            <li><Link to="/classes" className="hover:text-white">Classes</Link></li>
            <li><Link to="/trends" className="hover:text-white">Trends</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Grow</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/skill-tree" className="hover:text-white">Skill Tree</Link></li>
            <li><Link to="/resume-analyzer" className="hover:text-white">Resume Analyzer</Link></li>
            <li><Link to="/career-coach" className="hover:text-white">Career Coach</Link></li>
            <li><Link to="/personality-test" className="hover:text-white">Personality Test</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Connect</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/community" className="hover:text-white">Community</Link></li>
            <li><Link to="/exchange" className="hover:text-white">Exchange</Link></li>
            <li><Link to="/network" className="hover:text-white">Network</Link></li>
            <li><Link to="/settings" className="hover:text-white">Settings</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SigmaJob. All rights reserved.
      </div>
    </footer>
  );
}