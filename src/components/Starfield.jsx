import { useEffect, useRef } from 'react'

/**
 * Starfield Component
 * Renders an optimized 2D canvas of luminous stars with gentle twinkling
 * and subtle parallax movement based on desktop pointer interaction.
 * Gracefully respects prefers-reduced-motion and document visibility.
 */

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isReducedMotion = reducedMotionQuery.matches

    const handleMotionChange = (e) => {
      isReducedMotion = e.matches
      if (isReducedMotion && animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        renderSingleFrame()
      } else if (!isReducedMotion) {
        render()
      }
    }
    reducedMotionQuery.addEventListener('change', handleMotionChange)

    const pointerFineQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const canHover = pointerFineQuery.matches

    // Star generation
    const STAR_COUNT = 130
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.8 + 0.2, // Depth determines parallax intensity
    }))

    // Mouse parallax tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 2
      targetMouseY = (e.clientY / height - 0.5) * 2
    }

    if (canHover && !isReducedMotion) {
      window.addEventListener('pointermove', handlePointerMove)
    }

    let tick = 0

    const drawStars = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        let alpha = star.baseAlpha
        if (!isReducedMotion) {
          alpha += Math.sin(tick * star.twinkleSpeed + star.phase) * 0.25
        }
        alpha = Math.max(0.15, Math.min(1, alpha))

        let posX = star.x * width
        let posY = star.y * height

        if (canHover && !isReducedMotion) {
          posX += currentMouseX * 25 * star.depth
          posY += currentMouseY * 25 * star.depth
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(posX, posY, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // Soft halo on brighter stars
        if (star.radius > 1.4 && alpha > 0.6) {
          ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.25})`
          ctx.beginPath()
          ctx.arc(posX, posY, star.radius * 2.8, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const renderSingleFrame = () => {
      drawStars()
    }

    // Render loop
    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      tick += 1

      if (canHover && !isReducedMotion) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.04
        currentMouseY += (targetMouseY - currentMouseY) * 0.04
      }

      drawStars()

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      if (isReducedMotion) {
        renderSingleFrame()
      }
    }
    window.addEventListener('resize', handleResize)

    if (isReducedMotion) {
      renderSingleFrame()
    } else {
      render()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      reducedMotionQuery.removeEventListener('change', handleMotionChange)
      if (canHover) {
        window.removeEventListener('pointermove', handlePointerMove)
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="starfield-canvas"
        aria-hidden="true"
      />
      <div className="ambient-glow" aria-hidden="true" />
    </>
  )
}
