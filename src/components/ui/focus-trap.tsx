"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface FocusTrapProps {
  children: ReactNode
  isActive?: boolean
  onEscape?: () => void
}

export function FocusTrap({ children, isActive = true, onEscape }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive) return

    // Store the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Find all focusable elements within the container
    const getFocusableElements = () => {
      if (!containerRef.current) return []
      
      return Array.from(
        containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
        )
      ).filter((el) => !el.hasAttribute('disabled')) as HTMLElement[]
    }

    const focusableElements = getFocusableElements()
    
    if (focusableElements.length === 0) return

    // Focus the first element
    focusableElements[0].focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      if (event.key === 'Tab') {
        event.preventDefault()
        
        const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
        let nextIndex: number

        if (event.shiftKey) {
          // Shift + Tab: move backwards
          nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1
        } else {
          // Tab: move forwards
          nextIndex = currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1
        }

        focusableElements[nextIndex].focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      
      // Restore focus to the previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [isActive, onEscape])

  return (
    <div ref={containerRef} tabIndex={-1}>
      {children}
    </div>
  )
}

// Hook for managing focus in modals
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement | null>(null)

  const setInitialFocus = (element: HTMLElement | null) => {
    if (element) {
      focusRef.current = document.activeElement as HTMLElement
      element.focus()
    }
  }

  const restoreFocus = () => {
    if (focusRef.current) {
      focusRef.current.focus()
      focusRef.current = null
    }
  }

  return { setInitialFocus, restoreFocus }
} 