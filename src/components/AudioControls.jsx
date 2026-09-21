import { playCosmicClick } from '../utils/proceduralCosmicAudio'

/**
 * AudioControls Component
 * Provides accessible, unobtrusive controls for:
 * 1. Ambient cosmic sound toggle (Opt-in)
 * 2. Section voice cue toggle (Opt-in)
 * 3. Captions toggle & live HUD caption display
 */
export default function AudioControls({
  isAmbientActive,
  isVoiceActive,
  areCaptionsActive,
  activeCaption,
  onToggleAmbient,
  onToggleVoice,
  onToggleCaptions,
}) {
  const handleToggleAmbient = () => {
    playCosmicClick()
    onToggleAmbient()
  }

  const handleToggleVoice = () => {
    playCosmicClick()
    onToggleVoice()
  }

  const handleToggleCaptions = () => {
    playCosmicClick()
    onToggleCaptions()
  }

  return (
    <div className="audio-controls-dock" role="region" aria-label="Audio controls">
      {/* Sound Toggle */}
      <button
        type="button"
        className={`audio-control-pill ${isAmbientActive ? 'is-active' : ''}`}
        onClick={handleToggleAmbient}
        aria-pressed={isAmbientActive}
        aria-label={
          isAmbientActive
            ? 'Disable ambient space sound'
            : 'Enable ambient space sound'
        }
        title="Ambient space audio (Low volume, soft drone)"
      >
        <span className="audio-icon" aria-hidden="true">
          {isAmbientActive ? '🔊' : '🔇'}
        </span>
        <span className="audio-label">
          Sound: <strong>{isAmbientActive ? 'ON' : 'OFF'}</strong>
        </span>
      </button>

      {/* Voice Cues Toggle */}
      <button
        type="button"
        className={`audio-control-pill ${isVoiceActive ? 'is-active' : ''}`}
        onClick={handleToggleVoice}
        aria-pressed={isVoiceActive}
        aria-label={
          isVoiceActive
            ? 'Disable section voice cues'
            : 'Enable section voice cues'
        }
        title="Short spoken introductory voice cues for portfolio sections"
      >
        <span className="audio-icon" aria-hidden="true">
          {isVoiceActive ? '🎙️' : '🎙️'}
        </span>
        <span className="audio-label">
          Voice: <strong>{isVoiceActive ? 'ON' : 'OFF'}</strong>
        </span>
      </button>

      {/* Captions Toggle (shown when voice is enabled) */}
      {isVoiceActive && (
        <button
          type="button"
          className={`audio-control-pill cc-pill ${areCaptionsActive ? 'is-active' : ''}`}
          onClick={handleToggleCaptions}
          aria-pressed={areCaptionsActive}
          aria-label={
            areCaptionsActive
              ? 'Disable voice captions'
              : 'Enable voice captions'
          }
          title="Toggle visible voice captions"
        >
          <span className="audio-label">
            CC: <strong>{areCaptionsActive ? 'ON' : 'OFF'}</strong>
          </span>
        </button>
      )}

      {/* Active Voice Cue HUD Caption (Accessible polite aria-live) */}
      {isVoiceActive && areCaptionsActive && activeCaption && (
        <div
          className="audio-caption-hud"
          role="status"
          aria-live="polite"
        >
          <span className="caption-badge">Voice Cue</span>
          <span className="caption-text">“{activeCaption}”</span>
        </div>
      )}
    </div>
  )
}
