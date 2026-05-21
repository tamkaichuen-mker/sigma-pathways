import { createFileRoute, Link } from "@tanstack/react-router";
import { PageStub } from "@/components/PageStub";

export const Route = createFileRoute("/student-profile")({ component: () => (
  <PageStub title="Build Your Academic Profile" description="A 4-step builder that adapts to your highest qualification, generates a scholarship readiness score, and pre-fills the University Finder.">
    <Link to="/universities" className="btn-gradient px-4 py-2 rounded-xl font-semibold">Go to University Finder</Link>
  </PageStub>
)});
*** Add File: src/routes/fields.tsx
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/fields")({ component: FieldsPage });
const fields = ["Technology & Computing","Healthcare & Medicine","Business & Management","Engineering","Law & Legal Studies","Arts & Design","Sciences & Research","Education & Teaching","Finance & Accounting","Media & Communications","Architecture","Environmental Studies"];
function FieldsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Explore Fields of Study</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {fields.map((f) => (
          <Link key={f} to="/fields/$field" params={{ field: f }} className="bg-card border border-border rounded-2xl p-6 card-hover">
            <h3 className="font-bold">{f}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}