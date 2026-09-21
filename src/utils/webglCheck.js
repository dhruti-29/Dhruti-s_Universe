/**
 * Checks whether WebGL (v1 or v2) is supported and operational
 * in the current browser environment.
 */
export function isWebGLAvailable() {
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}
