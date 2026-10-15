import { motion } from 'framer-motion'
import { events } from '../../data/events'
import { images } from '../../data/images'
import EventCard from '../ui/EventCard'
import SectionTitle from '../ui/SectionTitle'

/* ---------- Rajasthani background art (pure SVG) ---------- */

function Lotus({ className = '', duration = 8, delay = 0 }) {
  const back = [-75, -45, -15, 15, 45, 75]
  const front = [-60, -30, 0, 30, 60]
  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {back.map((a) => (
        <path
          key={`b${a}`}
          transform={`translate(0 70) rotate(${a}) scale(0.85)`}
          d="M0 0 C 16 -30 16 -62 0 -84 C -16 -62 -16 -30 0 0 Z"
          fill="currentColor"
          fillOpacity="0.08"
        />
      ))}
      {front.map((a) => (
        <g key={`f${a}`} transform={`translate(0 70) rotate(${a})`}>
          <path
            d="M0 0 C 16 -30 16 -62 0 -84 C -16 -62 -16 -30 0 0 Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path d="M0 -8 C 6 -30 6 -50 0 -66" strokeWidth="0.7" />
        </g>
      ))}
      <circle cy="70" r="5" fill="currentColor" />
      <path d="M-40 82 Q0 96 40 82" strokeDasharray="3 4" />
    </motion.svg>
  )
}

function EventsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 1. block-print paisley (buta) pattern */}
      <svg className="absolute inset-0 h-full w-full text-maroon opacity-[0.07]">
        <defs>
          <pattern id="paisley" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* paisley 1 */}
            <g fill="currentColor">
              <path d="M30 8 C 54 8 62 36 48 54 C 40 66 20 66 13 55 C 6 44 12 30 25 30 C 34 30 36 41 29 45 C 24 48 20 44 23 40 C 20 20 22 8 30 8 Z" />
            </g>
            {/* paisley 2 (ulta, offset) */}
            <g fill="none" stroke="currentColor" strokeWidth="1.4" transform="translate(120 120) rotate(180) translate(30 30)">
              <path d="M30 8 C 54 8 62 36 48 54 C 40 66 20 66 13 55 C 6 44 12 30 25 30 C 34 30 36 41 29 45 C 24 48 20 44 23 40 C 20 20 22 8 30 8 Z" />
              <path d="M30 20 C 44 22 48 36 40 46" />
            </g>
            {/* small flowers */}
            <g fill="currentColor">
              <circle cx="92" cy="26" r="3" />
              <circle cx="92" cy="18" r="2" />
              <circle cx="100" cy="26" r="2" />
              <circle cx="92" cy="34" r="2" />
              <circle cx="84" cy="26" r="2" />
              <circle cx="28" cy="98" r="3" />
              <circle cx="28" cy="90" r="2" />
              <circle cx="36" cy="98" r="2" />
              <circle cx="28" cy="106" r="2" />
              <circle cx="20" cy="98" r="2" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#paisley)" />
      </svg>

      {/* 2. bade kamal (lotus) phool */}
      <div className="text-gold">
        <Lotus className="absolute -left-20 top-10 h-60 w-60 opacity-40 md:-left-24 md:top-16 md:h-[26rem] md:w-[26rem]" />
        <Lotus
          className="absolute -right-20 bottom-10 h-60 w-60 opacity-40 md:-right-24 md:bottom-16 md:h-[26rem] md:w-[26rem]"
          duration={10}
          delay={1.5}
        />
        <Lotus
          className="absolute -right-10 top-8 hidden h-44 w-44 opacity-25 md:block"
          duration={9}
          delay={0.8}
        />
        <Lotus
          className="absolute -left-10 bottom-8 hidden h-44 w-44 opacity-25 md:block"
          duration={11}
          delay={2.2}
        />
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

export default function Events() {
  return (
    <section id="events" className="relative overflow-hidden px-5 py-10 md:py-28">
      <EventsBackdrop />

      <div className="relative z-10">
        <SectionTitle title="Wedding Events" />
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 md:gap-8">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} image={images.events[e.id]} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}