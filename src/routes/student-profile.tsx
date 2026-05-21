import { createFileRoute, Link } from "@tanstack/react-router";
import { PageStub } from "@/components/PageStub";

export const Route = createFileRoute("/student-profile")({ component: () => (
  <PageStub title="Build Your Academic Profile" description="A 4-step builder that adapts to your highest qualification, generates a scholarship readiness score, and pre-fills the University Finder.">
    <Link to="/universities" className="btn-gradient px-4 py-2 rounded-xl font-semibold">Go to University Finder</Link>
  </PageStub>
)});