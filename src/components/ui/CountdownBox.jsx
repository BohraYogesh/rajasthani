import { motion } from 'framer-motion'

export default function CountdownBox({ value, label }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center px-1 text-center">
      {/* label ab upar hai */}
      <span className="text-[10px] text-slate-500 md:text-xs">{label}</span>
      <div className="relative h-8 overflow-hidden md:h-10">
        <motion.span
          key={text}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block font-body text-2xl font-medium leading-8 text-maroon md:text-3xl md:leading-10"
        >
          {text}
        </motion.span>
      </div>
    </div>
  )
}