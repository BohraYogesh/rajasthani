// Chhote reusable decorative SVGs (gold / maroon)
export function Divider({ className = '' }) {
  return (
    <svg viewBox="0 0 200 20" className={`mx-auto h-4 w-40 ${className}`} fill="none" aria-hidden>
      <path d="M0 10h78M122 10h78" stroke="#C9973F" strokeWidth="1" />
      <path d="M100 2l8 8-8 8-8-8z" fill="#C9973F" />
      <circle cx="84" cy="10" r="2" fill="#C9973F" />
      <circle cx="116" cy="10" r="2" fill="#C9973F" />
    </svg>
  )
}

export function Motif({ className = '' }) {
  return (
    <svg viewBox="0 0 80 80" className={`mx-auto h-14 w-14 ${className}`} fill="none" aria-hidden>
      <g stroke="#C9973F" strokeWidth="1.6" fill="#C9973F" fillOpacity=".18">
        <path d="M40 8c6 10 14 14 14 26 0 8-6 14-14 14s-14-6-14-14C26 22 34 18 40 8z" />
        <path d="M40 48c-8 0-20 4-26-6 8-2 16 0 26 6z" />
        <path d="M40 48c8 0 20 4 26-6-8-2-16 0-26 6z" />
        <path d="M40 48v20" />
        <circle cx="40" cy="34" r="4" fill="#6B1F2E" stroke="none" />
      </g>
    </svg>
  )
}

export function Diamond({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={`inline-block h-5 w-5 ${className}`} aria-hidden>
      <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#C9973F" />
    </svg>
  )
}

// Floral-ish corner flourish. rotate with Tailwind (rotate-90 etc.)
export function Corner({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={`pointer-events-none absolute h-24 w-24 md:h-36 md:w-36 ${className}`} fill="none" aria-hidden>
      <path d="M4 116C4 60 40 20 116 4" stroke="#C9973F" strokeWidth="1.4" />
      <path d="M4 96C8 56 40 24 96 10" stroke="#C9973F" strokeWidth=".8" opacity=".6" />
      <g>
        <circle cx="22" cy="30" r="9" fill="#E07B39" fillOpacity=".85" />
        <circle cx="22" cy="30" r="4" fill="#FBF3E4" />
        <circle cx="46" cy="14" r="7" fill="#B5483D" fillOpacity=".85" />
        <circle cx="46" cy="14" r="3" fill="#FBF3E4" />
        <circle cx="12" cy="58" r="6" fill="#C9973F" fillOpacity=".9" />
        <path d="M30 44c10-2 16-10 18-20-10 2-16 10-18 20z" fill="#7A8F4A" fillOpacity=".8" />
        <path d="M14 76c6-8 8-16 6-24-8 8-10 16-6 24z" fill="#7A8F4A" fillOpacity=".8" />
        <path d="M62 8c8 2 16 0 22-6-8-2-16 0-22 6z" fill="#7A8F4A" fillOpacity=".8" />
      </g>
    </svg>
  )
}
