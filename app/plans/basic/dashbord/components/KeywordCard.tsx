export default function KeywordCard() {

  const keywords = [
    "Fast Service",
    "Friendly Staff",
    "Good Quality",
    "Quick Reply",
    "Clean Place",
  ];

  return (

    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <h2 className="text-xl font-bold text-black mb-5">
        Top Keywords
      </h2>

      <div className="flex flex-wrap gap-3">

        {keywords.map((keyword, index) => (

          <div
            key={index}
            className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm"
          >
            {keyword}
          </div>

        ))}

      </div>

    </div>

  );

}