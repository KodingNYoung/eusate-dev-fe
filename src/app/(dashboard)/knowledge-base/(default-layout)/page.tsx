import KnowledgeBase from "@/components/views/knowledge-base"
import { PageFC } from "@/utils/types"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Knowledge base",
}

const KnowledgeBasePage: PageFC = () => {
  return <KnowledgeBase />
}

export default KnowledgeBasePage
