import {
  useCopilotConversations,
  useTicketChats,
  useTicketDetails,
} from "@/hooks/api/helpdeskHooks"
import { useChatSocket } from "@/lib/sockets/chat"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { MessageSenders } from "@/utils/enums"
import {
  AttachmentMetadata,
  CopilotConversation,
  CopilotSateMessage,
  CopilotUserMessage,
  FC,
  MessageType,
  Ticket,
  WSMessageReceiveData,
  WSResponse,
} from "@/utils/types"
import { useQueryClient, UseQueryResult } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useParams } from "next/navigation"
import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { v4 as uuidV4 } from "uuid"
import { useOrganisation } from "./organisationProvider"
import { SendCopilotMessageResponse } from "@/app/(organisation-routes)/(dashboard)/helpdesk/actions"
import { copyObject } from "@/utils/helpers"

// TICKET CONTEXT  =================================================================
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

// CHAT CONTEXT  =================================================================
type ChatContextProps = {
  messages: MessageType[]
  composerText: string
  isLoading: boolean
  scrollRef?: RefObject<HTMLDivElement>
  setComposerText: (text: string) => void
  sendMessage: (message: string, attachment?: AttachmentMetadata) => void
  readChat: () => void
  scrollToBottom: (behavior?: ScrollBehavior, delay?: number) => void
}
export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  composerText: "",
  isLoading: true,
  setComposerText: () => {},
  sendMessage: () => {},
  readChat: () => {},
  scrollToBottom: () => {},
})

type ChatProviderProps = { ticketId: string }

export const ChatContextProvider: FC<ChatProviderProps> = ({
  children,
  ticketId,
}) => {
  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()

  // create ticket message state
  const [messages, setMessages] = useState<MessageType[]>([])
  const [composerText, setComposerText] = useState("")

  // get ticket messages
  const { data: ticketChat, isLoading } = useTicketChats(ticketId)

  // connect to websocket with the ticket
  const { emitMessage, emitRead } = useChatSocket(ticketChat?.id, {
    onmessage: (message: WSResponse<WSMessageReceiveData>) => {
      updateMessages({
        date_created: message.data.date_created,
        date_updated: message.data.date_updated,
        message: message.data.message,
        sender: message.data.sender,
        is_attachment: message.data.attachment,
        attachment_metadata: message.data.attachment_metadata,
        ticket_chat: message.data.ticket_chat_id,
      })
      readChat()
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
          attachment_metadata: messageObj?.attachment_metadata,
        })
      }
      if (attachment) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_FN_KEYS.TICKETS, ticketId],
        })
      }
    },
    [emitMessage, ticketChat?.id, updateMessages, queryClient, ticketId]
  )

  // update ticket message state
  useEffect(() => {
    setMessages(ticketChat?.messages || [])
  }, [ticketChat?.messages])

  return (
    <ChatContext.Provider
      value={{
        messages,
        composerText,
        setComposerText: (text: string) => setComposerText(text),
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

// COPILOT PROVIDER ===============================================
type CopilotContextType = {
  textboxValue: string
  conversations: CopilotConversation[]
  isLoading: boolean
  scrollRef?: RefObject<HTMLDivElement>
  setTextboxValue: (value: string) => void
  sendMessage: (message: string) => string | undefined
  updateNewMessageResponse: (
    payload: SendCopilotMessageResponse,
    messageId: string
  ) => void
}

export const CopilotContext = createContext<CopilotContextType>({
  textboxValue: "",
  setTextboxValue: () => {},
  conversations: [],
  isLoading: true,
  sendMessage: () => "",
  updateNewMessageResponse: () => {},
})

export const CopilotProvider: FC = ({ children }) => {
  const params = useParams()
  const scrollRef = useRef<HTMLDivElement>(null)

  const { organisationUserId } = useOrganisation()
  const { conversations: _conversations, isLoading } = useCopilotConversations(
    params?.ticketId as string
  )

  const [textboxValue, setTextboxValue] = useState("")
  const [conversations, setConversations] = useState<CopilotConversation[]>([])

  const sendMessage = useCallback(
    (messageStr: string) => {
      if (!_conversations?.id) return
      // get message
      // create the CopilotUserMessage type object
      const messageId = `user-${conversations.length}`
      const message: CopilotUserMessage = {
        id: messageId,
        message: messageStr,
        agent: organisationUserId,
        date_created: dayjs().format(),
        date_updated: dayjs().format(),
        ticket_copilot_chat: _conversations?.id,
      }
      // generate sate response
      const sate_response: CopilotSateMessage = {
        date_created: dayjs().format(),
        date_updated: dayjs().format(),
        id: `sate-${conversations.length}`,
        response: "",
        ticket_copilot_chat: _conversations?.id,
        ticket_copilot_message: messageId,
        loading: true,
      }

      setConversations((curr) => [...curr, { message, sate_response }])
      setTextboxValue("")
      setTimeout(scrollToBottom, 100)

      return messageId
    },
    [params?.ticketId, _conversations?.id, organisationUserId]
  )
  const updateNewMessageResponse = useCallback(
    (payload: SendCopilotMessageResponse, messageId: string) => {
      setConversations((prev) => {
        const conversations = copyObject(prev)
        const message = conversations.find(
          (message) => message.message.id === messageId
        )

        if (!message) return conversations

        message.message.id = payload.ticket_copilot_message_id
        message.sate_response = {
          ...message.sate_response,
          response: payload.response,
          id: payload.ticket_copilot_sate_response_id,
          loading: false,
        }
        return conversations
      })
    },
    []
  )

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    setTimeout(scrollToBottom, 100)
  }, [])

  useEffect(() => {
    setConversations(_conversations?.conversations || [])
  }, [_conversations])

  return (
    <CopilotContext.Provider
      value={{
        textboxValue,
        conversations,
        isLoading,
        scrollRef,
        setTextboxValue,
        sendMessage,
        updateNewMessageResponse,
      }}
    >
      {children}
    </CopilotContext.Provider>
  )
}
