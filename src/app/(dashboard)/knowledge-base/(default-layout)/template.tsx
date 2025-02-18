import KnowledgeBaseLayout from "@/components/templates/knowledge-base"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <KnowledgeBaseLayout>{children}</KnowledgeBaseLayout>
}

export default Layout
