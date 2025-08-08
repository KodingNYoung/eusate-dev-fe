import ChatBox from "@/components/views/ticket-chat/_components/ChatBox"
import { useTicketChats } from "@/hooks/api/helpdeskHooks"
import { useModal } from "@/hooks/popupHooks"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import Link from "next/link"
import React from "react"

type Props = {
  ticketId: string
}

const ConversationSnippet: FC<Props> = ({ ticketId }) => {
  // get ticket messages
  const { data, isLoading } = useTicketChats(ticketId)
  const { close } = useModal()

  return (
    <div className="flex flex-col justify-between w-full">
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          loading...
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 w-full p-1">
          <Link
            href={`${ROUTES.TICKET}/${ticketId}`}
            onClick={close}
            className="text-center mt-1 text-regular-xs text-gray-800"
          >
            View full details to see older messages
          </Link>
          {data?.messages
            ?.slice(-5)
            .map((message) => <ChatBox message={message} key={message.id} />)}
        </div>
      )}
    </div>
  )
}

export default ConversationSnippet
