import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, CheckCircle2, Award } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/exchange")({ component: ExchangePage });

const tasks = [
  { id: 1, title: "Tutor Math for SPM students", org: "Mosaic Foundation", hrs: 4, loc: "KL", desc: "Weekly online tuition for underserved students." },
  { id: 2, title: "Design posters for NGO event", org: "GreenEarth", hrs: 3, loc: "Remote", desc: "3 promotional posters needed." },
  { id: 3, title: "Distribute food packs", org: "Kechara", hrs: 5, loc: "Klang", desc: "Saturday morning distribution." },
  { id: 4, title: "English conversation practice", org: "MyReads", hrs: 2, loc: "Remote", desc: "30-min weekly call with refugees." },
  { id: 5, title: "Resume review for graduates", org: "Career Bridge", hrs: 3, loc: "Remote", desc: "Review 5 resumes from low-income youth." },
  { id: 6, title: "Translate documents", org: "Refugee Support", hrs: 4, loc: "Remote", desc: "Translate Burmese ↔ English." },
];

function ExchangePage() {
  const [verified, setVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => { setVerified(localStorage.getItem("exchangeVerified") === "true"); }, []);

  const submit = () => {
    localStorage.setItem("exchangeVerified", "true");
    setVerified(true); setOpen(false); setStep(1);
    toast.success("Application submitted — review within 3-5 business days.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-card border border-border rounded-2xl p-6 text-center relative overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-bold">Global Community Exchange</h1>
        <p className="text-muted-foreground mt-2">Empowering People with Financial Needs</p>
      </div>

      {!verified && (
        <div className="bg-[#FF6B35]/15 border border-[#FF6B35]/40 rounded-2xl p-6 mt-6 text-center">
          <Lock className="w-8 h-8 mx-auto text-[#FF6B35]" />
          <h2 className="font-bold mt-3">Verification Required</h2>
          <p className="text-sm text-muted-foreground mt-2">Participation requires official eligibility verification — takes 5 minutes.</p>
          <button onClick={() => setOpen(true)} className="btn-gradient px-6 py-2 rounded-xl mt-4 font-semibold">Begin Verification</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[60%_1fr] gap-6 mt-6">
        <div className="space-y-3">
          <h2 className="font-bold">Available Tasks</h2>
          {tasks.map((t) => (
            <div key={t.id} className={`bg-card border border-border rounded-2xl p-4 ${!verified ? "opacity-50" : "card-hover"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-xs text-muted-foreground">{t.org} · {t.loc}</p>
                </div>
                <span className="px-2 py-1 rounded bg-secondary/15 text-secondary text-xs font-semibold">{t.hrs} hrs</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
              <button disabled={!verified} className="btn-gradient text-sm px-4 py-1.5 rounded-lg font-semibold mt-3 disabled:opacity-50">Claim Task</button>
            </div>
          ))}
        </div>
        <aside className="space-y-4 h-fit">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold flex items-center gap-2"><Award className="w-4 h-4 text-secondary" /> Hour Wallet</h3>
            <div className="text-4xl font-bold text-gradient mt-3">12</div>
            <div className="text-xs text-muted-foreground">hours earned</div>
            <div className="mt-3"><div className="text-xs">Bronze → Silver</div><div className="h-2 bg-muted rounded-full mt-1 overflow-hidden"><div className="h-full gradient-primary" style={{ width: "60%" }} /></div></div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold mb-3">Redeem</h3>
            {[["Grocery Voucher",5],["Cash Support",10],["School Supplies",8]].map(([name, hrs]) => (
              <div key={name as string} className="flex justify-between items-center py-2 border-b border-border text-sm">
                <span>{name}</span><span className="text-secondary">{hrs} hrs</span>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-sm">
            <h3 className="font-bold mb-3">How It Works</h3>
            <ol className="space-y-2 text-muted-foreground text-xs list-decimal pl-4">
              <li>Get verified</li><li>Claim tasks</li><li>Complete & log hours</li><li>Redeem rewards</li>
            </ol>
          </div>
        </aside>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold text-xl">Verification — Step {step} of 4</h2>
            <div className="h-1.5 bg-muted rounded-full mt-3 overflow-hidden"><div className="h-full gradient-primary transition-all" style={{ width: `${(step/4)*100}%` }} /></div>
            <div className="space-y-3 mt-4 text-sm">
              {step === 1 && <><p className="font-semibold">Personal Details</p><input placeholder="Full Name" className="w-full px-3 py-2 bg-input border border-border rounded-lg" /><input placeholder="Date of birth" type="date" className="w-full px-3 py-2 bg-input border border-border rounded-lg" /><input placeholder="Country & City" className="w-full px-3 py-2 bg-input border border-border rounded-lg" /><input placeholder="National ID / Passport" className="w-full px-3 py-2 bg-input border border-border rounded-lg" /></>}
              {step === 2 && <><p className="font-semibold">Financial Needs</p><select className="w-full px-3 py-2 bg-input border border-border rounded-lg"><option>Below USD 300/mo</option><option>USD 300-600</option><option>USD 600-1000</option><option>USD 1000-2000</option><option>Prefer not to say</option></select><input placeholder="Number of dependents" type="number" className="w-full px-3 py-2 bg-input border border-border rounded-lg" /><textarea placeholder="Reason for applying" rows={3} className="w-full px-3 py-2 bg-input border border-border rounded-lg" /><input type="file" className="text-xs" /></>}
              {step === 3 && <><p className="font-semibold">Certifying Organization</p><label className="flex items-center gap-2"><input type="checkbox" /> Backed by NGO/Govt program</label><input placeholder="Organization name" className="w-full px-3 py-2 bg-input border border-border rounded-lg" /><input type="file" className="text-xs" /><p className="text-xs text-muted-foreground">Reviewed within 3-5 business days.</p></>}
              {step === 4 && <><p className="font-semibold">Declaration</p><label className="flex items-start gap-2"><input type="checkbox" className="mt-1" /> <span>I declare all information is true and accurate.</span></label><label className="flex items-start gap-2"><input type="checkbox" className="mt-1" /> <span>I consent to verification by the SigmaJob team.</span></label></>}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border border-border rounded-lg text-sm">Cancel</button>
              {step > 1 && <button onClick={() => setStep(step - 1)} className="px-4 py-2 border border-border rounded-lg text-sm">Back</button>}
              {step < 4 && <button onClick={() => setStep(step + 1)} className="ml-auto btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Next</button>}
              {step === 4 && <button onClick={submit} className="ml-auto btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Submit Verification</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}