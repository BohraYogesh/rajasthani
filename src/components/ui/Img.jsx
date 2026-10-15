import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";

const tones = [
  "from-[#f3c9a0] via-[#e8a083] to-[#c9705a]",
  "from-[#f6dfa8] via-[#e3b26a] to-[#c9973f]",
  "from-[#e9b8a6] via-[#c9705a] to-[#8b2e3a]",
  "from-[#f4d9b8] via-[#e8b58a] to-[#d08a5c]",
];

function hash(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function Placeholder({ label = "image", className = "" }) {
  const tone = tones[hash(label) % tones.length];
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-br ${tone} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,#fff_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_35%)]" />
      <ImageIcon className="relative h-7 w-7 text-white/80" strokeWidth={1.4} />
      <span className="relative px-3 text-center text-[11px] font-medium tracking-wide text-white/90">
        {label}
      </span>
    </div>
  );
}

// natural = true: image apni asli proportion me, width 100%, height auto
export default function Img({
  src,
  alt = "",
  label,
  className = "",
  fit = "cover",
  natural = false,
  ...rest
}) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return natural ? (
      <div className="aspect-[16/10] w-full">
        <Placeholder label={label || alt || src} className={className} />
      </div>
    ) : (
      <Placeholder label={label || alt || src} className={className} />
    );
  }

  const sizing = natural
    ? "block h-auto w-full"
    : `h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={`${sizing} ${className}`}
      {...rest}
    />
  );
}
