import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { AiKeyBanner } from "@/components/AiKeyBanner";
import { callGemini } from "@/lib/gemini";
import { toast } from "sonner";

export const Route = createFileRoute("/career-coach")({ component: CoachPage });

type Msg = { role: "user" | "model"; text: string; time: string };

const starters = [
  "What should I learn first?",
  "Review my skill progress",
  "How do I negotiate salary?",
  "Help me prepare for interviews",
  "Should I do a Master's?",
];

function CoachPage() {
  const [profile, setProfile] = useState({ education: "Bachelor", career: "Software Developer", years: "2", skills: "React, JavaScript", challenge: "" });
  const [submitted, setSubmitted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const system = `You are SigmaJob's AI Career Coach — professional and empathetic. User profile: education ${profile.education}, target career ${profile.career}, ${profile.years} years experience, skills: ${profile.skills}. Give practical advice under 200 words. Reference global career context.`;
      const out = await callGemini(`${system}\n\nUser: ${text}`, messages.map((m) => ({ role: m.role, text: m.text })));
      setMessages((m) => [...m, { role: "model", text: out, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">AI Career Coach</h1>
      <AiKeyBanner />
      <div className="grid grid-cols-1 lg:grid-cols-[35%_1fr] gap-6 mt-6">
        <div className="bg-card border border-border rounded-2xl p-6 h-fit">
          {!submitted ? (
            <>
              <h2 className="font-bold mb-4">Build Your Profile</h2>
              <div className="space-y-3">
                <select value={profile.education} onChange={(e) => setProfile({ ...profile, education: e.target.value })} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm">
                  {["High School","Diploma","Bachelor","Master","PhD"].map((e) => <option key={e}>{e}</option>)}
                </select>
                <input value={profile.career} onChange={(e) => setProfile({ ...profile, career: e.target.value })} placeholder="Target career" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
                <input value={profile.years} onChange={(e) => setProfile({ ...profile, years: e.target.value })} placeholder="Years of experience" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
                <input value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="Current skills" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
                <textarea value={profile.challenge} onChange={(e) => setProfile({ ...profile, challenge: e.target.value })} placeholder="Biggest challenge" rows={3} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
                <button onClick={() => setSubmitted(true)} className="btn-gradient w-full py-2 rounded-lg font-semibold">Build My Profile</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-bold">Your Profile</h2>
              <p className="text-sm text-muted-foreground mt-1">{profile.career} · {profile.years} yrs · {profile.education}</p>
              <h3 className="font-bold mt-6 text-sm">Roadmap</h3>
              <div className="mt-3 space-y-3">
                {[["Now","Audit your current skills","Set 2 weekly goals","Update your resume"],["3 months","Complete 1 certification","Build 1 portfolio project","Network with 5 pros"],["6 months","Apply to 20+ roles","Mock interviews","Mid-level skills"],["1 year","Senior projects","Mentor someone","Salary negotiation"],["3 years","Lead role","Public speaking","Consider Master's"]].map(([title, ...steps]) => (
                  <div key={title} className="bg-background border border-border rounded-lg p-3">
                    <div className="text-xs font-semibold text-primary">{title}</div>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">{steps.map((s) => <li key={s as string}>• {s}</li>)}</ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl flex flex-col h-[600px]">
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="w-10 h-10 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground mt-3">Try one of these to get started:</p>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {starters.map((s) => <button key={s} onClick={() => send(s)} className="px-3 py-1.5 rounded-full border border-border text-xs hover:border-primary">{s}</button>)}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${m.role === "user" ? "bg-primary text-white rounded-br-sm" : "bg-background border-l-4 border-secondary rounded-bl-sm"}`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                  <div className="text-[10px] opacity-60 mt-1">{m.time}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-background border-l-4 border-secondary rounded-2xl rounded-bl-sm p-3 flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "100ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-border p-3 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-sm" />
            <button type="submit" disabled={loading || !input.trim()} className="btn-gradient px-4 rounded-lg disabled:opacity-50"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}