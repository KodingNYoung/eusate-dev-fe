import ChatBox from "@/components/views/ticket-chat/_components/ChatBox"
import { useTicketChats } from "@/hooks/api/helpdeskHooks"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  ticketId: string
}

const ConversationSnippet: FC<Props> = ({ ticketId }) => {
  // get ticket messages
  const { data, isLoading } = useTicketChats(ticketId)
  return (
    <div className="flex flex-col justify-between w-full mb-5 border border-gray-50 rounded-x20">
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          loading...
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 px-3 w-full">
          {data?.messages.map((message) => (
            <ChatBox message={message} key={message.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ConversationSnippet
