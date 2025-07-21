import ProcessContext from "@/providers/processProvider"
import { useContext } from "react"

export const useProcesses = () => {
  const context = useContext(ProcessContext)
  if (!context)
    throw new Error("useProcesses should be called inside a ProcessProvider")

  return context
}
