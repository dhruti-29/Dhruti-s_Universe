import { useEffect, useRef } from 'react'

/**
 * useModalFocus Hook
 * Implements accessible W3C dialog behavior:
 * 1. Focus trap (Tab / Shift+Tab cycling inside the dialog)
 * 2. Escape key dismissal
 * 3. Focus restoration to the previous active element on close
 */
export default function useModalFocus(isOpen, onClose, initialFocusRef) {
  const containerRef = useRef(null)
  const previousActiveElementRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    previousActiveElementRef.current = document.activeElement

    // Initial focus with slight delay to ensure DOM is ready
    const focusTimer = setTimeout(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else if (containerRef.current) {
        const focusable = containerRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) {
          focusable[0].focus()
        }
      }
    }, 20)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === 'Tab' && containerRef.current) {
        const focusable = Array.from(
          containerRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null) // visible only

        if (focusable.length === 0) return

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
      // Restore focus to trigger element
      if (
        previousActiveElementRef.current &&
        typeof previousActiveElementRef.current.focus === 'function'
      ) {
        try {
          previousActiveElementRef.current.focus()
        } catch {
          // Ignore focus errors
        }
      }
    }
  }, [isOpen, onClose, initialFocusRef])

  return containerRef
}
