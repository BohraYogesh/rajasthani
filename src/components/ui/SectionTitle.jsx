import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { Divider } from './Ornament'

export default function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <Reveal className={`mb-2 text-center md:mb-6 ${className}`}>
      <h2 className="font-display text-3xl font-semibold text-maroon md:text-5xl">{title}</h2>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 flex justify-center"
      >
        <Divider />
      </motion.div>
      {subtitle && <p className="mx-auto mt-3 max-w-md px-4 text-sm text-ink/70 md:text-base">{subtitle}</p>}
    </Reveal>
  )
}