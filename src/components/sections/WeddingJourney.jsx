import { motion } from 'framer-motion'
import { images } from '../../data/images'
import { journey } from '../../data/journey'
import { wedding } from '../../data/weddingData'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

/* ---------- Rajasthani background art (pure SVG) ---------- */

function Mandala({ className = '', duration = 140 }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  const smallPetals = Array.from({ length: 24 }, (_, i) => i * 15)
  return (
    <motion.svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      <circle r="96" />
      <circle r="92" strokeDasharray="2 4" />
      {petals.map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0 -90 C 14 -70 14 -50 0 -36 C -14 -50 -14 -70 0 -90 Z"
        />
      ))}
      {smallPetals.map((a) => (
        <path
          key={a}
          transform={`rotate(${a})`}
          d="M0 -34 C 6 -28 6 -22 0 -16 C -6 -22 -6 -28 0 -34 Z"
        />
      ))}
      <circle r="12" />
      <circle r="6" />
      <circle r="2" fill="currentColor" />
    </motion.svg>
  )
}

function JourneyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-gold">
      {/* 1. jaali pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]">
        <defs>
          <pattern id="jaali" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M40 4 L76 40 L40 76 L4 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M40 18 L62 40 L40 62 L18 40 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="2" fill="currentColor" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
            <circle cx="80" cy="0" r="2" fill="currentColor" />
            <circle cx="0" cy="80" r="2" fill="currentColor" />
            <circle cx="80" cy="80" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jaali)" />
      </svg>

      {/* 2. mandalas */}
      <Mandala className="absolute -left-32 top-24 h-72 w-72 opacity-25 md:-left-44 md:h-[30rem] md:w-[30rem]" />
      <Mandala className="absolute -right-32 top-[45%] h-72 w-72 opacity-25 md:-right-44 md:h-[30rem] md:w-[30rem]" duration={180} />
      <Mandala className="absolute -left-28 bottom-16 hidden h-64 w-64 opacity-20 md:block" duration={160} />
    </div>
  )
}

/* ---------- Section ---------- */

export default function WeddingJourney() {
  return (
    <section id="journey" className="relative overflow-hidden px-5 py-10 md:py-28">
      <JourneyBackdrop />

      <div className="relative z-10">
        <SectionTitle title={wedding.journey.heading} subtitle={wedding.journey.subheading} />

        <div className="relative mx-auto max-w-5xl">
          {/* vertical line (draw hota hai) */}
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className="absolute bottom-0 left-[6px] top-0 w-px bg-gradient-to-b from-gold via-gold/60 to-transparent md:left-1/2"
          />

          <ul className="space-y-10 md:space-y-16">
            {journey.map((j, i) => {
              const flip = i % 2 === 1
              return (
                <li key={j.id} className="relative grid items-center pl-10 md:grid-cols-[1fr_auto_1fr] md:gap-12 md:pl-0">
                  <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-gold bg-cream md:static md:order-2 md:translate-y-0" />

                  <Reveal variant={flip ? 'right' : 'left'} className={flip ? 'md:order-3' : 'md:order-1'}>
                    <div className="card overflow-hidden rounded-2xl p-2">
                      <div className="aspect-[16/10] overflow-hidden rounded-xl">
                        <motion.div whileHover={{ scale: 1.06 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-full w-full">
                          <Img src={images.journey[j.id]} label={j.title} />
                        </motion.div>
                      </div>
                      <p className="py-2 text-center font-display text-base text-maroon md:hidden">{j.title}</p>
                    </div>
                  </Reveal>

                  <Reveal variant={flip ? 'left' : 'right'} delay={0.15} className={`hidden md:block ${flip ? 'md:order-1 md:text-right' : 'md:order-3'}`}>
                    <h3 className="font-display text-3xl font-medium text-maroon">{j.title}</h3>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}