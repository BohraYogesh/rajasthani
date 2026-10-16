import { memo, useRef, useEffect, useState } from "react";
import {
  motion,
  animate,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { getLenis } from "../../lib/scroll";

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const SCROLL_SVH = 140; // intro ke dauraan scroll distance (Hero itni der freeze rehta hai)
const ZOOM_END = 0.6;
const FADE_START = 0.62;
const FADE_END = 0.92;
const FILL = 0.94;
const MAX_ZOOM_CAP = 10; // pehle 14 tha. Kam zoom = halka GPU load

const SKIP_DURATION = 3.6; // seconds. Zyada = slow

function useIsMobile(query = "(max-width: 767px)") {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMatch(e.matches);
    setMatch(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return match;
}

/* ───────── Sky: blue gradient + clouds + birds ───────── */
const skyCss = `
@keyframes hm-cloud { from { transform: translateX(-45vw); } to { transform: translateX(110vw); } }
@keyframes hm-fly {
  from { transform: translate(-12vw, 0); }
  50%  { transform: translate(50vw, -14px); }
  to   { transform: translate(112vw, 6px); }
}
@keyframes hm-flap { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.35); } }
.hm-cloud { animation: hm-cloud linear infinite; will-change: transform; }
.hm-bird { animation: hm-fly linear infinite; will-change: transform; }
.hm-bird svg { animation: hm-flap .7s ease-in-out infinite; transform-origin: 50% 60%; }
@media (prefers-reduced-motion: reduce) {
  .hm-cloud, .hm-bird, .hm-bird svg { animation: none !important; }
}
`;

// left = static (mobile/tablet) par fixed jagah. Desktop par animation chalti hai
const clouds = [
  { top: "5%", left: "8%", w: 150, dur: 70, delay: -10, op: 0.95 },
  { top: "14%", left: "52%", w: 190, dur: 120, delay: -50, op: 0.85 },
  { top: "24%", left: "22%", w: 110, dur: 95, delay: -70, op: 0.75 },
];

const birds = [
  { top: "10%", left: "36%", size: 20, dur: 28, delay: -6 },
  { top: "18%", left: "70%", size: 16, dur: 34, delay: -18 },
];

function Cloud({ top, left, w, dur, delay, op, still }) {
  return (
    <div
      className="hm-cloud absolute"
      style={{
        top,
        left: still ? left : 0,
        width: w,
        opacity: op,
        ...(still
          ? { animation: "none", willChange: "auto" }
          : { animationDuration: `${dur}s`, animationDelay: `${delay}s` }),
      }}
    >
      <svg viewBox="0 0 200 80" className="block w-full" fill="#ffffff">
        <ellipse cx="60" cy="52" rx="48" ry="22" />
        <ellipse cx="105" cy="38" rx="42" ry="28" />
        <ellipse cx="145" cy="52" rx="45" ry="22" />
        <ellipse cx="100" cy="58" rx="80" ry="16" />
      </svg>
    </div>
  );
}

function Bird({ top, left, size, dur, delay, still }) {
  return (
    <div
      className="hm-bird absolute"
      style={{
        top,
        left: still ? left : 0,
        width: size,
        ...(still
          ? { animation: "none", willChange: "auto" }
          : { animationDuration: `${dur}s`, animationDelay: `${delay}s` }),
      }}
    >
      <svg
        viewBox="0 0 24 10"
        className="block w-full"
        fill="none"
        stroke="#2f3b52"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
        style={still ? { animation: "none" } : undefined}
      >
        <path d="M1 7 Q6 0 12 6 Q18 0 23 7" />
      </svg>
    </div>
  );
}

// memo: scroll par Sky dobara render nahi hoga
// still = mobile/tablet: clouds aur birds dikhte hain, par ruke hue (motion nahi)
const Sky = memo(function Sky({ still }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #4fa3dc 0%, #7cc0ec 35%, #b5dcf3 65%, #dff0f8 100%)",
      }}
      aria-hidden="true"
    >
      <style>{skyCss}</style>
      {clouds.map((c, i) => (
        <Cloud key={i} {...c} still={still} />
      ))}
      {birds.map((b, i) => (
        <Bird key={i} {...b} still={still} />
      ))}
    </div>
  );
});

/**
 * focal:             { x, y } palace image ke % mein, jharokha ka center
 * jharokhaCrop:      optional { x, y, w, h } palace image ke % mein
 * maxZoom:           desktop zoom (jharokhaCrop na ho tab)
 * mobileHeight:      mobile par palace ki height (svh). Bada = zyada crop
 * mobileBottomShift: mobile par palace ko neeche push (svh)
 * mobileZoomBoost:   mobile par maxZoom ka multiplier
 */
export default function HawaMahalIntro({
  src,
  jharokhaSrc,
  width,
  height,
  focal = { x: 50, y: 50 },
  jharokhaCrop,
  maxZoom = 6,
  mobileHeight = 75,
  mobileBottomShift = 3,
  mobileZoomBoost = 0.85,
  bottomCrop = 0,
  alt = "Hawa Mahal, Jaipur",
  children,
}) {
  const trackRef = useRef(null); // sirf scroll progress naapne ke liye
  const skipAnim = useRef(null);
  const skipping = useRef(false);
  const reduce = useReducedMotion();
  const mobile = useIsMobile(); // geometry (zoom/crop) ke liye: sirf phone
  const stillSky = useIsMobile("(max-width: 1023px)"); // clouds/birds ruke: phone + tablet
  const ratio = width / height;

  // Track: top se (100 + SCROLL_SVH)svh. Progress 0 -> 1 = pehle SCROLL_SVH scroll
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // ↓↓↓ YAHAN PATCH ↓↓↓
  // Intro khatam (stage poora fade ho gaya) -> Hero ab dikh raha hai
  const introDoneFired = useRef(false);
  const fireIntroDone = () => {
    if (introDoneFired.current) return;
    introDoneFired.current = true;
    window.__introDone = true; // MusicPlayer baad me mount ho to bhi pata chale
    window.dispatchEvent(new Event("intro-done"));
  };
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p >= FADE_END) fireIntroDone();
  });
  useEffect(() => {
    // reduced-motion me intro hota hi nahi, Hero seedha dikhta hai
    if (reduce) fireIntroDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  // ↑↑↑ PATCH KHATAM ↑↑↑

  const mobMV = useMotionValue(mobile ? 1 : 0);
  const zoomMV = useMotionValue(maxZoom);
  const deskYMV = useMotionValue(50 - focal.y - bottomCrop);

  useEffect(() => {
    mobMV.set(mobile ? 1 : 0);
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Desktop: box bottom par. Focal ko screen center laane ke liye
      // dy(% of box height) = (100 - fy) - 50 * vh / H
      const dW = Math.min(vw, vh * ratio);
      const dH = dW / ratio;
      deskYMV.set(100 - focal.y - bottomCrop - (50 * vh) / dH);

      if (!jharokhaCrop) {
        zoomMV.set(maxZoom * (mobile ? mobileZoomBoost : 1));
        return;
      }
      const H = mobile ? (vh * mobileHeight) / 100 : dH;
      const W = H * ratio;
      const zx = (vw * FILL) / ((W * jharokhaCrop.w) / 100);
      const zy = (vh * FILL) / ((H * jharokhaCrop.h) / 100);
      zoomMV.set(Math.min(MAX_ZOOM_CAP, zx, zy));
    };
    update();

    // resize par har event pe nahi, frame mein ek baar
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [
    jharokhaCrop,
    maxZoom,
    mobile,
    mobileHeight,
    mobileZoomBoost,
    ratio,
    focal.y,
    bottomCrop,
    zoomMV,
    mobMV,
    deskYMV,
  ]);

  useEffect(() => {
    if (!jharokhaSrc) return;
    const img = new Image();
    img.src = jharokhaSrc;
    img.decode?.().catch(() => {});
  }, [jharokhaSrc]);

  // ---- Skip: Hero tak slow, smooth auto-scroll (Lenis ke saath) ----
  const stopSkip = () => {
    const lenis = getLenis();
    if (lenis && skipping.current) {
      lenis.scrollTo(lenis.scroll, { immediate: true, force: true }); // wahin ruk jao
    }
    skipAnim.current?.stop();
    skipAnim.current = null;
    skipping.current = false;
  };

  useEffect(() => {
    // user khud scroll kare to skip ruk jaye
    const cancel = () => {
      if (skipping.current || skipAnim.current) stopSkip();
    };
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    return () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      stopSkip();
    };
  }, []);

  const skipIntro = () => {
    const el = trackRef.current;
    if (!el) return;
    const from = window.scrollY;
    // progress = 1 wali jagah (Hero poora dikh raha, freeze ka end)
    const to = from + el.getBoundingClientRect().bottom - window.innerHeight;
    if (to <= from + 2) return;

    const lenis = getLenis();
    if (lenis) {
      skipping.current = true;
      lenis.scrollTo(to, {
        duration: SKIP_DURATION,
        easing: easeInOutCubic,
        lock: false,
        force: true,
        onComplete: () => {
          skipping.current = false;
        },
      });
    } else {
      skipAnim.current?.stop();
      skipAnim.current = animate(from, to, {
        duration: SKIP_DURATION,
        ease: easeInOutCubic,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          skipAnim.current = null;
        },
      });
    }
  };

  // ---- Ek hi timeline ----
  const t = useTransform(scrollYProgress, (p) =>
    easeInOutSine(clamp01(p / ZOOM_END)),
  );
  const scale = useTransform([t, zoomMV], ([tv, z]) => Math.pow(z, tv));

  // Mobile: box bottom-anchored. dy = h*(1 - fy/100) - 50 - shift
  const mobileDy = mobileHeight * (1 - focal.y / 100) - 50 - mobileBottomShift;
  const x = useTransform([t, mobMV], ([v, m]) =>
    m ? "0%" : `${(50 - focal.x) * v}%`,
  );
  const y = useTransform([t, mobMV, deskYMV], ([v, m, d]) =>
    m ? `${mobileDy * v}svh` : `${d * v}%`,
  );

  const alignedOpacity = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);
  const fullOpacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const fullScale = useTransform(scrollYProgress, [0.42, FADE_END], [1, 1.08]);

  // stageScale hata diya: fade ke dauraan poora zoomed stage scale karna bhaari tha
  const stageOpacity = useTransform(
    scrollYProgress,
    [FADE_START, FADE_END],
    [1, 0],
  );
  const stageVisibility = useTransform(scrollYProgress, (p) =>
    p >= FADE_END ? "hidden" : "visible",
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const skipOpacity = useTransform(scrollYProgress, [0.5, 0.62], [1, 0]);
  const skipEvents = useTransform(scrollYProgress, (p) =>
    p > 0.6 ? "none" : "auto",
  );

  const calibrate = (e) => {
    if (!import.meta.env.DEV) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
    const py = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
    console.log(`point: { x: ${px}, y: ${py} }`);
  };

  const cameraClass = "absolute left-1/2";
  const cameraBox = mobile
    ? {
        bottom: `-${mobileBottomShift}svh`,
        height: `${mobileHeight}svh`,
        width: `calc(${mobileHeight}svh * ${ratio})`,
        transform: `translateX(-${focal.x}%)`,
      }
    : {
        bottom: 0,
        width: `min(100%, calc(100svh * ${ratio}))`,
        aspectRatio: `${width} / ${height}`,
        transform: `translate(-50%, ${bottomCrop}%)`,
      };

  return (
    <div id="intro" className="relative">
      {/* Track: sirf scroll progress ke liye (invisible) */}
      {!reduce && (
        <div
          ref={trackRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 w-full"
          style={{ height: `${100 + SCROLL_SVH}svh` }}
        />
      )}

      {/* STAGE: palace + sky, Hero ke upar */}
      <div
        className={
          reduce
            ? "relative h-[100svh] w-full overflow-hidden"
            : "pointer-events-none sticky top-0 z-10 h-[100svh] w-full overflow-hidden"
        }
        style={reduce ? undefined : { marginBottom: "-100svh" }}
      >
        <motion.div
          className="absolute inset-0 bg-[#7cc0ec]"
          style={
            reduce
              ? undefined
              : {
                  opacity: stageOpacity,
                  visibility: stageVisibility,
                }
          }
        >
          <Sky still={stillSky} />

          <div className={cameraClass} style={cameraBox}>
            <motion.div
              className="relative h-full w-full will-change-transform"
              style={
                reduce
                  ? undefined
                  : { scale, x, y, transformOrigin: `${focal.x}% ${focal.y}%` }
              }
            >
              <img
                src={src}
                width={width}
                height={height}
                alt={alt}
                loading="eager"
                fetchpriority="high"
                decoding="async"
                draggable={false}
                onClick={calibrate}
                className={`block h-full w-full select-none ${
                  import.meta.env.DEV ? "pointer-events-auto" : ""
                }`}
              />

              {!reduce && jharokhaSrc && jharokhaCrop && (
                <motion.img
                  src={jharokhaSrc}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  className="pointer-events-none absolute select-none object-cover"
                  style={{
                    left: `${jharokhaCrop.x}%`,
                    top: `${jharokhaCrop.y}%`,
                    width: `${jharokhaCrop.w}%`,
                    height: `${jharokhaCrop.h}%`,
                    opacity: alignedOpacity,
                  }}
                />
              )}
            </motion.div>
          </div>

          {!reduce && jharokhaSrc && !jharokhaCrop && (
            <motion.img
              src={jharokhaSrc}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              style={{ opacity: fullOpacity, scale: fullScale }}
            />
          )}

          {!reduce && (
            <motion.p
              style={{ opacity: hintOpacity }}
              className="absolute inset-x-0 top-[max(1.5rem,env(safe-area-inset-top))] text-center text-xs tracking-[0.3em] text-white drop-shadow"
            >
              SCROLL
            </motion.p>
          )}

          {!reduce && (
            <motion.button
              type="button"
              onClick={skipIntro}
              aria-label="Skip intro"
              style={{ opacity: skipOpacity, pointerEvents: skipEvents }}
              className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-20 rounded-full border border-gold/70 bg-cream px-5 py-2 text-xs font-medium tracking-[0.2em] text-maroon shadow-md transition-colors hover:bg-white sm:right-8"
            >
              SKIP →
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* HERO: sticky, spacer ki height tak top par tika rehta hai */}
      <div className={reduce ? "relative" : "sticky top-0 z-0"}>{children}</div>

      {/* SPACER: ye hi Hero ke freeze ka scroll distance banata hai */}
      {!reduce && (
        <div aria-hidden="true" style={{ height: `${SCROLL_SVH}svh` }} />
      )}
    </div>
  );
}
