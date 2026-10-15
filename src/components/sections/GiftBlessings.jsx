import { images } from '../../data/images'
import { wedding } from '../../data/weddingData'
import Img from '../ui/Img'
import Reveal from '../ui/Reveal'
import SectionTitle from '../ui/SectionTitle'
import { Divider } from '../ui/Ornament'

const GOLD = '#C9973A'
const MAROON = '#7A1F2B'

// Ambi / keri (paisley) motif
function Keri({ x, y, s = 1, r = 0, o = 0.35 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o} fill="none" stroke={GOLD} strokeWidth="1.6">
      <path d="M0 40 C-34 20 -30 -30 0 -48 C30 -30 34 20 0 40 Z" />
      <path d="M0 28 C-20 14 -18 -18 0 -32 C18 -18 20 14 0 28 Z" />
      <circle cx="0" cy="-6" r="5" fill={GOLD} stroke="none" />
      <path d="M0 -48 C6 -58 18 -58 20 -48" />
    </g>
  )
}

// Mandala / phool
function Mandala({ x, y, s = 1, o = 0.3 }) {
  const petals = Array.from({ length: 12 }, (_, i) => i * 30)
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} fill="none" stroke={GOLD} strokeWidth="1.4">
      {petals.map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 -22 C10 -40 10 -58 0 -70 C-10 -58 -10 -40 0 -22 Z" />
      ))}
      {petals.map((a) => (
        <circle key={'d' + a} transform={`rotate(${a + 15})`} cy="-82" r="3" fill={GOLD} stroke="none" />
      ))}
      <circle r="16" />
      <circle r="8" fill={MAROON} stroke="none" opacity=".6" />
    </g>
  )
}

// Jharokha arch
function Jharokha({ cx = 600, o = 0.22 }) {
  return (
    <g transform={`translate(${cx} 0)`} opacity={o} fill="none" stroke={GOLD} strokeWidth="2">
      <path d="M-140 220 V90 C-140 20 -70 -10 0 -40 C70 -10 140 20 140 90 V220" />
      <path d="M-110 220 V100 C-110 45 -55 18 0 -8 C55 18 110 45 110 100 V220" />
      {Array.from({ length: 9 }, (_, i) => {
        const x = -96 + i * 24
        return <path key={i} d={`M${x} 120 q12 -26 24 0`} />
      })}
      <path d="M0 -40 V-70 M-10 -58 H10" />
      <circle cx="0" cy="-76" r="5" fill={GOLD} stroke="none" />
    </g>
  )
}

// Rajasthani art background
function RajasthaniBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,151,58,.18), transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(122,31,43,.10), transparent 60%), #FBF3E4',
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <Jharokha cx={600} />

        <Mandala x={90} y={400} s={1.5} o={0.22} />
        <Mandala x={1110} y={400} s={1.5} o={0.22} />

        <Keri x={190} y={170} s={1} r={-25} />
        <Keri x={1010} y={170} s={1} r={25} />
        <Keri x={190} y={640} s={1} r={205} />
        <Keri x={1010} y={640} s={1} r={155} />
        <Keri x={330} y={95} s={0.55} r={-10} o={0.25} />
        <Keri x={870} y={95} s={0.55} r={10} o={0.25} />
      </svg>
    </div>
  )
}

export default function GiftBlessings() {
  return (
    <section id="gifts" className="relative isolate px-5 py-10 md:py-28">
      <RajasthaniBackdrop />
      <SectionTitle title={wedding.gift.heading} />
      <div className="mx-auto grid max-w-5xl items-center gap-5 md:grid-cols-2 md:gap-16">
        <Reveal variant="left" className="mx-auto w-[92%] max-w-md md:w-full">
          <Img natural src={images.gift} label="couple.png" />
        </Reveal>
        <Reveal variant="right" className="text-center md:text-left">
          <p className="font-display text-2xl font-medium text-maroon md:text-3xl">{wedding.gift.lines[0]}</p>
          <Divider className="my-5 md:mx-0" />
          <p className="font-script text-xl leading-relaxed text-ink/80 md:text-2xl">{wedding.gift.lines[1]}</p>
        </Reveal>
      </div>
    </section>
  )
}