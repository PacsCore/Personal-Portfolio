import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useState } from 'react'
import './App.css'

function TiltCard({ children, className }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-50, 50], [15, -15])
  const rotateY = useTransform(x, [-50, 50], [-15, 15])

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 400 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

const timelineData = [
  { year: "2020",
    title: "First Steps in Programming",
    description: "Explored basic programming concepts in Scratch at school."
   },

  { year: "2023",
    title: "Rise of AI",
    description: "Started exploring AI and its applications, sparking a deeper interest in technology."
   },

   { year: "2025",
    title: "Expanding Knowledge",
    description: "Continued learning and building projects in web development with AI."
   },

   { year: "2026",
    title: "Full Stack focus",
    description: "Wrote my first lines of code in JavaScript, React, Node.js. Continueing to build projects and learn more about full-stack development."
   }
  ]

  function App() {
    const [activeTimelineItem, setActiveTimelineItem] = useState(null)
    const [theme, setTheme] = useState('dark')

    const aboutRef = useRef(null)
    const { scrollYProgress: aboutProgress } = useScroll({
      target: aboutRef,
      offset: ["start end", "end start"]
    })

    const aboutOpacity = useTransform(aboutProgress, [0, 0.5, 1], [0, 1, 0])
    const aboutY = useTransform(aboutProgress, [0, 0.5, 1], [100, 0, -100])

    const projectsRef = useRef(null)
    const { scrollYProgress: projectsProgress } = useScroll({
      target: projectsRef,
      offset: ["start end", "end start"]
    })

    const projectsOpacity = useTransform(projectsProgress, [0, 0.5, 1], [0, 1, 0])
    const projectsY = useTransform(projectsProgress, [0, 0.5, 1], [100, 0, -100])

    const contactRef = useRef(null)
    const { scrollYProgress: contactProgress } = useScroll({
      target: contactRef,
      offset: ["start end", "end start"]
    })

    const contactOpacity = useTransform(contactProgress, [0, 0.5, 1], [0, 1, 0])
    const contactY = useTransform(contactProgress, [0, 0.5, 1], [100, 0, -100])

    return (
      <div className="app" data-theme={theme}>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <section id ="hero">
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            <TiltCard className="avatar-tilt">
              <img src="https://github.com/PacsCore.png" alt="Enrique Achacoso" className="avatar-img" />
            </TiltCard>

            <h1>Enrique Achacoso</h1>
            <p>Full-Stack Software Engineer in the making</p>

            <div className="social-icons">
              <TiltCard className="social-tilt">
                <a href="https://github.com/PacsCore" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" className="icon-img" />
                </a>
              </TiltCard>
              <TiltCard className="social-tilt">
                <a href="https://x.com/pacscore?s=11" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg" alt="X" className="icon-img" />
                </a>
              </TiltCard>
            </div>
          </motion.div> 
        </section>
        <section id="about" ref={aboutRef}>
  <motion.div style={{ opacity: aboutOpacity, y: aboutY }}>
    <h2>About Me</h2>
    <p>I'm a 17-year-old completing my Matura (Austrian high school diploma), moving from "vibe coding" 
       to actually understanding what I build.</p>

    <div className="timeline">
      {timelineData.map((item, index) => (
        <div 
          key={index} 
          className={`timeline-item ${activeTimelineItem === index ? 'active' : ''}`}
          onClick={() => setActiveTimelineItem(activeTimelineItem === index ? null : index)}
        >
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <span className="timeline-year">{item.year}</span>
            <h3>{item.title}</h3>
            {activeTimelineItem === index && (
              <motion.p 
                className="timeline-description"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {item.description}
              </motion.p>
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</section>
        <section id ="projects" ref={projectsRef}>
          <motion.div style=
          {{ opacity: projectsOpacity, y: projectsY }}>
            <h2>Projects</h2>
            <p>Here are some of the projects I've worked on:</p>
            <div className="projects-grid">
              <div className="project-card">
                <h3>Homework Tracker</h3>
                <p>A class-facing web application for shared homework entries, built with Firebase and Cloudinary</p>
                <a href="https://github.com/PacsCore/homework-tracker" target="_blank">View on GitHub →
                </a>
              </div>

              <div className="project-card">
                <h3>Daily Idea Mailer</h3>
                <p>A simple email client for sending daily coding idea updates, built with Javascript, Gemini and dev.to</p>
                <a href="https://github.com/PacsCore/daily-idea-mailer" target="_blank">View on GitHub →
                </a>
              </div>

              <div className="project-card">
                <h3>Quick PDF Converter</h3>
                <p>A simple tool for converting documents to PDF format, built with React and Node.js</p>
                <a href="https://github.com/PacsCore/QuickFileConverter" target="_blank">View on GitHub →
                </a>
              </div>
            </div>
          </motion.div>
        </section>
        <section id ="contact" ref={contactRef}>
          <motion.div style=
          {{ opacity: contactOpacity, y: contactY }}>
            <h2>Contact</h2>
            <p>Feel free to reach out to me!</p>
          </motion.div>
        </section>
        <section id ="footer">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p>&copy; 2026 Enrique Achacoso. All rights reserved.</p>
          </motion.div>
        </section>
      </div>
    )
  }

  export default App