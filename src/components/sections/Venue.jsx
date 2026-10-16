import { CalendarDays, MapPin, Navigation } from 'lucide-react'
import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import Button from '../ui/Button'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

/* ---------- Halka Rajasthani background (static, koi animation nahi) ---------- */

const BANDHANI =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><g fill='%236b1f2e'><circle cx='32' cy='32' r='3'/><circle cx='43' cy='32' r='1.7'/><circle cx='39.8' cy='39.8' r='1.7'/><circle cx='32' cy='43' r='1.7'/><circle cx='24.2' cy='39.8' r='1.7'/><circle cx='21' cy='32' r='1.7'/><circle cx='24.2' cy='24.2' r='1.7'/><circle cx='32' cy='21' r='1.7'/><circle cx='39.8' cy='24.2' r='1.7'/><circle cx='0' cy='0' r='1.8'/><circle cx='64' cy='0' r='1.8'/><circle cx='0' cy='64' r='1.8'/><circle cx='64' cy='64' r='1.8'/></g></svg>\")"

function PeacockFeather({ className = '' }) {
  const eyeRays = Array.from({ length: 19 }, (_, i) => -144 + i * 16)
  const stemBarbs = Array.from({ length: 9 }, (_, i) => 78 - i * 9)
  return (
    <svg
      viewBox="-60 -100 120 200"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M0 98 C -4 60 4 20 0 -6" strokeWidth="1.6" />
      {stemBarbs.map((y) => (
        <g key={y} strokeWidth="0.8">
          <path d={`M0 ${y} Q -10 ${y - 4} -20 ${y - 16}`} />
          <path d={`M0 ${y} Q 10 ${y - 4} 20 ${y - 16}`} />
        </g>
      ))}
      <g transform="translate(0 -44)" strokeWidth="0.8">
        {eyeRays.map((a) => (
          <path key={a} transform={`rotate(${a})`} d="M0 -40 L0 -56" />
        ))}
      </g>
      <g transform="translate(0 -44)">
        <ellipse rx="27" ry="38" fill="currentColor" fillOpacity="0.07" />
        <ellipse rx="19" ry="28" fill="currentColor" fillOpacity="0.10" />
        <ellipse rx="11" ry="17" fill="currentColor" fillOpacity="0.18" />
        <ellipse rx="5" ry="9" fill="currentColor" />
      </g>
    </svg>
  )
}

function VenueBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: 'paint' }}
    >
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{ backgroundImage: BANDHANI, backgroundSize: '64px 64px' }}
      />
      <div className="text-gold">
        <PeacockFeather className="absolute -left-6 bottom-0 h-64 w-40 -rotate-[8deg] opacity-40 md:left-4 md:h-[30rem] md:w-72" />
        <PeacockFeather className="absolute bottom-0 left-16 hidden h-72 w-44 rotate-6 opacity-25 md:block" />
        <PeacockFeather className="absolute -right-6 bottom-0 h-64 w-40 rotate-[8deg] opacity-40 md:right-4 md:h-[30rem] md:w-72" />
        <PeacockFeather className="absolute bottom-0 right-16 hidden h-72 w-44 -rotate-6 opacity-25 md:block" />
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
            {/* Map ki image: click karne par Google Maps khulta hai */}
            <a
              href={v.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open venue location in Google Maps"
              className="card group relative block min-h-[320px] flex-1 overflow-hidden rounded-2xl p-2"
            >
              <div className="h-full min-h-[320px] overflow-hidden rounded-xl">
                <Img
                  src={images.map}
                  label="map.jpg"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-medium tracking-wide text-maroon shadow-md">
                <MapPin className="h-4 w-4 text-gold" /> Open in Google Maps
              </span>
            </a>
            <Button href={v.mapsUrl} variant="outline" className="self-center" icon={<MapPin className="h-4 w-4" />}>View on Google Maps</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}