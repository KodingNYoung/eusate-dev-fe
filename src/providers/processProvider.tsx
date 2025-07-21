"use client"

import { useProcessWithSocket } from "@/hooks/api/processesHooks"
import { FC, ResourceProcess } from "@/utils/types"
import { createContext } from "react"

type ProcessContextType = {
  processes?: ResourceProcess[]
  count: number
  refetch: () => void
}

const ProcessContext = createContext<ProcessContextType>({
  processes: [],
  count: 0,
  refetch: () => {},
})

export const ProcessProvider: FC = ({ children }) => {
  const { data, refetch } = useProcessWithSocket()
  return (
    <ProcessContext.Provider
      value={{
        processes: data?.results,
        count: data?.count || 0,
        refetch,
      }}
    >
      {children}
    </ProcessContext.Provider>
  )
}

export default ProcessContext
