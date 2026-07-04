"use client";

import { useEffect, useState } from "react";
import {
  LayoutTemplate,
  MessageSquareReply,
  Sparkles,
  Star,
  Copy,
  Pencil,
  X,
} from "lucide-react";

export default function TemplatePage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Create / Edit modal states
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState("general");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    try {
      const res = await fetch("/api/templates");
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates || []);
      }
    } catch (err) {
      console.error("Failed to fetch templates", err);
    } finally {
      setLoading(false);
    }
  }

  // Stats calculations
  const totalTemplates = templates.length;
  const positiveCount = templates.filter((t) => t.category === "positive").length;
  const aiGeneratedCount = 0;   // placeholder – AI generate feature baad mein
  const replyTemplatesCount = totalTemplates;

  // =========== Create / Edit handlers ===========
  const handleCreateNew = () => {
    setEditingTemplate(null);
    setFormTitle("");
    setFormContent("");
    setFormCategory("general");
    setShowModal(true);
  };

  const handleEdit = (template: any) => {
    setEditingTemplate(template);
    setFormTitle(template.title);
    setFormContent(template.content);
    setFormCategory(template.category || "general");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formTitle.trim() || !formContent.trim()) return;
    setSaving(true);
    try {
      let res;
      if (editingTemplate) {
        // Update existing template
        res = await fetch(`/api/templates/${editingTemplate.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            content: formContent,
            category: formCategory,
          }),
        });
      } else {
        // Create new
        res = await fetch("/api/templates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle,
            content: formContent,
            category: formCategory,
          }),
        });
      }
      const data = await res.json();
      if (data.success) {
        fetchTemplates();   // refresh list
        setShowModal(false);
      } else {
        alert(data.error || "Save failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Copy content to clipboard
  const handleUse = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Template copied to clipboard!");
  };

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Templates
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">
          Create and manage AI review reply templates.
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Templates</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : totalTemplates}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <LayoutTemplate className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">AI Generated</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {aiGeneratedCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Positive Replies</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {positiveCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-green-500 fill-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Reply Templates</p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {replyTemplatesCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <MessageSquareReply className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* TEMPLATE LIST */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">Saved Templates</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Quickly reply to reviews using saved response templates.
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-5 py-3 rounded-2xl bg-black dark:bg-white dark:text-black text-white font-medium hover:opacity-90 transition"
          >
            Create Template
          </button>
        </div>

        <div className="space-y-5">
          {loading ? (
            <p className="text-center text-zinc-500 py-8">Loading templates...</p>
          ) : templates.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">No templates yet. Create your first one!</p>
          ) : (
            templates.map((tpl) => (
              <div
                key={tpl.id}
                className="border border-zinc-200 dark:border-zinc-700 rounded-3xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-black dark:text-white">{tpl.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tpl.active
                            ? "bg-green-100 text-green-600"
                            : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600"
                        }`}
                      >
                        {tpl.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 max-w-3xl">
                      {tpl.content}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3">
                      Last edited{" "}
                      {new Date(tpl.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUse(tpl.content)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                    >
                      <Copy className="w-4 h-4" />
                      Use
                    </button>
                    <button
                      onClick={() => handleEdit(tpl)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              {editingTemplate ? "Edit Template" : "Create Template"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full mt-1 border border-zinc-200 dark:border-zinc-600 rounded-xl px-3 py-2 bg-transparent text-black dark:text-white"
                  placeholder="e.g., Positive Review Reply"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full mt-1 border border-zinc-200 dark:border-zinc-600 rounded-xl px-3 py-2 bg-transparent text-black dark:text-white"
                >
                  <option value="general">General</option>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Content</label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  rows={4}
                  className="w-full mt-1 border border-zinc-200 dark:border-zinc-600 rounded-xl px-3 py-2 bg-transparent text-black dark:text-white"
                  placeholder="Your reply template text..."
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving || !formTitle.trim() || !formContent.trim()}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition"
              >
                {saving ? "Saving..." : "Save Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
