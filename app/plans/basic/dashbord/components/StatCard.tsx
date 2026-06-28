"use client";

type Props = {
  title: string;
  value: string;
  subtitle: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-6">

      <h2 className="text-lg font-semibold text-black mb-4">
        {title}
      </h2>

      <h1 className="text-4xl font-bold text-black">
        {value}
      </h1>

      <p className="text-zinc-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}