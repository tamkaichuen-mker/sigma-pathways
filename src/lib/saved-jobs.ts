import { useEffect, useState } from "react";
import { toast } from "sonner";

const KEY = "sigmajob.savedJobs";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("saved-jobs-changed"));
}

export function useSavedJob(id: string) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const sync = () => setSaved(read().includes(id));
    sync();
    window.addEventListener("saved-jobs-changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("saved-jobs-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, [id]);

  const toggle = () => {
    const ids = read();
    if (ids.includes(id)) {
      write(ids.filter((x) => x !== id));
      toast("Removed from saved jobs");
    } else {
      write([...ids, id]);
      toast.success("Job saved");
    }
  };

  return { saved, toggle };
}