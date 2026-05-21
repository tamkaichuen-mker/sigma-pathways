import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";

export const Route = createFileRoute("/network")({ component: NetworkPage });

function NetworkPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-6">
      <aside className="space-y-3">
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-bold text-sm">Pending Requests (3)</h3>
          {[1,2,3].map((i) => (
            <div key={i} className="flex items-center justify-between mt-3 text-sm">
              <span>User {i}</span><button className="text-xs btn-gradient px-2 py-1 rounded">Accept</button>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-bold text-sm mb-3">People You May Know</h3>
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 text-sm border-b border-border last:border-0">
              <span>Pro #{i}</span><button className="text-xs border border-border px-2 py-1 rounded hover:border-primary">Connect</button>
            </div>
          ))}
        </div>
      </aside>
      <div>
        <div className="bg-card border border-border rounded-2xl p-4 mb-4">
          <textarea placeholder="Share an update..." rows={2} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
          <button className="btn-gradient mt-2 px-4 py-1.5 rounded-lg text-sm font-semibold">Post</button>
        </div>
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-2"><div className="w-10 h-10 rounded-full gradient-primary" /><div><p className="font-semibold text-sm">User {i}</p><p className="text-xs text-muted-foreground">2h ago</p></div></div>
            <p className="text-sm mt-3">Just shipped a new feature using SigmaJob's skill tree — game changer for my team's onboarding.</p>
            <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
              <button className="inline-flex items-center gap-1"><Heart className="w-3 h-3" /> 42</button>
              <button className="inline-flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 8</button>
              <button className="inline-flex items-center gap-1"><Share2 className="w-3 h-3" /></button>
              <button className="inline-flex items-center gap-1"><Bookmark className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>
      <aside className="space-y-3">
        <div className="bg-card border border-border rounded-2xl p-4"><h3 className="font-bold text-sm">Trending Skills</h3><ul className="text-sm mt-2 space-y-1">{["TypeScript","AWS","Figma","Power BI"].map((s) => <li key={s}>#{s}</li>)}</ul></div>
        <div className="bg-card border border-border rounded-2xl p-4"><h3 className="font-bold text-sm">People Hiring</h3><ul className="text-sm mt-2 space-y-1">{["Grab","Stripe","Maybank"].map((s) => <li key={s}>{s}</li>)}</ul></div>
        <div className="bg-card border border-border rounded-2xl p-4"><h3 className="font-bold text-sm">Suggested Classes</h3><ul className="text-sm mt-2 space-y-1">{["React Mastery","SQL Deep Dive"].map((s) => <li key={s}>{s}</li>)}</ul></div>
      </aside>
    </div>
  );
}