import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/profile/$username")({ component: ProfilePage });
const tabs = ["About","Experience","Education","Skills","Portfolio","Credentials","Letters","Posts"] as const;

function ProfilePage() {
  const { username } = Route.useParams();
  const [tab, setTab] = useState<typeof tabs[number]>("About");
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="h-32 gradient-primary" />
        <div className="p-6 -mt-12">
          <div className="w-24 h-24 rounded-full border-4 border-card gradient-primary flex items-center justify-center text-3xl font-bold">{username[0]?.toUpperCase()}</div>
          <h1 className="text-2xl font-bold mt-3">@{username}</h1>
          <p className="text-sm text-muted-foreground">Senior Software Engineer · Kuala Lumpur · 540 connections</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 ${tab === t ? "border-primary text-white" : "border-transparent text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 mt-4">
        {tab === "About" && <p className="text-sm text-muted-foreground">Passionate engineer with 6 years building products at scale.</p>}
        {tab === "Credentials" && (
          <div>
            <h2 className="font-bold mb-3">Lifelong Learning Wallet</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-background border border-border rounded-xl p-4">
                  <div className="text-xs text-secondary">✓ Verified</div>
                  <div className="font-semibold mt-1">AWS Certified Solutions Architect</div>
                  <div className="text-xs text-muted-foreground">Amazon · 2024</div>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full gradient-primary" style={{ width: "85%" }} /></div>
                  <div className="text-xs mt-1">Recency 85/100</div>
                </div>
              ))}
            </div>
            <button className="btn-gradient mt-4 px-4 py-2 rounded-lg text-sm font-semibold">Export ATS-friendly PDF</button>
          </div>
        )}
        {tab === "Letters" && (
          <div className="space-y-3">
            {[1,2].map((i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4 text-sm">
                <p className="italic">"Exceptional engineer with strong leadership instincts."</p>
                <p className="text-xs text-muted-foreground mt-2">— Director, TechCorp</p>
              </div>
            ))}
            <button className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Request Commendation</button>
          </div>
        )}
        {tab !== "About" && tab !== "Credentials" && tab !== "Letters" && (
          <p className="text-sm text-muted-foreground">Your {tab.toLowerCase()} will appear here.</p>
        )}
      </div>
    </div>
  );
}