import { useTicketChats, useTicketDetails } from "@/hooks/api/helpdeskHooks"
import { useChatSocket } from "@/lib/sockets/chat"
import { MessageSenders } from "@/utils/enums"
import { AttachmentMetadata, FC, MessageType, Ticket } from "@/utils/types"
import { UseQueryResult } from "@tanstack/react-query"
import dayjs from "dayjs"
import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { v4 as uuidV4 } from "uuid"

// TICKET CONTEXT
type TicketContextProps = {
  ticketDetails?: UseQueryResult<Ticket>
  ticketId: string
}
export const TicketContext = createContext<TicketContextProps>({
  ticketDetails: undefined,
  ticketId: "",
})
type TicketProviderProps = { ticketId: string }

export const TicketContextProvider: FC<TicketProviderProps> = ({
  ticketId,
  children,
}) => {
  const ticketDetails = useTicketDetails(ticketId)
  return (
    <TicketContext.Provider value={{ ticketDetails, ticketId }}>
      {children}
    </TicketContext.Provider>
  )
}

// CHAT CONTEXT
type ChatContextProps = {
  messages: MessageType[]
  isLoading: boolean
  scrollRef?: RefObject<HTMLDivElement>
  sendMessage: (message: string, attachment?: AttachmentMetadata) => void
  readChat: () => void
  scrollToBottom: (behavior?: ScrollBehavior, delay?: number) => void
}
export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  isLoading: true,
  sendMessage: () => {},
  readChat: () => {},
  scrollToBottom: () => {},
})

type ChatProviderProps = { ticketId: string }

export const ChatContextProvider: FC<ChatProviderProps> = ({
  children,
  ticketId,
}) => {
  // ref of the chat scroller
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  // create ticket message state
  const [messages, setMessages] = useState<MessageType[]>([])
  // const [composer]
  // get ticket messages
  const { data: ticketChat, isLoading } = useTicketChats(ticketId)

  // connect to websocket with the ticket
  const { emitMessage, emitRead } = useChatSocket(ticketChat?.id, {
    onmessage: () => {
      // console.log("hello")
    },
  })
  // expose functions to emit message to ticket chat, mark chat as read, read conversations in real time, scroll to bottom
  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth", delay: number = 100) => {
      // scroll to bottom of chat
      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTo({
            top: chatScrollRef.current.scrollHeight,
            behavior,
          })
        }
      }, delay)
    },
    []
  )
  const updateMessages = useCallback(
    (messageObj: Omit<MessageType, "id">) => {
      setMessages((prev) => [...prev, { ...messageObj, id: uuidV4() }])
      scrollToBottom()
    },
    [scrollToBottom]
  )
  const readChat = useCallback(() => {
    if (ticketChat?.id) {
      emitRead(ticketChat?.id)
      // Should any state that uses the read status
    }
  }, [ticketChat?.id, emitRead])
  const sendMessage = useCallback(
    (message: string, attachment?: AttachmentMetadata) => {
      const messageObj = emitMessage(message, attachment)
      if (messageObj) {
        updateMessages({
          date_created: dayjs().format(),
          date_updated: dayjs().format(),
          message,
          sender: MessageSenders.AGENT,
          is_attachment: messageObj?.attachment,
          ticket_chat: ticketChat?.id as string,
          attachment_metadata: messageObj?.attachment_meta,
        })
      }
    },
    [emitMessage, ticketChat?.id, updateMessages]
  )

  // update ticket message state
  useEffect(() => {
    setMessages(ticketChat?.messages || [])
  }, [ticketChat?.messages])

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        scrollRef: chatScrollRef,
        sendMessage,
        readChat,
        scrollToBottom,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
