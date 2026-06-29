export default function RecentReviewsCard() {

  return (

    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <h2 className="text-xl font-bold text-black mb-5">
        Recent Reviews
      </h2>

      <div className="space-y-4">

        <div className="border-b border-zinc-100 pb-3">

          <p className="font-semibold text-black">
            John Smith
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            Great customer support experience.
          </p>

        </div>

        <div className="border-b border-zinc-100 pb-3">

          <p className="font-semibold text-black">
            Sarah Lee
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            Fast review response system.
          </p>

        </div>

        <div>

          <p className="font-semibold text-black">
            Alex Brown
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            Dashboard UI looks amazing.
          </p>

        </div>

      </div>

    </div>

  );

}