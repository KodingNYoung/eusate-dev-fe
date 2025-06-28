import Playground from "@/components/views/playground"
import { getPlaygroundChatHistory } from "@/lib/data/playground"
import { PageFC } from "@/utils/types"
import React from "react"

const PlaygroundPage: PageFC = async () => {
  const chatHistory = await getPlaygroundChatHistory()
  return <Playground chatHistory={chatHistory.data} />
}

export default PlaygroundPage
