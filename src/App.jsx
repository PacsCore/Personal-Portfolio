import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useState } from 'react'
import './App.css'

  function App() {
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>Enrique Achacoso</h1>
            <p>Full-Stack Software Engineer in the making</p>
          </motion.div> 
        </section>
        <section id ="about" ref={aboutRef}>
          <motion.div style=
          {{ opacity: aboutOpacity, y: aboutY }}>
            <h2>About Me</h2>
            <p>I'm an 17-year-old completing my Matura (Austria high school diploma), moving from "vibe coding" 
               to actually understanding what I build. Currently learning full-stack 
               development one project at a time. Also showing interest in AI and Accounting. I have a passion for building things and learning new technologies.
              </p>
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