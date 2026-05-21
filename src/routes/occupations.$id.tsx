import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

export const Route = createFileRoute("/occupations/$id")({ component: OccupationDetail });
const salaryData = [{region:"Malaysia",salary:7500},{region:"Singapore",salary:14000},{region:"UK",salary:18000},{region:"USA",salary:28000},{region:"Australia",salary:20000}];
const trendData = Array.from({length:12},(_,i)=>({month:`M${i+1}`,jobs:800+i*50}));

function OccupationDetail() {
  const { id } = Route.useParams();
  const name = id.split("-").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" ");
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h1 className="text-3xl font-bold">{name}</h1>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="px-3 py-1 rounded bg-primary/15 text-primary text-sm">Technology</span>
          <span className="px-3 py-1 rounded bg-secondary/15 text-secondary text-sm">High Demand</span>
          <span className="px-3 py-1 rounded bg-secondary/15 text-secondary text-sm">Low AI Risk</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link to="/skill-tree" className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">View Skill Tree</Link>
          <Link to="/jobs" className="px-4 py-2 rounded-lg border border-border text-sm">Find Jobs</Link>
          <Link to="/classes" className="px-4 py-2 rounded-lg border border-border text-sm">Find Classes</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-card border border-border rounded-2xl p-6"><h2 className="font-bold mb-3">Salary by Region</h2><div style={{height:280}}><ResponsiveContainer><BarChart data={salaryData}><CartesianGrid stroke="#2A2A3E" strokeDasharray="3 3" /><XAxis dataKey="region" stroke="#888" /><YAxis stroke="#888" /><Tooltip contentStyle={{background:"#1A1A2E",border:"1px solid #2A2A3E"}} /><Bar dataKey="salary" fill="#6C63FF" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer></div></div>
        <div className="bg-card border border-border rounded-2xl p-6"><h2 className="font-bold mb-3">Job Market Trend</h2><div style={{height:280}}><ResponsiveContainer><LineChart data={trendData}><CartesianGrid stroke="#2A2A3E" strokeDasharray="3 3" /><XAxis dataKey="month" stroke="#888" /><YAxis stroke="#888" /><Tooltip contentStyle={{background:"#1A1A2E",border:"1px solid #2A2A3E"}} /><Line dataKey="jobs" stroke="#00D4AA" strokeWidth={2} /></LineChart></ResponsiveContainer></div></div>
      </div>
      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h2 className="font-bold mb-3">Career Progression</h2>
        <div className="grid md:grid-cols-5 gap-2">
          {[["Entry","RM3-5k"],["Mid","RM6-9k"],["Senior","RM10-15k"],["Lead","RM15-22k"],["Director","RM25k+"]].map(([l, s]) => (
            <div key={l} className="bg-background border border-border rounded-xl p-3"><div className="font-semibold text-sm">{l}</div><div className="text-xs text-secondary">{s}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}