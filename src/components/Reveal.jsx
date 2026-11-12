import { motion } from 'framer-motion'
import { easeOut } from '../lib/motion.js'

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.45, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({ children, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', ...props }) {
  return (
    <motion.div
      className={className}
      {...props}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
