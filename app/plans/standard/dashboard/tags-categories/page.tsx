"use client";

import { useEffect, useState } from "react";
import { getAllTags, addTagToReview, deleteTag } from "./actions";

export default function TagsCategoriesPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTagName, setNewTagName] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    const result = await getAllTags();
    if (result.success) {
      setTags(result.tags);
    }
    setLoading(false);
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    await addTagToReview(newTagName);
    setNewTagName("");
    fetchTags();
  };

  const handleDeleteTag = async (tagId: string) => {
    await deleteTag(tagId);
    fetchTags();
  };

  const filteredTags = filter === "all" 
    ? tags 
    : tags.filter((tag) => tag.sentiment === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] p-6 flex items-center justify-center">
        <p className="text-gray-400">Loading tags...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Review Tags & Categories</h1>
            <p className="text-gray-400 text-sm mt-1">
              Organize and analyze reviews by tags and categories.
            </p>
          </div>
        </div>

        {/* Filter & Add Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 bg-[#181D27] border border-[#2A303C] rounded-lg px-3 py-1.5">
            <span className="text-xs text-gray-400">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent border-none text-sm text-white focus:outline-none"
            >
              <option value="all">All</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className="flex flex-1 gap-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="flex-1 bg-[#181D27] border border-[#2A303C] rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-indigo-500 placeholder-gray-500"
              placeholder="Enter new tag (e.g. Service, Food, Staff)..."
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm transition"
            >
              Add Tag
            </button>
          </div>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 hover:border-[#2A303C] transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">#</span>
                  <h3 className="text-white font-medium">{tag.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tag.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                    tag.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {tag.sentiment}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="text-gray-500 hover:text-red-400 transition"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Reviews</span>
                  <span className="text-white">{tag._count?.reviews || 0}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Avg Rating</span>
                  <span className="text-white">{tag.avgRating?.toFixed(1) || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTags.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-12">
            No tags found. Add a tag to get started!
          </div>
        )}
      </div>
    </div>
  );
}
