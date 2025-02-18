import { PlaygroundContext } from "@/providers/playgroundProvider"
import { useContext } from "react"

export const usePlayground = () => {
  const context = useContext(PlaygroundContext)
  if (!context) {
    throw new Error(
      "usePlayground should be called inside a PlaygroundProvider"
    )
  }
  return context
}
