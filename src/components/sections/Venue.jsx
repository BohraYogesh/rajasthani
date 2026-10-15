import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Navigation } from 'lucide-react'
import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

/* ---------- Rajasthani background art (pure SVG) ---------- */

function PeacockFeather({ className = '', duration = 7, delay = 0, tilt = 0 }) {
  const eyeRays = Array.from({ length: 19 }, (_, i) => -144 + i * 16) // upar-side ke barbs
  const stemBarbs = Array.from({ length: 9 }, (_, i) => 78 - i * 9)
  return (
    <motion.svg
      viewBox="-60 -100 120 200"
      aria-hidden="true"
      className={className}
      style={{ originX: 0.5, originY: 1 }}
      initial={{ rotate: tilt - 3 }}
      animate={{ rotate: [tilt - 3, tilt + 3, tilt - 3] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      {/* stem */}
      <path d="M0 98 C -4 60 4 20 0 -6" strokeWidth="1.6" />

      {/* stem ke barbs */}
      {stemBarbs.map((y) => (
        <g key={y} strokeWidth="0.8">
          <path d={`M0 ${y} Q -10 ${y - 4} -20 ${y - 16}`} />
          <path d={`M0 ${y} Q 10 ${y - 4} 20 ${y - 16}`} />
        </g>
      ))}

      {/* aankh ke chaaron taraf barbs */}
      <g transform="translate(0 -44)" strokeWidth="0.8">
        {eyeRays.map((a) => (
          <path key={a} transform={`rotate(${a})`} d="M0 -40 L0 -56" />
        ))}
      </g>

      {/* mor pankh ki aankh */}
      <g transform="translate(0 -44)">
        <ellipse rx="27" ry="38" fill="currentColor" fillOpacity="0.07" />
        <ellipse rx="19" ry="28" fill="currentColor" fillOpacity="0.10" />
        <ellipse rx="11" ry="17" fill="currentColor" fillOpacity="0.18" />
        <ellipse rx="5" ry="9" fill="currentColor" />
      </g>
    </motion.svg>
  )
}

function VenueBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* 1. bandhani dot pattern */}
      <svg className="absolute inset-0 h-full w-full text-maroon opacity-[0.09]">
        <defs>
          <pattern id="bandhani" width="64" height="64" patternUnits="userSpaceOnUse">
            {/* bada dot-cluster: beech me dot + 8 dots ki ring */}
            <g fill="currentColor">
              <circle cx="32" cy="32" r="3" />
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i * Math.PI) / 4
                return (
                  <circle
                    key={i}
                    cx={32 + Math.cos(a) * 11}
                    cy={32 + Math.sin(a) * 11}
                    r="1.7"
                  />
                )
              })}
              {/* kono ke chhote dots */}
              <circle cx="0" cy="0" r="1.8" />
              <circle cx="64" cy="0" r="1.8" />
              <circle cx="0" cy="64" r="1.8" />
              <circle cx="64" cy="64" r="1.8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bandhani)" />
      </svg>

      {/* 2. mor pankh (peacock feathers) */}
      <div className="text-gold">
        <PeacockFeather className="absolute -left-6 bottom-0 h-64 w-40 opacity-40 md:left-4 md:h-[30rem] md:w-72" tilt={-8} />
        <PeacockFeather
          className="absolute bottom-0 left-16 hidden h-72 w-44 opacity-25 md:block"
          duration={9}
          delay={1.2}
          tilt={6}
        />
        <PeacockFeather
          className="absolute -right-6 bottom-0 h-64 w-40 opacity-40 md:right-4 md:h-[30rem] md:w-72"
          duration={8}
          delay={0.6}
          tilt={8}
        />
        <PeacockFeather
          className="absolute bottom-0 right-16 hidden h-72 w-44 opacity-25 md:block"
          duration={10}
          delay={2}
          tilt={-6}
        />
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

export default function Venue() {
  const v = wedding.venue
  return (
    <section
      id="venue"
      className="relative overflow-hidden px-5 pb-10 pt-10 md:pb-20 md:pt-28"
    >
      <VenueBackdrop />

      {/* Content: background se upar */}
      <div className="relative z-10 pb-6">
        <SectionTitle title={v.heading} />
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <Reveal variant="left" className="card overflow-hidden rounded-2xl p-3">
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              <Img src={images.venue} label="venue.jpg" />
            </div>
            <div className="space-y-3 p-4 md:p-6">
              <h3 className="font-display text-2xl font-semibold text-maroon md:text-3xl">{v.name}</h3>
              <p className="flex items-start gap-2 text-sm text-ink/80"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {v.address}</p>
              <p className="flex items-start gap-2 text-sm text-ink/80"><CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {v.date}<br />{v.time}</p>
              <Button href={v.mapsUrl} className="mt-2 w-full" icon={<Navigation className="h-4 w-4" />}>Get Directions</Button>
            </div>
          </Reveal>

          <Reveal variant="right" className="flex flex-col gap-5">
            <div className="card min-h-[320px] flex-1 overflow-hidden rounded-2xl p-2">
              <iframe
                title="Venue map"
                src={v.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full rounded-xl border-0"
              />
            </div>
            <Button href={v.mapsUrl} variant="outline" className="self-center" icon={<MapPin className="h-4 w-4" />}>View on Google Maps</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}