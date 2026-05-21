import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function PageStub({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-12">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs">
        <Sparkles className="w-3 h-3" /> Coming soon
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-3">{title}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl">{description}</p>
      <div className="mt-8">{children}</div>
      <Link to="/" className="mt-8 inline-block text-primary hover:underline">← Back to home</Link>
    </div>
  );
}