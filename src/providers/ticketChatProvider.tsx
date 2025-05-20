// import { Activity } from "@/components/views/ticket-chat/utils"
// import { ChatMessage } from "@/components/views/ticket-chat/customer-chat"
import React, { createContext, useState, ReactNode } from "react"
// import { MessageType, TicketComment } from "@/utils/types"

// type ChatContextType = {
//   message: string
//   chats: MessageType[]
//   setMessage: (val: string) => void
//   setChats: (item: MessageType[]) => void
//   submitMessage: (
//     person: ChatPersons,
//     fileDetails: { hasAttachment: boolean; files: File[] }
//   ) => void
// }

type TicketChatContextType = {
  composer: string
  setComposer: (val: string) => void
  attachments: File[]
  setAttachments: (file: File[]) => void
  updateAttachments: (file: File) => void
}

// type TicketChatDetailsType = {
//   comments: TicketComment[]
//   setComments: (comment: TicketComment[]) => void
//   activities: Activity[]
//   setActivities: (activities: Activity[]) => void
//   updateActivities: (activity: Activity) => void
// }

// const SateChatContext = createContext<ChatContextType>({
//   chats: [],
//   message: "",
//   setMessage: () => {},
//   submitMessage: () => {},
//   setChats: () => {},
// })

// const TicketChatDetailsContext = createContext<TicketChatDetailsType>({
//   comments: [],
//   activities: [],
//   setComments: () => {},
//   setActivities: () => {},
//   updateActivities: () => {},
// })

export const TicketChatContext = createContext<TicketChatContextType>({
  composer: "",
  attachments: [],
  setComposer: () => {},
  setAttachments: () => {},
  updateAttachments: () => {},
})

// export const SateChatProvider = ({ children }: { children: ReactNode }) => {
//   const [chats, setChats] = useState<ChatMessage[]>([])
//   const [message, setMessage] = useState("")

//   const submitMessage = (
//     person: ChatPersons,
//     fileDetails?: { hasAttachment: boolean; files: File[] }
//   ) => {
//     if (!message.trim()) return
//     const newMsg: ChatMessage = {
//       person,
//       msg: message,
//       createdAt: new Date(),
//       ...fileDetails,
//     }
//     setChats((prev) => [...prev, newMsg])
//     setMessage("")
//   }
//   return (
//     <SateChatContext.Provider
//       value={{ chats, message, setMessage, submitMessage, setChats }}
//     >
//       {children}
//     </SateChatContext.Provider>
//   )
// }

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

// export const useSateChat = () => useContext(SateChatContext)
// export const useCustomerChat = () => useContext(CustomerChatContext)
// export const useTicketChatDetails = () => useContext(TicketChatDetailsContext)
