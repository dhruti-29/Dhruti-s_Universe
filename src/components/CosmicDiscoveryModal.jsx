import { useRef } from 'react'
import useModalFocus from '../hooks/useModalFocus'
import { EASTER_EGG_CONTENT } from '../data/portfolioContent'

/**
 * CosmicDiscoveryModal Component
 * Subtle, professional easter egg modal revealing a hidden cosmic transmission.
 * 100% accessible via keyboard, touch, and screen readers.
 * Uses useModalFocus for focus trapping, Escape key handling, and focus restoration.
 */
export default function CosmicDiscoveryModal({ isOpen, onClose }) {
  const closeBtnRef = useRef(null)
  const dialogRef = useModalFocus(isOpen, onClose, closeBtnRef)

  if (!isOpen) return null

  return (
    <div
      className="modal-backdrop discovery-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="discovery-title"
    >
      <div
        ref={dialogRef}
        className="modal-dialog discovery-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="discovery-header">
          <div className="discovery-beacon-aura" aria-hidden="true">
            <span className="beacon-spark">✦</span>
          </div>
          <div>
            <h2 id="discovery-title" className="discovery-title">
              {EASTER_EGG_CONTENT.title}
            </h2>
            <p className="discovery-tagline">{EASTER_EGG_CONTENT.subtitle}</p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close discovery transmission"
          >
            ✕
          </button>
        </div>

        <div className="discovery-content">
          <blockquote className="discovery-quote-box">
            {EASTER_EGG_CONTENT.lines.map((line, idx) => (
              <p key={idx} className="discovery-quote-line">
                {line}
              </p>
            ))}
            <footer className="discovery-quote-author">
              {EASTER_EGG_CONTENT.author}
            </footer>
          </blockquote>

          <div className="discovery-subtext">
            <span>✦ Discovery Note: You unlocked this cosmic transmission by connecting with the celestial core.</span>
          </div>
        </div>

        <div className="discovery-footer">
          <button
            type="button"
            className="btn-primary-explore discovery-close-action"
            onClick={onClose}
          >
            <span>Continue Journey</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
