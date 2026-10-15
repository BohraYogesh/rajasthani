import Img from './Img'
import Reveal from './Reveal'
import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

export default function EventCard({ event, image, index = 0 }) {
  return (
    <Reveal delay={(index % 3) * 0.12} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="card flex h-full items-center gap-4 rounded-2xl p-4 md:flex-col md:gap-5 md:p-7 md:text-center"
      >
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-[3px] border-gold p-[3px] md:h-36 md:w-36">
          <div className="h-full w-full overflow-hidden rounded-full">
            <Img src={image} label={event.title} />
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-maroon md:text-2xl">{event.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/80 md:justify-center md:text-sm">
            <Clock className="h-3.5 w-3.5 text-gold" /> {event.date} | {event.time}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink/80 md:justify-center md:text-sm">
            <MapPin className="h-3.5 w-3.5 text-gold" /> {event.venue}
          </p>
          <p className="mt-2 font-script text-sm italic text-rose md:text-lg">{event.note}</p>
        </div>
      </motion.article>
    </Reveal>
  )
}
