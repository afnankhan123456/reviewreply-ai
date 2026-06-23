export default function Navbar() {
  return (
    <div className="flex items-center justify-between mb-10">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Monitor your business reviews.
        </p>
      </div>

      <div className="bg-zinc-900 px-5 py-3 rounded-xl text-white">
        John Doe
      </div>

    </div>
  );
}