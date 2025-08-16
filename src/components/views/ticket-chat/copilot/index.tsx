import React from "react"
import Header from "./CopilotHeader"
import ChatArea from "./CopilotChatArea"
import ChatFooter from "./CopilotChatFooter"
import { useCopilot } from "@/hooks/helpdesk"

const AIChat = () => {
  const { scrollRef } = useCopilot()
  return (
    <div
      ref={scrollRef}
      className="h-full overflow-auto no-scrollbar flex flex-col border-l border-gray-50"
    >
      <Header />
      <ChatArea />
      <ChatFooter />
    </div>
  )
}

export default AIChat
