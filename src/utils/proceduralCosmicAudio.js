/**
 * Procedural Cosmic Ambient Sound Synthesizer
 * Uses the Web Audio API to create a gentle, soothing, non-copyrighted
 * low-frequency cosmic drone. No external audio files required.
 */

let audioCtx = null
let masterGain = null
let osc1 = null
let osc2 = null
let filter = null

export function startProceduralCosmicAudio(volume = 0.25) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null

    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass()
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    // Stop previous if any
    stopProceduralCosmicAudio(false)

    // Master Gain Node
    masterGain = audioCtx.createGain()
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime)
    // Smooth fade-in to target volume
    masterGain.gain.exponentialRampToValueAtTime(
      Math.max(0.001, Math.min(1, volume)),
      audioCtx.currentTime + 1.2
    )

    // Low-pass filter to keep sound warm and deep
    filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(160, audioCtx.currentTime)
    filter.Q.setValueAtTime(1.5, audioCtx.currentTime)

    // Oscillator 1: Base Sub-Cosmic Tone (~52Hz)
    osc1 = audioCtx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(52, audioCtx.currentTime)

    // Oscillator 2: Subtle Detuned Harmonic (~52.75Hz for gentle slow pulsing)
    osc2 = audioCtx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(52.75, audioCtx.currentTime)

    // Connect audio graph: Oscillators -> Filter -> MasterGain -> Destination
    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(masterGain)
    masterGain.connect(audioCtx.destination)

    osc1.start()
    osc2.start()

    return audioCtx
  } catch (err) {
    console.warn('Procedural audio initialization note:', err)
    return null
  }
}

export function stopProceduralCosmicAudio(fade = true) {
  try {
    if (!audioCtx || !masterGain) return

    if (fade && audioCtx.state === 'running') {
      const now = audioCtx.currentTime
      masterGain.gain.setValueAtTime(masterGain.gain.value, now)
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6)

      setTimeout(() => {
        try {
          if (osc1) { osc1.stop(); osc1.disconnect(); osc1 = null }
          if (osc2) { osc2.stop(); osc2.disconnect(); osc2 = null }
          if (filter) { filter.disconnect(); filter = null }
          if (masterGain) { masterGain.disconnect(); masterGain = null }
        } catch {
          // Ignore cleanup errors
        }
      }, 700)
    } else {
      if (osc1) { osc1.stop(); osc1.disconnect(); osc1 = null }
      if (osc2) { osc2.stop(); osc2.disconnect(); osc2 = null }
      if (filter) { filter.disconnect(); filter = null }
      if (masterGain) { masterGain.disconnect(); masterGain = null }
    }
  } catch {
    // Graceful handling
  }
}

/**
 * Plays a gentle, harmonic chime (528Hz) for subtle cosmic discovery micro-interactions.
 */
export function playCosmicChime(volume = 0.08) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const ctx = audioCtx || new AudioContextClass()
    if (ctx.state === 'suspended') ctx.resume()

    const chimeOsc = ctx.createOscillator()
    const chimeGain = ctx.createGain()
    chimeOsc.type = 'sine'
    chimeOsc.frequency.setValueAtTime(528, ctx.currentTime)

    chimeGain.gain.setValueAtTime(0.001, ctx.currentTime)
    chimeGain.gain.exponentialRampToValueAtTime(Math.min(volume, 0.2), ctx.currentTime + 0.04)
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.85)

    chimeOsc.connect(chimeGain)
    chimeGain.connect(ctx.destination)

    chimeOsc.start()
    chimeOsc.stop(ctx.currentTime + 0.9)
  } catch {
    // Graceful silence
  }
}

let lastClickTimestamp = 0

/**
 * Plays a short, subtle, futuristic cosmic click sound for universe interactions.
 * Synthesized procedurally via the Web Audio API (zero external assets or dependencies).
 * Features a soft sine-wave frequency glide (780Hz down to 390Hz over 55ms) with a 4ms
 * anti-pop attack ramp and exponential decay, creating a gentle holographic interface pulse.
 *
 * Volume: Controlled via the `volume` argument (default: 0.045 for comfortable, subtle feedback).
 * To adjust volume across the application, edit the default value below or pass a volume parameter.
 *
 * @param {number} volume - Master gain for the click sound (safe range: 0.01 - 0.08, default: 0.045).
 */
export function playCosmicClick(volume = 0.045) {
  try {
    if (typeof window === 'undefined') return

    // Debounce to prevent multiple triggers for one user gesture
    const now = performance.now()
    if (now - lastClickTimestamp < 60) return
    lastClickTimestamp = now

    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    if (!audioCtx || audioCtx.state === 'closed') {
      audioCtx = new AudioContextClass()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }

    const t = audioCtx.currentTime

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.type = 'sine'
    // Gentle holographic frequency slide down (780Hz -> 390Hz in 55ms)
    osc.frequency.setValueAtTime(780, t)
    osc.frequency.exponentialRampToValueAtTime(390, t + 0.055)

    // Smooth envelope: 4ms attack to eliminate DC pop, followed by exponential decay to silence
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(Math.min(volume, 0.1), t + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(t)
    osc.stop(t + 0.06)

    setTimeout(() => {
      try {
        osc.disconnect()
        gain.disconnect()
      } catch {
        // Safe disposal
      }
    }, 80)
  } catch {
    // Graceful fallback to silence if audio context is blocked
  }
}


