import HelpDeskLayout from "@/components/templates/help-desk"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <HelpDeskLayout>{children}</HelpDeskLayout>
}

export default Layout
