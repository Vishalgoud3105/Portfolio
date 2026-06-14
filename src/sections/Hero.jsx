import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
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

/*
  4 concentric rings (outside → inside):
    Ring 0: 460px  ← outermost
    Ring 1: 340px  ← profile pic sits inside THIS ring (2nd from outside / 3rd from inside)
    Ring 2: 220px  ← draws around the pic's outer edge
    Ring 3: 100px  ← innermost core ring

  Fix: each ring uses TWO divs:
    outer motion.div  → Framer Motion scale + opacity (scroll driven)
    inner plain div   → CSS rotate animation
  This avoids transform conflicts between Framer Motion and CSS keyframes.
*/
const RINGS = [
  { size: 460, color: 'rgba(0,245,255,0.20)',   width: 0.5, dur: 18, rev: false },
  { size: 340, color: 'rgba(124,58,237,0.25)',  width: 0.5, dur: 13, rev: true  },
  { size: 220, color: 'rgba(0,245,255,0.28)',   width: 0.5, dur: 9,  rev: false },
  { size: 100, color: 'rgba(124,58,237,0.30)',  width: 0.5, dur: 6,  rev: true  },
]

function HologramOrb({ ringScales, ringOpacities, picY, picOpacity, picScale }) {
  return (
    <div style={{ position: 'relative', width: 500, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Rings — outer motion.div handles scroll (scale/opacity), inner div handles rotation */}
      {RINGS.map(({ size, color, width, dur, rev }, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            scale: ringScales[i],
            opacity: ringOpacities[i],
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `${width}px solid ${color}`,
            boxShadow: `0 0 14px ${color}, 0 0 28px ${color}`,
            animation: `heroRing ${dur}s linear infinite ${rev ? 'reverse' : ''}`,
          }} />
        </motion.div>
      ))}

      {/* Ambient glow behind pic */}
      <div style={{
        position: 'absolute',
        width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, rgba(124,58,237,0.08) 55%, transparent 75%)',
        pointerEvents: 'none',
      }} />

      {/* Profile picture — centered in the 500px container, inside Ring 1 (340px) */}
      <motion.div
        style={{ y: picY, opacity: picOpacity, scale: picScale, position: 'absolute', zIndex: 10 }}
      >
        <div style={{ position: 'relative' }}>
          <img
            src="/Portfolio/assets/img/vishal portfolio icon.png"
            alt="C.Vishal Goud"
            style={{
              width: 260, height: 260,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2.5px solid rgba(0,245,255,0.85)',
              boxShadow: '0 0 30px rgba(0,245,255,0.45), 0 0 70px rgba(0,245,255,0.15)',
              display: 'block',
            }}
          />
          {/* Tight spinning accent ring on the pic */}
          <div style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '1px solid rgba(0,245,255,0.35)',
            animation: 'heroRing 5s linear infinite',
          }} />
        </div>
      </motion.div>

      {/* Label — below Ring 1 (340px, radius 170px from center of 500px container) */}
      {/* top: 50% + 170px + 16px gap = just below Ring 1's bottom edge             */}
      <motion.div
        style={{
          position: 'absolute',
          top: 'calc(50% + 186px)',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: picOpacity,
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '4px',
          color: 'rgba(0,245,255,0.95)',
          whiteSpace: 'nowrap',
          textShadow: '0 0 10px rgba(0,245,255,0.9), 0 0 24px rgba(0,245,255,0.5)',
        }}
      >
        AIML ENGINEER
      </motion.div>

      <style>{`
        @keyframes heroRing { to { transform: rotate(360deg); } }
      `}</style>
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
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Spring wraps raw scroll — lags behind on fast scroll so animation always plays through
  const sp = useSpring(scrollYProgress, { stiffness: 55, damping: 18, restDelta: 0.0005 })

  // Each ring explodes outward at different speeds
  const ring0Scale   = useTransform(sp, [0, 0.55], [1, 5.5])
  const ring0Opacity = useTransform(sp, [0, 0.08, 0.42], [0.55, 0.80, 0])

  const ring1Scale   = useTransform(sp, [0, 0.50], [1, 4.5])
  const ring1Opacity = useTransform(sp, [0, 0.08, 0.36], [0.70, 0.90, 0])

  const ring2Scale   = useTransform(sp, [0, 0.45], [1, 3.8])
  const ring2Opacity = useTransform(sp, [0, 0.08, 0.30], [0.75, 0.95, 0])

  const ring3Scale   = useTransform(sp, [0, 0.40], [1, 3.0])
  const ring3Opacity = useTransform(sp, [0, 0.08, 0.25], [0.80, 1.00, 0])

  // Profile pic drifts down and fades
  const picY       = useTransform(sp, [0, 0.55], [0, 110])
  const picOpacity = useTransform(sp, [0, 0.22, 0.48], [1, 1, 0])
  const picScale   = useTransform(sp, [0, 0.50], [1, 0.82])

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

      {/* Gradient so text stays readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-cyber-bg via-cyber-bg/70 to-transparent pointer-events-none" />

      {/* ── Hero text ── */}
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

      {/* ── Hologram Orb ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
        className="relative z-10 hidden lg:flex items-center justify-center flex-shrink-0"
      >
        <HologramOrb
          ringScales={[ring0Scale, ring1Scale, ring2Scale, ring3Scale]}
          ringOpacities={[ring0Opacity, ring1Opacity, ring2Opacity, ring3Opacity]}
          picY={picY}
          picOpacity={picOpacity}
          picScale={picScale}
        />
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyber-cyan animate-stream" />
        <span className="font-orbitron text-[0.5rem] tracking-[3px] text-cyber-cyan">SCROLL</span>
      </div>
    </section>
  )
}
