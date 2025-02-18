import { FC } from "@/utils/types"
import React from "react"
import ChatFooter from "./_components/ChatFooter"
import PlaygroundProvider from "@/providers/playgroundProvider"
import ChatArea from "./_components/ChatArea"
import FeedbackModal from "./_components/FeedbackModal"
import { FeedbackKind } from "./utils"
import { GetChatHistoryResponse } from "@/lib/data/playground"

type Props = {
  chatHistory?: GetChatHistoryResponse
}

const Playground: FC<Props> = ({ chatHistory }) => {
  return (
    <PlaygroundProvider chatHistory={chatHistory}>
      <section className="bg-white h-full rounded-x20 flex flex-col gap-2.5">
        <ChatArea />
        <ChatFooter />
      </section>
      <FeedbackModal kind={FeedbackKind.LIKE} />
      <FeedbackModal kind={FeedbackKind.DISLIKE} />
    </PlaygroundProvider>
  )
}

export default Playground
