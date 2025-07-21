import { useSocket } from "@/hooks/sockets"
import { MessageSenders } from "@/utils/enums"
import { AttachmentMetadata } from "@/utils/types"
import { useCallback, useEffect, useMemo } from "react"
import { Socket } from "socket.io-client"

enum SocketEvents {
  SEND_MESSAGE = "agent_support",
  MARK_CONVERSATION_READ = "mark_conversation_read",
  JOIN_CHAT = "enter_support",
}

export const useChatSocket = (
  chatId?: string,
  cb?: { onmessage?: (message: unknown) => void }
) => {
  const { onmessage } = cb || {}

  const socketOptions = useMemo(
    () => ({
      query: { token_source: "inapp" },
      events: {
        connect: (socket: Socket) =>
          socket && chatId
            ? socket.emit(SocketEvents.JOIN_CHAT, { ticket_chat_id: chatId })
            : undefined,
      },
    }),
    [chatId]
  )

  const { isConnected, socket } = useSocket("/helpdesk", socketOptions)

  useEffect(() => {
    if (!socket) return

    socket.on(SocketEvents.SEND_MESSAGE, (data: unknown) => {
      if (onmessage) onmessage(data)
    })
  }, [socket])

  // FUNCTIONS
  const emitMessage = useCallback(
    (message: string, attachment?: AttachmentMetadata) => {
      if (!socket || !isConnected) return
      const payload = {
        message,
        ticket_chat_id: chatId,
        attachment: !!attachment,
        attachment_metadata: attachment || null,
      }

      socket.emit(SocketEvents.SEND_MESSAGE, payload)

      return payload
    },
    [chatId, isConnected, socket]
  )

  const emitRead = useCallback(
    (chatId: string) => {
      if (!socket || !chatId || !isConnected) return
      const payload = {
        ticket_chat_id: chatId,
        entity: MessageSenders.AGENT,
      }
      socket.emit(SocketEvents.MARK_CONVERSATION_READ, payload)
    },
    [isConnected, isConnected, chatId]
  )

  return { emitMessage, emitRead }
}
