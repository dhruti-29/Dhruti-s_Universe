/**
 * Voice Cue Engine
 * Manages playback of short introductory voice cues when section panels open.
 * Ensures strict opt-in, non-overlapping playback, and immediate stop on close.
 */

let currentAudio = null

/**
 * Stops any ongoing voice cue (HTML5 Audio or Web Speech).
 */
export function stopVoiceCue() {
  // Stop HTML5 Audio if playing
  if (currentAudio) {
    try {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio = null
    } catch {
      // Ignore
    }
  }

  // Cancel Web Speech Synthesis if speaking
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel()
    } catch {
      // Ignore
    }
  }
}

/**
 * Plays a section voice cue if voice cues are enabled.
 * @param {Object} cueConfig - { id, label, script, filePath }
 * @param {boolean} isVoiceEnabled - Must be true to play
 * @param {Function} onCaptionChange - Callback to display accessible HUD caption
 */
export function playVoiceCue(cueConfig, isVoiceEnabled, onCaptionChange) {
  if (!isVoiceEnabled || !cueConfig) {
    stopVoiceCue()
    return
  }

  // Always cancel any prior cue first to prevent audio overlapping
  stopVoiceCue()

  // Notify caption listener
  if (onCaptionChange) {
    onCaptionChange(cueConfig.script)
  }

  // Try HTML5 Audio file first if user provided audio asset
  const audio = new Audio(cueConfig.filePath)
  audio.volume = 0.8

  const handleAudioSuccess = () => {
    currentAudio = audio
  }

  const handleAudioFallback = () => {
    // If audio file is absent (404/decode error), fall back to Web Speech API
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(cueConfig.script)
        utterance.lang = 'en-US'
        utterance.rate = 0.95 // Gentle, clear pacing
        utterance.pitch = 1.0
        window.speechSynthesis.speak(utterance)
      } catch {
        // Fallback gracefully to visual captions only
      }
    }
  }

  audio.addEventListener('canplaythrough', handleAudioSuccess, { once: true })
  audio.addEventListener('error', handleAudioFallback, { once: true })

  audio.play().catch(() => {
    // If autoplay blocked or file missing, trigger Web Speech fallback
    handleAudioFallback()
  })
}
