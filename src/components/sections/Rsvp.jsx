import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { events } from '../../data/events'
import { wedding } from '../../data/weddingData'
import { submitRsvp } from '../../utils/submitRsvp'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'

/* ---------- Rajasthani background art (halka, mostly static) ---------- */

// Leheriya (waves): ek 60x48 tile, CSS background se repeat hoti hai
const LEHERIYA =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='48'><g fill='none' stroke='%236b1f2e'><path d='M0 8 Q15 -4 30 8 T60 8' stroke-width='2.2'/><path d='M0 22 Q15 10 30 22 T60 22' stroke-width='1.2'/><path d='M0 34 Q15 22 30 34 T60 34' stroke-width='2.2'/><path d='M0 46 Q15 34 30 46 T60 46' stroke-width='1.2'/></g></svg>\")"

// Rangoli: ab static (rotate hata diya)
function Rangoli({ className = '' }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45)
  const dots = Array.from({ length: 16 }, (_, i) => i * 22.5)
  return (
    <svg
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
    >
      {dots.map((a) => (
        <circle key={a} transform={`rotate(${a}) translate(0 -92)`} r="2" fill="currentColor" />
      ))}
      {petals.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path
            d="M0 -84 C 18 -66 18 -44 0 -30 C -18 -44 -18 -66 0 -84 Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path d="M0 -78 C 8 -66 8 -52 0 -42" strokeWidth="0.7" />
          <circle cy="-62" r="2" fill="currentColor" />
        </g>
      ))}
      {petals.map((a) => (
        <path
          key={`s${a}`}
          transform={`rotate(${a + 22.5})`}
          d="M0 -48 L8 -30 L0 -20 L-8 -30 Z"
          fill="currentColor"
          fillOpacity="0.16"
        />
      ))}
      <circle r="16" />
      <circle r="10" strokeDasharray="1.5 3" />
      <circle r="4" fill="currentColor" />
    </svg>
  )
}

// Diya: lau ka flicker CSS (.flame) se, desktop par. Mobile par band
function Diya({ className = '', duration = 2.4 }) {
  return (
    <svg
      viewBox="0 0 60 56"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path
        className="flame"
        style={{ '--dur': `${duration}s` }}
        d="M30 4 C 38 14 38 24 30 30 C 22 24 22 14 30 4 Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path d="M30 30 V34" />
      <path d="M6 34 H54 C 52 46 42 52 30 52 C 18 52 8 46 6 34 Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M14 40 H46" strokeWidth="0.8" strokeDasharray="2 3" />
      <path d="M54 34 C 58 32 60 30 60 28" />
    </svg>
  )
}

function RsvpBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ contain: 'paint' }}
    >
      {/* 1. leheriya: tirchi (-35deg) static layer */}
      <div
        className="absolute -inset-[50%] -rotate-[35deg] opacity-[0.08]"
        style={{ backgroundImage: LEHERIYA, backgroundSize: '60px 48px' }}
      />

      <div className="text-gold">
        {/* 2. rangoli (static) */}
        <Rangoli className="absolute -left-24 top-10 h-60 w-60 opacity-30 md:-left-36 md:top-16 md:h-[26rem] md:w-[26rem]" />
        <Rangoli className="absolute -right-24 bottom-10 h-60 w-60 opacity-30 md:-right-36 md:bottom-16 md:h-[26rem] md:w-[26rem]" />

        {/* 3. diye: mobile par 2, desktop par 4 */}
        <Diya className="absolute bottom-6 left-4 h-9 w-10 opacity-70 md:bottom-12 md:left-[8%] md:h-14 md:w-16" />
        <Diya
          className="absolute right-4 top-6 h-9 w-10 opacity-70 md:right-[8%] md:top-12 md:h-14 md:w-16"
          duration={2.9}
        />
        <Diya
          className="absolute bottom-12 left-[18%] hidden h-10 w-12 opacity-45 md:block"
          duration={2.6}
        />
        <Diya
          className="absolute right-[18%] top-16 hidden h-10 w-12 opacity-45 md:block"
          duration={3.1}
        />
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

const field =
  'w-full rounded-xl border border-gold/50 bg-cream/70 px-4 py-3 text-sm outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/40'

const initial = { name: '', phone: '', attending: 'yes', guests: 1, events: [], message: '' }

export default function Rsvp() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitRsvp({ ...form, events: form.events.map((id) => events.find((x) => x.id === id)?.title) })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="rsvp" className="relative overflow-hidden px-5 py-10 md:py-28">
      <RsvpBackdrop />

      <div className="relative z-10">
        <SectionTitle title={wedding.rsvp.heading} subtitle={wedding.rsvp.subheading} />
        <Reveal className="card mx-auto max-w-2xl rounded-3xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 font-display text-2xl text-maroon">Thank you, {form.name.split(' ')[0]}!</h3>
                <p className="mt-2 text-sm text-ink/70">
                  {form.attending === 'yes' ? 'We can’t wait to celebrate with you.' : 'We’ll miss you and are grateful for your wishes.'}
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} className="space-y-5" exit={{ opacity: 0 }}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block text-ink/80">Full name</span>
                    <input required className={field} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([v, l]) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => set('attending', v)}
                      className={`cursor-pointer rounded-xl border px-3 py-3 text-sm transition ${form.attending === v ? 'border-maroon bg-maroon text-cream' : 'border-gold/50 hover:bg-gold/10'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>

                {form.attending === 'yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-5 overflow-hidden">
                    <label className="block text-sm">
                      <span className="mb-1.5 block text-ink/80">Number of guests</span>
                      <input type="number" min="1" max="10" className={field} value={form.guests} onChange={(e) => set('guests', Number(e.target.value))} />
                    </label>
                  </motion.div>
                )}

                <label className="block text-sm">
                  <span className="mb-1.5 block text-ink/80">Message for the couple</span>
                  <textarea rows="3" className={field} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Your wishes..." />
                </label>

                {status === 'error' && <p className="text-sm text-rose">Something went wrong. Please try again.</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-maroon py-3.5 text-sm font-medium tracking-wide text-cream transition hover:-translate-y-0.5 hover:bg-maroon-dark active:scale-[0.98] disabled:opacity-70"
                >
                  {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status === 'sending' ? 'Sending...' : 'Send RSVP'}
                </button>
                <p className="text-center text-xs text-ink/55">{wedding.rsvp.deadline}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}