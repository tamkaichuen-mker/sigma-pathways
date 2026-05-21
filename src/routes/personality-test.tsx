import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/personality-test")({ component: PersonalityPage });

const dims = ["Introvert/Extrovert","Analytical/Creative","Detail/BigPicture","Leadership/Support","RiskTaker/SecuritySeeker"] as const;
const questions = Array.from({ length: 20 }, (_, i) => ({
  text: [
    "I enjoy being around large groups of people.",
    "I prefer breaking down problems into logical parts.",
    "I focus on the small details rather than the big picture.",
    "I naturally take charge of group projects.",
    "I'm comfortable taking financial or career risks.",
  ][i % 5] + ` (Q${i + 1})`,
  dim: i % 5,
}));

function PersonalityPage() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [publish, setPublish] = useState(false);

  const answer = (val: number) => {
    const next = [...answers, val];
    setAnswers(next);
    if (idx + 1 >= questions.length) {
      setDone(true);
      localStorage.setItem("personality_result", JSON.stringify(next));
    } else { setIdx(idx + 1); }
  };

  const scores = dims.map((_, d) => {
    const qs = answers.filter((_, i) => i % 5 === d);
    const avg = qs.reduce((a, b) => a + b, 0) / Math.max(qs.length, 1);
    return { dim: dims[d], score: Math.round(avg * 20) };
  });

  if (done) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-bold">Your Personality Profile</h1>
        <div className="bg-card border border-border rounded-2xl p-6 mt-6">
          <h2 className="text-2xl font-bold text-gradient">The Architect</h2>
          <p className="text-sm text-muted-foreground mt-2">Strategic, analytical, and independent. You thrive solving complex problems with creative systems thinking.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 mt-4" style={{ height: 360 }}>
          <ResponsiveContainer>
            <RadarChart data={scores}>
              <PolarGrid stroke="#2A2A3E" />
              <PolarAngleAxis dataKey="dim" stroke="#888" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis stroke="#888" />
              <Radar dataKey="score" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 mt-4">
          <h3 className="font-bold mb-3">Career Matches</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {["Software Architect","Data Scientist","Product Strategist"].map((c) => (
              <div key={c} className="bg-background border border-border rounded-lg p-3">
                <div className="font-semibold">{c}</div>
                <div className="text-xs text-secondary">92% match</div>
              </div>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 mt-4 text-sm">
          <input type="checkbox" checked={publish} onChange={(e) => { setPublish(e.target.checked); toast.success(e.target.checked ? "Published to profile" : "Removed from profile"); }} className="accent-primary" />
          Publish to my profile
        </label>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold">Personality Test</h1>
      <p className="text-muted-foreground mt-2">20 quick questions to map your strengths.</p>
      <div className="mt-6">
        <div className="text-xs text-muted-foreground">Question {idx + 1} of {questions.length}</div>
        <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
          <div className="h-full gradient-primary transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
        </div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-8 mt-6 text-center">
        <p className="text-lg">{questions[idx].text}</p>
        <div className="mt-6 flex justify-between text-xs text-muted-foreground">
          <span>Disagree</span><span>Agree</span>
        </div>
        <div className="mt-2 flex justify-center gap-3">
          {[1,2,3,4,5].map((v) => (
            <button key={v} onClick={() => answer(v)} className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-primary/10 transition font-bold">{v}</button>
          ))}
        </div>
      </div>
    </div>
  );
}