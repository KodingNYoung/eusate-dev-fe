import { FC } from "@/utils/types"
import React from "react"
import ChatFooter from "./_components/ChatFooter"
import PlaygroundProvider from "@/providers/playgroundProvider"
import { PLAYGROUND_MESSAGE_RESPONSE } from "@/utils/dummy"
import ChatArea from "./_components/ChatArea"
import FeedbackModal from "./_components/FeedbackModal"
import { FeedbackType } from "./utils"

const Playground: FC = () => {
  return (
    <PlaygroundProvider chatHistory={PLAYGROUND_MESSAGE_RESPONSE}>
      <section className="bg-white h-full rounded-x20 flex flex-col gap-2.5">
        <ChatArea />
        <ChatFooter />
      </section>
      <FeedbackModal feedback={FeedbackType.LIKE} />
      <FeedbackModal feedback={FeedbackType.DISLIKE} />
    </PlaygroundProvider>
  )
}

export default Playground
