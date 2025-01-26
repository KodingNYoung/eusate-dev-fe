"use client"

// import { getClientSession, getProcesses } from "@/lib/data/knowledge-base"
// import { useToast } from "@/providers/toastProviders"
// import { useQuery } from "@tanstack/react-query"
// import { useEffect, useRef } from "react"
// import { io, Socket } from "socket.io-client"

// export const useSourceProcesses = () => {
//   //   const toast = useToast()
//   const socket = useRef<Socket>()

//   const result = useQuery({
//     queryKey: ["processes"],
//     queryFn: async () => await getProcesses(),
//   })

//   useEffect(() => {
//     ;(async () => {
//       const session = await getClientSession()
//       const _socket = io(`http://0.0.0.0:8000/library`, {
//         transports: ["websocket"],
//         query: {
//           token: session?.accessToken,
//           organisation_id: session?.organisationId,
//         },
//         retries: 0,
//         reconnectionAttempts: 0,
//       })

//       socket.current = _socket

//       _socket.on("connect", () => console.log("connected"))

//       _socket.on("connect_error", (e) => console.log("Connect error:", e))

//       _socket.on("disconnect", () => console.log("Disconnected"))

//       _socket.on("resource", (data) => console.log("Resource", data))
//     })()
//     // return () => {
//     //   console.log("hello")
//     //   socket.current?.disconnect()
//     // }
//   }, [])

//   return result
// }
