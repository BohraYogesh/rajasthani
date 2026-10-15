import { wedding } from '../../data/weddingData'
import { Divider } from '../ui/Ornament'

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-maroon-dark px-6 py-14 text-center text-cream">
      <p className="font-display text-3xl font-semibold">
        {wedding.bride} <span className="text-gold">&</span> {wedding.groom}
      </p>
      <Divider className="my-3" />
      <p className="text-sm tracking-widest text-gold-soft">{wedding.dateDisplay}</p>
      <p className="mt-6 font-script text-lg italic text-cream/80">{wedding.footer.note}</p>
    </footer>
  )
}
