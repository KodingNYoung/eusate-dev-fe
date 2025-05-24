import { useSession } from "@/hooks/api/sessionHooks"
import { API_BASEURL } from "@/utils/constants"
import { MessageSenders } from "@/utils/enums"
import { AttachmentMetadata } from "@/utils/types"
import { useCallback, useEffect, useRef } from "react"
import { io, Socket } from "socket.io-client"

enum SocketEvents {
  SEND_MESSAGE = "agent_support",
  MARK_CONVERSATION_READ = "mark_conversation_read",
  JOIN_CHAT = "enter_support",
  DISCONNECT = "disconnect",
  CONNECT = "connect",
}

export const useChatSocket = (
  chatId?: string,
  cb?: { onmessage?: (message: unknown) => void }
) => {
  const { onmessage } = cb || {}

  const socket = useRef<Socket | null>(null)
  const session = useSession()

  const emitMessage = useCallback(
    (message: string, attachment?: AttachmentMetadata) => {
      if (!socket.current) return
      const payload = {
        message,
        ticket_chat_id: chatId,
        attachment: !!attachment,
        attachment_meta: attachment || null,
      }

      socket.current.emit(SocketEvents.SEND_MESSAGE, payload)

      return payload
    },
    [chatId]
  )

  const emitRead = useCallback((chatId: string) => {
    console.log("Read chat", chatId)
    if (!socket.current || !chatId) return
    const payload = {
      ticket_chat_id: chatId,
      entity: MessageSenders.AGENT,
    }
    socket.current.emit(SocketEvents.MARK_CONVERSATION_READ, payload)
  }, [])

  useEffect(() => {
    if (!API_BASEURL || socket.current || !session || !chatId) return
    console.log(chatId, session, onmessage)

    const _socket = io(`${API_BASEURL}/helpdesk`, {
      autoConnect: true,
      transports: ["websocket"],
      query: {
        token_source: "inapp",
        token: session.accessToken,
        organisation_id: session.organisationId,
      },
    })

    _socket.on(SocketEvents.DISCONNECT, () => console.log("Disconnected"))
    _socket.on(SocketEvents.SEND_MESSAGE, (data: unknown) => {
      if (onmessage) onmessage(data)
    })
    _socket.on(SocketEvents.CONNECT, () =>
      _socket.emit(SocketEvents.JOIN_CHAT, { ticket_chat_id: chatId })
    )
    socket.current = _socket

    return () => {
      // emit close event to server
      socket.current?.close()
      socket.current = null
      console.log("Socket disconnected")
    }
  }, [chatId, session])

  return { emitMessage, emitRead }
}
