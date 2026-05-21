import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/fields/$field")({ component: FieldDetail });
function FieldDetail() {
  const { field } = Route.useParams();
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold">{decodeURIComponent(field)}</h1>
      <p className="text-muted-foreground mt-2">Explore occupations and universities in this field.</p>
      <h2 className="font-bold mt-8 mb-3">Occupations</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {["Software Developer","Data Analyst","Product Manager","UX Designer","Engineer","Cybersecurity Analyst"].map((o) => (
          <Link key={o} to="/occupations/$id" params={{ id: o.toLowerCase().replace(/\s+/g, "-") }} className="bg-card border border-border rounded-2xl p-4 card-hover">
            <h3 className="font-semibold">{o}</h3>
            <p className="text-xs text-muted-foreground mt-1">High demand · Avg RM7,500</p>
          </Link>
        ))}
      </div>
      <h2 className="font-bold mt-8 mb-3">Universities Offering</h2>
      <Link to="/universities" search={{ field } as any} className="text-primary hover:underline text-sm">Browse all universities →</Link>
    </div>
  );
}