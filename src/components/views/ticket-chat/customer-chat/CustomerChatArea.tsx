import React from "react"
import ChatBox from "../_components/ChatBox"
import NoContentFound from "../_components/NoContentFound"
import { FC } from "@/utils/types"
import { useChatContext } from "@/hooks/helpdesk"

const CustomerChatArea: FC = () => {
  const { messages, isLoading } = useChatContext()

  return (
    <div className="flex flex-col justify-between w-full mb-8">
      {isLoading && !messages?.length && (
        <div className="h-full w-full flex items-center justify-center">
          loading...
        </div>
      )}
      {messages?.length ? (
        <div className="flex flex-col items-center gap-y-4 px-6 w-full">
          {messages.map((message) => (
            <ChatBox message={message} key={message.id} />
          ))}
        </div>
      ) : (
        <NoContentFound msg="Start the conversation" />
      )}
    </div>
  )
}

export default CustomerChatArea
