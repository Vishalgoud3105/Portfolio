import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import ModelViewer from '../components/ModelViewer'

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
  const sectionRef = useRef(null)

  // Scroll progress for the AI brain "awakening" effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // As user scrolls down through hero: model scales up & glows stronger
  const modelScale   = useTransform(scrollYProgress, [0, 0.6], [0.85, 1.15])
  const modelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.7], [0.5, 1, 0.3])

  return (
    <section
      id="home"
      ref={sectionRef}
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

      {/* ── AI Brain 3D model — awakens as you scroll ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
        style={{ scale: modelScale, opacity: modelOpacity }}
        className="relative z-10 hidden lg:block w-[420px] h-[420px] flex-shrink-0"
      >
        {/* Drop ai-brain.glb into public/assets/3d/ — renders automatically */}
        <ModelViewer
          src="/Portfolio/assets/3d/ai-brain.glb"
          label="AI BRAIN"
          alt="Holographic AI brain that awakens on scroll"
          autoRotate
          cameraControls={false}
          exposure="1.2"
          ringColor="#00f5ff"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Neon ring frame */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: '0 0 80px rgba(0,245,255,0.15), inset 0 0 60px rgba(0,245,255,0.05)' }} />

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2
          font-orbitron text-[0.5rem] tracking-[3px] text-cyber-cyan/50 whitespace-nowrap">
          SCROLL TO AWAKEN
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyber-cyan animate-stream" />
        <span className="font-orbitron text-[0.5rem] tracking-[3px] text-cyber-cyan">SCROLL</span>
      </div>
    </section>
  )
}
