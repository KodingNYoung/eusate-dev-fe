import { useCallback, useEffect, useState } from "react"
import tailwindConfig from "../../tailwind.config"

export function useIsMobile() {
  const screens = tailwindConfig.theme?.screens
  const size = parseInt(screens?.sm)

  const [isMobile, setIsMobile] = useState(false)

  const handleChange = useCallback((ev: MediaQueryListEvent) => {
    setIsMobile(ev.matches)
  }, [])

  useEffect(() => {
    const breakpoint = window.matchMedia(`(max-width: ${size}px)`)
    breakpoint.addEventListener("change", handleChange)
    setIsMobile(window.innerWidth <= size)

    return () => {
      breakpoint.removeEventListener("change", handleChange)
    }
  }, [handleChange, size])

  return isMobile
}
