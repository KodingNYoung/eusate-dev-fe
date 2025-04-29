import { Chat, ChatMessage } from "."
import React, { forwardRef, useEffect, useState } from "react"
import ChatBox from "../_components/ChatBox"
import NoContentFound from "../_components/NoContentFound"
import { useCustomerChat } from "@/providers/ticketChatProvider"

type Props = {
  chat: Chat
}

const ChatArea = forwardRef<HTMLDivElement, Props>(({ chat }, ref) => {
  const {
    chats,
    // setChats,
  } = useCustomerChat()
  const [localChats, setLocalChats] = useState<ChatMessage[]>()

  const {
    customer: { avatarUrl: customerAvatarUrl },
    support: { avatarUrl: agentAvatarUrl },
    // chatPayload
  } = chat

  useEffect(() => {
    // mock chats
    // setChats([...chatPayload])
    // setLocalChats(chatPayload)
  }, [])

  useEffect(() => {
    console.log("logging..")
    console.log(chats)
    setLocalChats(chats)
  }, [chats])

  return (
    <div
      ref={ref}
      className="custom-scrollbar flex flex-col justify-between overflow-y-auto h-[56vh] w-full"
    >
      {localChats?.length ? (
        <div className="flex flex-col items-center gap-y-4 px-6 w-full">
          {localChats.map(
            ({ msg, person, createdAt, hasAttachment, files }) => {
              switch (person) {
                case "customer":
                  return (
                    <ChatBox
                      position="right"
                      avatarUrl={customerAvatarUrl}
                      msg={msg}
                      hasAttachments={hasAttachment}
                      files={files}
                      variant={person}
                      createdAt={createdAt}
                    />
                  )
                case "support":
                  return (
                    <ChatBox
                      position="left"
                      avatarUrl={agentAvatarUrl}
                      msg={msg}
                      hasAttachments={hasAttachment}
                      files={files}
                      variant={person}
                      createdAt={createdAt}
                    />
                  )
              }
            }
          )}
        </div>
      ) : (
        <NoContentFound msg="Start the conversation" />
      )}
    </div>
  )
})

ChatArea.displayName = "ChatArea"
export default ChatArea
