import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import ModelViewer from '../components/ModelViewer'

function Terminal() {
  return (
    <div className="bg-[#0a0a18] border border-white/5 rounded-xl overflow-hidden">
      <div className="bg-[#111128] border-b border-white/5 px-4 py-3 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28ca42]" />
        <span className="font-orbitron text-[0.55rem] tracking-[2px] text-white/30 ml-3">SECURE_CHANNEL.sh</span>
      </div>
      <div className="p-6 space-y-4 font-grotesk text-sm">
        {[
          { cmd: 'ping',   val: 'vishalgoud3105@gmail.com', href: 'https://mail.google.com/mail/?view=cm&to=vishalgoud3105@gmail.com' },
          { cmd: 'locate', val: 'Hyderabad, Telangana, India', isLink: false },
          { cmd: 'open',   val: 'github.com/Vishalgoud3105',   href: 'https://github.com/Vishalgoud3105' },
          { cmd: 'open',   val: 'linkedin.com/in/vishalgoud3105', href: 'https://linkedin.com/in/vishalgoud3105' },
        ].map(({ cmd, val, href }, i) => (
          <p key={i} className="leading-none">
            <span className="text-[#28ca42]">$ </span>
            <span className="text-white/40">{cmd} </span>
            {href ? (
              <a href={href} target="_blank" rel="noreferrer" className="text-cyber-cyan hover:underline">{val}</a>
            ) : (
              <span className="text-cyber-cyan">{val}</span>
            )}
          </p>
        ))}
        <p className="leading-none">
          <span className="text-[#28ca42]">$ </span>
          <span className="text-cyber-cyan animate-blink">█</span>
        </p>
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div className="relative group">
      <label className="font-orbitron text-[0.55rem] tracking-[3px] text-cyber-cyan block mb-2">{label}</label>
      {children}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-cyber-cyan group-focus-within:w-full transition-all duration-400" />
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" className="relative min-h-screen bg-cyber-bg py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-tag">07 / CONTACT</span>
          <h2 className="section-title">
            Communication <span className="text-cyber-cyan">Hub</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left: terminal + communication console model */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <Terminal />

            {/* Drop comm-console.glb into public/assets/3d/ — renders automatically */}
            <div className="h-52 rounded-xl overflow-hidden border border-cyber-cyan/10 bg-cyber-card">
              <ModelViewer
                src="/Portfolio/assets/3d/comm-console.glb"
                label="COMM CONSOLE"
                alt="Futuristic communication console 3D model"
                autoRotate
                cameraControls={false}
                exposure="1.0"
                ringColor="#00f5ff"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <FormField label="NAME">
                    <input
                      type="text" name="name" required placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5
                                 outline-none placeholder:text-white/25 focus:border-cyber-cyan/0 transition-colors"
                    />
                  </FormField>

                  <FormField label="EMAIL">
                    <input
                      type="email" name="email" required placeholder="Enter your email"
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5
                                 outline-none placeholder:text-white/25 transition-colors"
                    />
                  </FormField>

                  <FormField label="MESSAGE">
                    <textarea
                      name="message" required rows={5} placeholder="Your message..."
                      className="w-full bg-transparent border-b border-white/10 text-white text-sm py-2.5
                                 outline-none placeholder:text-white/25 resize-none transition-colors"
                    />
                  </FormField>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cyber-btn-primary flex items-center justify-center w-full gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-t border-cyber-bg rounded-full animate-spin" />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> TRANSMIT MESSAGE
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center h-full py-20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full border-2 border-cyber-cyan shadow-cyan-lg
                               flex items-center justify-center text-cyber-cyan text-3xl mb-6"
                  >
                    ✓
                  </motion.div>
                  <p className="font-orbitron text-sm tracking-[2px] text-cyber-cyan">MESSAGE TRANSMITTED</p>
                  <p className="text-white/40 text-xs mt-2">I'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
