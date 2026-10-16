import { useState } from 'react'
import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Lightbox from '../ui/Lightbox'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

/* ---------- Rajasthani background art (halka, mostly static) ---------- */

// Sheesha (mirror-work): ek 72px tile, CSS background se repeat hoti hai
const MIRRORWORK =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><g transform='translate(36 36)' fill='none' stroke='%236b1f2e' stroke-width='1.1'><rect x='-13' y='-13' width='26' height='26'/><rect x='-13' y='-13' width='26' height='26' transform='rotate(45)'/><circle r='5' fill='%236b1f2e' fill-opacity='.5'/><circle r='19' stroke-dasharray='1.5 3'/></g><g fill='%236b1f2e'><circle cx='0' cy='0' r='2.2'/><circle cx='72' cy='0' r='2.2'/><circle cx='0' cy='72' r='2.2'/><circle cx='72' cy='72' r='2.2'/></g></svg>\")"

// Surya: ab static (rotate hata diya)
function Sun({ className = '' }) {
  const rays = Array.from({ length: 24 }, (_, i) => i * 15)
  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      {rays.map((a, i) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d={i % 2 === 0 ? 'M-5 -58 L0 -96 L5 -58 Z' : 'M-3 -58 L0 -78 L3 -58 Z'}
          fill="currentColor"
          fillOpacity={i % 2 === 0 ? 0.16 : 0.1}
        />
      ))}
      <circle r="56" />
      <circle r="50" strokeDasharray="1.5 3.5" />
      <circle r="38" fill="currentColor" fillOpacity="0.08" />
      <circle r="26" />
      <circle r="14" fill="currentColor" fillOpacity="0.2" />
      <circle r="5" fill="currentColor" />
    </svg>
  )
}

// Fanoos: plain SVG. Jhoolna CSS .swing class se (desktop par, mobile par band)
function Lantern({ className = '', duration = 6 }) {
  return (
    <svg
      viewBox="0 0 60 170"
      aria-hidden="true"
      className={`swing ${className}`}
      style={{ '--dur': `${duration}s` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M30 0 V40" />
      <circle cx="30" cy="42" r="2.5" fill="currentColor" />
      <path d="M18 56 Q30 38 42 56 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M16 56 H44" />
      <path d="M18 56 C 6 76 6 98 18 116 H42 C 54 98 54 76 42 56" fill="currentColor" fillOpacity="0.07" />
      <path d="M30 56 V116" strokeWidth="0.8" />
      <path d="M24 56 C 16 78 16 98 24 116" strokeWidth="0.8" />
      <path d="M36 56 C 44 78 44 98 36 116" strokeWidth="0.8" />
      <path d="M30 76 C 36 84 36 94 30 100 C 24 94 24 84 30 76 Z" fill="currentColor" fillOpacity="0.45" />
      <path d="M18 116 H42 L38 124 H22 Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M30 124 V140" />
      <path d="M24 126 V146 M36 126 V146" strokeWidth="0.8" />
      <circle cx="30" cy="144" r="3" fill="currentColor" />
      <circle cx="24" cy="149" r="2.2" fill="currentColor" />
      <circle cx="36" cy="149" r="2.2" fill="currentColor" />
    </svg>
  )
}

function GalleryBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: 'paint' }}
    >
      {/* 1. sheesha pattern: CSS background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: MIRRORWORK, backgroundSize: '72px 72px' }}
      />

      <div className="text-gold">
        {/* 2. surya motifs (static) */}
        <Sun className="absolute -left-28 top-[30%] h-64 w-64 opacity-25 md:-left-40 md:h-[28rem] md:w-[28rem]" />
        <Sun className="absolute -right-28 bottom-[8%] h-64 w-64 opacity-25 md:-right-40 md:h-[28rem] md:w-[28rem]" />

        {/* 3. fanoos: mobile par 2, desktop par 4 */}
        <Lantern className="absolute left-3 top-0 h-28 w-10 opacity-60 md:left-[6%] md:h-48 md:w-16" />
        <Lantern
          className="absolute right-3 top-0 h-36 w-12 opacity-60 md:right-[6%] md:h-60 md:w-20"
          duration={7.5}
        />
        <Lantern
          className="absolute left-[14%] top-0 hidden h-32 w-12 opacity-40 md:block"
          duration={8}
        />
        <Lantern
          className="absolute right-[15%] top-0 hidden h-28 w-10 opacity-40 md:block"
          duration={6.5}
        />
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

export default function Gallery() {
  const [index, setIndex] = useState(null)

  return (
    <section id="gallery" className="relative overflow-hidden px-5 py-10 md:py-28">
      <GalleryBackdrop />

      <div className="relative z-10">
        <SectionTitle title={wedding.gallery.heading} />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {images.gallery.map((src, i) => (
            <Reveal key={i} variant="zoom" delay={(i % 3) * 0.1}>
              {/* motion.button hata diya: hover ab CSS se */}
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-gold/60 shadow-[0_20px_40px_-24px_rgba(107,31,46,.7)] transition-transform duration-300 hover:-translate-y-1.5"
                aria-label={`Open photo ${i + 1}`}
              >
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  <Img src={src} label={`gallery/${i + 1}.jpg`} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" onClick={() => setIndex(0)}>View Gallery</Button>
        </div>
      </div>

      <Lightbox images={images.gallery} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </section>
  )
}