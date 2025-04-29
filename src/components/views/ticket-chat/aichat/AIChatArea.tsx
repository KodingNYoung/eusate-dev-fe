import { Chat } from "../aichat"
import NoCurrentChat from "./NoCurrentChat"
import ChatBox from "../_components/ChatBox"
import { ChatMessage } from "../customer-chat"
import { useSateChat } from "@/providers/ticketChatProvider"
import React, { forwardRef, RefObject, useEffect, useState } from "react"

type Props = {
  chat: Chat
  ref?: RefObject<HTMLDivElement>
  bottomRef: RefObject<HTMLDivElement>
}

const ChatArea = forwardRef<HTMLDivElement, Props>(
  ({ chat, bottomRef }, ref) => {
    const {
      chats,
      // setChats
    } = useSateChat()
    const [localChats, setLocalChats] = useState<ChatMessage[]>()

    const {
      sate: {},
      support: { avatarUrl },
      // chatPayload,
    } = chat

    useEffect(() => {
      // mock chats
      // setChats(chatPayload)
      // setLocalChats(chatPayload)
    }, [])

    useEffect(() => {
      setLocalChats(chats)
    }, [chats])

    return (
      <div
        ref={ref}
        className="custom-scrollbar flex flex-col justify-between overflow-y-auto h-[85vh] sm:h-[74vh] w-full"
      >
        {localChats?.length ? (
          <div className="flex flex-col items-center gap-y-4 px-6 w-full">
            {localChats.map(
              (
                { msg, showComposer, person, createdAt, hasAttachment, files },
                idx
              ) => {
                switch (person) {
                  case "sate":
                    return (
                      <ChatBox
                        key={idx}
                        position="left"
                        msg={msg}
                        showComposer={showComposer}
                        hasAttachments={hasAttachment}
                        files={files}
                        variant={person}
                        createdAt={createdAt}
                      />
                    )
                  case "support":
                    return (
                      <ChatBox
                        key={idx}
                        position="right"
                        avatarUrl={avatarUrl}
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
          <NoCurrentChat supportTeamName="Patrick Ugoma" />
        )}
        <div ref={bottomRef} />
      </div>
    )
  }
)

ChatArea.displayName = "ChatArea"
export default ChatArea
