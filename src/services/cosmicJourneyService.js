/**
 * Cosmic Journey Tracking Service
 * “DHRUTI — The Living Intelligence Universe”
 *
 * Tracks the visitor's authentic exploration journey across celestial sectors
 * strictly during the current browser session.
 *
 * Privacy & Integrity Standards:
 * 1. 100% session-only tracking via sessionStorage (with in-memory fallback).
 * 2. Zero Firebase, backend database, or third-party analytics services.
 * 3. Never fingerprints visitors, sets cookies, or collects personal information.
 * 4. Only increments on actual user interaction with distinct portfolio sectors.
 * 5. Prevents duplicate counting from re-renders, page refreshes, or repeated clicks.
 * 6. Keeps the Projects section strictly locked with zero private details revealed.
 */

export const PUBLIC_SECTORS = [
  {
    id: 'about',
    name: 'About Me',
    planetTitle: 'About Planet',
    color: '#38bdf8', // Cyan
    icon: '🪐',
    domain: 'Philosophy & Personal Journey',
    description: 'Background, personal direction, and the living intelligence philosophy.',
  },
  {
    id: 'skills',
    name: 'Skills & Knowledge',
    planetTitle: 'Skills Planet',
    color: '#818cf8', // Indigo / Violet
    icon: '⚡',
    domain: 'Core Computer Science & Programming',
    description: 'Honest learning stages in C, C++, DSA, Python, Java, and Web Development.',
  },
  {
    id: 'journey',
    name: 'Learning Journey',
    planetTitle: 'Journey Planet',
    color: '#c084fc', // Lavender / Purple
    icon: '🚀',
    domain: 'Evolution & Milestones',
    description: 'Foundations in C/C++, web standards, introductory Java, and active learning in DSA & Python.',
  },
  {
    id: 'achievements',
    name: 'Achievements',
    planetTitle: 'Achievements Planet',
    color: '#f59e0b', // Amber Starlight
    icon: '🏆',
    domain: 'Academic Highlights & Milestones',
    description: 'Academic highlights, CodeAlpha internship, HackerRank, SSIP, and SIH.',
  },
  {
    id: 'contact',
    name: 'Contact & Connect',
    planetTitle: 'Contact Planet',
    color: '#34d399', // Emerald
    icon: '✉️',
    domain: 'Transmission Channels',
    description: 'Direct email channel, verified social networks, and live transmission form.',
  },
]

export const LOCKED_SECTOR = {
  id: 'projects',
  name: 'Projects (Private Development)',
  planetTitle: 'Projects Sector',
  color: '#94a3b8', // Slate
  icon: '🔒',
  domain: 'Confidential Engineering',
  description: 'Under active private development on GitHub. Strictly locked—no repositories, demo links, or code exposed.',
  locked: true,
}

export const SECRET_BEACON_SECTOR = {
  id: 'beacon',
  name: 'Celestial Core Beacon',
  planetTitle: 'Core Beacon',
  color: '#e0e7ff', // Cosmic Starlight
  icon: '✦',
  domain: 'Core Transmission Easter Egg',
  description: 'Hidden starlight transmission discovered inside the celestial sphere core.',
  isBonus: true,
}

/**
 * Collection of thoughtful, authentic cosmic inspiration quotes
 */
export const COSMIC_INSPIRATIONAL_MESSAGES = [
  {
    id: 1,
    quote: 'Curiosity is the engine of intellectual gravity—pulling us forward toward deeper understanding.',
    theme: 'Curiosity',
  },
  {
    id: 2,
    quote: 'Every line of code is a coordinate charted in an ever-expanding personal universe.',
    theme: 'Exploration',
  },
  {
    id: 3,
    quote: 'Small, disciplined daily orbits create vast astronomical milestones over time.',
    theme: 'Progress',
  },
  {
    id: 4,
    quote: 'The cosmos rewards those who dare to explore with patience, humbleness, and genuine dedication.',
    theme: 'Dedication',
  },
  {
    id: 5,
    quote: 'Continuous learning is the radiant light that pierces through unknown horizons.',
    theme: 'Growth',
  },
  {
    id: 6,
    quote: 'In a vast cosmos of technology, true craftsmanship begins with honest self-improvement.',
    theme: 'Craftsmanship',
  },
  {
    id: 7,
    quote: 'Knowledge expands endlessly—stay curious, stay focused, and stay always in progress.',
    theme: 'Always In Progress',
  },
  {
    id: 8,
    quote: 'True strength is not reaching the destination fast, but growing with every single orbit.',
    theme: 'Perseverance',
  },
]

const SESSION_EXPLORED_KEY = 'dhruti_cosmic_journey_explored_v1'

// In-memory fallback if sessionStorage is blocked or unavailable
let inMemoryExploredSet = new Set()

/**
 * Retrieve explored sector IDs from sessionStorage with in-memory fallback
 * @returns {Set<string>}
 */
export function getExploredSectorIds() {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const data = sessionStorage.getItem(SESSION_EXPLORED_KEY)
      if (data) {
        const parsed = JSON.parse(data)
        if (Array.isArray(parsed)) {
          return new Set(parsed)
        }
      }
    }
  } catch {
    // In restricted iframes or privacy modes, yield in-memory fallback
  }
  return new Set(inMemoryExploredSet)
}

/**
 * Persist explored sector IDs to sessionStorage with in-memory fallback
 * @param {Set<string>} set
 */
function saveExploredSectorIds(set) {
  inMemoryExploredSet = new Set(set)
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(SESSION_EXPLORED_KEY, JSON.stringify(Array.from(set)))
    }
  } catch {
    // Graceful fallback
  }
}

/**
 * Record a newly explored section during this browser session.
 * Strictly ignores repeated clicks, re-renders, or invalid IDs.
 * @param {string} sectorId
 * @returns {boolean} Whether this was a newly explored sector
 */
export function recordSectorExploration(sectorId) {
  if (!sectorId || typeof sectorId !== 'string') return false

  const currentSet = getExploredSectorIds()
  if (currentSet.has(sectorId)) {
    return false // Already discovered this session
  }

  currentSet.add(sectorId)
  saveExploredSectorIds(currentSet)

  // Dispatch custom event so any active Cosmic Explorer UI updates reactively
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('cosmic-journey-updated', {
        detail: {
          sectorId,
          exploredIds: Array.from(currentSet),
        },
      })
    )
  }

  return true
}

/**
 * Calculates current exploration statistics for the visitor's session
 */
export function getCosmicJourneyProgress() {
  const exploredSet = getExploredSectorIds()
  const publicIds = PUBLIC_SECTORS.map((s) => s.id)

  const publicExploredCount = publicIds.filter((id) => exploredSet.has(id)).length
  const totalPublicCount = publicIds.length
  const percent = Math.round((publicExploredCount / totalPublicCount) * 100)
  const isUniverseExplorerUnlocked = publicExploredCount === totalPublicCount

  const hasExploredProjects = exploredSet.has('projects')
  const hasExploredBeacon = exploredSet.has('beacon')

  return {
    exploredSet,
    publicExploredCount,
    totalPublicCount,
    percent,
    isUniverseExplorerUnlocked,
    hasExploredProjects,
    hasExploredBeacon,
    totalSectionsDiscovered: exploredSet.size,
  }
}

/**
 * Returns a random inspirational cosmic message
 * @param {number|null} excludeId - Optional ID to avoid returning the same quote twice in a row
 */
export function getRandomCosmicMessage(excludeId = null) {
  const available = excludeId
    ? COSMIC_INSPIRATIONAL_MESSAGES.filter((m) => m.id !== excludeId)
    : COSMIC_INSPIRATIONAL_MESSAGES

  const index = Math.floor(Math.random() * available.length)
  return available[index] || COSMIC_INSPIRATIONAL_MESSAGES[0]
}
