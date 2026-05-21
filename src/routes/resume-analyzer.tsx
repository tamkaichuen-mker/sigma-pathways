import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, FileText, Image, Sparkles, RotateCcw, AlertCircle } from "lucide-react";
import { AiKeyBanner } from "@/components/AiKeyBanner";
import { callGemini, extractJson, getGeminiKey } from "@/lib/gemini";
import { careers } from "@/data/careers";
import { toast } from "sonner";

export const Route = createFileRoute("/resume-analyzer")({ component: ResumePage });

type Result = {
  score: number;
  verdict: string;
  skillsFound: string[];
  missingSkills: string[];
  improvements: string[];
  perfectResumeModel: { summary: string; skills: string; experience: string; education: string; projects: string; certifications: string };
};

function ResumePage() {
  const [career, setCareer] = useState(careers[0].name);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (f: File) => new Promise<string>((res, rej) => {
    const r = new FileReader(); r.onload = () => res((r.result as string).split(",")[1]); r.onerror = rej; r.readAsDataURL(f);
  });

  const analyze = async () => {
    if (!file) return;
    if (!getGeminiKey()) { toast.error("Add Gemini API key in Settings"); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      let content = "";
      if (file.type.startsWith("image/")) {
        const b64 = await fileToBase64(file);
        // Use vision: send inline data via separate call
        const key = getGeminiKey();
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              role: "user", parts: [
                { text: `You are a professional resume analyst. Target career: ${career}. Analyze this resume image. Respond ONLY in valid JSON: { "score": int 0-100, "verdict": string, "skillsFound": string[], "missingSkills": string[], "improvements": string[8], "perfectResumeModel": { "summary": string, "skills": string, "experience": string, "education": string, "projects": string, "certifications": string } }` },
                { inline_data: { mime_type: file.type, data: b64 } },
              ]
            }]
          })
        });
        const data = await res.json();
        content = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      } else {
        const text = await file.text();
        content = await callGemini(`You are a professional resume analyst. Target career: ${career}. Resume content: ${text.slice(0, 8000)}. Respond ONLY in valid JSON: { "score": int, "verdict": string, "skillsFound": string[], "missingSkills": string[], "improvements": string[8], "perfectResumeModel": { "summary": string, "skills": string, "experience": string, "education": string, "projects": string, "certifications": string } }`);
      }
      const json = extractJson<Result>(content);
      if (!json) throw new Error("Could not parse AI response. Try again.");
      setResult(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s: number) => s > 75 ? "text-secondary" : s >= 50 ? "text-[#FF6B35]" : "text-destructive";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">AI Resume Analyzer</h1>
      <p className="text-muted-foreground mt-2">Powered by Gemini. Get an instant audit and improvement plan.</p>
      <div className="mt-6"><AiKeyBanner /></div>

      <div className="bg-card border border-border rounded-2xl p-6 mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold">Target Career</label>
          <select value={career} onChange={(e) => setCareer(e.target.value)} className="mt-2 w-full px-3 py-2 rounded-lg bg-input border border-border text-sm">
            {careers.map((c) => <option key={c.id}>{c.name}</option>)}
          </select>
        </div>
        <label className="block border-2 border-dashed border-border rounded-2xl p-10 text-center cursor-pointer hover:border-primary transition">
          <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
          <p className="mt-3 font-semibold">{file ? file.name : "Click to upload your resume"}</p>
          <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG, JPEG</p>
          <div className="flex justify-center gap-3 mt-3 text-muted-foreground">
            <FileText className="w-5 h-5" /><Image className="w-5 h-5" />
          </div>
        </label>
        <button onClick={analyze} disabled={!file || loading} className="btn-gradient w-full py-3 rounded-xl font-semibold inline-flex justify-center items-center gap-2 disabled:opacity-50">
          <Sparkles className="w-4 h-4" /> {loading ? "Gemini is analyzing your resume..." : "Analyze My Resume"}
        </button>
        {loading && <div className="flex justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}
      </div>

      {error && (
        <div className="mt-6 bg-card border border-destructive/40 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-destructive font-semibold"><AlertCircle className="w-5 h-5" /> Analysis failed</div>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
          <button onClick={analyze} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm"><RotateCcw className="w-4 h-4" /> Retry</button>
        </div>
      )}

      {result && (
        <div className="mt-6 grid grid-cols-1 gap-4">
          <Card delay={0}>
            <div className="flex items-center gap-6">
              <div className={`w-24 h-24 rounded-full border-4 ${result.score > 75 ? "border-secondary" : result.score >= 50 ? "border-[#FF6B35]" : "border-destructive"} flex items-center justify-center text-3xl font-bold ${scoreColor(result.score)}`}>
                {result.score}
              </div>
              <div>
                <h3 className="font-bold text-lg">Resume Score</h3>
                <p className="text-sm text-muted-foreground">{result.verdict}</p>
              </div>
            </div>
          </Card>
          <Card delay={100}>
            <h3 className="font-bold mb-3">Skills Detected</h3>
            <div className="flex flex-wrap gap-2">{(result.skillsFound || []).map((s) => <span key={s} className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-sm">{s}</span>)}</div>
          </Card>
          <Card delay={200}>
            <h3 className="font-bold mb-3">Missing Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(result.missingSkills || []).map((s) => (
                <div key={s} className="px-3 py-1 rounded-full bg-destructive/15 text-destructive text-sm inline-flex items-center gap-2">
                  {s}
                  <Link to="/classes" search={{ skill: s } as any} className="text-xs underline">Find Class</Link>
                </div>
              ))}
            </div>
          </Card>
          <Card delay={300}>
            <h3 className="font-bold mb-3">8 Actionable Improvements</h3>
            <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
              {(result.improvements || []).map((i, n) => <li key={n}>{i}</li>)}
            </ol>
          </Card>
          <Card delay={400}>
            <h3 className="font-bold mb-3">Perfect Resume Model</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              {result.perfectResumeModel && Object.entries(result.perfectResumeModel).map(([k, v]) => (
                <div key={k} className="bg-background border border-border rounded-lg p-3">
                  <div className="text-xs uppercase tracking-wider text-primary mb-1">{k}</div>
                  <div className="text-muted-foreground">{v as string}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function Card({ children, delay }: { children: React.ReactNode; delay: number }) {
  return <div className="bg-card border border-border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}