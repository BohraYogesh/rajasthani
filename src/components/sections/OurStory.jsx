import { images } from "../../data/images";
import { wedding } from "../../data/weddingData";
import Img from "../ui/Img";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";
import { Diamond } from "../ui/Ornament";

/* ---------- Rajasthani background art (static, koi animation nahi) ---------- */

function Vine({ className = "" }) {
  const nodes = Array.from({ length: 10 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 80 600"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* mukhya bel */}
      <path d="M40 0 C 70 60 10 120 40 180 C 70 240 10 300 40 360 C 70 420 10 480 40 540 C 55 575 40 600 40 600" />

      {nodes.map((i) => {
        const y = i * 60 + 30;
        const side = i % 2 === 0 ? 1 : -1;
        const x = 40 + side * 14;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {/* patta */}
            <path
              transform={`rotate(${side === 1 ? -25 : 205}) scale(1.1)`}
              d="M0 0 C 10 -9 24 -9 32 0 C 24 9 10 9 0 0 Z"
              fill="currentColor"
              fillOpacity="0.14"
            />
            {/* phool, har teesre node par */}
            {i % 3 === 1 && (
              <g transform={`translate(${side * 14} -6)`} fill="currentColor">
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse
                    key={a}
                    transform={`rotate(${a}) translate(0 -5)`}
                    rx="3"
                    ry="5"
                    fillOpacity="0.22"
                  />
                ))}
                <circle r="2" />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Fixed jagah par thehri hui pankhudiyan (girti nahi)
function Petal({ left, top, size, rotate }) {
  return (
    <svg
      viewBox="-10 -10 20 20"
      aria-hidden="true"
      className="absolute text-rose"
      style={{ left, top, width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M0 -9 C 8 -6 8 6 0 9 C -8 6 -8 -6 0 -9 Z"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  );
}

const petals = [
  { left: "8%", top: "14%", size: 14, rotate: 20 },
  { left: "22%", top: "48%", size: 10, rotate: -35 },
  { left: "36%", top: "8%", size: 16, rotate: 70 },
  { left: "50%", top: "62%", size: 12, rotate: -10 },
  { left: "64%", top: "20%", size: 15, rotate: 140 },
  { left: "78%", top: "74%", size: 11, rotate: -80 },
  { left: "90%", top: "38%", size: 14, rotate: 40 },
];

function StoryBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: "paint" }}
    >
      {/* 1. phool-bel dono kinaron par */}
      <div className="text-gold">
        <Vine className="absolute bottom-0 left-0 h-full w-16 opacity-30 md:w-28 md:opacity-40" />
        <Vine className="absolute bottom-0 right-0 h-full w-16 -scale-x-100 opacity-30 md:w-28 md:opacity-40" />
      </div>

      {/* 2. pankhudiyan: mobile par sirf 4 */}
      {petals.map((p, i) => (
        <div key={i} className={i > 3 ? "hidden md:block" : ""}>
          <Petal {...p} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Section ---------- */

export default function OurStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden px-5 pb-16 pt-10 md:pb-28 md:pt-28"
    >
      {/* Palace sketch: poore section ka background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat opacity-60 md:opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
        style={{ backgroundImage: `url(${images.palaceSketch})` }}
      />

      <StoryBackdrop />

      {/* Content: background se upar */}
      <div className="relative z-10">
        <SectionTitle title={wedding.story.heading} />
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-14 md:flex-row md:items-start md:gap-24">
          {wedding.story.items.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.2}
              className="flex flex-col items-center text-center"
            >
              {/* hanging string */}
              <span className="h-10 w-px bg-gold md:h-14" />
              <Diamond className="-mt-0.5 mb-1" />

              {/* Jhoolna: CSS animation (GPU), framer-motion nahi. Mobile par band */}
              <div
                className="swing h-44 w-44 overflow-hidden rounded-full border-[4px] border-gold p-1.5 shadow-[0_20px_40px_-20px_rgba(107,31,46,.6)] md:h-64 md:w-64"
                style={{ "--dur": `${6 + i}s` }}
              >
                <div className="h-full w-full overflow-hidden rounded-full">
                  <Img src={images.story[i]} label={s.title} />
                </div>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-rose md:text-2xl">
                {s.title}
              </h3>
              <p className="mt-1 max-w-[16rem] text-sm text-ink/75 md:text-base">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}