import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/post-job")({ component: PostJob });

function PostJob() {
  const [step, setStep] = useState(1);
  const steps = ["Basics", "Compensation", "Description", "Company"];
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-3xl font-bold">Post a Job</h1>
      <div className="flex gap-2 mt-6">{steps.map((s, i) => (
        <div key={s} className={`flex-1 h-1.5 rounded-full ${i + 1 <= step ? "gradient-primary" : "bg-muted"}`} />
      ))}</div>
      <div className="bg-card border border-border rounded-2xl p-6 mt-6 space-y-4">
        <h2 className="font-bold">Step {step}: {steps[step - 1]}</h2>
        {step === 1 && <>
          <Input label="Job Title" />
          <Input label="Company" />
          <Input label="Industry" />
          <Input label="Location (worldwide)" />
          <Input label="Application Deadline" type="date" />
        </>}
        {step === 2 && <>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Salary Min" type="number" />
            <Input label="Salary Max" type="number" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Currency" opts={["MYR","SGD","USD","GBP","AUD","EUR"]} />
            <Select label="Pay Period" opts={["Monthly","Annually","Hourly"]} />
          </div>
        </>}
        {step === 3 && <>
          <Textarea label="About the role" />
          <Textarea label="Responsibilities" />
          <Textarea label="Requirements" />
          <Input label="Required Skills (comma separated)" />
          <Input label="Nice-to-Have Skills" />
        </>}
        {step === 4 && <>
          <Textarea label="Company description" />
          <Input label="Website URL" />
          <Input label="Logo URL" />
          <Select label="Application Method" opts={["SigmaJob","External URL"]} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-primary" /> Auto-add applicants to Talent Pool</label>
        </>}
        <div className="flex gap-2 pt-4">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="px-4 py-2 border border-border rounded-lg">Back</button>}
          {step < 4 && <button onClick={() => setStep(step + 1)} className="ml-auto btn-gradient px-4 py-2 rounded-lg font-semibold">Next</button>}
          {step === 4 && <button onClick={() => toast.success("Job posted!")} className="ml-auto btn-cta px-4 py-2 rounded-lg font-semibold">Publish</button>}
        </div>
      </div>
    </div>
  );
}
function Input({ label, type = "text" }: { label: string; type?: string }) {
  return <div><label className="text-sm font-semibold">{label}</label><input type={type} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" /></div>;
}
function Textarea({ label }: { label: string }) {
  return <div><label className="text-sm font-semibold">{label}</label><textarea rows={4} className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" /></div>;
}
function Select({ label, opts }: { label: string; opts: string[] }) {
  return <div><label className="text-sm font-semibold">{label}</label><select className="mt-1 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm">{opts.map((o) => <option key={o}>{o}</option>)}</select></div>;
}