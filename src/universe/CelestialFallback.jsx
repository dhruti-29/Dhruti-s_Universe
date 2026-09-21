import { useEffect, useRef } from 'react'
import { CELESTIAL_NODES } from '../data/celestialNodes'

/**
 * CelestialFallback Component
 * Renders a lightweight, high-performance 2D Canvas & CSS celestial universe
 * when WebGL is unavailable or disabled in the user's browser.
 * Ensures zero blank screens and maintains 100% feature and interactive parity.
 * Respects prefers-reduced-motion and supports beacon easter egg discovery.
 */
export default function CelestialFallback({ onSelectNode, onDiscoverBeacon }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.22

      // Draw Outer Luminous Halo
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.2,
        centerX,
        centerY,
        radius * 1.3
      )
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.14)')
      gradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.08)')
      gradient.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2)
      ctx.fill()

      // Central Transparent Celestial Sphere
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Orbital Rings (Ellipses)
      ctx.save()
      ctx.translate(centerX, centerY)

      // Ring 1
      ctx.rotate(0.4)
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.35)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.25, radius * 0.45, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Ring 2
      ctx.rotate(-0.8)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)'
      ctx.beginPath()
      ctx.ellipse(0, 0, radius * 1.35, radius * 0.4, 0, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()

      // Inner Core Glow (Beacon)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#38bdf8'
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      if (!isReducedMotion) {
        animId = requestAnimationFrame(render)
      }
    }

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      render()
    }
    window.addEventListener('resize', handleResize)

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="celestial-fallback-container">
      <canvas ref={canvasRef} className="fallback-canvas" aria-hidden="true" />

      {/* Accessible Navigation Grid Overlay */}
      <div className="fallback-nodes-overlay">
        <div className="fallback-notice-pill">
          <span>WebGL Acceleration Unavailable — 2D Celestial Fallback Active</span>
          {onDiscoverBeacon && (
            <button
              type="button"
              className="fallback-beacon-btn"
              onClick={onDiscoverBeacon}
              title="Connect to Celestial Beacon"
              aria-label="Discover Celestial Beacon"
            >
              ✦ Celestial Beacon
            </button>
          )}
        </div>

        <div className="fallback-nodes-list" role="navigation" aria-label="Celestial nodes directory">
          {CELESTIAL_NODES.map((node) => (
            <button
              key={node.id}
              type="button"
              className={`fallback-node-card ${node.locked ? 'is-locked' : ''}`}
              onClick={() => onSelectNode(node)}
              aria-label={
                node.locked
                  ? `${node.title} (Locked — Under Private Development)`
                  : `Open ${node.title} section`
              }
            >
              <div className="fallback-node-header">
                <span
                  className="fallback-dot"
                  style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
                  aria-hidden="true"
                />
                <span className="fallback-title">{node.title}</span>
                {node.locked && <span className="fallback-lock-tag">Locked</span>}
              </div>
              <p className="fallback-desc">{node.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
