import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// ⚠️ Agar tumhari cart/musicians images RIGHT ki taraf face kar rahi hain,
// to true rakho: image flip hogi taaki wo left jaate hue aage dekhe.
// Agar images already LEFT face kar rahi hain, to false karo.
const IMAGES_FACE_RIGHT = false

export default function BaraatScene({ village, cart, musicians }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // RIGHT -> LEFT: shuru mein group poora right ke bahar, end mein poora left ke bahar
  const xMove = useTransform(scrollYProgress, [0.15, 0.85], ['100%', '-100%'])

  const flip = IMAGES_FACE_RIGHT ? { scaleX: -1 } : undefined

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#f3e4c4]
                 h-[70svh] md:h-auto md:[aspect-ratio:var(--ar)]"
      style={{ '--ar': `${village.width} / ${village.height}` }}
      aria-label="Rajasthani baraat"
    >
      {/* Layer 1: village */}
      <img
        src={village.src}
        width={village.width}
        height={village.height}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover
                   [object-position:var(--pos)] md:[object-position:center]"
        style={{ '--pos': village.mobilePosition }}
      />

      {/* Layer 2: procession (right -> left) */}
      <motion.div
        className="absolute inset-x-0 bottom-[6%] flex w-full items-end justify-end gap-[2vw] pr-[4vw] will-change-transform"
        style={{ x: reduce ? '0%' : xMove }}
      >
        {/* Left jaate hue musicians aage chalte hain, cart peeche */}
        <motion.img
          src={musicians.src}
          width={musicians.width}
          height={musicians.height}
          alt="Rajasthani folk musicians"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-auto shrink-0 select-none"
          style={{ width: 'clamp(110px, 22vw, 280px)', ...flip }}
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        <motion.img
          src={cart.src}
          width={cart.width}
          height={cart.height}
          alt="Decorated wedding bullock cart"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-auto shrink-0 select-none"
          style={{ width: 'clamp(150px, 30vw, 380px)', ...flip }}
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}