import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ loaded }) {
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-cyber-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-t-2 border-r-2 border-cyber-cyan border-b-2 border-b-cyber-purple animate-spin shadow-cyan" />
            <p className="font-orbitron text-xs tracking-[4px] text-cyber-cyan">
              SYSTEM INITIALIZING<span className="animate-blink">_</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
