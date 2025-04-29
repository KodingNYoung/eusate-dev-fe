import {
  Activity,
  ChatPersons,
  Comment,
} from "@/components/views/ticket-chat/utils"
import { ChatMessage } from "@/components/views/ticket-chat/customer-chat"
import React, { createContext, useContext, useState, ReactNode } from "react"

type ChatContextType = {
  message: string
  chats: ChatMessage[]
  setMessage: (val: string) => void
  setChats: (item: ChatMessage[]) => void
  submitMessage: (
    person: ChatPersons,
    fileDetails: { hasAttachment: boolean; files: File[] }
  ) => void
}

type TicketChatContextType = {
  composer: string
  setComposer: (val: string) => void
  attachments: File[]
  setAttachments: (file: File[]) => void
  updateAttachments: (file: File) => void
}

type TicketChatDetailsType = {
  comments: Comment[]
  setComments: (comment: Comment[]) => void
  activities: Activity[]
  setActivities: (activities: Activity[]) => void
  updateActivities: (activity: Activity) => void
}

const CustomerChatContext = createContext<ChatContextType>({
  chats: [],
  message: "",
  setMessage: () => {},
  submitMessage: () => {},
  setChats: () => {},
})

const SateChatContext = createContext<ChatContextType>({
  chats: [],
  message: "",
  setMessage: () => {},
  submitMessage: () => {},
  setChats: () => {},
})

const TicketChatDetailsContext = createContext<TicketChatDetailsType>({
  comments: [],
  activities: [],
  setComments: () => {},
  setActivities: () => {},
  updateActivities: () => {},
})

export const TicketChatContext = createContext<TicketChatContextType>({
  composer: "",
  attachments: [],
  setComposer: () => {},
  setAttachments: () => {},
  updateAttachments: () => {},
})

export const CustomerChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")

  const submitMessage = (
    person: ChatPersons,
    fileDetails?: { hasAttachment: boolean; files: File[] }
  ) => {
    if (message.trim() || fileDetails?.hasAttachment) {
      const newMsg: ChatMessage = {
        person,
        msg: message,
        createdAt: new Date(),
        ...fileDetails,
      }
      setChats((prev) => [...prev, newMsg])
      setMessage("")
    }
  }

  return (
    <CustomerChatContext.Provider
      value={{ chats, message, setMessage, submitMessage, setChats }}
    >
      {children}
    </CustomerChatContext.Provider>
  )
}

export const SateChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")

  const submitMessage = (
    person: ChatPersons,
    fileDetails?: { hasAttachment: boolean; files: File[] }
  ) => {
    if (!message.trim()) return
    const newMsg: ChatMessage = {
      person,
      msg: message,
      createdAt: new Date(),
      ...fileDetails,
    }
    setChats((prev) => [...prev, newMsg])
    setMessage("")
  }
  return (
    <SateChatContext.Provider
      value={{ chats, message, setMessage, submitMessage, setChats }}
    >
      {children}
    </SateChatContext.Provider>
  )
}

export const TicketChatDetailsProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  const updateActivities = (activity: Activity) => {
    setActivities([activity, ...activities])
  }

  return (
    <TicketChatDetailsContext.Provider
      value={{
        comments,
        setComments,
        activities,
        setActivities,
        updateActivities,
      }}
    >
      {children}
    </TicketChatDetailsContext.Provider>
  )
}

export const TicketChatProvider = ({ children }: { children: ReactNode }) => {
  const [composer, setComposer] = useState<string>("")
  const [attachments, setAttachments] = useState<File[]>([] as File[])

  const updateAttachments = (attachment: File) => {
    setAttachments([attachment, ...attachments])
  }

  return (
    <TicketChatContext.Provider
      value={{
        composer,
        setComposer,
        attachments,
        setAttachments,
        updateAttachments,
      }}
    >
      {children}
    </TicketChatContext.Provider>
  )
}

export const useSateChat = () => useContext(SateChatContext)
export const useCustomerChat = () => useContext(CustomerChatContext)
export const useTicketChatDetails = () => useContext(TicketChatDetailsContext)
