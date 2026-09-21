import { useState, useEffect, useCallback, useRef } from 'react'
import { AUDIO_CONFIG } from '../data/audioConfig'
import { startProceduralCosmicAudio, stopProceduralCosmicAudio } from '../utils/proceduralCosmicAudio'
import { playVoiceCue, stopVoiceCue } from '../utils/voiceCueEngine'

/**
 * useAudioManager Hook
 * Orchestrates ambient cosmic audio, section voice cues, and accessible captions.
 * Guarantees zero autoplay and immediate cleanup.
 */
export default function useAudioManager() {
  // Ambient Sound State (defaults to false / strict opt-in)
  const [isAmbientActive, setIsAmbientActive] = useState(() => {
    try {
      return sessionStorage.getItem(AUDIO_CONFIG.ambient.storageKey) === 'true'
    } catch {
      return false
    }
  })

  // Voice Cues State (defaults to false / strict opt-in)
  const [isVoiceActive, setIsVoiceActive] = useState(() => {
    try {
      return sessionStorage.getItem(AUDIO_CONFIG.voiceCues.storageKey) === 'true'
    } catch {
      return false
    }
  })

  // Captions State (defaults to true for accessibility)
  const [areCaptionsActive, setAreCaptionsActive] = useState(() => {
    try {
      const stored = sessionStorage.getItem(AUDIO_CONFIG.captions.storageKey)
      return stored !== null ? stored === 'true' : AUDIO_CONFIG.captions.enabledByDefault
    } catch {
      return true
    }
  })

  const [activeCaption, setActiveCaption] = useState(null)
  const captionTimerRef = useRef(null)
  const ambientAudioElementRef = useRef(null)

  // Toggle Ambient Audio
  const toggleAmbient = useCallback(() => {
    setIsAmbientActive((prev) => {
      const nextState = !prev
      try {
        sessionStorage.setItem(AUDIO_CONFIG.ambient.storageKey, String(nextState))
      } catch {
        // Ignore storage errors
      }

      if (nextState) {
        // Try file playback first if user provided ambient-space.mp3
        const audio = new Audio(AUDIO_CONFIG.ambient.filePath)
        audio.loop = true
        audio.volume = AUDIO_CONFIG.ambient.defaultVolume

        audio
          .play()
          .then(() => {
            ambientAudioElementRef.current = audio
          })
          .catch(() => {
            // If file is missing or blocked, start soft procedural Web Audio synth
            startProceduralCosmicAudio(AUDIO_CONFIG.ambient.defaultVolume)
          })
      } else {
        // Stop audio file if playing
        if (ambientAudioElementRef.current) {
          ambientAudioElementRef.current.pause()
          ambientAudioElementRef.current = null
        }
        // Stop procedural synth
        stopProceduralCosmicAudio(true)
      }

      return nextState
    })
  }, [])

  // Toggle Voice Cues
  const toggleVoice = useCallback(() => {
    setIsVoiceActive((prev) => {
      const nextState = !prev
      try {
        sessionStorage.setItem(AUDIO_CONFIG.voiceCues.storageKey, String(nextState))
      } catch {
        // Ignore storage errors
      }

      if (!nextState) {
        stopVoiceCue()
        setActiveCaption(null)
      }

      return nextState
    })
  }, [])

  // Toggle Captions
  const toggleCaptions = useCallback(() => {
    setAreCaptionsActive((prev) => {
      const next = !prev
      try {
        sessionStorage.setItem(AUDIO_CONFIG.captions.storageKey, String(next))
      } catch {
        // Ignore storage errors
      }
      return next
    })
  }, [])

  // Handle caption display with auto-fade timer
  const handleCaption = useCallback((text) => {
    if (captionTimerRef.current) {
      clearTimeout(captionTimerRef.current)
    }
    setActiveCaption(text)
    captionTimerRef.current = setTimeout(() => {
      setActiveCaption(null)
    }, 4500)
  }, [])

  // Trigger cue for a specific section
  const triggerSectionCue = useCallback(
    (sectionId) => {
      if (!sectionId) return
      const cueConfig = AUDIO_CONFIG.voiceCues.cues[sectionId]
      if (cueConfig) {
        playVoiceCue(cueConfig, isVoiceActive, handleCaption)
      }
    },
    [isVoiceActive, handleCaption]
  )

  // Stop active cue
  const stopActiveVoiceCue = useCallback(() => {
    stopVoiceCue()
    setActiveCaption(null)
    if (captionTimerRef.current) {
      clearTimeout(captionTimerRef.current)
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ambientAudioElementRef.current) {
        ambientAudioElementRef.current.pause()
        ambientAudioElementRef.current = null
      }
      stopProceduralCosmicAudio(false)
      stopVoiceCue()
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current)
      }
    }
  }, [])

  return {
    isAmbientActive,
    isVoiceActive,
    areCaptionsActive,
    activeCaption,
    toggleAmbient,
    toggleVoice,
    toggleCaptions,
    triggerSectionCue,
    stopActiveVoiceCue,
  }
}
