"use client"

import { useAuth } from "@/providers/authProvider"
import { API_BASEURL } from "@/utils/constants"
import { useEffect, useMemo, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"

type SocketEventHandlers = {
  disconnect?: (reason: string, socket?: Socket) => void
  connect?: (socket: Socket) => void
  connect_error?: (error: Error, socket?: Socket) => void
}
type SocketOptions = {
  query?: Record<string, string | number | boolean | undefined>
  autoConnect?: boolean
  transports?: string[]
  events?: SocketEventHandlers
}

// Move defaults outside to ensure stable references
const DEFAULT_TRANSPORTS = ["websocket"]
const DEFAULT_QUERY = {}

export const useSocket = (
  namespace: `/${string}`,
  options: SocketOptions = {}
) => {
  const {
    query: customQuery = DEFAULT_QUERY,
    autoConnect = true,
    transports = DEFAULT_TRANSPORTS,
    events,
  } = options

  const { user, accessToken, refreshAccessToken } = useAuth()

  const connectionAttemptsRef = useRef(0)
  const socketRef = useRef<Socket | null>(null)

  const [isConnected, setIsConnected] = useState(false)

  const query = useMemo(
    () => ({
      organisation_id: user?.organisationId || "",
      token: accessToken || "",
      ...customQuery,
    }),
    [accessToken, user?.organisationId, customQuery]
  )

  // EFFECTS ---------
  useEffect(() => {
    const connectionId = ++connectionAttemptsRef.current

    if (!user?.organisationId || !accessToken) return

    // clean up any existing connections
    if (socketRef.current?.connected) {
      socketRef.current?.disconnect()
    }

    const socket = io(`${API_BASEURL}${namespace}`, {
      autoConnect,
      transports,
      query,
    })

    // Race condition protector
    if (connectionId === connectionAttemptsRef.current) {
      socketRef.current = socket
    } else {
      socket.disconnect()
      return
    }

    // events
    socket.on("disconnect", (reason) => {
      setIsConnected(false)
      if (events?.disconnect) events.disconnect(reason, socket)
    })
    socket.on("connect", () => {
      setIsConnected(true)
      if (events?.connect) events.connect(socket)
    })
    socket.on("connect_error", async (err) => {
      // Extract the data body
      let error
      try {
        error = JSON.parse(err.message)
      } catch {
        error = {}
      }

      try {
        // check the error code and if it's a 401, refresh the access token
        if (error.status_code === 401) {
          const refreshSuccess = await refreshAccessToken()
          if (!refreshSuccess) throw new Error("Session expired")
        } else {
          // else, call the event handler for connection error and throw error
          if (events?.connect_error) events.connect_error(err)
          throw new Error(error.message)
        }
      } catch {
        socket.disconnect()
        setIsConnected(false)
      }
    })

    return () => {
      if (connectionId === connectionAttemptsRef.current) {
        // emit close event to server
        socket.disconnect()
        socketRef.current = null
        setIsConnected(false)
      }
    }
  }, [user?.organisationId, autoConnect, transports, query, events])

  useEffect(() => {
    if (socketRef.current && accessToken && user?.organisationId) {
      socketRef.current.io.opts.query = {
        organisation_id: user.organisationId,
        token: accessToken,
        ...customQuery,
      }

      if (socketRef.current.connected) {
        socketRef.current.disconnect()
      }

      socketRef.current.connect()
      setIsConnected(true)
    }
  }, [accessToken, customQuery])

  return {
    isConnected,
    socket: socketRef.current,
  }
}
