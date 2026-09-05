interface TransparentLogoVideoProps {
  src: string;
  className?: string;
}

export default function TransparentLogoVideo({
  src,
  className,
}: TransparentLogoVideoProps) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  );
}
