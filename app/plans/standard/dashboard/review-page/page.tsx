"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getMySlug, saveSlug } from "./actions";
import { ExternalLink, Copy } from "lucide-react";

export default function ReviewPageSettings() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || "OWNER";
  const canEdit = teamRole !== "VIEW_ONLY";

  const [slug, setSlug] = useState("");
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    getMySlug().then((result) => {
      if (result.success && result.slug) {
        setSavedSlug(result.slug);
        setSlug(result.slug);
      }
      setLoading(false);
    });
  }, []);

  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const cardBg = theme === "light" ? "bg-white border-gray-200" : "bg-[#181D27] border-[#2A303C]";
  const inputBg = theme === "light" ? "bg-white border-gray-300 text-gray-900" : "bg-[#181D27] border-[#2A303C] text-white";

  const publicUrl = savedSlug ? `${typeof window !== "undefined" ? window.location.origin : ""}/r/${savedSlug}` : "";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    setSaving(true);
    setMessage("");
    const result = await saveSlug(slug);
    if (result.success) {
      setSavedSlug(result.slug!);
      setMessage("Saved successfully!");
    } else {
      setMessage(result.error || "Failed to save");
    }
    setSaving(false);
  };

  const handleCopy = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className={`p-6 min-h-screen ${bgMain} ${textMain}`}>Loading...</div>;
  }

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${bgMain} ${textMain}`}>
      <h1 className="text-2xl font-bold mb-1">Public Review Page</h1>
      <p className={`${textSecondary} mb-6`}>
        Share a public page showcasing your customer reviews — no website needed.
      </p>

      {!canEdit && (
        <div className="border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 rounded-lg p-4 mb-6 text-sm">
          You have view-only access. Only the account owner or a Full Access member can change this.
        </div>
      )}

      {savedSlug && (
        <div className={`${cardBg} border rounded-lg p-4 mb-6 flex items-center justify-between gap-3`}>
          <div className="min-w-0">
            <p className={`text-xs ${textSecondary} mb-1`}>Your public page:</p>
            <p className="text-sm text-indigo-400 truncate">{publicUrl}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={handleCopy} className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">
              <Copy size={14} />
            </button>
            <a href={`/r/${savedSlug}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#1F2430] hover:bg-[#2A303C] text-gray-300">
              <ExternalLink size={14} />
            </a>
          </div>
          {copied && <span className="text-xs text-green-400">Copied!</span>}
        </div>
      )}

      <fieldset disabled={!canEdit} className="max-w-md space-y-4 disabled:opacity-50">
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Choose your page URL</label>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${textSecondary}`}>/r/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                minLength={3}
                className={`flex-1 border rounded-lg px-4 py-2 outline-none ${inputBg}`}
                placeholder="your-business-name"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !canEdit}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            {saving ? "Saving..." : savedSlug ? "Update URL" : "Create Page"}
          </button>

          {message && <p className="text-sm text-green-400 mt-2">{message}</p>}
        </form>
      </fieldset>
    </div>
  );
}
