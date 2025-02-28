import DevSapceLayout from "@/components/templates/dev-sapce"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <DevSapceLayout>{children}</DevSapceLayout>
}

export default Layout
