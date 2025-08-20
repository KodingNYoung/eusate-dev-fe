"use client"

import { toaster } from "@/components/molecules/Toast"
import { getProcesses } from "@/lib/data/knowledge-base"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSocket } from "../sockets"
import { useEffect } from "react"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { ResourceProcess } from "@/utils/types"
import { ResourceProcessStatus } from "@/utils/enums"

export const useSourceProcesses = () => {
  const result = useQuery({
    queryKey: ["processes"],
    queryFn: async () => await getProcesses(),
    staleTime: Infinity, // so the processes don't refetch until it is invalidated or
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useProcessWithSocket = () => {
  const result = useSourceProcesses()
  const queryClient = useQueryClient()

  const { isConnected, socket } = useSocket("/library")

  useEffect(() => {
    if (!socket || !isConnected) return

    socket.on(
      "resource",
      (data: {
        data: ResourceProcess
        message: string
        status_code: number
      }) => {
        if (data?.data?.status === ResourceProcessStatus.INGESTED) {
          if (data?.status_code === 200) {
            toaster.success(data.message)
          } else {
            toaster.error(data.message)
          }
        }
        result.refetch()
        queryClient.invalidateQueries({
          queryKey: QUERY_FN_KEYS.KNOWLEDGE_BASE_RESOURCES,
          exact: false,
        })
      }
    )
  }, [socket, isConnected, queryClient])
  return { ...result, isConnected, socket }
}
