import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ArrowDown, MessageSquare, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/community/")({ component: CommunityPage });

const categories = ["Career Advice","Job Hunting","Tech Industry","Healthcare","Finance","Fresh Graduates","Financial Needs Support","Study & Learn","Company Culture","University Life","SigmaJob Updates"];
const seedPosts = [
  { id: "1", title: "How I landed my first remote dev job in 3 months", category: "Career Advice", author: "alex_dev", time: "2h", up: 421, comments: 87, preview: "Quick story sharing what worked..." },
  { id: "2", title: "Should I pursue a Master's in Data Science?", category: "Study & Learn", author: "data_curious", time: "5h", up: 312, comments: 64, preview: "Considering grad school..." },
  { id: "3", title: "Anonymous Petronas interview experience", category: "Job Hunting", author: "anon", time: "8h", up: 287, comments: 53, preview: "Tough but fair process..." },
  { id: "4", title: "Burnout in tech — how do you cope?", category: "Company Culture", author: "tired_dev", time: "1d", up: 198, comments: 41, preview: "Real talk needed..." },
  { id: "5", title: "Freshie salary in KL — what's normal?", category: "Fresh Graduates", author: "newgrad", time: "1d", up: 176, comments: 38, preview: "Got offers ranging RM2.5-4k..." },
  { id: "6", title: "Best free resources for learning React", category: "Tech Industry", author: "react_fan", time: "2d", up: 154, comments: 29, preview: "Sharing my path..." },
  { id: "7", title: "Should nurses do specialization early?", category: "Healthcare", author: "nurse_advice", time: "2d", up: 132, comments: 24, preview: "Looking for guidance..." },
  { id: "8", title: "CFA Level 1 study plan", category: "Finance", author: "finance_jr", time: "3d", up: 98, comments: 17, preview: "Made a 4-month plan..." },
];

function CommunityPage() {
  const [posts, setPosts] = useState(seedPosts);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { toast.error("Title is required"); return; }
    const newPost = {
      id: `new-${Date.now()}`,
      title: title.trim(),
      category,
      author: "you",
      time: "now",
      up: 1,
      comments: 0,
      preview: body.trim() || "—",
    };
    setPosts((p) => [newPost, ...p]);
    setTitle(""); setBody(""); setOpen(false);
    toast.success("Post published");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <aside className="space-y-4">
        <button type="button" onClick={() => setOpen(true)} className="btn-gradient w-full py-2 rounded-xl font-semibold">Create Post</button>
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-bold text-sm mb-3">Topics</h3>
          <ul className="space-y-1">{categories.map((c) => <li key={c}><button className="text-sm text-muted-foreground hover:text-white">{c}</button></li>)}</ul>
        </div>
      </aside>
      <div>
        {open && (
          <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3">
            <h3 className="font-bold">New Post</h3>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="What's on your mind?" rows={3} className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm" />
            <div className="flex gap-2">
              <button type="submit" className="btn-gradient px-4 py-2 rounded-lg text-sm font-semibold">Publish</button>
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg text-sm border border-border">Cancel</button>
            </div>
          </form>
        )}
        <div className="flex gap-2 mb-4">{["Hot","New","Top","Rising"].map((s, i) => (
          <button key={s} className={`px-4 py-1.5 rounded-full text-sm ${i === 0 ? "btn-gradient" : "border border-border"}`}>{s}</button>
        ))}</div>
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-4 card-hover flex gap-3">
              <div className="flex flex-col items-center w-10">
                <button><ArrowUp className="w-4 h-4 hover:text-primary" /></button>
                <span className="text-xs font-bold">{p.up}</span>
                <button><ArrowDown className="w-4 h-4 hover:text-[#FF6B35]" /></button>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary">{p.category}</span>
                <Link to="/community/$id" params={{ id: p.id }} className="block font-semibold mt-2 hover:text-primary">{p.title}</Link>
                <p className="text-xs text-muted-foreground mt-1">by {p.author} · {p.time} ago</p>
                <p className="text-sm text-muted-foreground mt-2">{p.preview}</p>
                <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {p.comments}</span>
                  <span className="inline-flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</span>
                  <span className="inline-flex items-center gap-1"><Bookmark className="w-3 h-3" /> Save</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}