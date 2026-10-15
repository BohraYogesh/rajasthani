import { wedding } from '../data/weddingData'

const MODE = import.meta.env.VITE_RSVP_MODE || 'demo'
const WA = import.meta.env.VITE_WHATSAPP_NUMBER
const SHEETS = import.meta.env.VITE_SHEETS_URL

export async function submitRsvp(data) {
  if (MODE === 'whatsapp' && WA) {
    const msg = [
      `RSVP - ${wedding.bride} & ${wedding.groom}`,
      `Name: ${data.name}`,
      `Attending: ${data.attending}`,
      `Guests: ${data.guests}`,
      `Events: ${data.events.join(', ') || '-'}`,
      data.message ? `Message: ${data.message}` : '',
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
    return { ok: true }
  }

  if (MODE === 'sheets' && SHEETS) {
    await fetch(SHEETS, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    })
    return { ok: true }
  }

  // demo
  await new Promise((r) => setTimeout(r, 900))
  console.info('[RSVP demo]', data)
  return { ok: true, demo: true }
}
