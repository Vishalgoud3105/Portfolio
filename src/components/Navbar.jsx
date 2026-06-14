import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Resume',     href: '#resume' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) setActive(sec.id)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center justify-end px-10
        transition-all duration-300 border-b border-white/5
        ${scrolled ? 'bg-cyber-bg/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,245,255,0.06)]' : 'bg-transparent'}`}
    >
      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-1">
        {links.map(({ label, href }) => {
          const id = href.slice(1)
          const isActive = active === id
          return (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className={`font-orbitron text-[0.6rem] tracking-[2px] px-3.5 py-2 rounded transition-all duration-200
                  ${isActive ? 'text-cyber-cyan' : 'text-white/50 hover:text-cyber-cyan'}`}
              >
                {label.toUpperCase()}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="h-px bg-cyber-cyan mt-0.5 mx-auto"
                    style={{ width: '60%' }}
                  />
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-cyber-cyan p-2"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[70px] left-0 right-0 bg-cyber-bg/97 backdrop-blur-xl
                       border-b border-cyber-cyan/10 flex flex-col py-4 md:hidden"
          >
            {links.map(({ label, href }) => (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  className="w-full text-left font-orbitron text-[0.65rem] tracking-[2px]
                             px-10 py-3 text-white/60 hover:text-cyber-cyan transition-colors"
                >
                  {label.toUpperCase()}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
