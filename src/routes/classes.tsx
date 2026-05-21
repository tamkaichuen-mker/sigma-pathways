import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Star, BookOpen } from "lucide-react";

export const Route = createFileRoute("/classes")({
  component: ClassesPage,
  validateSearch: (s: Record<string, unknown>) => ({ skill: typeof s.skill === "string" ? s.skill : undefined }),
});

const classes = [
  { id: "1", title: "React Mastery Bootcamp", tutor: "Sarah Chen", skill: "React", mode: "Online", dur: "8 weeks", price: "RM480", rating: 4.8, reviews: 124 },
  { id: "2", title: "Power BI for Analysts", tutor: "Adi Rahman", skill: "Power BI", mode: "Hybrid", dur: "4 weeks", price: "RM320", rating: 4.7, reviews: 89 },
  { id: "3", title: "Figma Design Systems", tutor: "Mei Lin", skill: "Figma", mode: "Online", dur: "6 weeks", price: "RM380", rating: 4.9, reviews: 156 },
  { id: "4", title: "SQL Deep Dive", tutor: "Daniel Wong", skill: "SQL", mode: "Online", dur: "5 weeks", price: "RM280", rating: 4.6, reviews: 78 },
  { id: "5", title: "Pharmacology for Nurses", tutor: "Dr. Aisha", skill: "Pharmacology", mode: "Offline", dur: "10 weeks", price: "RM900", rating: 4.8, reviews: 45 },
  { id: "6", title: "Financial Modelling Pro", tutor: "James Tan", skill: "Financial Modelling", mode: "Online", dur: "6 weeks", price: "RM550", rating: 4.7, reviews: 67 },
  { id: "7", title: "Cybersecurity Fundamentals", tutor: "Rahul Patel", skill: "SIEM", mode: "Hybrid", dur: "8 weeks", price: "RM620", rating: 4.6, reviews: 92 },
  { id: "8", title: "Product Management Intro", tutor: "Lisa Park", skill: "Agile", mode: "Online", dur: "4 weeks", price: "RM360", rating: 4.8, reviews: 110 },
];

function ClassesPage() {
  const { skill } = useSearch({ from: "/classes" });
  const filtered = skill ? classes.filter((c) => c.skill.toLowerCase().includes(skill.toLowerCase())) : classes;
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Classes Marketplace</h1>
      <p className="text-muted-foreground mt-2">{filtered.length} classes{skill ? ` for "${skill}"` : ""}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filtered.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-5 card-hover">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center"><BookOpen className="w-6 h-6 text-white" /></div>
            <h3 className="font-bold mt-3">{c.title}</h3>
            <p className="text-xs text-muted-foreground">by {c.tutor}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary">{c.skill}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-muted">{c.mode}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-muted">{c.dur}</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs"><Star className="w-3 h-3 text-secondary fill-current" /> {c.rating} ({c.reviews})</div>
            <div className="flex items-center justify-between mt-3"><span className="font-bold text-secondary">{c.price}</span><button className="btn-gradient text-xs px-3 py-1.5 rounded-lg font-semibold">Book Now</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}