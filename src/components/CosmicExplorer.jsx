import { useState, useEffect, useRef, useCallback } from 'react'
import {
  PUBLIC_SECTORS,
  LOCKED_SECTOR,
  SECRET_BEACON_SECTOR,
  getCosmicJourneyProgress,
  getRandomCosmicMessage,
} from '../services/cosmicJourneyService'
import useModalFocus from '../hooks/useModalFocus'
import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * CosmicExplorer Component
 * “COSMIC EXPLORER — YOUR JOURNEY”
 *
 * An interactive, session-only portfolio exploration tracker matching
 * the cosmic aesthetic of "DHRUTI — The Living Intelligence Universe".
 *
 * Features:
 * - Tracks distinct sectors explored in the current browser session.
 * - Displays Planets Explored, Sections Discovered, and Progress indicator.
 * - Unlocks the animated "Universe Explorer" badge once all public sectors are explored.
 * - Keeps Projects strictly locked without revealing confidential details.
 * - Features rotating inspirational cosmic messages.
 * - 100% session-only via sessionStorage (with in-memory fallback).
 * - Zero Firebase, external databases, tracking cookies, or analytics services.
 * - Accessible with keyboard focus trap, Esc dismissal, and reduced-motion support.
 */
export default function CosmicExplorer({ onOpenSection, variant = 'chip' }) {
  const [journeyStats, setJourneyStats] = useState(() => getCosmicJourneyProgress())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cosmicMessage, setCosmicMessage] = useState(() => getRandomCosmicMessage())

  const closeButtonRef = useRef(null)

  // Reactive listener for when user explores a sector anywhere in the app
  useEffect(() => {
    const handleJourneyUpdate = () => {
      setJourneyStats(getCosmicJourneyProgress())
    }

    window.addEventListener('cosmic-journey-updated', handleJourneyUpdate)
    return () => {
      window.removeEventListener('cosmic-journey-updated', handleJourneyUpdate)
    }
  }, [])

  const handleOpenModal = useCallback(() => {
    playCosmicClick()
    setJourneyStats(getCosmicJourneyProgress())
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    playCosmicClick()
    setIsModalOpen(false)
  }, [])

  const handleCycleMessage = useCallback(() => {
    playCosmicClick()
    setCosmicMessage((prev) => getRandomCosmicMessage(prev.id))
  }, [])

  const handleSectorClick = useCallback(
    (sector) => {
      playCosmicClick()
      setIsModalOpen(false)
      if (onOpenSection) {
        onOpenSection(sector)
      }
    },
    [onOpenSection]
  )

  const modalDialogRef = useModalFocus(isModalOpen, handleCloseModal, closeButtonRef)

  const {
    exploredSet,
    publicExploredCount,
    totalPublicCount,
    percent,
    isUniverseExplorerUnlocked,
    hasExploredProjects,
    hasExploredBeacon,
    totalSectionsDiscovered,
  } = journeyStats

  return (
    <>
      {variant === 'pill' ? (
        /* Top Navigation Bar Pill Variant */
        <button
          type="button"
          className={`quick-nav-pill journey-pill-btn ${
            isUniverseExplorerUnlocked ? 'is-universe-explorer' : ''
          }`}
          onClick={handleOpenModal}
          aria-label={`Open Cosmic Explorer: Your Journey (${publicExploredCount} of ${totalPublicCount} planets explored)`}
          title="Cosmic Explorer — Track your exploration journey during this session"
        >
          <span className="journey-pill-spark" aria-hidden="true">
            {isUniverseExplorerUnlocked ? '★' : '🪐'}
          </span>
          <span className="journey-pill-label">
            {isUniverseExplorerUnlocked ? 'Explorer ★' : `Journey: ${publicExploredCount}/${totalPublicCount}`}
          </span>
        </button>
      ) : (
        /* Footer Trigger Chip Button */
        <button
          type="button"
          className={`telemetry-chip journey-trigger-chip ${
            isUniverseExplorerUnlocked ? 'is-universe-explorer' : ''
          }`}
          onClick={handleOpenModal}
          aria-label={`Open Cosmic Explorer: Your Journey (${publicExploredCount} of ${totalPublicCount} planets explored)`}
          title="Cosmic Explorer — Track your exploration journey during this session"
        >
          <span
            className={`journey-spark-icon ${isUniverseExplorerUnlocked ? 'icon-unlocked' : ''}`}
            aria-hidden="true"
          >
            {isUniverseExplorerUnlocked ? '★' : '✦'}
          </span>

          <span className="journey-chip-title">Cosmic Explorer</span>

          <span className="journey-chip-badge">
            {isUniverseExplorerUnlocked ? (
              <span className="badge-unlocked-text">Universe Explorer Unlocked</span>
            ) : (
              <span className="badge-progress-text">
                Your Session: <strong>{publicExploredCount}/{totalPublicCount}</strong> Discovered
              </span>
            )}
          </span>

          {/* Mini progress meter */}
          <span className="journey-mini-meter" aria-hidden="true">
            <span
              className="journey-mini-meter-fill"
              style={{ width: `${percent}%` }}
            />
          </span>
        </button>
      )}

      {/* Holographic Journey Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop journey-modal-backdrop"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="journey-modal-title"
        >
          <div
            ref={modalDialogRef}
            className="modal-dialog journey-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <div className="journey-header-title-group">
                <div className="journey-header-badge-row">
                  <span className="journey-session-tag">Your Session</span>
                  {isUniverseExplorerUnlocked && (
                    <span className="journey-mastery-tag">★ Explorer Mastery</span>
                  )}
                </div>
                <h3 id="journey-modal-title" className="modal-title">
                  <span className="journey-title-spark" aria-hidden="true">✦</span>
                  <span>COSMIC EXPLORER — YOUR JOURNEY</span>
                </h3>
                <p className="modal-subtitle">
                  Personal Exploration Log • Real-time Session Milestones
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Close journey panel"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="journey-modal-body">
              {/* Progress & Stats Cards Grid */}
              <div className="journey-stats-grid">
                {/* Stat 1: Planets Explored */}
                <div className="journey-stat-card">
                  <span className="stat-card-label">Planets Explored</span>
                  <div className="stat-card-value-wrap">
                    <span className="stat-card-num">{publicExploredCount}</span>
                    <span className="stat-card-denom">/ {totalPublicCount}</span>
                  </div>
                  <span className="stat-card-sub">
                    {publicExploredCount === totalPublicCount
                      ? 'All active sectors visited'
                      : `${totalPublicCount - publicExploredCount} remaining in session`}
                  </span>
                </div>

                {/* Stat 2: Sections Discovered */}
                <div className="journey-stat-card">
                  <span className="stat-card-label">Sections Discovered</span>
                  <div className="stat-card-value-wrap">
                    <span className="stat-card-num">{totalSectionsDiscovered}</span>
                    <span className="stat-card-denom">Total</span>
                  </div>
                  <span className="stat-card-sub">
                    {hasExploredBeacon
                      ? '✦ Includes Core Beacon Discovery'
                      : 'Explore sectors to chart more'}
                  </span>
                </div>

                {/* Stat 3: Exploration Progress */}
                <div className="journey-stat-card">
                  <span className="stat-card-label">Journey Progress</span>
                  <div className="stat-card-value-wrap">
                    <span className="stat-card-num">{percent}%</span>
                  </div>
                  <span className="stat-card-sub">
                    {isUniverseExplorerUnlocked ? 'All Sectors Charted' : 'Orbit in progress'}
                  </span>
                </div>
              </div>

              {/* Visual Exploration Progress Bar */}
              <div
                className="journey-progress-bar-container"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Cosmic exploration progress"
              >
                <div className="journey-progress-header-row">
                  <span className="progress-bar-label">Exploration Progress</span>
                  <span className="progress-bar-percent">{percent}% Charted</span>
                </div>
                <div className="journey-progress-track">
                  <div
                    className="journey-progress-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* UNIVERSE EXPLORER UNLOCKED BADGE SHOWCASE */}
              {isUniverseExplorerUnlocked ? (
                <div className="universe-explorer-badge-unlocked" role="status">
                  <div className="badge-aura-glow" aria-hidden="true" />
                  <div className="badge-star-seal">★</div>
                  <div className="badge-unlocked-content">
                    <h4 className="badge-unlocked-title">
                      UNIVERSE EXPLORER BADGE UNLOCKED
                    </h4>
                    <p className="badge-unlocked-desc">
                      Outstanding exploration! You have charted all active celestial planetary sectors
                      in Dhruti&apos;s Living Intelligence Universe during this session.
                    </p>
                    <div className="badge-milestone-pill">
                      <span>✦ Complete Session Discovery Achieved</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="universe-explorer-badge-locked">
                  <div className="badge-locked-dot">○</div>
                  <div className="badge-locked-content">
                    <span className="badge-locked-title">
                      Universe Explorer Badge (In Progress)
                    </span>
                    <span className="badge-locked-desc">
                      Chart all {totalPublicCount} public planetary sectors ({publicExploredCount}/{totalPublicCount} discovered)
                      to unlock the luminous Universe Explorer recognition badge.
                    </span>
                  </div>
                </div>
              )}

              {/* Planetary Sectors Breakdown */}
              <div className="journey-sectors-section">
                <h4 className="journey-sectors-heading">
                  <span>🪐</span> Planetary Sectors Log
                </h4>

                <div className="journey-sectors-list" role="list">
                  {PUBLIC_SECTORS.map((sector) => {
                    const isExplored = exploredSet.has(sector.id)
                    return (
                      <div
                        key={sector.id}
                        className={`journey-sector-item ${
                          isExplored ? 'is-explored' : 'is-unexplored'
                        }`}
                        role="listitem"
                      >
                        <div className="sector-info-left">
                          <span
                            className="sector-status-glyph"
                            style={{
                              borderColor: sector.color,
                              color: isExplored ? sector.color : 'rgba(148, 163, 184, 0.5)',
                            }}
                            aria-hidden="true"
                          >
                            {isExplored ? '✓' : '○'}
                          </span>
                          <div className="sector-text-block">
                            <div className="sector-title-row">
                              <span className="sector-icon" aria-hidden="true">
                                {sector.icon}
                              </span>
                              <span className="sector-name">{sector.name}</span>
                              <span
                                className={`sector-pill ${
                                  isExplored ? 'pill-discovered' : 'pill-undiscovered'
                                }`}
                              >
                                {isExplored ? 'Discovered' : 'Unexplored'}
                              </span>
                            </div>
                            <span className="sector-domain-text">{sector.domain}</span>
                          </div>
                        </div>

                        {!isExplored && onOpenSection && (
                          <button
                            type="button"
                            className="sector-explore-quick-btn"
                            onClick={() => handleSectorClick(sector)}
                            aria-label={`Explore ${sector.name} sector`}
                          >
                            <span>Explore Sector</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        )}
                      </div>
                    )
                  })}

                  {/* Strictly Locked Projects Sector */}
                  <div className="journey-sector-item is-locked-sector" role="listitem">
                    <div className="sector-info-left">
                      <span className="sector-status-glyph sector-locked-glyph" aria-hidden="true">
                        🔒
                      </span>
                      <div className="sector-text-block">
                        <div className="sector-title-row">
                          <span className="sector-icon" aria-hidden="true">
                            {LOCKED_SECTOR.icon}
                          </span>
                          <span className="sector-name">{LOCKED_SECTOR.name}</span>
                          <span className="sector-pill pill-confidential">
                            Private Development
                          </span>
                        </div>
                        <span className="sector-domain-text">
                          {hasExploredProjects
                            ? 'Status viewed. Code & architecture remain strictly confidential on GitHub.'
                            : 'Strictly locked. In-progress engineering experiments are kept private until ready.'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Secret Celestial Core Beacon Discovery */}
                  <div
                    className={`journey-sector-item is-bonus-sector ${
                      hasExploredBeacon ? 'is-beacon-found' : 'is-beacon-hidden'
                    }`}
                    role="listitem"
                  >
                    <div className="sector-info-left">
                      <span className="sector-status-glyph" aria-hidden="true">
                        {hasExploredBeacon ? '✦' : '?'}
                      </span>
                      <div className="sector-text-block">
                        <div className="sector-title-row">
                          <span className="sector-icon" aria-hidden="true">
                            {SECRET_BEACON_SECTOR.icon}
                          </span>
                          <span className="sector-name">{SECRET_BEACON_SECTOR.name}</span>
                          <span
                            className={`sector-pill ${
                              hasExploredBeacon ? 'pill-discovered' : 'pill-secret'
                            }`}
                          >
                            {hasExploredBeacon ? 'Beacon Connected' : 'Secret Core'}
                          </span>
                        </div>
                        <span className="sector-domain-text">
                          {hasExploredBeacon
                            ? 'Cosmic transmission unlocked inside the sphere core.'
                            : 'Hidden starlight transmission (Hint: Press "B" or connect via portal brand).'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspirational Cosmic Message Card */}
              <div className="journey-cosmic-quote-box">
                <div className="quote-box-header">
                  <div className="quote-badge">
                    <span className="quote-spark" aria-hidden="true">✦</span>
                    <span>Cosmic Inspiration // {cosmicMessage.theme}</span>
                  </div>
                  <button
                    type="button"
                    className="quote-cycle-btn"
                    onClick={handleCycleMessage}
                    title="Generate another inspirational cosmic thought"
                    aria-label="Cycle inspirational cosmic quote"
                  >
                    <span>✦ Next Thought</span>
                  </button>
                </div>
                <blockquote className="quote-box-text">
                  &ldquo;{cosmicMessage.quote}&rdquo;
                </blockquote>
              </div>

              {/* Session & Privacy Transparency Guarantee */}
              <div className="journey-privacy-notice">
                <strong>Your Session Only:</strong> Exploration counts reflect your personal
                journey during this browser session (stored locally via <code>sessionStorage</code>).
                Zero personal data, fingerprinting, Firebase databases, or external analytics are used.
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer journey-modal-footer">
              <button
                type="button"
                className="hologram-primary-btn"
                onClick={handleCloseModal}
              >
                Close &amp; Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
