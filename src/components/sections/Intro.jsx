import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import { scrollToId } from '../../lib/scroll'
import HawaMahalArt, { HAWA_ZOOM_ORIGIN } from './HawaMahalArt'

const MAX_SCALE = 46 // window ke andar kitna zoom ho

export default function Intro() {
  const ref = useRef(null)
  
const { scrollYProgress } = useScroll({
  container: undefined,
  target: ref,
  offset: ['start start', 'end end'],
})


  // spring = buttery smooth, scroll jerk ko absorb karta hai
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.7 })

  // exponential zoom = zoom speed constant lagti hai
  const logScale = useTransform(p, [0, 0.86], [0, Math.log(MAX_SCALE)], { clamp: true })
  const scale = useTransform(logScale, (v) => Math.exp(v))

  const shutter = useTransform(p, [0.14, 0.46], [1, 0], { clamp: true }) // jharokha khulta hai
  const cloudsX = useTransform(p, [0, 1], [0, -160])
  const titleOpacity = useTransform(p, [0, 0.1], [1, 0])
  const titleY = useTransform(p, [0, 0.1], [0, -50])
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0])
  const creamOpacity = useTransform(p, [0.58, 0.9], [0, 1])

  const origin = images.hawaMahal ? images.hawaMahalZoomOrigin : HAWA_ZOOM_ORIGIN

  return (
    <section ref={ref} id="intro" className="relative h-[480vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-gradient-to-b from-[#f4b985] via-[#f9d9ae] to-[#fbe9cd]">
        {/* Zoom layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ scale, transformOrigin: `${origin.x}% ${origin.y}%` }}
            className="relative h-full aspect-[4/5] shrink-0"
          >
            {images.hawaMahal ? (
              <img src={images.hawaMahal} alt="Hawa Mahal" className="h-full w-full object-cover" draggable={false} />
            ) : (
              <HawaMahalArt shutter={shutter} cloudsX={cloudsX} />
            )}
          </motion.div>
        </div>

        {/* Cream wash: zoom ke end me invitation ki cream paper me melt hota hai */}
        <motion.div style={{ opacity: creamOpacity }} className="pointer-events-none absolute inset-0 bg-cream" />

        {/* Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-[7vh] text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-script text-lg italic tracking-wide text-maroon/80 md:text-2xl"
          >
            Padharo Mhare Des
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
            transition={{ delay: 0.55, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 font-display text-4xl font-semibold text-maroon md:text-6xl"
          >
            {wedding.bride} <span className="text-gold">&</span> {wedding.groom}
          </motion.h1>
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          style={{ opacity: hintOpacity }}
          onClick={() => scrollToId('home', { offset: 0, duration: 3 })}
          className="absolute inset-x-0 bottom-8 mx-auto flex w-fit cursor-pointer flex-col items-center gap-1 text-sm tracking-wide text-maroon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          Scroll to open the window
          <span className="float-y rounded-full border border-maroon/40 p-1.5">
            <ChevronDown className="h-4 w-4" />
          </span>
        </motion.button>

        <button
          onClick={() => scrollToId('home', { offset: 0, duration: 2.4 })}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full border border-maroon/30 bg-cream/50 px-4 py-1.5 text-xs text-maroon backdrop-blur hover:bg-cream"
        >
          Skip intro
        </button>
      </div>
    </section>
  )
}
