"use client"
import { FC } from "@/utils/types"
import React from "react"
import EmptyState from "./EmptyState"
import { usePlayground } from "@/providers/playgroundProvider"
import Conversations from "./Conversations"

const ChatArea: FC = () => {
  const { conversations, scrollerRef } = usePlayground()

  return (
    <div className="chat-section flex-1 relative">
      <div
        ref={scrollerRef}
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
