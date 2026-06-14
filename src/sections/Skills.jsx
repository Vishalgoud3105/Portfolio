import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { skills, tools } from '../data/portfolio'

/* Neural network canvas background */
function NeuralBg() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.5 + Math.random() * 1.5,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < 180) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - d / 180)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,245,255,0.55)'
        ctx.shadowColor = '#00f5ff'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />
}

/* Circular skill meter */
function SkillCircle({ name, pct, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (inView && !animated) setAnimated(true)
  }, [inView])

  const r = 42
  const circ = 2 * Math.PI * r
  const offset = animated ? circ * (1 - pct / 100) : circ

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center group cursor-default"
    >
      <div className="relative w-28 h-28 mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,245,255,0.1)" strokeWidth="6" />
          <circle
            cx="50" cy="50" r={r}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-orbitron text-base font-bold text-cyber-cyan">
          {pct}%
        </span>
      </div>
      <span className="font-orbitron text-[0.58rem] tracking-[1px] text-white/50 text-center group-hover:text-cyber-cyan transition-colors">
        {name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen bg-cyber-bg py-24 overflow-hidden">
      <NeuralBg />

      <div className="relative container mx-auto px-6 lg:px-16 max-w-7xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-tag">05 / SKILLS</span>
          <h2 className="section-title">
            The Neural <span className="text-cyber-cyan">Network</span>
          </h2>
        </motion.div>

        {/* Skill circles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-16">
          {skills.map((s, i) => (
            <SkillCircle key={s.name} name={s.name} pct={s.pct} delay={i * 0.07} />
          ))}
        </div>

        {/* Tool chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {tools.map((tool, i) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ borderColor: '#00f5ff', color: '#00f5ff', boxShadow: '0 0 15px rgba(0,245,255,0.25)' }}
              className="font-orbitron text-[0.58rem] tracking-[2px] px-4 py-2
                         border border-white/10 bg-cyber-card text-white/40
                         rounded cursor-default transition-all duration-200"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
