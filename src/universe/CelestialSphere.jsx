import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide, BackSide, MathUtils } from 'three'
import { CELESTIAL_NODES } from '../data/celestialNodes'

/**
 * CelestialSphere Component
 * Renders the central, futuristic, transparent glass-like celestial sphere
 * with enhanced contrast, outer rim glow (Fresnel silhouette), subtle surface
 * coordinate rings, luminous orbital paths, and gentle cosmic rotation.
 * Responds with a subtle orientation tilt when a navigation node is hovered/focused.
 * The inner core harbors a subtle easter egg discovery interaction.
 */
export default function CelestialSphere({ onDiscoverBeacon, hoveredNodeId }) {
  const sphereGroupRef = useRef()
  const ringsRef = useRef()
  const surfaceRingsRef = useRef()
  const [coreHovered, setCoreHovered] = useState(false)

  const isReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((_, delta) => {
    if (isReducedMotion) return

    // Base cosmic idle spin - calm, elegant rate
    if (sphereGroupRef.current) {
      // Subtle responsive tilt toward hovered node
      if (hoveredNodeId) {
        const targetNode = CELESTIAL_NODES.find((n) => n.id === hoveredNodeId)
        if (targetNode) {
          const targetTiltX = -targetNode.position[1] * 0.08
          const targetTiltZ = targetNode.position[0] * 0.06
          sphereGroupRef.current.rotation.x = MathUtils.damp(
            sphereGroupRef.current.rotation.x,
            targetTiltX,
            3,
            delta
          )
          sphereGroupRef.current.rotation.z = MathUtils.damp(
            sphereGroupRef.current.rotation.z,
            targetTiltZ,
            3,
            delta
          )
        }
      } else {
        // Smoothly revert tilt to neutral
        sphereGroupRef.current.rotation.x = MathUtils.damp(
          sphereGroupRef.current.rotation.x,
          0,
          2.5,
          delta
        )
        sphereGroupRef.current.rotation.z = MathUtils.damp(
          sphereGroupRef.current.rotation.z,
          0,
          2.5,
          delta
        )
      }
    }

    // Calm, subtle inner coordinate ring drift
    if (ringsRef.current) {
      ringsRef.current.rotation.z -= delta * 0.008
      ringsRef.current.rotation.x += delta * 0.005
    }

    if (surfaceRingsRef.current) {
      surfaceRingsRef.current.rotation.y += delta * 0.01
    }
  })

  return (
    <group ref={sphereGroupRef}>
      {/* Central Enhanced Glass-like Celestial Sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshPhysicalMaterial
          color="#0b1329"
          emissive="#1e1b4b"
          emissiveIntensity={0.48}
          roughness={0.14}
          metalness={0.12}
          transmission={0.65}
          thickness={1.1}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
          transparent
          opacity={0.52}
        />
      </mesh>

      {/* Outer Rim Silhouette Glow (Inverted BackSide Fresnel Ring) */}
      <mesh>
        <sphereGeometry args={[2.235, 64, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.25}
          side={BackSide}
        />
      </mesh>

      {/* Surface Coordinate Details & Equator Luminous Ring */}
      <group ref={surfaceRingsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.206, 2.216, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
            side={DoubleSide}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <ringGeometry args={[2.19, 2.198, 64]} />
          <meshBasicMaterial
            color="#818cf8"
            transparent
            opacity={0.25}
            side={DoubleSide}
          />
        </mesh>
      </group>

      {/* Subtle Inner Luminous Core (Interactive Easter Egg Beacon) */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          setCoreHovered(true)
          if (typeof document !== 'undefined') document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setCoreHovered(false)
          if (typeof document !== 'undefined') document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (onDiscoverBeacon) onDiscoverBeacon()
        }}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={coreHovered ? '#67e8f9' : '#38bdf8'}
          emissiveIntensity={coreHovered ? 2.8 : 1.35}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Outer Luminous Celestial Orbit Rings with Enhanced Visibility */}
      <group ref={ringsRef}>
        {/* Ring 1 - Cyan Equator Ring */}
        <mesh rotation={[Math.PI / 3.2, 0, 0]}>
          <ringGeometry args={[2.65, 2.675, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.55}
            side={DoubleSide}
          />
        </mesh>

        {/* Ring 2 - Violet Tilted Outer Ring */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
          <ringGeometry args={[2.95, 2.975, 64]} />
          <meshBasicMaterial
            color="#818cf8"
            transparent
            opacity={0.42}
            side={DoubleSide}
          />
        </mesh>

        {/* Ring 3 - Outer Starlight Accent Ring */}
        <mesh rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
          <ringGeometry args={[3.25, 3.265, 64]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.28}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}
