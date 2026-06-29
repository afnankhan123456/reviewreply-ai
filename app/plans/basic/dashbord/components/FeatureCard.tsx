type Props = {
  title: string;
  icon: string;
  subtitle: string;
};

export default function FeatureCard({
  title,
  icon,
  subtitle,
}: Props) {

  return (

    <div className="bg-white rounded-3xl border border-zinc-200 p-5 hover:shadow-lg transition-all">

      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>

      <h3 className="text-black font-semibold text-lg">
        {title}
      </h3>

      <p className="text-zinc-500 text-sm mt-2">
        {subtitle}
      </p>

    </div>

  );

}