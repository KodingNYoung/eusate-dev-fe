"use client"
import { FC } from "@/utils/types"
import React from "react"
import EmptyState from "./EmptyState"
import Conversations from "./Conversations"
import { usePlayground } from "@/hooks/playground"

const ChatArea: FC = () => {
  const { conversations, scrollRef } = usePlayground()

  return (
    <div className="chat-section flex-1 relative">
      <div
        ref={scrollRef}
        className="absolute top-0 left-0 w-full h-full overflow-y-auto px-4"
      >
        <section className="max-w-[906px] w-full mx-auto pt-10">
          {!conversations.length ? (
            <EmptyState />
          ) : (
            <Conversations conversations={conversations} />
          )}
        </section>
      </div>
      <div className="absolute top-0 left-0 h-full w-full shadow-chat pointer-events-none" />
    </div>
  )
}

export default ChatArea
