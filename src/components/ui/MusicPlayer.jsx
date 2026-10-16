import { useEffect, useRef, useState } from 'react'
import music from '../../assets/music-1.mp3'

export default function MusicPlayer({ src = music }) {
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

    function removeGestures() {
      events.forEach((ev) => window.removeEventListener(ev, onGesture))
    }

    function tryPlay() {
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

    function markReady() {
      if (readyRef.current) return
      readyRef.current = true
      setVisible(true)
      tryPlay()
    }

    events.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }))

    // Intro pehle hi khatam ho chuka ho (reduced-motion ya HMR) to turant ready
    if (window.__introDone) markReady()
    window.addEventListener('intro-done', markReady)

    return () => {
      removeGestures()
      window.removeEventListener('intro-done', markReady)
    }
  }, [])

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
      {/* preload="none": intro ke dauraan mp3 download nahi hoga (intro halka rahega) */}
      <audio ref={audioRef} src={src} loop preload="none" />
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