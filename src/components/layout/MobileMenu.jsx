import { AnimatePresence, motion } from 'framer-motion'
import { CalendarHeart, Facebook, Gift, Heart, Home, Image as ImageIcon, Instagram, MailCheck, MapPin, Users, X, Youtube } from 'lucide-react'
import { navLinks, socials } from '../../data/navLinks'
import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import { scrollToId } from '../../lib/scroll'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import Img from '../ui/Img'

const icons = { Home, Users, CalendarHeart, MapPin, Heart, Image: ImageIcon, MailCheck, Gift }
const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube }

export default function MobileMenu({ open, onClose, active }) {
  useLockBodyScroll(open)

  const go = (id) => {
    onClose()
    setTimeout(() => scrollToId(id), 350)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-maroon-dark/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-sm flex-col overflow-hidden border-l border-gold/40 bg-cream shadow-2xl lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b border-gold/30 px-6 py-5">
              <span className="font-display text-xl font-semibold text-maroon">
                {wedding.bride[0]} <span className="text-gold">&</span> {wedding.groom[0]}
              </span>
              <button aria-label="Close menu" onClick={onClose} className="cursor-pointer text-maroon"><X /></button>
            </div>

            <ul className="flex-1 space-y-1 px-4 py-5">
              {navLinks.map((l, i) => {
                const Icon = icons[l.icon]
                return (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 text-left text-[15px] transition-colors ${active === l.id ? 'bg-gold/15 text-maroon' : 'text-ink/80 hover:bg-gold/10'}`}
                    >
                      <Icon className="h-5 w-5 text-maroon/80" strokeWidth={1.6} /> {l.label}
                    </button>
                  </motion.li>
                )
              })}
            </ul>

            <div className="relative z-10 flex justify-center gap-6 pb-4">
              {socials.map((s) => {
                const Icon = socialIcons[s.id]
                return (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="text-maroon/80 transition hover:text-maroon">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </a>
                )
              })}
            </div>
            <div className="h-40 w-full opacity-90">
              <Img src={images.camel} fit="contain" label="camel.png" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
