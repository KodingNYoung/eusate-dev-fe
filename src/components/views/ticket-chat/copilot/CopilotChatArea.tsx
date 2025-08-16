import NoCurrentChat from "./NoCurrentChat"
import ChatBox from "../_components/ChatBox"
import React from "react"
import { FC } from "@/utils/types"
import { useChatContext, useCopilot } from "@/hooks/helpdesk"
import { MessageSenders } from "@/utils/enums"

const ChatArea: FC = () => {
  const { conversations } = useCopilot()
  const { setComposerText } = useChatContext()

  return (
    <div className="flex flex-col justify-between w-full mb-6">
      {conversations?.length ? (
        <div className="flex flex-col items-center gap-y-2 px-2 w-full">
          {conversations.map((conversation, idx) => {
            return (
              <section className="flex flex-col gap-2 w-full" key={idx}>
                <ChatBox
                  message={{
                    ...conversation.message,
                    message: conversation.message.message,
                    sender: MessageSenders.AGENT,
                    is_attachment: false,
                    attachment_metadata: null,
                    ticket_chat: conversation.message.ticket_copilot_chat,
                  }}
                />
                <ChatBox
                  message={{
                    ...conversation.sate_response,
                    message: conversation.sate_response.response,
                    sender: MessageSenders.SATE,
                    is_attachment: false,
                    attachment_metadata: null,
                    ticket_chat: conversation.sate_response.ticket_copilot_chat,
                  }}
                  align="left"
                  copilotOptions={{
                    copyToComposer: () =>
                      setComposerText(conversation.sate_response.response),
                    sources: [],
                  }}
                />
              </section>
            )
          })}
        </div>
      ) : (
        <NoCurrentChat />
      )}
    </div>
  )
}

ChatArea.displayName = "ChatArea"
export default ChatArea
