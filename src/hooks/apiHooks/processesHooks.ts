"use client"

import { toaster } from "@/components/molecules/Toast"
import { getProcesses } from "@/lib/data/knowledge-base"
import { useQuery } from "@tanstack/react-query"
// import { useEffect, useRef } from "react"
// import { io, Socket } from "socket.io-client"
// import { useCookie } from "./storage"
// import { COOKIES_KEYS } from "@/utils/constants"

export const useSourceProcesses = () => {
  const result = useQuery({
    queryKey: ["processes"],
    queryFn: async () => await getProcesses(),
  })

  if (result.isError) {
    toaster.error(result.error.message)
  }

  return result
}

export const useProcessWithSocket = () => {
  //   const socket = useRef<Socket>()
  const result = useSourceProcesses()
  //   const { data, refetch: fetchSession } = useCookie(COOKIES_KEYS.SESSION)
  //   useEffect(() => {
  //     fetchSession()
  //     ;(async () => {
  //       if (socket.current) return
  //       console.log(data)
  //       const _socket = io("http://0.0.0.0:8000/library", {
  //         autoConnect: true,
  //         transports: ["websocket"],
  //         query: {
  //           token: session?.accessToken,
  //           organisation_id: session?.organisationId,
  //         },
  //       })
  //       _socket.on("disconnect", () => console.log("Disconnected"))
  //       _socket.on("resource", () => {
  //         result.refetch()
  //       })
  //       socket.current = _socket
  //     })()
  //     return () => {
  //       socket.current?.disconnect()
  //     }
  //   }, [])
  return result
}
