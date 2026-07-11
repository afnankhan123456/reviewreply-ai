export default function StandardDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f5f9ff] px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">Standard Plan</p>
        <h1 className="text-4xl font-black">Standard Dashboard</h1>
        <p className="mt-4 text-slate-600">
          Payment is not enabled yet. This page is the next step after the Standard pricing table.
        </p>
      </section>
    </main>
  );
}
