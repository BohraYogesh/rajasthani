import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu } from 'lucide-react'
import { navLinks } from '../../data/navLinks'
import { wedding } from '../../data/weddingData'
import { scrollToId } from '../../lib/scroll'
import useScrollSpy from '../../hooks/useScrollSpy'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const ids = useMemo(() => navLinks.map((l) => l.id), [])
  const active = useScrollSpy(ids)

  // Intro khatam hone ke baad navbar slide-down hota hai
  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > window.innerHeight * 3.9))

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-cream/80 backdrop-blur-md"
          >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
              <button onClick={() => scrollToId('home')} className="cursor-pointer font-display text-xl font-semibold tracking-wide text-maroon">
                {wedding.bride[0]} <span className="text-gold">&</span> {wedding.groom[0]}
              </button>

              <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
                {navLinks.map((l) => (
                  <li key={l.id} className="relative">
                    <button
                      onClick={() => scrollToId(l.id)}
                      className={`cursor-pointer py-2 text-sm transition-colors ${active === l.id ? 'text-maroon' : 'text-ink/70 hover:text-maroon'}`}
                    >
                      {l.label}
                    </button>
                    {active === l.id && (
                      <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded bg-gold" />
                    )}
                  </li>
                ))}
              </ul>

              <button aria-label="Open menu" onClick={() => setOpen(true)} className="cursor-pointer rounded-full p-2 text-maroon lg:hidden">
                <Menu />
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  )
}
