import React, { useRef } from "react"
import Header from "./AIChatHeader"
import ChatArea from "./AIChatArea"
import { ChatMessage } from "../customer-chat"
import { MOCK_SATE_CHAT } from "../mockData"
import ChatFooter from "./AIChatFooter"
import { SateChatProvider } from "@/providers/ticketChatProvider"

export type Chat = {
  sate: {
    avatarUrl?: string
    id: string
  }
  support: {
    avatarUrl: string
    id: string
    name: string
  }
  chatPayload: ChatMessage[]
}

const AIChat = () => {
  const chatRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <SateChatProvider>
      <div className="grid grid-rows-[auto_1fr_auto] h-full">
        <Header />
        <ChatArea bottomRef={bottomRef} ref={chatRef} chat={MOCK_SATE_CHAT} />
        <ChatFooter scrollToBottom={scrollToBottom} />
      </div>
    </SateChatProvider>
  )
}

export default AIChat
