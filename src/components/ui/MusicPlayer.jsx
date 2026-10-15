import { useEffect, useRef, useState } from 'react'
import music from '../../assets/music-1.mp3'

export default function MusicPlayer({ src = music, triggerId = 'home' }) {
  const audioRef = useRef(null)
  const readyRef = useRef(false)
  const startedRef = useRef(false)
  const userPausedRef = useRef(false)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.5

    const events = ['click', 'touchend', 'keydown']
    const removeGestures = () => events.forEach((ev) => window.removeEventListener(ev, onGesture))

    const tryPlay = () => {
      if (!readyRef.current || startedRef.current || userPausedRef.current) return
      audio
        .play()
        .then(() => {
          startedRef.current = true
          setPlaying(true)
          removeGestures()
        })
        .catch(() => {
          // browser ne roka: agle tap/click par dobara try hoga
        })
    }

    function onGesture(e) {
      if (e.target.closest?.('[data-music-btn]')) return
      tryPlay()
    }
    events.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }))

    // Hero ke upar ya parent me koi fade/opacity to nahi chal rahi?
    const isOpaque = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const cs = getComputedStyle(n)
        if (cs.visibility === 'hidden' || cs.display === 'none') return false
        if (parseFloat(cs.opacity) < 0.95) return false
      }
      return true
    }

    const heroReady = () => {
      const hero = document.getElementById(triggerId)
      if (!hero) return false
      const r = hero.getBoundingClientRect()
      const vh = window.innerHeight
      // Hero screen ko lagbhag poora bhar de
      if (!(r.top <= vh * 0.2 && r.bottom >= vh * 0.8)) return false
      if (!isOpaque(hero)) return false
      // Hero ke upar intro ki koi layer na ho
      const top = document.elementFromPoint(window.innerWidth / 2, vh / 2)
      return !!top && hero.contains(top)
    }

    const markReady = () => {
      if (readyRef.current) return
      readyRef.current = true
      setVisible(true)
      tryPlay()
    }

    // Optional: intro khud "intro-done" event bheje to turant ready
    window.addEventListener('intro-done', markReady)

    const timer = setInterval(() => {
      if (heroReady()) {
        markReady()
        clearInterval(timer)
      }
    }, 250)

    return () => {
      clearInterval(timer)
      removeGestures()
      window.removeEventListener('intro-done', markReady)
    }
  }, [triggerId])

  const toggle = () => {
    const audio = audioRef.current
    if (audio.paused) {
      userPausedRef.current = false
      audio.play().then(() => { startedRef.current = true; setPlaying(true) }).catch(() => {})
    } else {
      userPausedRef.current = true
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        data-music-btn
        onClick={toggle}
        aria-label={playing ? 'Music band karein' : 'Music chalayein'}
        className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9973A] bg-[#7A1F2B] text-[#F6E3B4] shadow-lg transition-all duration-700 active:scale-95 ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        } ${playing ? 'animate-pulse' : ''}`}
      >
        {playing ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  )
}