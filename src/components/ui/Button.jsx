import { motion } from 'framer-motion'

export default function Button({ children, variant = 'solid', href, className = '', icon, ...rest }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-colors duration-300 cursor-pointer'
  const styles = {
    solid: 'bg-maroon text-cream hover:bg-maroon-dark shadow-[0_10px_24px_-10px_rgba(74,20,32,.7)]',
    outline: 'border border-maroon/60 text-maroon hover:bg-maroon hover:text-cream',
  }
  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noreferrer' : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </Comp>
  )
}
