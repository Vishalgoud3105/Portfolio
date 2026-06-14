import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  { icon: '⚙', title: 'Machine Learning',  desc: 'Scalable ML models solving real-world problems from structured data.' },
  { icon: '🧠', title: 'Deep Learning',    desc: 'CNNs and neural networks for complex visual and sequential tasks.' },
  { icon: '👁', title: 'Computer Vision',  desc: 'Real-time detection, tracking, and imagery segmentation systems.' },
  { icon: '✦', title: 'Generative AI',     desc: 'Prompt engineering and generative model integration workflows.' },
]

function RevealBlock({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 40 : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  }
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative min-h-screen bg-cyber-bg2 py-24 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-cyber bg-[size:50px_50px] opacity-100 pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-16 max-w-7xl">
        <RevealBlock>
          <div className="mb-16">
            <span className="section-tag">02 / ABOUT</span>
            <h2 className="section-title">
              The Creator's <span className="text-cyber-cyan">Genesis</span>
            </h2>
          </div>
        </RevealBlock>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left: avatar + info */}
          <RevealBlock direction="left" delay={0.1}>
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative w-56 h-56 mb-8">
                <img
                  src="/Portfolio/assets/img/vishal portfolio icon.png"
                  alt="C.Vishal Goud"
                  className="w-full h-full object-cover rounded-full border-2 border-cyber-cyan"
                />
                <div className="absolute inset-[-8px] rounded-full border border-cyber-cyan/30 animate-spin-slow" />
                <div className="absolute inset-0 rounded-full shadow-cyan pointer-events-none" />
              </div>

              {/* Info panel */}
              <div className="w-full bg-cyber-card border border-white/5 rounded-xl p-5 space-y-3">
                {[
                  { label: 'LOCATION', val: 'Hyderabad, India' },
                  { label: 'STATUS',   val: null, isStatus: true },
                  { label: 'EMAIL',    val: 'vishalgoud3105@gmail.com', isEmail: true },
                ].map(({ label, val, isStatus, isEmail }) => (
                  <div key={label} className="flex items-center gap-4 py-2.5 border-b border-white/5 last:border-0">
                    <span className="font-orbitron text-[0.55rem] tracking-[2px] text-cyber-cyan w-20 shrink-0">{label}</span>
                    {isStatus ? (
                      <span className="flex items-center gap-2 text-cyber-green text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                        AVAILABLE
                      </span>
                    ) : isEmail ? (
                      <a
                        href="https://mail.google.com/mail/?view=cm&to=vishalgoud3105@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/60 text-xs hover:text-cyber-cyan transition-colors break-all"
                      >{val}</a>
                    ) : (
                      <span className="text-white/60 text-sm">{val}</span>
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <a href="https://github.com/Vishalgoud3105" target="_blank" rel="noreferrer"
                    className="font-orbitron text-[0.55rem] tracking-[1px] text-cyber-cyan border border-cyber-cyan/40 px-3 py-1.5 rounded hover:bg-cyber-cyan/10 transition-colors">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/vishalgoud3105" target="_blank" rel="noreferrer"
                    className="font-orbitron text-[0.55rem] tracking-[1px] text-cyber-cyan border border-cyber-cyan/40 px-3 py-1.5 rounded hover:bg-cyber-cyan/10 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Right: bio + services */}
          <RevealBlock direction="right" delay={0.2}>
            {/* Holographic bio card */}
            <div className="relative bg-cyber-card border border-white/5 rounded-xl p-7 mb-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cyber-purple via-cyber-cyan to-transparent" />
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-purple/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-magenta/60" />
                <span className="font-orbitron text-[0.55rem] tracking-[2px] text-cyber-cyan/70 ml-2">PROFILE_DATA.json</span>
              </div>
              <p className="text-white/60 text-[0.93rem] leading-[1.85] mb-4">
                I am deeply passionate about Artificial Intelligence and Machine Learning, with a strong interest in building intelligent systems that solve real-world problems. The ability to empower machines to learn, recognize patterns, and make predictions fascinates me.
              </p>
              <p className="text-white/60 text-[0.93rem] leading-[1.85]">
                With hands-on experience in computer vision, deep learning, and real-time applications, I create practical AI solutions—from fitness assessment tools to production-grade object detection systems deployed on AWS at 15–20 FPS.
              </p>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-2 gap-4">
              {services.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'rgba(0,245,255,0.4)' }}
                  className="bg-cyber-card border border-white/5 rounded-xl p-5 cursor-default transition-shadow hover:shadow-cyan"
                >
                  <div className="text-2xl mb-3">{icon}</div>
                  <h4 className="font-orbitron text-[0.65rem] tracking-[1px] text-white mb-2">{title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  )
}
