import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader loaded={loaded} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
