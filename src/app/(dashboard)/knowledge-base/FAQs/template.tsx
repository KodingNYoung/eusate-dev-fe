import FAQsLayout from "@/components/templates/faqs"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <FAQsLayout>{children}</FAQsLayout>
}

export default Layout
