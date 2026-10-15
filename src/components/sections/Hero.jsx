import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { wedding } from "../../data/weddingData";
import useCountdown from "../../hooks/useCountdown";
import { getLenis } from "../../lib/scroll";
import bg from "../../assets/bride-groom-bg.webp";
import bgDesktop from "../../assets/bride-groom-bg-desktop.webp";

const TITLE = "Padharo Mhare Des";
const SUBTITLE = "Ek Shubh Vivaah Ka Aamantran";

/* Background ka focus point (x% y%). Desktop par image crop ho rahi ho to
   yahan badlo, jaise "50% 70%" = image ka neeche wala hissa zyada dikhega */
const BG_POSITION = "50% 50%";

/* Content column ki max width = screen height * 0.62 (portrait). */
const COLUMN = "min(100vw, 62svh)";

/* Sab sizes `cqw` mein hain (column ki width ka %), isliye har screen par
   design same proportion mein scale hota hai. */
const cq = (v) => `${v}cqw`;

/* Naam ka maximum size (chhote naam isi size par rahenge) */
const NAME_MAX_SIZE = 7.2;

const css = `
@keyframes hero-fall {
  0%   { transform: translate3d(0,-8vh,0) rotate(0deg); opacity: 0; }
  10%  { opacity: .9; }
  50%  { transform: translate3d(var(--sway),50vh,0) rotate(180deg); }
  100% { transform: translate3d(calc(var(--sway) * -.6),108vh,0) rotate(360deg); opacity: 0; }
}
@keyframes hero-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(1.2cqw); } }
.hero-petal {
  position: absolute; top: 0; border-radius: 100% 0 100% 0;
  background: linear-gradient(135deg, #f26b8a, #d93c63);
  animation: hero-fall linear infinite; will-change: transform;
}
.hero-bob { animation: hero-bob 2.2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .hero-petal, .hero-bob { animation: none; } .hero-petal { display: none; } }
`;

const petals = [
  { l: "8%", s: 1.7, d: 11, dl: -2, sw: "6vw" },
  { l: "20%", s: 1.2, d: 14, dl: -7, sw: "-5vw" },
  { l: "33%", s: 1.5, d: 12, dl: -4, sw: "7vw" },
  { l: "47%", s: 1.1, d: 16, dl: -10, sw: "-6vw" },
  { l: "60%", s: 1.8, d: 13, dl: -1, sw: "5vw" },
  { l: "72%", s: 1.3, d: 15, dl: -8, sw: "-7vw" },
  { l: "84%", s: 1.6, d: 12, dl: -5, sw: "6vw" },
  { l: "92%", s: 1.2, d: 17, dl: -12, sw: "-4vw" },
];

/* dateISO se day / month / year (IST) */
function useDateParts(iso) {
  return useMemo(() => {
    const d = new Date(iso);
    const f = (o) =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        ...o,
      }).format(d);
    return {
      day: f({ day: "numeric" }),
      month: f({ month: "long" }).toUpperCase(),
      year: f({ year: "numeric" }),
    };
  }, [iso]);
}

function Flourish({ width = 46 }) {
  return (
    <svg
      viewBox="0 0 200 24"
      style={{ width: cq(width) }}
      className="mx-auto block"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 12h74M122 12h74" stroke="#b8863a" strokeWidth="1" />
      <path
        d="M100 2c5 6 10 7 14 10-4 3-9 4-14 10-5-6-10-7-14-10 4-3 9-4 14-10z"
        fill="#b8863a"
      />
      <circle cx="82" cy="12" r="2" fill="#b8863a" />
      <circle cx="118" cy="12" r="2" fill="#b8863a" />
      <circle cx="70" cy="12" r="1.2" fill="#b8863a" />
      <circle cx="130" cy="12" r="1.2" fill="#b8863a" />
    </svg>
  );
}

/* NAAM: hamesha ek line, card ke safe area ke ANDAR. Naam ki asli width naap kar
   font apne aap itna chhota hota hai ki fit ho jaye. */
function FitName({ bride, groom }) {
  const boxRef = useRef(null);
  const textRef = useRef(null);
  const kRef = useRef(1);
  const [k, setK] = useState(1);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const fit = () => {
      const natural = text.offsetWidth / kRef.current; // k lagne se pehle ki width
      if (!natural) return;
      // 0.94 = box ke dono kinaro par thoda gap chhodta hai
      const next = Math.min(1, (box.clientWidth / natural) * 0.94);
      if (Math.abs(next - kRef.current) > 0.004) {
        kRef.current = next;
        setK(next);
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit); // font load hone ke baad dobara naapo
    return () => ro.disconnect();
  }, [bride, groom]);

  return (
    <div ref={boxRef} className="flex w-full items-center justify-center">
      <span
        ref={textRef}
        className="inline-flex items-baseline whitespace-nowrap font-display font-semibold italic leading-none text-[#6b1f2e]"
        style={{ fontSize: cq(NAME_MAX_SIZE * k), gap: "0.28em" }}
      >
        <span>{bride}</span>
        <span
          className="font-script font-normal not-italic text-[#c9973f]"
          style={{ fontSize: "0.8em" }}
        >
          &amp;
        </span>
        <span>{groom}</span>
      </span>
    </div>
  );
}

/* Countdown alag component: sirf ye har second re-render hota hai, poora Hero nahi */
const Countdown = memo(function Countdown() {
  const t = useCountdown(wedding.dateISO);
  const items = [
    [t.days, "Days"],
    [String(t.hours).padStart(2, "0"), "Hours"],
    [String(t.minutes).padStart(2, "0"), "Minutes"],
    [String(t.seconds).padStart(2, "0"), "Seconds"],
  ];
  return (
    <div className="grid w-full grid-cols-4" style={{ gap: cq(1.6) }}>
      {items.map(([v, label]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center border border-[#c9973f]/70 bg-[#fff8e8]/80 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,.7)]"
          style={{ borderRadius: cq(2.2), paddingBlock: cq(1.1) }}
        >
          <span
            className="font-display font-medium lining-nums tabular-nums leading-none text-[#6b1f2e]"
            style={{ fontSize: cq(4.2) }}
          >
            {v}
          </span>
          <span
            className="font-body leading-none text-slate-600"
            style={{ fontSize: cq(2.3), marginTop: cq(0.8) }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
});

export default function Hero() {
  const date = useDateParts(wedding.dateISO);

  const scrollDown = () => {
    const lenis = getLenis();
    const to = window.scrollY + window.innerHeight;
    if (lenis) lenis.scrollTo(to, { duration: 1.6 });
    else window.scrollTo({ top: to, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-[#f3e4c4]"
    >
      <style>{css}</style>

      {/* BACKGROUND: mobile = portrait image, desktop (768px+) = desktop image.
          Browser sirf ek hi download karta hai. */}
      <picture>
        <source media="(min-width: 768px)" srcSet={bgDesktop} />
        <img
          src={bg}
          alt="Hawa Mahal, Jaipur par dulha dulhan"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
          style={{ objectPosition: BG_POSITION }}
        />
      </picture>

      {/* neeche text ke liye halka gradient (full width) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Petals (full width par girte hain) */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {petals.map((p, i) => (
          <span
            key={i}
            className="hero-petal"
            style={{
              left: p.l,
              width: `calc(${COLUMN} * ${p.s / 100})`,
              height: `calc(${COLUMN} * ${(p.s * 1.35) / 100})`,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.dl}s`,
              "--sway": p.sw,
            }}
          />
        ))}
      </div>

      {/* CONTENT COLUMN: mobile par full width, desktop par beech ka portrait column.
          cqw units isi column ki width se naapte hain. */}
      <div className="relative mx-auto h-full w-full max-w-[calc(100svh*0.62)] [container-type:inline-size]">
        {/* ===== TITLE BLOCK ===== */}
        <div
          className="absolute inset-x-0 text-center"
          style={{ top: "11.5%" }}
        >
          <Flourish width={48} />
          <h1
            className="font-display font-bold leading-none text-[#7a1428]"
            style={{
              fontSize: cq(9.3),
              marginTop: cq(3),
              textShadow:
                "0 1px 0 rgba(255,255,255,.55), 0 4px 18px rgba(255,244,220,.65)",
            }}
          >
            {TITLE}
          </h1>
          <div
            className="flex items-center justify-center"
            style={{ gap: cq(2.2), marginTop: cq(3) }}
          >
            <span className="flex items-center" style={{ width: cq(9) }}>
              <i className="block h-[1px] flex-1 bg-[#8a5a1f]/80" />
              <i
                className="block rotate-45 bg-[#8a5a1f]"
                style={{ width: cq(0.9), height: cq(0.9) }}
              />
            </span>
            <p
              className="font-script font-semibold text-[#5a1424]"
              style={{
                fontSize: cq(4.7),
                textShadow: "0 0 12px rgba(255,244,220,.8)",
              }}
            >
              {SUBTITLE}
            </p>
            <span className="flex items-center" style={{ width: cq(9) }}>
              <i
                className="block rotate-45 bg-[#8a5a1f]"
                style={{ width: cq(0.9), height: cq(0.9) }}
              />
              <i className="block h-[1px] flex-1 bg-[#8a5a1f]/80" />
            </span>
          </div>
        </div>

        {/* ===== CARTOUCHE CARD ===== */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: "29%", width: cq(70), aspectRatio: "400 / 372" }}
        >
          <svg
            viewBox="0 0 400 400"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full drop-shadow-[0_10px_22px_rgba(107,31,46,.35)]"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hero-card" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fffaf0" />
                <stop offset="1" stopColor="#f8e8c6" />
              </linearGradient>
            </defs>
            <path
              d="M200 6C215 26 240 42 270 48H330C355 48 372 62 388 96C375 120 375 280 388 304C372 338 355 352 330 352H270C240 358 215 374 200 394C185 374 160 358 130 352H70C45 352 28 338 12 304C25 280 25 120 12 96C28 62 45 48 70 48H130C160 42 185 26 200 6Z"
              fill="url(#hero-card)"
              stroke="#c9973f"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M200 18C213 36 236 52 266 55H328C350 55 365 66 378 96C366 120 366 280 378 304C365 334 350 345 328 345H266C236 348 213 364 200 382C187 364 164 348 134 345H72C50 345 35 334 22 304C34 280 34 120 22 96C35 66 50 55 72 55H134C164 52 187 36 200 18Z"
              fill="none"
              stroke="#e3b866"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Safe area: upar/neeche ke peak se bachke, andar ka content */}
          <div
            className="absolute inset-x-0 flex flex-col items-center justify-between text-center"
            style={{ top: "15%", bottom: "15%", paddingInline: "10%" }}
          >
            <p
              className="font-body font-medium uppercase text-[#4a1420]"
              style={{ fontSize: cq(2), letterSpacing: "0.22em" }}
            >
              The Wedding Of
            </p>

            {/* NAAM: hamesha ek line, auto-fit */}
            <FitName bride={wedding.bride} groom={wedding.groom} />

            {/* Date row */}
            <div
              className="grid w-[86%] grid-cols-[auto_auto_1fr_auto_auto] items-center border border-[#c9973f]/80 text-[#4a1420]"
              style={{ borderRadius: cq(1.8), paddingBlock: cq(1.3) }}
            >
              <span
                className="text-center font-display font-medium lining-nums tabular-nums leading-none"
                style={{ fontSize: cq(4), paddingInline: cq(3.2) }}
              >
                {date.day}
              </span>
              <i className="block w-px self-stretch bg-[#c9973f]/70" />
              <span
                className="text-center font-body font-semibold leading-none"
                style={{ fontSize: cq(3.1), letterSpacing: "0.14em" }}
              >
                {date.month}
              </span>
              <i className="block w-px self-stretch bg-[#c9973f]/70" />
              <span
                className="text-center font-display font-medium lining-nums tabular-nums leading-none"
                style={{ fontSize: cq(4), paddingInline: cq(3.2) }}
              >
                {date.year}
              </span>
            </div>

            {/* Countdown */}
            <div className="w-[92%]">
              <Countdown />
            </div>
          </div>
        </div>

        {/* ===== SCROLL TO EXPLORE ===== */}
        <button
          type="button"
          onClick={scrollDown}
          aria-label="Scroll to explore"
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-white"
          style={{ bottom: "max(2.5%, env(safe-area-inset-bottom))" }}
        >
          <span
            className="hero-bob grid place-items-center rounded-full bg-white/95 shadow-lg"
            style={{ width: cq(10), height: cq(10) }}
          >
            <svg
              viewBox="0 0 24 24"
              style={{ width: cq(5) }}
              fill="none"
              stroke="#7a1428"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </span>
          <span
            className="font-script font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,.45)]"
            style={{ fontSize: cq(4.6), marginTop: cq(1.8) }}
          >
            Scroll to Explore
          </span>
          <span
            className="flex items-center"
            style={{ width: cq(40), marginTop: cq(1) }}
          >
            <i className="block h-px flex-1 bg-white/80" />
            <i
              className="mx-2 block rotate-45 bg-white"
              style={{ width: cq(1.1), height: cq(1.1) }}
            />
            <i className="block h-px flex-1 bg-white/80" />
          </span>
        </button>
      </div>
    </section>
  );
}
