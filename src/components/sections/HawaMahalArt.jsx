import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────
//  Illustrated Hawa Mahal (pure SVG, koi image nahi chahiye).
//  Focal jharokha: center me (400, 487). Intro isi window me zoom karta hai.
// ─────────────────────────────────────────────────────────────
const FOCAL = { x: 400, y: 487 }
export const HAWA_ZOOM_ORIGIN = { x: (FOCAL.x / 800) * 100, y: (FOCAL.y / 1000) * 100 }

function Win({ x, y, w = 20, h = 30 }) {
  const r = w / 2
  return (
    <g>
      <path d={`M${x - 2},${y + h} V${y + r} A${r + 2},${r + 2} 0 0 1 ${x + w + 2},${y + r} V${y + h} Z`} fill="#C9705A" />
      <path d={`M${x},${y + h} V${y + r} A${r},${r} 0 0 1 ${x + w},${y + r} V${y + h} Z`} fill="#5A1F2A" />
      <path d={`M${x + 3},${y + h} V${y + r} A${r - 3},${r - 3} 0 0 1 ${x + w - 3},${y + r} V${y + h} Z`} fill="#8B3A3A" opacity=".7" />
      <path d={`M${x + w / 2},${y + 4} V${y + h} M${x + 3},${y + r + 6} H${x + w - 3}`} stroke="#E3B26A" strokeWidth=".6" />
    </g>
  )
}

function Dome({ cx, y, w = 22, h = 30 }) {
  return (
    <g>
      <path
        d={`M${cx - w / 2},${y} V${y - h * 0.35} Q${cx - w / 2},${y - h * 0.8} ${cx},${y - h} Q${cx + w / 2},${y - h * 0.8} ${cx + w / 2},${y - h * 0.35} V${y} Z`}
        fill="#D9826B"
      />
      <path d={`M${cx},${y - h} V${y - h - 9}`} stroke="#C9973F" strokeWidth="1.5" />
      <circle cx={cx} cy={y - h - 10} r="2.2" fill="#C9973F" />
      <rect x={cx - w / 2 - 2} y={y - 4} width={w + 4} height="5" fill="#C9705A" />
    </g>
  )
}

function Tier({ x1, x2, y1, y2, cols, rows, skip = false, shade = 'stoneA', domes = 'corners' }) {
  const w = 20, h = 30, gap = 10
  const innerTop = y1 + 12
  const padY = (y2 - innerTop - rows * h - (rows - 1) * gap) / 2
  const span = x2 - x1
  const wins = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x1 + ((c + 0.5) * span) / cols
      if (skip && Math.abs(cx - 400) < 34) continue
      wins.push(<Win key={`${r}-${c}`} x={cx - w / 2} y={innerTop + padY + r * (h + gap)} w={w} h={h} />)
    }
  }
  const scallops = Math.floor(span / 14)
  return (
    <g>
      <rect x={x1} y={y1} width={span} height={y2 - y1} fill={`url(#${shade})`} />
      <rect x={x1 - 6} y={y1 - 8} width={span + 12} height="10" fill="#C9705A" />
      <rect x={x1 - 6} y={y1 + 2} width={span + 12} height="3" fill="#A5503F" opacity=".55" />
      {Array.from({ length: scallops }).map((_, i) => (
        <circle key={i} cx={x1 - 6 + 7 + i * ((span + 12) / scallops) + 0} cy={y1 - 8} r="6" fill="#E8A08A" />
      ))}
      {wins}
      <Dome cx={x1 + 16} y={y1 - 8} />
      <Dome cx={x2 - 16} y={y1 - 8} />
      {domes === 'all' && <Dome cx={(x1 + x2) / 2} y={y1 - 8} w={26} h={36} />}
    </g>
  )
}

export default function HawaMahalArt({ shutter, cloudsX }) {
  return (
    <svg viewBox="0 0 800 1000" className="h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Hawa Mahal, Jaipur">
      <defs>
        <linearGradient id="stoneA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2B197" />
          <stop offset="1" stopColor="#DE8A72" />
        </linearGradient>
        <linearGradient id="stoneB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EBA088" />
          <stop offset="1" stopColor="#D47C65" />
        </linearGradient>
        <radialGradient id="sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFF3C4" />
          <stop offset=".55" stopColor="#FFD98A" stopOpacity=".9" />
          <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="winGlow" cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#FBF3E4" />
          <stop offset="1" stopColor="#F3D9A4" />
        </radialGradient>
        <radialGradient id="halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFE9A8" stopOpacity=".95" />
          <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9C79B" />
          <stop offset="1" stopColor="#D2A06C" />
        </linearGradient>
        <clipPath id="winClip">
          <path d="M378,522 V474 A22,22 0 0 1 422,474 V522 Z" />
        </clipPath>
      </defs>

      {/* Sun + clouds */}
      <circle cx="640" cy="170" r="130" fill="url(#sun)" />
      <motion.g style={{ x: cloudsX }} fill="#fff" opacity=".6">
        <ellipse cx="170" cy="150" rx="80" ry="16" />
        <ellipse cx="220" cy="136" rx="50" ry="14" />
        <ellipse cx="560" cy="270" rx="90" ry="14" />
        <ellipse cx="610" cy="256" rx="48" ry="12" />
        <ellipse cx="90" cy="300" rx="60" ry="10" />
      </motion.g>

      {/* Birds */}
      {[0, 4, 8].map((d, i) => (
        <g key={i} transform={`translate(${20 + i * 30},${210 + i * 38})`}>
          <path className="bird" style={{ animationDelay: `${d}s` }} d="M0 0 q6 -7 12 0 q6 -7 12 0" stroke="#7A3A2A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      ))}

      {/* Far hills */}
      <path d="M0 880 Q120 820 240 860 T480 850 T800 860 V920 H0 Z" fill="#E8B98F" opacity=".55" />

      {/* Side wings */}
      <Tier x1={24} x2={112} y1={835} y2={900} cols={3} rows={1} shade="stoneB" />
      <Tier x1={688} x2={776} y1={835} y2={900} cols={3} rows={1} shade="stoneB" />

      {/* Main facade, bottom → top */}
      <Tier x1={110} x2={690} y1={790} y2={900} cols={12} rows={1} skip shade="stoneB" />
      <Tier x1={160} x2={640} y1={665} y2={790} cols={10} rows={2} shade="stoneA" />
      <Tier x1={210} x2={590} y1={550} y2={665} cols={8} rows={2} shade="stoneB" />
      <Tier x1={260} x2={540} y1={430} y2={550} cols={6} rows={2} skip shade="stoneA" />
      <Tier x1={320} x2={480} y1={335} y2={430} cols={4} rows={2} shade="stoneB" domes="all" />

      {/* Crown */}
      <Dome cx={400} y={327} w={34} h={48} />
      <path d="M400 268 V240" stroke="#7A3A2A" strokeWidth="1.5" />
      <path d="M400 240 l22 7 -22 7z" fill="#E07B39" />

      {/* Ground floor doorway */}
      <path d="M372,900 V868 A28,28 0 0 1 428,868 V900 Z" fill="#4A1420" />
      <path d="M372,900 V868 A28,28 0 0 1 428,868 V900" fill="none" stroke="#C9973F" strokeWidth="2" />

      {/* Forecourt */}
      <rect x="0" y="900" width="800" height="100" fill="url(#ground)" />
      <path d="M340 900 L260 1000 H540 L460 900 Z" fill="#C98F5E" opacity=".55" />
      <path d="M0 905 H800" stroke="#B5783F" strokeWidth="2" opacity=".5" />

      {/* ★ FOCAL JHAROKHA ★ */}
      <circle className="glow-pulse" cx={FOCAL.x} cy={FOCAL.y} r="80" fill="url(#halo)" />
      <path d="M372,530 V474 A28,28 0 0 1 428,474 V530 Z" fill="#C9973F" />
      <path d="M378,522 V474 A22,22 0 0 1 422,474 V522 Z" fill="url(#winGlow)" />
      <g clipPath="url(#winClip)">
        <motion.g style={{ scaleX: shutter, transformBox: 'fill-box', transformOrigin: 'left center' }}>
          <rect x="378" y="452" width="22.5" height="72" fill="#7A2431" />
          <path d="M389 452 V522 M378 480 H400 M378 500 H400" stroke="#E3B26A" strokeWidth=".8" />
          <circle cx="396" cy="490" r="1.6" fill="#E3B26A" />
        </motion.g>
        <motion.g style={{ scaleX: shutter, transformBox: 'fill-box', transformOrigin: 'right center' }}>
          <rect x="399.5" y="452" width="22.5" height="72" fill="#7A2431" />
          <path d="M411 452 V522 M400 480 H422 M400 500 H422" stroke="#E3B26A" strokeWidth=".8" />
          <circle cx="404" cy="490" r="1.6" fill="#E3B26A" />
        </motion.g>
      </g>
      <rect x="370" y="528" width="60" height="6" rx="2" fill="#C9973F" />
    </svg>
  )
}
