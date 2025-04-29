import Header from "./CustomerChatHeader"
import { ChatPersons } from "../utils"
import ChatArea from "./CustomerChatArea"
import React, { FC, useRef } from "react"
import { MOCK_USER_CHAT } from "../mockData"
import ChatFooter from "./CustomerChatFooter"
import { UserTemperament } from "../../help-desk/utils"
import { CustomerChatProvider } from "@/providers/ticketChatProvider"

type Props = {
  customerId: string
  temperament: UserTemperament
}

export type ChatMessage = {
  person: ChatPersons
  createdAt: Date
  msg: string
  hasAttachment?: boolean
  showComposer?: boolean
  files?: File[]
}

export type Chat = {
  customer: {
    avatarUrl: string
    id: string
    temperament: UserTemperament
  }
  support: {
    avatarUrl: string
    id: string
    name: string
  }
  chatPayload: ChatMessage[]
}

const CustomerChat: FC<Props> = ({ customerId, temperament }) => {
  const {
    customer: { avatarUrl },
  } = MOCK_USER_CHAT

  const chatRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <CustomerChatProvider>
      <div className="border-r border-r-gray-50 grid grid-rows-[auto_1fr_auto] h-full">
        <Header
          avatarUrl={avatarUrl}
          customerId={customerId}
          temperament={temperament}
        />
        <ChatArea ref={chatRef} chat={MOCK_USER_CHAT} />
        <ChatFooter scrollToBottom={scrollToBottom} />
      </div>
    </CustomerChatProvider>
  )
}

export default CustomerChat
