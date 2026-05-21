import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/talent-pool")({ component: TalentPoolPage });

function TalentPoolPage() {
  const [view, setView] = useState<"candidate" | "employer">("candidate");
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-3xl md:text-4xl font-bold">Talent Pool</h1><p className="text-muted-foreground mt-2">Get discovered. Discover talent.</p></div>
        <div className="flex gap-1 p-1 bg-card border border-border rounded-xl">
          {(["candidate","employer"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 rounded-lg text-sm capitalize ${view === v ? "btn-gradient" : ""}`}>{v}</button>
          ))}
        </div>
      </div>
      {view === "candidate" ? (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold mb-3">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground"><li>Opt in to be visible to employers</li><li>Get matched anonymously</li><li>Approve employer contact requests</li><li>Land your next role</li></ol>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-bold mb-3">Benefits</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Stay anonymous until you approve</li><li>✓ Curated matches only</li><li>✓ Skip the apply queue</li>
            </ul>
            <button className="btn-gradient w-full mt-4 py-2 rounded-xl font-semibold">Join Talent Pool</button>
            <p className="text-xs text-muted-foreground mt-2">Your identity stays private until you opt in.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[28%_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 h-fit space-y-3 sticky top-20">
            <input placeholder="Skills" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
            <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm"><option>Any level</option><option>Entry</option><option>Mid</option><option>Senior</option></select>
            <input placeholder="Location" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
          </div>
          <div>
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/40 rounded-2xl p-4 mb-4 text-sm">★ 14 matching candidates found for your Software Engineer posting.</div>
            <div className="grid md:grid-cols-2 gap-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex justify-between"><h3 className="font-bold">Anonymous Candidate #{i}</h3><span className="text-xs px-2 py-0.5 rounded bg-secondary/15 text-secondary">{90 - i * 3}% match</span></div>
                  <p className="text-xs text-muted-foreground mt-1">Target: Senior Software Engineer</p>
                  <div className="flex flex-wrap gap-1 mt-3">{["React","TypeScript","AWS"].map((s) => <span key={s} className="text-xs px-2 py-0.5 border border-border rounded">{s}</span>)}</div>
                  <button className="btn-gradient w-full mt-3 py-2 rounded-lg text-sm font-semibold">Request Contact</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}