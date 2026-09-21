/**
 * Audio Configuration
 * “DHRUTI — The Living Intelligence Universe”
 *
 * Centralized settings for ambient sound, section voice cues, and captions.
 * Edit voice cue scripts or audio file paths here in one location.
 */

export const AUDIO_CONFIG = {
  // Ambient cosmic background sound
  ambient: {
    enabledByDefault: false, // Strict opt-in
    defaultVolume: 0.25, // Soft, non-distracting background level (25%)
    filePath: '/audio/ambient-space.mp3',
    storageKey: 'dhruti_audio_ambient_pref',
    useProceduralFallback: true, // Uses soft Web Audio binaural hum if MP3 is absent
  },

  // Section voice cues
  voiceCues: {
    enabledByDefault: false, // Strict opt-in
    defaultVolume: 0.8,
    storageKey: 'dhruti_audio_voice_pref',
    cues: {
      about: {
        id: 'about',
        label: 'About',
        script: 'A little about my journey.',
        filePath: '/audio/voice/cue-about.mp3',
      },
      skills: {
        id: 'skills',
        label: 'Skills',
        script: 'Explore what I’m learning and building.',
        filePath: '/audio/voice/cue-skills.mp3',
      },
      achievements: {
        id: 'achievements',
        label: 'Achievements',
        script: 'A few milestones along my learning journey.',
        filePath: '/audio/voice/cue-achievements.mp3',
      },
      contact: {
        id: 'contact',
        label: 'Contact',
        script: 'Let’s connect.',
        filePath: '/audio/voice/cue-contact.mp3',
      },
    },
  },

  // Accessible HUD Captions
  captions: {
    enabledByDefault: true,
    storageKey: 'dhruti_audio_captions_pref',
  },
}
