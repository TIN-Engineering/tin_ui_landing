import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { spotlights } from '../../constants/spotlights'
import type { Spotlight, SpotlightMedia } from '../../constants/spotlights'
import styles from './FeatureSpotlights.module.scss'

const CONTENT_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

const CONTAINER_VARIANTS: Variants = {
  visible: { transition: { staggerChildren: 0.12 } },
}

interface SpotlightMediaFrameProps {
  media: SpotlightMedia
}

function SpotlightMediaFrame({ media }: SpotlightMediaFrameProps) {
  const [imageErrored, setImageErrored] = useState(false)

  if (media.kind === 'code') {
    return (
      <div className={styles.codePanel} aria-label={media.ariaLabel} role="group">
        <pre className={styles.codePre}>
          <code>{media.content}</code>
        </pre>
      </div>
    )
  }

  if (imageErrored) {
    return (
      <div className={styles.imageFrame}>
        <span className={styles.imageFallback}>{media.fallbackLabel}</span>
      </div>
    )
  }

  return (
    <div className={styles.imageFrame}>
      <img
        className={styles.imageEl}
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        onError={() => setImageErrored(true)}
      />
    </div>
  )
}

interface SpotlightBlockProps {
  spotlight: Spotlight
  backgroundVariant: 'base' | 'tonal'
}

function SpotlightBlock({ spotlight, backgroundVariant }: SpotlightBlockProps) {
  const reduce = useReducedMotion()
  const titleId = `${spotlight.id}-title`

  const containerProps = reduce
    ? { initial: false as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: { once: true, amount: 0.2 },
        variants: CONTAINER_VARIANTS,
      }

  const bgClass =
    backgroundVariant === 'tonal' ? styles.sectionTonal : styles.sectionBase
  const layoutClass =
    spotlight.mediaSide === 'left' ? styles.mediaLeft : styles.mediaRight

  return (
    <section
      id={spotlight.id}
      className={`${styles.section} ${bgClass}`}
      aria-labelledby={titleId}
    >
      <motion.div
        className={`${styles.inner} ${layoutClass}`}
        {...containerProps}
      >
        <motion.div className={styles.copy} variants={CONTENT_VARIANTS}>
          <span className={styles.eyebrow}>{spotlight.eyebrow}</span>
          <h3 id={titleId} className={styles.heading}>
            {spotlight.heading}
          </h3>
          <p className={styles.body}>{spotlight.body}</p>
        </motion.div>

        <motion.div className={styles.media} variants={CONTENT_VARIANTS}>
          <SpotlightMediaFrame media={spotlight.media} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export function FeatureSpotlights() {
  return (
    <>
      {spotlights.map((spotlight, index) => (
        <SpotlightBlock
          key={spotlight.id}
          spotlight={spotlight}
          backgroundVariant={index % 2 === 0 ? 'base' : 'tonal'}
        />
      ))}
    </>
  )
}
