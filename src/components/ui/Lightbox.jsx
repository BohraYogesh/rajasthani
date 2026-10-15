import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Img from './Img'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

export default function Lightbox({ images, index, onClose, onChange }) {
  const open = index !== null
  useLockBodyScroll(open)

  const next = useCallback(() => onChange((index + 1) % images.length), [index, images.length, onChange])
  const prev = useCallback(() => onChange((index - 1 + images.length) % images.length), [index, images.length, onChange])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, next, prev, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon-dark/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button aria-label="Close" onClick={onClose} className="absolute right-5 top-5 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20">
            <X />
          </button>
          <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-3 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20 md:left-8">
            <ChevronLeft />
          </button>
          <button aria-label="Next" onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-3 rounded-full bg-cream/10 p-3 text-cream hover:bg-cream/20 md:right-8">
            <ChevronRight />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="h-[75vh] w-[min(86vw,56vh)] overflow-hidden rounded-xl border-4 border-gold/70 shadow-2xl md:w-[min(70vw,60vh)]"
            >
              <Img src={images[index]} label={`Gallery photo ${index + 1}`} />
            </motion.div>
          </AnimatePresence>

          <p className="absolute bottom-6 text-sm text-cream/80">{index + 1} / {images.length}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
