import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import { Divider, Diamond } from '../ui/Ornament'
import floralTop from '../../assets/floral-corner-1.png'

const EASE = [0.22, 1, 0.36, 1]

/* Peeche ka halka mandala (decor) */
function Mandala({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="#c9973f" strokeWidth="1" aria-hidden="true">
      {[95, 78, 60, 42, 24].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 22.5} 100 100)`}>
          <path d="M100 5c8 14 8 30 0 44-8-14-8-30 0-44z" />
          <path d="M100 51v26" />
        </g>
      ))}
    </svg>
  )
}

/* Clean frame: patli gold border + inner line, halka rounded, parallax */
function ArchPhoto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 1.1, ease: EASE }}
      className="mx-auto w-full max-w-[22rem] md:max-w-sm"
    >
      {/* bahar ki gold border */}
      <div className="rounded-3xl border border-gold/80 bg-cream/70 p-2.5 shadow-[0_24px_44px_-26px_rgba(107,31,46,.5)]">
        {/* andar ki patli line + photo */}
        <div className="rounded-2xl border border-gold-soft/80 p-1.5">
          <div
            ref={ref}
            className="relative aspect-[4/5] overflow-hidden rounded-xl"
          >
            <motion.div
              className="absolute inset-x-0 -inset-y-[8%] will-change-transform"
              style={reduce ? undefined : { y }}
            >
              <Img src={images.family} label="family.jpg" />
            </motion.div>

            {/* halka warm tint */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {wedding.family.photoCaption && (
        <figcaption className="mt-5 flex items-center justify-center gap-3 font-script text-xl italic text-maroon md:text-2xl">
          <span className="h-px w-8 bg-gold/70" />
          {wedding.family.photoCaption}
          <span className="h-px w-8 bg-gold/70" />
        </figcaption>
      )}
    </motion.figure>
  )
}

export default function FamilyInvitation() {
  const { heading, lead, paragraphs, signoff } = wedding.family

  return (
    <section id="family" className="relative overflow-hidden px-5 py-10 md:py-28">
      {/* Hero se smooth transition: upar halka gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#f6e3bd] to-transparent" />

      {/* Mandala (right-top) */}
      <Mandala className="pointer-events-none absolute -right-24 top-10 w-80 opacity-[0.07] md:-right-16 md:w-[26rem]" />
      <Mandala className="pointer-events-none absolute -bottom-28 -left-28 hidden w-80 opacity-[0.06] md:block" />

      {/* Floral corners */}
      <img
        src={floralTop}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute left-0 top-0 w-20 select-none opacity-40 sm:w-28 md:w-40"
      />
      <img
        src={floralTop}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute right-0 top-0 w-20 -scale-x-100 select-none opacity-40 sm:w-28 md:w-40"
      />

      <div className="relative">
        <SectionTitle title={heading} />

        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* PHOTO: mobile par pehle, desktop par right */}
          <div className="order-first md:order-none md:col-start-2 md:row-start-1">
            <ArchPhoto />
          </div>

          {/* TEXT */}
          <div className="text-center md:col-start-1 md:row-start-1 md:text-left">
            {lead && (
              <Reveal>
                <p className="mb-5 font-script text-xl italic tracking-wide text-gold md:text-2xl">{lead}</p>
              </Reveal>
            )}

            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <Reveal key={i} variant="left" delay={0.1 + i * 0.15}>
                  <p
                    className={`font-script text-xl leading-relaxed text-[#4a1420]/85 md:text-2xl ${
                      i === 0
                        ? 'md:first-letter:float-left md:first-letter:mr-3 md:first-letter:font-display md:first-letter:text-6xl md:first-letter:font-bold md:first-letter:leading-[0.85] md:first-letter:text-maroon'
                        : ''
                    }`}
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {signoff && (
              <Reveal delay={0.1 + paragraphs.length * 0.15} className="mt-10">
                <Divider className="md:mx-0" />
                <p className="mt-4 font-script text-lg italic text-ink/70 md:text-xl">{signoff.line}</p>
                <p className="mt-1 font-display text-2xl font-semibold italic text-maroon md:text-3xl">
                  {signoff.families}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}