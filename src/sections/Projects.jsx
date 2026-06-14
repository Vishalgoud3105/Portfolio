import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolio'

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group cyber-card overflow-hidden flex flex-col"
    >
      {/* Image */}
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

      {/* Info */}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
