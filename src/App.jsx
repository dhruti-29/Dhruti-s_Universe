import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import Starfield from './components/Starfield'
import LoadingScreen from './components/LoadingScreen'
import WelcomeScreen from './components/WelcomeScreen'
import QuickExploreModal from './components/QuickExploreModal'
import HologramPanel from './components/HologramPanel'
import CosmicDiscoveryModal from './components/CosmicDiscoveryModal'
import AudioControls from './components/AudioControls'
import CosmicExplorer from './components/CosmicExplorer'
import AskUniverseAssistant from './components/AskUniverseAssistant'
import CosmicEasterEggs from './components/CosmicEasterEggs'
import useAudioManager from './hooks/useAudioManager'
import { playCosmicChime, playCosmicClick } from './utils/proceduralCosmicAudio'
import { CELESTIAL_NODES } from './data/celestialNodes'
import { recordSectorExploration } from './services/cosmicJourneyService'
import './styles/welcome.css'

// Code-split 3D Universe bundle for fast initial welcome screen load
const UniverseCanvas = lazy(() => import('./universe/UniverseCanvas'))

/**
 * App Root Component
 * Orchestrates the continuous experience between the Welcome Portal,
 * the 3D Celestial Universe, authentic portfolio panels, ambient sound,
 * contact & visitor telemetry, and subtle easter eggs.
 * Fully tested for responsiveness, accessibility, and performance.
 */
export default function App() {
  // Check if visitor has completed the intro during this browser session
  const [hasLoaded, setHasLoaded] = useState(() => {
    try {
      return sessionStorage.getItem('dhruti_intro_completed') === 'true'
    } catch {
      return false
    }
  })

  // View state: 'welcome' (Portal) or 'universe' (3D Celestial Sphere)
  const [viewMode, setViewMode] = useState('welcome')

  // Modal and section panel states
  const [isQuickExploreOpen, setIsQuickExploreOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false)

  // Hover state from bottom dock or focus for smooth sphere orientation
  const [hoveredNodeId, setHoveredNodeId] = useState(null)

  // Audio Manager (Ambient audio, section voice cues, accessible captions)
  const {
    isAmbientActive,
    isVoiceActive,
    areCaptionsActive,
    activeCaption,
    toggleAmbient,
    toggleVoice,
    toggleCaptions,
    triggerSectionCue,
    stopActiveVoiceCue,
  } = useAudioManager()

  const handleLoadingComplete = useCallback(() => {
    setHasLoaded(true)
    try {
      sessionStorage.setItem('dhruti_intro_completed', 'true')
    } catch {
      // Ignore storage restrictions
    }
  }, [])

  // Section selection with voice cue trigger, exploration tracking & subtle cosmic click
  const handleSelectNode = useCallback(
    (node) => {
      playCosmicClick()
      setActiveSection(node)
      recordSectorExploration(node.id)
      if (!node.locked) {
        triggerSectionCue(node.id)
      }
    },
    [triggerSectionCue]
  )

  // Close panel, play cosmic click, and stop active voice cue immediately
  const handleClosePanel = useCallback(() => {
    playCosmicClick()
    setActiveSection(null)
    stopActiveVoiceCue()
  }, [stopActiveVoiceCue])

  // Open the easter egg cosmic discovery modal with gentle chime and record beacon discovery
  const handleOpenDiscovery = useCallback(() => {
    setIsDiscoveryOpen(true)
    recordSectorExploration('beacon')
    playCosmicChime(0.1)
  }, [])

  // Open a sector directly from the Cosmic Explorer modal
  const handleOpenSectionFromExplorer = useCallback(
    (sector) => {
      const targetNode = CELESTIAL_NODES.find((n) => n.id === sector.id)
      if (targetNode) {
        setViewMode('universe')
        handleSelectNode(targetNode)
      }
    },
    [handleSelectNode]
  )

  const handleCloseDiscovery = useCallback(() => {
    playCosmicClick()
    setIsDiscoveryOpen(false)
  }, [])

  const handleOpenQuickExplore = useCallback(() => {
    playCosmicClick()
    setIsQuickExploreOpen(true)
  }, [])

  const handleCloseQuickExplore = useCallback(() => {
    playCosmicClick()
    setIsQuickExploreOpen(false)
  }, [])

  // Direct navigation callbacks from Quick Explore directory
  const handleNavigateView = useCallback((view) => {
    playCosmicClick()
    setViewMode(view)
    setActiveSection(null)
  }, [])

  const handleOpenNodeFromDirectory = useCallback(
    (nodeId) => {
      const targetNode = CELESTIAL_NODES.find((n) => n.id === nodeId)
      if (targetNode) {
        playCosmicClick()
        setViewMode('universe')
        handleSelectNode(targetNode)
      }
    },
    [handleSelectNode]
  )

  // Keyboard shortcut: Press 'b' or 'B' to discover the celestial beacon
  // Only triggers when no modal/panel is open and visitor is not typing in a form field
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeSection || isQuickExploreOpen || isDiscoveryOpen) return

      const tagName = e.target?.tagName?.toLowerCase()
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        e.target?.isContentEditable
      ) {
        return
      }

      if (e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        handleOpenDiscovery()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleOpenDiscovery, activeSection, isQuickExploreOpen, isDiscoveryOpen])

  // Reusable Audio Controls component
  const audioControlsNode = (
    <AudioControls
      isAmbientActive={isAmbientActive}
      isVoiceActive={isVoiceActive}
      areCaptionsActive={areCaptionsActive}
      activeCaption={activeCaption}
      onToggleAmbient={toggleAmbient}
      onToggleVoice={toggleVoice}
      onToggleCaptions={toggleCaptions}
    />
  )

  return (
    <>
      {/* Background Starfield - Continuous across entire experience */}
      <Starfield />

      {/* Introductory Loading Screen (Runs once per session unless reduced motion) */}
      {!hasLoaded && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* View 1: Welcome Portal */}
      {viewMode === 'welcome' && (
        <WelcomeScreen
          onOpenQuickExplore={handleOpenQuickExplore}
          onExploreUniverse={() => {
            playCosmicClick()
            setViewMode('universe')
          }}
          audioControls={audioControlsNode}
          onDiscoverBeacon={handleOpenDiscovery}
          onOpenSection={handleOpenSectionFromExplorer}
        />
      )}

      {/* View 2: 3D Celestial Universe */}
      {viewMode === 'universe' && (
        <>
          {/* 3D WebGL Canvas with graceful 2D fallback */}
          <Suspense fallback={null}>
            <UniverseCanvas
              onSelectNode={handleSelectNode}
              onDiscoverBeacon={handleOpenDiscovery}
              hoveredNodeId={hoveredNodeId}
            />
          </Suspense>

          {/* Universe Exploration UI Overlay */}
          <div className="universe-overlay-ui">
            {/* Top Navigation Bar */}
            <header className="universe-top-bar">
              <div className="universe-top-left">
                <button
                  type="button"
                  className="return-portal-btn"
                  onClick={() => {
                    playCosmicClick()
                    setViewMode('welcome')
                  }}
                  aria-label="Return to Welcome Portal"
                >
                  <span>←</span>
                  <span>Return to Portal</span>
                </button>
              </div>

              <div className="universe-status-tag">
                ✦ 3D Celestial Universe
              </div>

              <div className="universe-top-actions">
                <button
                  type="button"
                  className="quick-nav-pill beacon-pill"
                  onClick={handleOpenDiscovery}
                  title="Celestial Beacon Discovery (Press 'B')"
                  aria-label="Discover Celestial Beacon"
                >
                  <span>✦</span>
                  <span className="beacon-label-text">Beacon</span>
                </button>
                <CosmicExplorer
                  variant="pill"
                  onOpenSection={handleOpenSectionFromExplorer}
                />
                {audioControlsNode}
                <button
                  type="button"
                  className="quick-nav-pill"
                  onClick={handleOpenQuickExplore}
                  aria-label="Open portfolio directory and roadmap"
                >
                  <span>✦</span>
                  <span>Directory</span>
                </button>
              </div>
            </header>

            {/* Bottom Direct Dock for Touch / Accessibility */}
            <footer className="universe-bottom-dock">
              <span className="dock-hint-text">
                Drag sphere or select celestial node
              </span>
              <div className="dock-pills-row" role="navigation" aria-label="Celestial nodes dock">
                {CELESTIAL_NODES.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className={`dock-pill-btn ${node.locked ? 'is-locked' : ''} ${
                      hoveredNodeId === node.id ? 'is-hovered' : ''
                    }`}
                    onClick={() => handleSelectNode(node)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onFocus={() => setHoveredNodeId(node.id)}
                    onBlur={() => setHoveredNodeId(null)}
                    aria-label={
                      node.locked
                        ? `${node.title} (Locked — Under Private Development)`
                        : `Open ${node.title} node`
                    }
                  >
                    <span
                      className="dock-dot"
                      style={{ backgroundColor: node.color }}
                      aria-hidden="true"
                    />
                    <span>{node.title}</span>
                    {node.locked && <span className="node-locked-pill">Locked</span>}
                  </button>
                ))}
              </div>
            </footer>
          </div>
        </>
      )}

      {/* Hologram Section Modal (Authentic content panels) */}
      {activeSection && (
        <HologramPanel
          section={activeSection}
          onClose={handleClosePanel}
          onSelectSection={handleSelectNode}
        />
      )}

      {/* Roadmap & Quick Explore Directory Modal */}
      <QuickExploreModal
        isOpen={isQuickExploreOpen}
        onClose={handleCloseQuickExplore}
        currentView={viewMode}
        onNavigateView={handleNavigateView}
        onOpenNode={handleOpenNodeFromDirectory}
        onDiscoverBeacon={handleOpenDiscovery}
      />

      {/* Subtle Easter Egg: Cosmic Discovery Modal */}
      <CosmicDiscoveryModal
        isOpen={isDiscoveryOpen}
        onClose={handleCloseDiscovery}
      />

      {/* Hidden Cosmic Easter Eggs Layer (Secret Star, Constellation, Keyboard Secret) */}
      <CosmicEasterEggs />

      {/* Interactive Mini Assistant: Ask Dhruti's Universe */}
      <AskUniverseAssistant />
    </>
  )
}
