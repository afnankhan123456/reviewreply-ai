"use client";

import { useState } from "react";

export default function Dashboard() {
  const [review, setReview] = useState("");
  const [reply, setReply] = useState("");

  const generateReply = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Review Reply AI
      </h1>

      <textarea
        className="border p-3 w-full h-40"
        placeholder="Paste customer review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button
        onClick={generateReply}
        className="bg-black text-white px-5 py-2 mt-4"
      >
        Generate Reply
      </button>

      {reply && (
        <div className="mt-6 border p-4">
          <h2 className="font-bold mb-2">AI Reply:</h2>
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}