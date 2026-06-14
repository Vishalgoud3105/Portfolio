import { motion } from 'framer-motion'
import { experience, education } from '../data/portfolio'

function TimelineItem({ item, index, isEducation = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isEducation ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative pl-8 mb-8 last:mb-0"
    >
      {/* Dot */}
      <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-cyber-cyan shadow-cyan border-2 border-cyber-bg2" />

      <div className="bg-cyber-card border border-white/5 rounded-xl p-5 transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-cyan">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-orbitron text-[0.58rem] tracking-[2px] text-cyber-cyan">
            {item.period}
          </span>
          {item.badge && (
            <span className="font-orbitron text-[0.5rem] tracking-[1px] text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/25 px-2 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </div>

        <h4 className="font-orbitron text-[0.72rem] font-bold text-white mb-1 leading-snug">
          {item.role || item.degree}
        </h4>
        <span className="text-cyber-cyan/60 text-xs block mb-3">
          {item.company || item.institution}
        </span>

        {item.note && (
          <p className="text-white/40 text-xs mb-3">{item.note}</p>
        )}

        {item.points && (
          <ul className="space-y-1.5 mb-3">
            {item.points.map((pt, i) => (
              <li key={i} className="text-white/50 text-xs leading-relaxed flex gap-2">
                <span className="text-cyber-cyan mt-0.5 shrink-0">›</span>
                {pt}
              </li>
            ))}
          </ul>
        )}

        {item.tags && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="font-orbitron text-[0.5rem] tracking-[1px] text-cyber-blue
                           border border-cyber-blue/30 bg-cyber-blue/10 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function TimelineCol({ title, items, isEducation = false }) {
  return (
    <div>
      <h3 className="font-orbitron text-sm tracking-[2px] text-white mb-8 pb-3 border-b border-white/5">
        <span className="text-cyber-cyan">▸ </span>{title}
      </h3>
      <div className="relative timeline-col pl-4">
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} isEducation={isEducation} />
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen bg-cyber-bg2 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-corridor pointer-events-none" />

      <div className="relative container mx-auto px-6 lg:px-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-tag">04 / EXPERIENCE</span>
          <h2 className="section-title">
            Timeline <span className="text-cyber-cyan">Corridor</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <TimelineCol title="Work Experience" items={experience} />
          <TimelineCol title="Education" items={education} isEducation />
        </div>
      </div>
    </section>
  )
}
