type Props = {
  title: string;
  value: string;
};

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">

      <h2 className="text-zinc-400 mb-3">
        {title}
      </h2>

      <p className="text-4xl font-bold text-white">
        {value}
      </p>

    </div>
  );
}