# Audio Assets Directory
## “DHRUTI — The Living Intelligence Universe”

This directory is reserved for your licensed ambient audio and custom voice recordings.

### File Placement & Naming:

1. **Ambient Cosmic Audio**:
   - **Path:** `/public/audio/ambient-space.mp3`
   - **Recommended format:** MP3 or OGG (loopable, gentle low-frequency space drone, 64–128 kbps).
   - **Default behavior:** If this file is absent, the system uses the built-in procedural Web Audio synthesizer (a soft, non-copyrighted cosmic drone). When you add this file, it will play your audio track.

2. **Section Voice Cues**:
   - Place your short spoken cues inside `/public/audio/voice/`:
     - `/public/audio/voice/cue-about.mp3` ("A little about my journey.")
     - `/public/audio/voice/cue-skills.mp3` ("Explore what I’m learning and building.")
     - `/public/audio/voice/cue-achievements.mp3` ("A few milestones along my learning journey.")
     - `/public/audio/voice/cue-contact.mp3` ("Let’s connect.")
   - **Default behavior:** If these files are absent, the system uses the browser's built-in Web Speech synthesis and accessible visual captions. When you drop these MP3 files in, the player seamlessly switches to your studio recordings.

### Rules & Privacy:
- No audio is played automatically until the visitor explicitly toggles Sound or Voice On.
- Audio volume defaults to a comfortable, gentle level (25% for ambient, 75% for voice cues).
- No audio recording or visitor tracking is performed.
