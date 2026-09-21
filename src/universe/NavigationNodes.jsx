import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { DoubleSide, MathUtils, Vector3 } from 'three'
import { CELESTIAL_NODES } from '../data/celestialNodes'

/**
 * NavigationNodes Component
 * Positions interactive celestial points around the central sphere representing
 * portfolio sections: About, Skills, Achievements, Contact, and locked Projects.
 * Supports smooth hover/focus micro-interactions (scale expansion, halo boost, and starlight glow),
 * and responds seamlessly to bottom dock hover and focus states.
 */

function SingleNode({ node, onSelectNode, hoveredNodeId, onHoverNode }) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef()
  const pulseRingRef = useRef()
  const badgeRef = useRef(null)
  const worldPosRef = useRef(new Vector3())
  const dirVecRef = useRef(new Vector3())
  const camDirVecRef = useRef(new Vector3())
  const lastStateRef = useRef(null)

  const isTargetHovered = hovered || hoveredNodeId === node.id

  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame(({ camera, clock }, delta) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    if (!isReducedMotion) {
      // Subtle float animation
      meshRef.current.position.y = node.position[1] + Math.sin(t * 1.5 + node.position[0]) * 0.06

      // Smooth spring/lerp scaling of node when hovered via canvas or dock
      const targetScale = isTargetHovered ? 1.35 : 1.0
      meshRef.current.scale.x = MathUtils.damp(meshRef.current.scale.x, targetScale, 6, delta)
      meshRef.current.scale.y = MathUtils.damp(meshRef.current.scale.y, targetScale, 6, delta)
      meshRef.current.scale.z = MathUtils.damp(meshRef.current.scale.z, targetScale, 6, delta)

      // Smooth halo ring expansion
      if (pulseRingRef.current) {
        const targetRingScale = isTargetHovered ? 1.4 : 1.0
        pulseRingRef.current.scale.x = MathUtils.damp(pulseRingRef.current.scale.x, targetRingScale, 6, delta)
        pulseRingRef.current.scale.y = MathUtils.damp(pulseRingRef.current.scale.y, targetRingScale, 6, delta)
        pulseRingRef.current.scale.z = MathUtils.damp(pulseRingRef.current.scale.z, targetRingScale, 6, delta)
      }
    }

    // Progressive viewing-angle visibility calculation
    if (badgeRef.current) {
      if (isReducedMotion) {
        if (lastStateRef.current !== 'is-prominent') {
          lastStateRef.current = 'is-prominent'
          badgeRef.current.classList.remove('is-dimmed', 'is-hidden')
          badgeRef.current.classList.add('is-prominent')
        }
      } else {
        meshRef.current.getWorldPosition(worldPosRef.current)
        dirVecRef.current.copy(worldPosRef.current).normalize()
        camDirVecRef.current.copy(camera.position).normalize()
        const dot = dirVecRef.current.dot(camDirVecRef.current)

        let nextState = 'is-hidden'
        if (isTargetHovered || dot > 0.44) {
          nextState = 'is-prominent'
        } else if (dot > 0.12) {
          nextState = 'is-dimmed'
        } else {
          nextState = 'is-hidden'
        }

        if (lastStateRef.current !== nextState) {
          lastStateRef.current = nextState
          badgeRef.current.classList.remove('is-prominent', 'is-dimmed', 'is-hidden')
          badgeRef.current.classList.add(nextState)
        }
      }
    }
  })

  const handlePointerEnter = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setHovered(true)
    if (onHoverNode) onHoverNode(node.id)
  }

  const handlePointerLeave = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    setHovered(false)
    if (onHoverNode) onHoverNode(null)
  }

  const handleClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation()
    onSelectNode(node)
  }

  return (
    <group ref={meshRef} position={node.position}>
      {/* 3D Glowing Core Sphere */}
      <mesh
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isTargetHovered ? 3.2 : 1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Halo Ring 1 - Base */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.25, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isTargetHovered ? 0.95 : 0.4}
          side={DoubleSide}
        />
      </mesh>

      {/* Secondary Pulse Ring for Micro-interaction on Hover */}
      <mesh
        ref={pulseRingRef}
        rotation={[Math.PI / 3, Math.PI / 6, 0]}
      >
        <ringGeometry args={[0.27, 0.285, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isTargetHovered ? 0.75 : 0.15}
          side={DoubleSide}
        />
      </mesh>

      {/* Accessible Interactive HTML Anchor & Label */}
      <Html
        center
        distanceFactor={13}
        zIndexRange={[100, 0]}
        className="celestial-node-html"
      >
        <button
          ref={badgeRef}
          type="button"
          className={`celestial-node-badge is-dimmed ${node.locked ? 'is-locked' : ''} ${
            isTargetHovered ? 'is-hovered is-dock-highlighted' : ''
          }`}
          onClick={handleClick}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          onFocus={handlePointerEnter}
          onBlur={handlePointerLeave}
          aria-label={
            node.locked
              ? `${node.title} (Locked — Under Private Development)`
              : `Navigate to ${node.title}`
          }
        >
          <span
            className="node-status-dot"
            style={{
              backgroundColor: node.color,
              boxShadow: `0 0 ${isTargetHovered ? '14px' : '8px'} ${node.color}`,
            }}
            aria-hidden="true"
          />
          <span className="node-label-text">{node.title}</span>
          {node.locked && (
            <span className="node-locked-pill" title="Under private development">
              Locked
            </span>
          )}
        </button>
      </Html>
    </group>
  )
}

export default function NavigationNodes({ onSelectNode, hoveredNodeId, onHoverNode }) {
  return (
    <group>
      {CELESTIAL_NODES.map((node) => (
        <SingleNode
          key={node.id}
          node={node}
          onSelectNode={onSelectNode}
          hoveredNodeId={hoveredNodeId}
          onHoverNode={onHoverNode}
        />
      ))}
    </group>
  )
}
