"use client"

// import { getClientSession, getProcesses } from "@/lib/data/knowledge-base"
// import { useToast } from "@/providers/toastProviders"
// import { useQuery } from "@tanstack/react-query"
// import { useEffect, useRef } from "react"
// import { io, Socket } from "socket.io-client"

export const useSourceProcesses = () => {
  //   const toast = useToast()
  //   const socket = useRef<Socket>()
  //   const result = useQuery({
  //     queryKey: ["processes"],
  //     queryFn: async () => await getProcesses(),
  //   })
  //   useEffect(() => {
  // ;(async () => {
  //   if (socket.current) return
  //   const session = await getClientSession()
  //   const _socket = io(`http://0.0.0.0:8000/library`, {
  //     autoConnect: false,
  //     transports: ["websocket"],
  //     query: {
  //       token: session?.accessToken,
  //       organisation_id: session?.organisationId,
  //     },
  //     reconnectionAttempts: 1,
  //     reconnectionDelay: 20000000,
  //   })
  //   _socket.connect()
  //   _socket.on("connection", (e) => {
  //     console.log("connection", e)
  //   })
  //   _socket.on("ping", (e) => console.log("ping", e))
  //   _socket.on("connect", () => console.log("connected"))
  //   _socket.on("connect_error", (e) => console.log("Connect error:", e))
  //   _socket.on("disconnect", (e: any) => console.log("Disconnected", e))
  //   _socket.on("resource", (data: any) => console.log("Resource", data))
  //   console.log(_socket)
  //   socket.current = _socket
  // })()
  // return () => {
  //   console.log("hello")
  //   console.log(socket.current)
  //   socket.current?.disconnect()
  // }
  //   }, [])
  //   return result
}
