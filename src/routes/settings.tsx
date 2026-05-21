import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Key } from "lucide-react";
import { toast } from "sonner";
import { callGemini } from "@/lib/gemini";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [opts, setOpts] = useState({ talentPool: true, notifyEmail: true, notifyPush: false });

  useEffect(() => {
    setKey(localStorage.getItem("gemini_api_key") ?? "");
  }, []);

  const save = () => {
    localStorage.setItem("gemini_api_key", key.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    toast.success("Settings saved");
  };

  const test = async () => {
    setTesting(true);
    try {
      const out = await callGemini("Reply with the single word: ok");
      toast.success("Connected: " + out.slice(0, 40));
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="mt-8 bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-bold flex items-center gap-2"><Key className="w-4 h-4" /> Gemini API Key</h2>
        <p className="text-sm text-muted-foreground">Required for AI features. Stored locally in your browser only.</p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="AIza..."
          className="w-full px-3 py-2 rounded-lg bg-input border border-border text-sm"
        />
        <div className="flex gap-2">
          <button onClick={save} className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Save</button>
          <button onClick={test} disabled={testing || !key} className="px-4 py-2 rounded-lg border border-border text-sm disabled:opacity-50">
            {testing ? "Testing..." : "Test Connection"}
          </button>
          {saved && <span className="inline-flex items-center gap-1 text-secondary text-sm"><Check className="w-4 h-4" /> Saved</span>}
        </div>
      </div>

      <div className="mt-6 bg-card border border-border rounded-2xl p-6 space-y-4">
        <h2 className="font-bold">Privacy & Notifications</h2>
        {[
          ["talentPool", "Opt-in to Talent Pool"],
          ["notifyEmail", "Email notifications"],
          ["notifyPush", "Push notifications"],
        ].map(([k, l]) => (
          <label key={k} className="flex items-center justify-between">
            <span className="text-sm">{l}</span>
            <input
              type="checkbox"
              checked={(opts as any)[k]}
              onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })}
              className="accent-primary w-5 h-5"
            />
          </label>
        ))}
      </div>
    </div>
  );
}