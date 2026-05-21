import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { getGeminiKey } from "@/lib/gemini";

export function AiKeyBanner() {
  const [hasKey, setHasKey] = useState(true);
  useEffect(() => { setHasKey(!!getGeminiKey()); }, []);
  if (hasKey) return null;
  return (
    <div className="bg-[#FF6B35]/15 border border-[#FF6B35]/40 rounded-xl p-4 mb-6 flex items-center gap-3 text-sm">
      <AlertTriangle className="w-5 h-5 text-[#FF6B35] shrink-0" />
      <span>Add your Gemini API key in <Link to="/settings" className="underline font-semibold">Settings</Link> to enable AI features.</span>
    </div>
  );
}