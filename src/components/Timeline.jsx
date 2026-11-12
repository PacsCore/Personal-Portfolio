import { AnimatePresence, motion, useReducedMotionConfig } from 'framer-motion'
import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import content from '../data/content.js'
import { easeOut } from '../lib/motion.js'
import { StaggerGroup, StaggerItem } from './Reveal.jsx'

function Timeline() {
  const [openItem, setOpenItem] = useState(null)
  // MotionConfig only skips transform animations; grid-row size changes need an explicit check.
  const reduceMotion = useReducedMotionConfig()

  return (
    <StaggerGroup className="timeline">
      {content.timeline.map((item, index) => {
        const isOpen = openItem === index
        const descriptionId = `timeline-description-${index}`

        return (
          <StaggerItem className="timeline-entry" key={`${item.year}-${index}`}>
            <span className={`timeline-dot tone-${item.tone}`} aria-hidden="true" />
            <div className="timeline-entry-content">
              <button
                className="timeline-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={descriptionId}
                onClick={() => setOpenItem(isOpen ? null : index)}
              >
                <span className="timeline-heading">
                  <span className="timeline-year">{item.year}</span>
                  <span className="timeline-title">{item.title}</span>
                </span>
                <motion.span
                  className="timeline-chevron"
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="timeline-description-wrap"
                    id={descriptionId}
                    initial={{ gridTemplateRows: '0fr', opacity: 0 }}
                    animate={{ gridTemplateRows: '1fr', opacity: 1 }}
                    exit={{ gridTemplateRows: '0fr', opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
                  >
                    <div className="timeline-description-inner">
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}

export default Timeline
