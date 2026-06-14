import { motion } from 'framer-motion'
import { ExternalLink, Download } from 'lucide-react'
import { certifications } from '../data/portfolio'
import ModelViewer from '../components/ModelViewer'

const rackUnits = ['PROFILE', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'CERTS']

function CertCard({ cert, index }) {
  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      whileHover={{ y: -3, borderColor: 'rgba(0,245,255,0.4)' }}
      className="flex flex-col bg-cyber-card border border-white/5 rounded-xl p-4
                 hover:shadow-cyan transition-all duration-300 cursor-pointer"
    >
      <span className="font-orbitron text-[0.62rem] font-semibold text-white leading-snug mb-1.5">{cert.name}</span>
      <span className="text-cyber-cyan/60 text-[0.7rem] mb-1">{cert.org}</span>
      <span className="font-orbitron text-[0.5rem] tracking-[1px] text-white/30 mt-auto pt-2">{cert.date}</span>
    </motion.a>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="relative min-h-screen bg-cyber-bg2 py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyber-purple/8 blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyber-cyan/6 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-tag">06 / RESUME</span>
          <h2 className="section-title">
            The Data <span className="text-cyber-cyan">Core</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Left: data-server model + rack list + actions */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Drop data-server.glb into public/assets/3d/ — renders automatically */}
            <div className="h-64 rounded-xl overflow-hidden border border-cyber-purple/20 bg-cyber-card">
              <ModelViewer
                src="/Portfolio/assets/3d/data-server.glb"
                label="DATA SERVER"
                alt="Sci-fi data server 3D model"
                autoRotate
                cameraControls={false}
                exposure="0.9"
                ringColor="#7c3aed"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="bg-cyber-card border border-white/5 rounded-xl p-5 space-y-2.5">
              {rackUnits.map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-cyber-cyan/[0.03] border border-cyber-cyan/10 rounded px-3 py-2.5
                             hover:border-cyber-cyan/30 transition-colors duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-cyber-cyan shadow-cyan animate-blink shrink-0"
                    style={{ animationDelay: `${i * 0.4}s` }} />
                  <span className="font-orbitron text-[0.58rem] tracking-[3px] text-cyber-cyan flex-1">{label}</span>
                  <div className="h-1 flex-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full opacity-60" />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {/* =====================================================
                  RESUME LINK — update this when your resume is ready
                  1. Put resume.pdf in public/assets/ then use:
                     href="/Portfolio/assets/resume.pdf"
                  OR use a Google Drive export link.
                  Replace <button> with <a href="..." download ...>
                  ===================================================== */}
              <button
                disabled
                className="cyber-btn-primary flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                title="Resume coming soon"
              >
                <Download size={14} /> Resume Coming Soon
              </button>
              <a
                href="https://linkedin.com/in/vishalgoud3105"
                target="_blank" rel="noreferrer"
                className="cyber-btn-outline flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} /> LinkedIn Profile
              </a>
            </div>
          </motion.div>

          {/* Right: certifications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-orbitron text-[0.7rem] tracking-[3px] text-cyber-cyan mb-6">
              CERTIFICATIONS &amp; ACHIEVEMENTS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <CertCard key={cert.name} cert={cert} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
