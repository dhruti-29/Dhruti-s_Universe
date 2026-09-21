import { useState, useRef, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Vector3 } from 'three'
import CelestialSphere from './CelestialSphere'
import NavigationNodes from './NavigationNodes'
import CelestialFallback from './CelestialFallback'
import { isWebGLAvailable } from '../utils/webglCheck'
import { CELESTIAL_NODES } from '../data/celestialNodes'

/**
 * CameraDirector Component
 * Smoothly interpolates the camera angle toward the corresponding celestial node
 * when hovered or focused from the bottom navigation dock.
 * Yields completely to active user dragging, and smoothly reverts to the baseline position on unhover.
 */
function CameraDirector({ hoveredNodeId, isDraggingRef, controlsRef, cosmosGroupRef }) {
  const targetPos = useRef(new Vector3(0, 0, 7.8))
  const lastManualPos = useRef(new Vector3(0, 0, 7.8))
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ camera }, delta) => {
    // If user is actively dragging the canvas, record camera position and do not override
    if (isDraggingRef.current) {
      lastManualPos.current.copy(camera.position)
      return
    }

    if (hoveredNodeId) {
      const node = CELESTIAL_NODES.find((n) => n.id === hoveredNodeId)
      if (node) {
        const [nx, ny, nz] = node.position
        const theta = cosmosGroupRef?.current ? cosmosGroupRef.current.rotation.y : 0

        // Synchronized world position rotated by theta around Y
        const cosT = Math.cos(theta)
        const sinT = Math.sin(theta)
        const wx = nx * cosT + nz * sinT
        const wy = ny
        const wz = -nx * sinT + nz * cosT

        const dist = Math.sqrt(wx * wx + wy * wy + wz * wz)
        const dirX = wx / dist
        const dirY = wy / dist
        const dirZ = wz / dist

        // Restrain vertical angle to stay strictly within OrbitControls bounds
        const clampedDirY = Math.max(-0.35, Math.min(0.35, dirY))
        const hDist = Math.sqrt(Math.max(0.001, 1 - clampedDirY * clampedDirY))
        const hLen = Math.sqrt(dirX * dirX + dirZ * dirZ)
        const scale = hLen > 0.001 ? hDist / hLen : 1

        targetPos.current.set(
          dirX * scale * 7.8,
          clampedDirY * 7.8,
          dirZ * scale * 7.8
        )
      }
    } else {
      // Revert smoothly to position before dock hover was initiated
      targetPos.current.copy(lastManualPos.current)
    }

    if (isReducedMotion) {
      camera.position.copy(targetPos.current)
    } else {
      camera.position.lerp(targetPos.current, Math.min(1, delta * 3.8))
    }
    camera.lookAt(0, 0, 0)

    if (controlsRef.current) {
      controlsRef.current.update()
    }
  })

  return null
}

/**
 * Robust Error Boundary to catch any WebGL context or R3F runtime errors
 * and gracefully fall back to the 2D canvas view.
 */
class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL Rendering Error intercepted, switching to Fallback:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <CelestialFallback
          onSelectNode={this.props.onSelectNode}
          onDiscoverBeacon={this.props.onDiscoverBeacon}
        />
      )
    }
    return this.props.children
  }
}

function SynchronizedCosmos({
  onDiscoverBeacon,
  activeFocusId,
  handleSelectNode,
  setCanvasHoveredId,
  cosmosGroupRef,
}) {
  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((_, delta) => {
    // Calm, slow, elegant cosmic movement: 0.02 rad/sec
    if (!isReducedMotion && cosmosGroupRef.current) {
      cosmosGroupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={cosmosGroupRef}>
      {/* Central Transparent Celestial Glass Sphere with Core Discovery */}
      <CelestialSphere
        onDiscoverBeacon={onDiscoverBeacon}
        hoveredNodeId={activeFocusId}
      />

      {/* Orbiting Interactive Section Nodes */}
      <NavigationNodes
        onSelectNode={handleSelectNode}
        hoveredNodeId={activeFocusId}
        onHoverNode={setCanvasHoveredId}
      />
    </group>
  )
}

/**
 * UniverseCanvas Component
 * Orchestrates the full 3D celestial environment with central glass sphere,
 * orbiting navigation nodes, distant starfield, holographic drag-to-rotate guide,
 * and graceful 2D fallback.
 */
export default function UniverseCanvas({ onSelectNode, onDiscoverBeacon, hoveredNodeId }) {
  const [webGLSupported] = useState(() => isWebGLAvailable())
  const [hasInteracted, setHasInteracted] = useState(false)
  const [canvasHoveredId, setCanvasHoveredId] = useState(null)
  const isDraggingRef = useRef(false)
  const controlsRef = useRef(null)
  const cosmosGroupRef = useRef(null)

  const activeFocusId = hoveredNodeId || canvasHoveredId

  const handleSelectNode = (node) => {
    setCanvasHoveredId(node.id)
    if (onSelectNode) onSelectNode(node)
  }

  if (!webGLSupported) {
    return (
      <CelestialFallback
        onSelectNode={onSelectNode}
        onDiscoverBeacon={onDiscoverBeacon}
      />
    )
  }

  return (
    <WebGLErrorBoundary
      onSelectNode={onSelectNode}
      onDiscoverBeacon={onDiscoverBeacon}
    >
      <div
        className="universe-canvas-wrapper"
        onPointerDown={() => setHasInteracted(true)}
        onTouchStart={() => setHasInteracted(true)}
      >
        {/* Futuristic Holographic Drag-to-Rotate Instruction Overlay */}
        <div
          className={`drag-instruction-overlay ${hasInteracted ? 'is-dismissed' : ''}`}
          aria-hidden="true"
        >
          <div className="drag-instruction-card">
            <div className="drag-instruction-icon-wrap">
              <svg
                className="drag-circular-arrow-svg"
                viewBox="0 0 100 100"
                width="44"
                height="44"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="36"
                  className="orbit-track"
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.35)"
                  strokeWidth="2.5"
                  strokeDasharray="4 6"
                />
                <path
                  d="M 50 14 A 36 36 0 0 1 86 50"
                  className="orbit-active-arc"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon
                  points="86,43 94,52 82,52"
                  className="orbit-arrowhead"
                  fill="#38bdf8"
                />
              </svg>
            </div>
            <div className="drag-instruction-text-group">
              <span className="drag-instruction-title">DRAG TO ROTATE</span>
              <span className="drag-instruction-subtitle desktop-only">
                Move your cursor or drag in a circular motion
              </span>
              <span className="drag-instruction-subtitle mobile-only">
                Touch and drag to rotate
              </span>
            </div>
          </div>
        </div>

        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            {/* Restrained Cosmic Lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[6, 8, 6]}
              intensity={1.4}
              color="#e0e7ff"
            />
            <pointLight
              position={[-6, -4, -4]}
              intensity={1.1}
              color="#38bdf8"
            />

            {/* Distant 3D Celestial Starfield */}
            <Stars
              radius={60}
              depth={40}
              count={1200}
              factor={3}
              saturation={0}
              fade
              speed={0.4}
            />

            {/* Synchronized Calm Cosmic Rotation Group (Sphere + Nodes) */}
            <SynchronizedCosmos
              onDiscoverBeacon={onDiscoverBeacon}
              activeFocusId={activeFocusId}
              handleSelectNode={handleSelectNode}
              setCanvasHoveredId={setCanvasHoveredId}
              cosmosGroupRef={cosmosGroupRef}
            />

            {/* Hover-Responsive Smooth Camera Director */}
            <CameraDirector
              hoveredNodeId={activeFocusId}
              isDraggingRef={isDraggingRef}
              controlsRef={controlsRef}
              cosmosGroupRef={cosmosGroupRef}
            />

            {/* Smooth, Restrained Mouse Exploration Controls */}
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.06}
              rotateSpeed={0.35}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 2.5}
              onStart={() => {
                isDraggingRef.current = true
                setHasInteracted(true)
              }}
              onEnd={() => {
                isDraggingRef.current = false
              }}
            />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
