"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, ThumbsUp, ThumbsDown } from "lucide-react";
import { getArticles, submitArticleFeedback } from "./actions";

type Article = {
  id: string;
  title: string;
  content: string;
  category: string | null;
};

export function KnowledgeBase() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await getArticles();
      if (result.success) {
        setArticles(result.articles as Article[]);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const handleFeedback = async (articleId: string, helpful: boolean) => {
    const result = await submitArticleFeedback(articleId, helpful);
    if (result.success) {
      setFeedbackGiven((prev) => ({ ...prev, [articleId]: true }));
    }
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-sm text-gray-500 py-6">Loading articles...</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Knowledge Base</h3>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-indigo-500"
        />
      </div>

      <div className="divide-y divide-gray-700 border border-gray-700 rounded-lg">
        {filteredArticles.map((article) => (
          <div key={article.id}>
            <button
              onClick={() => toggleItem(article.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-white hover:bg-gray-700/50 transition-colors"
            >
              {article.title}
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${openItem === article.id ? "rotate-180" : ""}`}
              />
            </button>
            {openItem === article.id && (
              <div className="px-4 pb-4 text-sm text-gray-400">
                <p className="mb-3">{article.content}</p>

                {feedbackGiven[article.id] ? (
                  <p className="text-xs text-green-400">Thanks for your feedback!</p>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Was this helpful?</span>
                    <button
                      onClick={() => handleFeedback(article.id, true)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-green-500/20 hover:text-green-400"
                    >
                      <ThumbsUp size={12} /> Yes
                    </button>
                    <button
                      onClick={() => handleFeedback(article.id, false)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-red-500/20 hover:text-red-400"
                    >
                      <ThumbsDown size={12} /> No
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {filteredArticles.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            No articles found.
          </div>
        )}
      </div>
    </div>
  );
}
