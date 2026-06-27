"use client";

export default function BasicPricingPage() {
return ( <div className="min-h-screen bg-black text-white p-8">

```
  <div className="max-w-7xl mx-auto">

    {/* HEADING */}

    <div className="text-center mb-14">

      <h1 className="text-6xl font-bold mb-4">
        BASIC PLAN
      </h1>

      <p className="text-zinc-400 text-xl">
        Perfect for Small Businesses & Startups
      </p>

    </div>

    {/* TABLE */}

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

      {/* HEADER */}

      <div className="grid grid-cols-5 bg-[#0B2C74] text-white font-semibold text-center">

        <div className="p-6 border-r border-blue-800">
          DURATION
        </div>

        <div className="p-6 border-r border-blue-800">
          PRICE (USD)
        </div>

        <div className="p-6 border-r border-blue-800">
          EFFECTIVE PRICE / MONTH
        </div>

        <div className="p-6 border-r border-blue-800">
          YOU SAVE
        </div>

        <div className="p-6">
          FEATURES INCLUDED
        </div>

      </div>

      {/* ROW 1 */}

      <div className="grid grid-cols-5 border-t border-zinc-800">

        <div className="p-8 border-r border-zinc-800 font-semibold">
          1 Month
        </div>

        <div className="p-8 border-r border-zinc-800 text-5xl font-bold">
          $9
        </div>

        <div className="p-8 border-r border-zinc-800">
          $9 / month
        </div>

        <div className="p-8 border-r border-zinc-800">
          —
        </div>

        <div className="p-8">
          1 Business Location
        </div>

      </div>

      {/* ROW 2 */}

      <div className="grid grid-cols-5 border-t border-zinc-800">

        <div className="p-8 border-r border-zinc-800 font-semibold">
          3 Months
        </div>

        <div className="p-8 border-r border-zinc-800 text-5xl font-bold">
          $24
        </div>

        <div className="p-8 border-r border-zinc-800">
          $8 / month
        </div>

        <div className="p-8 border-r border-zinc-800 text-green-500 font-bold">
          Save 11%
        </div>

        <div className="p-8">
          Google Review Sync
        </div>

      </div>

      {/* ROW 3 */}

      <div className="grid grid-cols-5 border-t border-zinc-800">

        <div className="p-8 border-r border-zinc-800 font-semibold">
          6 Months
        </div>

        <div className="p-8 border-r border-zinc-800 text-5xl font-bold">
          $45
        </div>

        <div className="p-8 border-r border-zinc-800">
          $7.50 / month
        </div>

        <div className="p-8 border-r border-zinc-800 text-green-500 font-bold">
          Save 17%
        </div>

        <div className="p-8">
          Review Dashboard
        </div>

      </div>

      {/* ROW 4 */}

      <div className="grid grid-cols-5 border-t border-zinc-800">

        <div className="p-8 border-r border-zinc-800 font-semibold">
          12 Months
        </div>

        <div className="p-8 border-r border-zinc-800 text-5xl font-bold">
          $88
        </div>

        <div className="p-8 border-r border-zinc-800">
          $7.33 / month
        </div>

        <div className="p-8 border-r border-zinc-800 text-green-500 font-bold">
          Save 20%
        </div>

        <div className="p-8">
          Basic Review Analytics
        </div>

      </div>

    </div>

  </div>

</div>
```

);
}
