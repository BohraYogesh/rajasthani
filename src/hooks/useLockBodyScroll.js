import { useEffect } from 'react'
import { startScroll, stopScroll } from '../lib/scroll'

export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    stopScroll()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      startScroll()
    }
  }, [locked])
}
