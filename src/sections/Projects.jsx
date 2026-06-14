import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolio'
import ModelViewer from '../components/ModelViewer'

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group cyber-card overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-cyber-bg">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-cyber-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="font-orbitron text-[0.6rem] tracking-[3px] text-cyber-cyan border border-cyber-cyan px-5 py-2.5
                       hover:bg-cyber-cyan/10 transition-colors flex items-center gap-2"
          >
            VIEW PROJECT <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span className="font-orbitron text-[0.55rem] tracking-[3px] text-cyber-cyan mb-2 block">{project.category}</span>
        <h3 className="font-orbitron text-[0.75rem] font-bold text-white leading-snug mb-3">{project.title}</h3>
        <p className="text-white/50 text-xs leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="font-orbitron text-[0.5rem] tracking-[1px] text-cyber-purple
                         border border-cyber-purple/30 bg-cyber-purple/10 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen bg-cyber-bg py-24 overflow-hidden">
      <div className="absolute inset-0 bg-scanlines pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-tag">03 / PROJECTS</span>
          <h2 className="section-title">
            Innovation <span className="text-cyber-cyan">Gallery</span>
          </h2>
        </motion.div>

        {/* Featured robot model — drop ben10-echo-echo.glb into public/assets/3d/ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="relative rounded-2xl overflow-hidden border border-cyber-cyan/15 bg-cyber-card
                          flex flex-col lg:flex-row items-center gap-8 p-8">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan to-transparent" />

            <div className="w-full lg:w-80 h-72 shrink-0 rounded-xl overflow-hidden">
              <ModelViewer
                src="/Portfolio/assets/3d/ben10-echo-echo.glb"
                label="ECHO ECHO"
                alt="Ben 10 Ultimate Echo Echo robot model"
                autoRotate
                cameraControls
                exposure="1.1"
                shadowIntensity="1"
                ringColor="#00f5ff"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="flex-1">
              <span className="section-tag mb-3 inline-block">FEATURED MODEL</span>
              <h3 className="font-orbitron text-xl font-bold text-white mb-3">
                Ben 10: Ultimate Echo Echo
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Interactive 3D model showcase. Use mouse/touch to orbit, zoom, and inspect the model from any angle. Demonstrates real-time 3D rendering capabilities using Google model-viewer.
              </p>
              <div className="flex flex-wrap gap-2">
                {['3D Rendering', 'WebGL', 'model-viewer', 'GLB/glTF'].map(tag => (
                  <span key={tag}
                    className="font-orbitron text-[0.5rem] tracking-[1px] text-cyber-cyan
                               border border-cyber-cyan/30 bg-cyber-cyan/10 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
