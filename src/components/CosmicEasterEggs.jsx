import { useState, useEffect, useRef, useCallback } from 'react'
import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * CosmicEasterEggs Component
 * Implements subtle, intentional, discoverable cosmic secrets:
 *
 * 1. EASTER EGG A: Secret Star
 *    A subtle special diamond star in the starfield. Clicking it reveals:
 *    "Curiosity is the beginning of every great discovery. ✨"
 *
 * 2. EASTER EGG B: Constellation Discovery
 *    A hidden 3-star celestial constellation in the cosmos. Clicking all 3
 *    stars connects them with glowing lines and reveals:
 *    "Every connection creates a new possibility."
 *
 * 3. EASTER EGG D: Keyboard Secret ("cosmos")
 *    Typing the secret sequence "cosmos" outside of text inputs triggers
 *    a celestial starlight shower and reveals a cosmic transmission.
 */
export default function CosmicEasterEggs() {
  // Easter Egg A: Secret Star Toast
  const [secretStarActive, setSecretStarActive] = useState(false)
  const [secretStarMessage, setSecretStarMessage] = useState(null)

  // Easter Egg B: Constellation
  const [activatedStars, setActivatedStars] = useState(new Set())
  const [constellationCompleted, setConstellationCompleted] = useState(false)
  const [constellationMessage, setConstellationMessage] = useState(null)

  // Easter Egg D: Keyboard Secret ("cosmos")
  const [keyboardSecretActive, setKeyboardSecretActive] = useState(false)
  const keySequenceRef = useRef([])

  const secretStarTimeoutRef = useRef(null)
  const constellationTimeoutRef = useRef(null)
  const keyboardTimeoutRef = useRef(null)

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (secretStarTimeoutRef.current) clearTimeout(secretStarTimeoutRef.current)
      if (constellationTimeoutRef.current) clearTimeout(constellationTimeoutRef.current)
      if (keyboardTimeoutRef.current) clearTimeout(keyboardTimeoutRef.current)
    }
  }, [])

  // --- EASTER EGG A: Secret Star Handler ---
  const handleSecretStarClick = useCallback(() => {
    playCosmicClick()
    setSecretStarActive(true)
    setSecretStarMessage('Curiosity is the beginning of every great discovery. ✨')

    if (secretStarTimeoutRef.current) clearTimeout(secretStarTimeoutRef.current)
    secretStarTimeoutRef.current = setTimeout(() => {
      setSecretStarMessage(null)
      setSecretStarActive(false)
    }, 6000)
  }, [])

  // --- EASTER EGG B: Constellation Stars Handler ---
  const handleConstellationStarClick = useCallback((starId) => {
    playCosmicClick()
    setActivatedStars((prev) => {
      const next = new Set(prev)
      next.add(starId)

      // When all 3 stars (c1, c2, c3) are connected:
      if (next.size === 3 && !constellationCompleted) {
        setConstellationCompleted(true)
        setConstellationMessage('Every connection creates a new possibility.')

        if (constellationTimeoutRef.current) clearTimeout(constellationTimeoutRef.current)
        constellationTimeoutRef.current = setTimeout(() => {
          setConstellationMessage(null)
        }, 7000)
      }

      return next
    })
  }, [constellationCompleted])

  // --- EASTER EGG D: Keyboard Secret ("cosmos") ---
  useEffect(() => {
    const TARGET_SEQUENCE = ['c', 'o', 's', 'm', 'o', 's']

    const handleKeyDown = (e) => {
      // Strictly ignore keyboard events if visitor is typing in an input, textarea, select, or editable element
      const activeTag = document.activeElement?.tagName?.toLowerCase()
      if (
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        document.activeElement?.isContentEditable
      ) {
        return
      }

      // Ignore modifier keys
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return
      }

      const key = e.key.toLowerCase()

      keySequenceRef.current.push(key)
      if (keySequenceRef.current.length > TARGET_SEQUENCE.length) {
        keySequenceRef.current.shift()
      }

      // Check if sequence matches TARGET_SEQUENCE
      const isMatch = TARGET_SEQUENCE.every(
        (val, idx) => keySequenceRef.current[idx] === val
      )

      if (isMatch) {
        keySequenceRef.current = [] // reset sequence
        playCosmicClick()
        setKeyboardSecretActive(true)

        if (keyboardTimeoutRef.current) clearTimeout(keyboardTimeoutRef.current)
        keyboardTimeoutRef.current = setTimeout(() => {
          setKeyboardSecretActive(false)
        }, 7000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="cosmic-easter-eggs-layer" aria-label="Cosmic secrets">
      {/* =================================================== */}
      {/* EASTER EGG A: Subtle Secret Star in Upper Quadrant */}
      {/* =================================================== */}
      <button
        type="button"
        className={`secret-star-interactive ${secretStarActive ? 'is-activated' : ''}`}
        onClick={handleSecretStarClick}
        title="Luminous celestial anomaly"
        aria-label="Discover subtle secret star"
      >
        <span className="secret-star-diamond" aria-hidden="true">✦</span>
        <span className="secret-star-halo" aria-hidden="true" />
      </button>

      {/* Secret Star Discovery Toast */}
      {secretStarMessage && (
        <div className="cosmic-toast secret-star-toast" role="status" aria-live="polite">
          <span className="toast-spark" aria-hidden="true">✨</span>
          <span className="toast-message">{secretStarMessage}</span>
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={() => setSecretStarMessage(null)}
            aria-label="Dismiss discovery message"
          >
            ✕
          </button>
        </div>
      )}

      {/* =================================================== */}
      {/* EASTER EGG B: Hidden 3-Star Constellation Cluster   */}
      {/* =================================================== */}
      <div
        className={`hidden-constellation-cluster ${
          constellationCompleted ? 'is-completed' : ''
        }`}
        aria-label="Hidden celestial constellation"
      >
        {/* SVG Glowing Connection Lines */}
        <svg
          className="constellation-svg"
          viewBox="0 0 160 140"
          aria-hidden="true"
        >
          {activatedStars.has('c1') && activatedStars.has('c2') && (
            <line
              x1="20"
              y1="30"
              x2="90"
              y2="110"
              className="constellation-line"
            />
          )}
          {activatedStars.has('c2') && activatedStars.has('c3') && (
            <line
              x1="90"
              y1="110"
              x2="140"
              y2="40"
              className="constellation-line"
            />
          )}
          {constellationCompleted && (
            <line
              x1="140"
              y1="40"
              x2="20"
              y2="30"
              className="constellation-line constellation-closing-line"
            />
          )}
        </svg>

        {/* Star 1 */}
        <button
          type="button"
          className={`constellation-node node-c1 ${
            activatedStars.has('c1') ? 'is-lit' : ''
          }`}
          onClick={() => handleConstellationStarClick('c1')}
          title="Constellation Star α"
          aria-label="Connect Constellation Star α"
        >
          <span className="constellation-node-core" aria-hidden="true" />
        </button>

        {/* Star 2 */}
        <button
          type="button"
          className={`constellation-node node-c2 ${
            activatedStars.has('c2') ? 'is-lit' : ''
          }`}
          onClick={() => handleConstellationStarClick('c2')}
          title="Constellation Star β"
          aria-label="Connect Constellation Star β"
        >
          <span className="constellation-node-core" aria-hidden="true" />
        </button>

        {/* Star 3 */}
        <button
          type="button"
          className={`constellation-node node-c3 ${
            activatedStars.has('c3') ? 'is-lit' : ''
          }`}
          onClick={() => handleConstellationStarClick('c3')}
          title="Constellation Star γ"
          aria-label="Connect Constellation Star γ"
        >
          <span className="constellation-node-core" aria-hidden="true" />
        </button>
      </div>

      {/* Constellation Discovery Toast */}
      {constellationMessage && (
        <div className="cosmic-toast constellation-toast" role="status" aria-live="polite">
          <span className="toast-spark" aria-hidden="true">✦</span>
          <div className="toast-content-group">
            <span className="toast-badge-tag">Constellation Formed</span>
            <span className="toast-message">{constellationMessage}</span>
          </div>
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={() => setConstellationMessage(null)}
            aria-label="Dismiss constellation discovery"
          >
            ✕
          </button>
        </div>
      )}

      {/* =================================================== */}
      {/* EASTER EGG D: Keyboard Secret ("cosmos") Toast & FX */}
      {/* =================================================== */}
      {keyboardSecretActive && (
        <div
          className="keyboard-secret-overlay"
          role="status"
          aria-live="polite"
        >
          {/* Animated starlight shower background rays */}
          <div className="starlight-shower-fx" aria-hidden="true" />

          <div className="keyboard-secret-modal">
            <div className="secret-modal-spark" aria-hidden="true">🌠</div>
            <div className="secret-modal-content">
              <span className="secret-tag">Secret Cosmic Harmonic Discovered</span>
              <h4 className="secret-title">You typed &ldquo;cosmos&rdquo;!</h4>
              <p className="secret-body">
                The universe whispers its secrets to those who stay curious. Keep exploring,
                keep learning, and let every orbit reveal something new.
              </p>
            </div>
            <button
              type="button"
              className="secret-dismiss-btn"
              onClick={() => setKeyboardSecretActive(false)}
              aria-label="Dismiss cosmic secret"
            >
              Dismiss ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
