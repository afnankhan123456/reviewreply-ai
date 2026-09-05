export default function TransparentLogoVideo() {
  return (
    <video
      src="/logo-animation.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-contain"
    />
  );
}
