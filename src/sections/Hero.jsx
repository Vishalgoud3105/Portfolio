import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'

/* ── Three.js particle fields ── */
function ParticleField() {
  const ref = useRef()
  const positions = new Float32Array(2500 * 3)
  for (let i = 0; i < 2500; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.04
    ref.current.rotation.x = clock.elapsedTime * 0.02
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial color="#00f5ff" size={0.025} sizeAttenuation transparent opacity={0.5} />
    </Points>
  )
}

function PurpleField() {
  const ref = useRef()
  const positions = new Float32Array(900 * 3)
  for (let i = 0; i < 900; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = -clock.elapsedTime * 0.03
    ref.current.rotation.z =  clock.elapsedTime * 0.02
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial color="#7c3aed" size={0.018} sizeAttenuation transparent opacity={0.35} />
    </Points>
  )
}

/* ── CSS Hologram Orb (placeholder until ai-brain.glb is ready) ── */
function HologramOrb() {
  return (
    <div className="relative w-[380px] h-[380px] flex items-center justify-center">
      {/* Concentric rings */}
      {[380, 300, 220].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-cyber-cyan/20"
          style={{
            width: size, height: size,
            animation: `spin ${8 + i * 3}s linear infinite ${i % 2 ? 'reverse' : ''}`,
            boxShadow: i === 0 ? '0 0 30px rgba(0,245,255,0.06)' : 'none',
          }}
        />
      ))}
      {/* Pulsing core */}
      <div
        className="w-28 h-28 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.25) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)',
          border: '1px solid rgba(0,245,255,0.4)',
          boxShadow: '0 0 60px rgba(0,245,255,0.3), inset 0 0 40px rgba(0,245,255,0.1)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      />
      {/* Scan line */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
        style={{ animation: 'scan 4s linear infinite' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />
      </div>
      <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2
        font-orbitron text-[0.5rem] tracking-[3px] text-cyber-cyan/40 whitespace-nowrap">
        AI CORE — INITIALIZING
      </div>
    </div>
  )
}

/* ── Counter ── */
function Counter({ target, label }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let cur = 0
    const step = Math.ceil(target / 30)
    const id = setInterval(() => {
      cur = Math.min(cur + step, target)
      setVal(cur)
      if (cur >= target) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [target])
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-end">
        <span className="font-orbitron text-3xl font-bold text-cyber-cyan leading-none">{val}</span>
        <span className="font-orbitron text-xl text-cyber-cyan leading-none">+</span>
      </div>
      <span className="font-orbitron text-[0.6rem] tracking-[2px] text-white/40 mt-1.5">{label}</span>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 1.4 + delay },
})

/* ── Hero ── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-between px-10 lg:px-20 overflow-hidden"
    >
      {/* Three.js particle background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true, antialias: false }}>
          <ParticleField />
          <PurpleField />
        </Canvas>
      </div>

      {/* Gradient fade so text stays readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-cyber-bg via-cyber-bg/70 to-transparent pointer-events-none" />

      {/* ── Hero text content ── */}
      <div className="relative z-10 max-w-2xl">
        <motion.div {...fadeUp(0)} className="section-tag mb-4">
          [ AI &amp; MACHINE LEARNING ENGINEER ]
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          className="glitch font-orbitron font-black text-white leading-[1.05] mb-5"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          data-text="C.VISHAL GOUD"
        >
          C.VISHAL GOUD
        </motion.h1>

        <motion.p {...fadeUp(0.3)} className="text-white/60 text-lg leading-relaxed mb-9">
          Solving real world challenges through AI-powered solutions.
        </motion.p>

        <motion.div {...fadeUp(0.45)} className="flex gap-4 flex-wrap mb-12">
          <a href="#projects" className="cyber-btn-primary">View Projects</a>
          <a href="#contact"  className="cyber-btn-outline">Connect</a>
        </motion.div>

        <motion.div {...fadeUp(0.6)} className="flex items-center gap-8">
          <Counter target={2}  label="YEARS EXP" />
          <div className="w-px h-10 bg-white/10" />
          <Counter target={6}  label="PROJECTS" />
          <div className="w-px h-10 bg-white/10" />
          <Counter target={14} label="CERTIFICATIONS" />
        </motion.div>
      </div>

      {/* ── CSS Hologram Orb (will be replaced with ai-brain.glb) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
        className="relative z-10 hidden lg:flex items-center justify-center flex-shrink-0"
      >
        <HologramOrb />
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyber-cyan animate-stream" />
        <span className="font-orbitron text-[0.5rem] tracking-[3px] text-cyber-cyan">SCROLL</span>
      </div>
    </section>
  )
}
