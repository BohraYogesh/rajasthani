import Lenis from 'lenis'

let lenis = null
let rafId = 0

export function initSmoothScroll() {
  if (lenis) return
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  const raf = (time) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()
export const getLenis = () => lenis

export function scrollToId(id, { offset = -64, duration = 1.8 } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset, duration })
  else el.scrollIntoView({ behavior: 'smooth' })
}