import { motion } from "framer-motion";
import { images } from "../../data/images";
import { wedding } from "../../data/weddingData";
import Img from "../ui/Img";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";
import { Diamond } from "../ui/Ornament";

/* ---------- Rajasthani background art (pure SVG) ---------- */

function Vine({ className = "", duration = 9, delay = 0, mirror = false }) {
  const nodes = Array.from({ length: 10 }, (_, i) => i);
  return (
    <motion.svg
      viewBox="0 0 80 600"
      aria-hidden="true"
      className={className}
      style={{
        originY: 1,
        transform: mirror ? "scaleX(-1)" : undefined,
      }}
      animate={{ rotate: [-1.2, 1.2, -1.2] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
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
    </motion.svg>
  );
}

function Petal({ left, size, duration, delay, drift }) {
  return (
    <motion.svg
      viewBox="-10 -10 20 20"
      aria-hidden="true"
      className="absolute text-rose"
      style={{ left, width: size, height: size }}
      initial={{ top: "-6%", opacity: 0 }}
      animate={{
        top: ["-6%", "104%"],
        x: [0, drift, -drift / 2, drift],
        rotate: [0, 180, 360],
        opacity: [0, 0.5, 0.5, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M0 -9 C 8 -6 8 6 0 9 C -8 6 -8 -6 0 -9 Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </motion.svg>
  );
}

const petals = [
  { left: "8%", size: 14, duration: 16, delay: 0, drift: 24 },
  { left: "20%", size: 10, duration: 20, delay: 4, drift: -20 },
  { left: "34%", size: 16, duration: 18, delay: 8, drift: 30 },
  { left: "48%", size: 12, duration: 22, delay: 2, drift: -26 },
  { left: "62%", size: 15, duration: 17, delay: 6, drift: 22 },
  { left: "76%", size: 11, duration: 21, delay: 10, drift: -18 },
  { left: "90%", size: 14, duration: 19, delay: 3, drift: 28 },
];

function StoryBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* 1. phool-bel dono kinaron par */}
      <div className="text-gold">
        <Vine className="absolute bottom-0 left-0 h-full w-16 opacity-30 md:w-28 md:opacity-40" />
        <Vine
          mirror
          duration={11}
          delay={1}
          className="absolute bottom-0 right-0 h-full w-16 opacity-30 md:w-28 md:opacity-40"
        />
      </div>

      {/* 2. girti gulab ki pankhudiyan */}
      {petals.map((p, i) => (
        <Petal key={i} {...p} />
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
              <motion.div
                animate={{ rotate: [-1.5, 1.5, -1.5] }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ originY: 0 }}
                className="h-44 w-44 overflow-hidden rounded-full border-[4px] border-gold p-1.5 shadow-[0_20px_40px_-20px_rgba(107,31,46,.6)] md:h-64 md:w-64"
              >
                <div className="h-full w-full overflow-hidden rounded-full">
                  <Img src={images.story[i]} label={s.title} />
                </div>
              </motion.div>
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