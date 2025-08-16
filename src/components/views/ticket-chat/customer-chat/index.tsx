import CustomerChatArea from "./CustomerChatArea"
import React, { FC, useEffect } from "react"
import ChatFooter from "./CustomerChatFooter"
import { useChatContext, useTicketContext } from "@/hooks/helpdesk"
import CustomerChatHeader from "./CustomerChatHeader"

const CustomerChat: FC = () => {
  const { ticketDetails: { data: ticket, isLoading } = {} } = useTicketContext()
  const { scrollRef, readChat, messages, scrollToBottom } = useChatContext()

  scrollToBottom("instant", 0)
  useEffect(() => {
    readChat()
  }, [messages, readChat])

  return (
    <>
      {!ticket && isLoading && (
        <div className="flex items-center justify-center h-full">
          loading...
        </div>
      )}
      {!ticket && !isLoading && <>No data</>}
      {!!ticket && (
        <div
          ref={scrollRef}
          className="h-full overflow-auto flex flex-col custom-scrollbar"
        >
          <CustomerChatHeader customer={ticket?.customer} />
          <CustomerChatArea />
          <ChatFooter ticket={ticket} />
        </div>
      )}
    </>
  )
}

export default CustomerChat
