import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/community/$id")({ component: PostDetail });

function PostDetail() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <Link to="/community" className="text-sm text-primary">← Back to community</Link>
      <div className="bg-card border border-border rounded-2xl p-6 mt-4">
        <span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary">Career Advice</span>
        <h1 className="text-2xl font-bold mt-3">How I landed my first remote dev job in 3 months</h1>
        <p className="text-xs text-muted-foreground mt-1">by alex_dev · 2h ago</p>
        <p className="text-sm mt-4 text-muted-foreground">Sharing my full journey, the tools I used, and the mistakes I'd avoid next time. Started learning React in January, built 3 projects, applied to 80 companies, got 4 offers. Here's exactly what worked...</p>
      </div>
      <div className="mt-6">
        <textarea placeholder="Write a comment..." className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" rows={3} />
        <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold mt-2">Post Comment</button>
      </div>
      <div className="mt-6 space-y-3">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <div className="flex flex-col items-center"><ArrowUp className="w-3 h-3" /><span className="text-xs">{20 - i * 4}</span><ArrowDown className="w-3 h-3" /></div>
              <div>
                <p className="text-xs text-muted-foreground">user_{i} · {i}h ago</p>
                <p className="text-sm mt-1">Really inspiring story. What was your portfolio site like?</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}