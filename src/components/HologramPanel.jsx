import { useRef } from 'react'
import useModalFocus from '../hooks/useModalFocus'
import AboutPanelContent from './panels/AboutPanelContent'
import SkillsPanelContent from './panels/SkillsPanelContent'
import LearningJourneyPanelContent from './panels/LearningJourneyPanelContent'
import AchievementsPanelContent from './panels/AchievementsPanelContent'
import ContactPanelContent from './panels/ContactPanelContent'
import ProjectsLockedContent from './panels/ProjectsLockedContent'
import { CELESTIAL_NODES } from '../data/celestialNodes'

/**
 * HologramPanel Component
 * Reusable holographic modal displaying authentic portfolio content
 * for About, Skills, Learning Journey, Achievements, Contact, and locked Projects.
 *
 * Enhancements:
 * - Persistent in-modal section switcher so visitors can navigate between
 *   any section directly without returning to the welcome portal or closing the modal.
 * - Direct "Back to Universe" controls that return directly to the 3D celestial sphere.
 * - Implements accessible focus trap, Escape key handling, and focus restoration.
 */
export default function HologramPanel({ section, onClose, onSelectSection }) {
  const closeButtonRef = useRef(null)
  const shellRef = useModalFocus(Boolean(section), onClose, closeButtonRef)

  if (!section) return null

  // Determine section content component
  const renderSectionContent = () => {
    switch (section.id) {
      case 'about':
        return <AboutPanelContent />
      case 'skills':
        return <SkillsPanelContent />
      case 'journey':
        return <LearningJourneyPanelContent />
      case 'achievements':
        return <AchievementsPanelContent />
      case 'contact':
        return <ContactPanelContent />
      case 'projects':
        return <ProjectsLockedContent />
      default:
        return (
          <div className="hologram-message-card">
            <h3 className="hologram-message-heading">Content Pending</h3>
            <p className="hologram-message-text">
              Sector details for <strong>{section.title || section.name}</strong> will be added in a future update.
            </p>
          </div>
        )
    }
  }

  return (
    <div
      className="hologram-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hologram-title"
    >
      <div
        ref={shellRef}
        className="hologram-shell"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hologram aesthetic frame decorations */}
        <div className="hologram-corner corner-tl" aria-hidden="true" />
        <div className="hologram-corner corner-tr" aria-hidden="true" />
        <div className="hologram-corner corner-bl" aria-hidden="true" />
        <div className="hologram-corner corner-br" aria-hidden="true" />
        <div className="hologram-scanline" aria-hidden="true" />

        {/* Header */}
        <div className="hologram-header">
          <div className="hologram-title-group">
            <span className="hologram-sector-tag">
              Sector // {section.id?.toUpperCase() || 'NODE'}
            </span>
            <h2 id="hologram-title" className="hologram-title">
              {section.fullTitle || section.title || section.name}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="hologram-close-btn"
            onClick={onClose}
            aria-label="Back to 3D Celestial Universe"
            title="Return directly to 3D celestial sphere"
          >
            ← Back to Universe
          </button>
        </div>

        {/* Persistent In-Modal Section Switcher */}
        <nav className="hologram-nav-bar" aria-label="Explore other sections directly">
          <span className="hologram-nav-label">Sector Switch:</span>
          <div className="hologram-nav-pills" role="tablist">
            {CELESTIAL_NODES.map((node) => {
              const isActive = section.id === node.id
              return (
                <button
                  key={node.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`hologram-nav-tab ${isActive ? 'is-active' : ''} ${
                    node.locked ? 'is-locked-tab' : ''
                  }`}
                  onClick={() => {
                    if (onSelectSection) {
                      onSelectSection(node)
                    }
                  }}
                  aria-label={
                    node.locked
                      ? `${node.title} (Locked — Under Private Development)`
                      : `Switch to ${node.fullTitle || node.title}`
                  }
                >
                  <span
                    className="nav-tab-dot"
                    style={{ backgroundColor: node.color }}
                    aria-hidden="true"
                  />
                  <span className="nav-tab-title">{node.fullTitle || node.title}</span>
                  {node.locked && <span className="nav-tab-locked">🔒</span>}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="hologram-body">
          {renderSectionContent()}
        </div>

        {/* Footer controls */}
        <div className="hologram-footer">
          <button
            type="button"
            className="hologram-primary-btn"
            onClick={onClose}
            aria-label="Back to 3D Celestial Universe"
          >
            ← Back to Universe Sphere
          </button>
          <div className="hologram-footer-hint">
            <span>✦ Use the sector switcher above to explore any section without leaving</span>
          </div>
        </div>
      </div>
    </div>
  )
}
