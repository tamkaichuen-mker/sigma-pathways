#!/usr/bin/env node
// Basic e2e smoke test for SigmaJob.
// Verifies the 5 critical flows by hitting routes and checking SSR HTML contains
// expected markers. Run dev server first: `bun run dev`, then `node scripts/e2e-smoke.mjs`.

const BASE = process.env.BASE_URL || "http://localhost:8080";

const checks = [
  // Flow 1: Home -> Jobs -> Job Detail
  { name: "Home renders",           path: "/",                  expect: /SigmaJob/i },
  { name: "Jobs list renders",      path: "/jobs",              expect: /Find Your Next Job|Senior Software Engineer/i },
  { name: "Job detail renders",     path: "/jobs/1",            expect: /Senior Software Engineer/i },
  { name: "Job detail has Apply",   path: "/jobs/1",            expect: /Apply Now/i },
  { name: "Anonymous Reviews tab",  path: "/jobs/1",            expect: /Anonymous Reviews/i },
  { name: "Interview Prep tab",     path: "/jobs/1",            expect: /Interview Prep/i },

  // Flow 2: Skill Tree
  { name: "Skill tree renders",     path: "/skill-tree",        expect: /Career Skill Tree|Software Developer/i },
  { name: "Classes page renders",   path: "/classes",           expect: /Classes/i },

  // Flow 3: Resume Analyzer
  { name: "Resume analyzer page",   path: "/resume-analyzer",   expect: /Resume Analyzer|Analyze My Resume/i },

  // Flow 4: Universities + Compare
  { name: "Universities list",      path: "/universities",      expect: /University Finder|universities worldwide/i },
  { name: "University detail",      path: "/universities/um",   expect: /Overview|Rankings|University/i },

  // Flow 5: Exchange
  { name: "Exchange page",          path: "/exchange",          expect: /Community Exchange|Verification Required/i },
  { name: "Exchange hour wallet",   path: "/exchange",          expect: /Hour Wallet/i },
];

let pass = 0, fail = 0;
const failures = [];

for (const c of checks) {
  try {
    const res = await fetch(BASE + c.path, { redirect: "follow" });
    const body = await res.text();
    const ok = res.ok && c.expect.test(body);
    if (ok) { pass++; console.log(`  ok  ${c.name}`); }
    else { fail++; failures.push(`${c.name} (${c.path}) status=${res.status}`); console.log(`  FAIL ${c.name} [${res.status}]`); }
  } catch (e) {
    fail++; failures.push(`${c.name}: ${e.message}`);
    console.log(`  FAIL ${c.name}: ${e.message}`);
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log("\nFailures:");
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
}