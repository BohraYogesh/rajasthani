import { motion } from 'framer-motion'

const variants = {
  up:    { hidden: { opacity: 0, y: 48 },  show: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -56 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 56 },  show: { opacity: 1, x: 0 } },
  zoom:  { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1 } },
  fade:  { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export default function Reveal({ children, variant = 'up', delay = 0, duration = 1, className = '', as = 'div', ...rest }) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      variants={variants[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  )
}
