import { useEffect, useState, useRef } from 'react'
import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * LoadingScreen Component
 * Provides a short, elegant introductory transition welcoming visitors
 * into the Living Intelligence Universe.
 * Handles reduced motion preferences and cleans up all timers.
 */
export default function LoadingScreen({ onComplete }) {
  const [isFading, setIsFading] = useState(false)
  const skipTimerRef = useRef(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      onComplete()
      return
    }

    // Smooth intro timeline (~1.6 seconds total)
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1400)

    const finishTimer = setTimeout(() => {
      onComplete()
    }, 1850)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
      if (skipTimerRef.current) {
        clearTimeout(skipTimerRef.current)
      }
    }
  }, [onComplete])

  const handleSkip = () => {
    playCosmicClick()
    setIsFading(true)
    skipTimerRef.current = setTimeout(() => {
      onComplete()
    }, 150)
  }

  return (
    <div
      className={`loading-screen ${isFading ? 'fading-out' : ''}`}
      role="dialog"
      aria-label="Welcome introduction"
      aria-modal="true"
    >
      <div className="loading-content">
        <div className="loading-orb" aria-hidden="true">
          <div className="loading-pulse-ring" />
          <div className="loading-orb-core" />
        </div>

        <div className="loading-status-text">Living Intelligence Universe</div>
        <h1 className="loading-name">DHRUTI</h1>
        <div className="loading-tagline">Always In Progress</div>

        <button
          type="button"
          className="skip-intro-btn"
          onClick={handleSkip}
          aria-label="Skip introductory loading animation"
        >
          Skip Intro
        </button>
      </div>
    </div>
  )
}
