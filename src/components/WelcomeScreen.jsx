import { useState } from 'react'
import CosmicExplorer from './CosmicExplorer'
import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * WelcomeScreen Component
 * The central welcoming interface for "DHRUTI — The Living Intelligence Universe".
 * Focuses on identity, personal philosophy, and a clean, direct entrance into the universe.
 * Features:
 * - DHRUTI identity and B.Tech CSE Student designation
 * - WAY ON PROGRESS tagline
 * - Single direct primary entrance button: "✦ Enter My Universe"
 * - Audio controls & subtle curiosity easter egg
 * - Cosmic Explorer session journey tracker
 */
export default function WelcomeScreen({
  onExploreUniverse,
  audioControls,
  onDiscoverBeacon,
  onOpenSection,
}) {
  const [showCuriositySurprise, setShowCuriositySurprise] = useState(false)

  const handleCuriosityClick = () => {
    playCosmicClick()
    setShowCuriositySurprise((prev) => !prev)
  }

  return (
    <main className="welcome-container">
      {/* Top Portal Header */}
      <header className="portal-header">
        <button
          type="button"
          className="brand-identifier brand-interactive"
          onClick={onDiscoverBeacon}
          title="Celestial Core Beacon — Click to connect"
          aria-label="Discover Celestial Core Beacon"
        >
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-title">Dhruti // Universe</span>
          <span className="brand-beacon-spark" aria-hidden="true">✦</span>
        </button>

        <div className="header-controls">
          {audioControls}
        </div>
      </header>

      {/* Main Hero & Welcome Area */}
      <section className="portal-hero" aria-labelledby="hero-heading">
        {/* Education Tag */}
        <div className="education-pill">
          <span className="education-spark" aria-hidden="true" />
          <span className="education-text">B.Tech CSE Student</span>
        </div>

        {/* Primary Name */}
        <h1 id="hero-heading" className="hero-name">
          DHRUTI
        </h1>

        {/* Tagline & Subtle Curiosity Spark Easter Egg */}
        <div className="hero-tagline-wrap">
          <p className="hero-tagline">
            WAY ON PROGRESS
          </p>
          <button
            type="button"
            className={`curiosity-spark-btn ${showCuriositySurprise ? 'is-active' : ''}`}
            onClick={handleCuriosityClick}
            title="Curiosity spark — A subtle universe detail"
            aria-label="Activate subtle cosmic curiosity spark"
          >
            ✦
          </button>
        </div>

        {/* Easter Egg C: Curiosity Surprise Inline Message */}
        {showCuriositySurprise && (
          <div className="curiosity-surprise-banner" role="status" aria-live="polite">
            <span className="curiosity-surprise-spark" aria-hidden="true">🌌</span>
            <span className="curiosity-surprise-text">
              You found a little universe within the universe. 🌌
            </span>
            <button
              type="button"
              className="curiosity-surprise-dismiss"
              onClick={() => setShowCuriositySurprise(false)}
              aria-label="Dismiss curiosity message"
            >
              ✕
            </button>
          </div>
        )}

        {/* Authentic Philosophy & Continuous Learning Introduction */}
        <p className="hero-bio">
          Exploring the frontiers of computer science, intelligent systems, and creative problem solving.
          Driven by relentless curiosity and the discipline of self-improvement—learning, experimenting,
          and evolving step by step.
        </p>

        {/* Action Controls: Direct Single "✦ Enter My Universe" Button */}
        <div className="hero-actions">
          <button
            type="button"
            className="btn-primary-explore enter-universe-btn"
            onClick={onExploreUniverse}
            aria-label="Enter the 3D Celestial Universe"
          >
            <span className="btn-spark" aria-hidden="true">✦</span>
            <span>Enter My Universe</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* Footer / Telemetry Bar */}
      <footer className="portal-footer">
        {/* Interactive Cosmic Explorer: Your Journey */}
        <CosmicExplorer onOpenSection={onOpenSection} />

        <div className="footer-system-status">
          DHRUTI // The Living Intelligence Universe
        </div>
      </footer>
    </main>
  )
}
