import { Chat } from "../aichat"
import NoCurrentChat from "./NoCurrentChat"
import ChatBox from "../_components/ChatBox"
// import { useSateChat } from "@/providers/ticketChatProvider"
import React, { forwardRef, RefObject, useEffect, useState } from "react"
import { MessageType } from "@/utils/types"

type Props = {
  chat: Chat
  ref?: RefObject<HTMLDivElement>
  bottomRef: RefObject<HTMLDivElement>
}

const ChatArea = forwardRef<HTMLDivElement, Props>(({ bottomRef }, ref) => {
  // const {
  //   chats,
  //   // setChats
  // } = useSateChat()
  const [localChats] = useState<MessageType[]>()

  useEffect(() => {
    // mock chats
    // setChats(chatPayload)
    // setLocalChats(chatPayload)
  }, [])

  // useEffect(() => {
  // setLocalChats(chats)
  // }, [chats])

  return (
    <div
      ref={ref}
      className="custom-scrollbar flex flex-col justify-between overflow-y-auto h-[85vh] sm:h-[74vh] w-full"
    >
      {localChats?.length ? (
        <div className="flex flex-col items-center gap-y-4 px-6 w-full">
          {localChats.map((message) => {
            return <ChatBox message={message} key={message.id} />
          })}
        </div>
      ) : (
        <NoCurrentChat supportTeamName="Patrick Ugoma" />
      )}
      <div ref={bottomRef} />
    </div>
  )
})

ChatArea.displayName = "ChatArea"
export default ChatArea
