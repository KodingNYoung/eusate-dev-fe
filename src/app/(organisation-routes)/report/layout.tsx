import ReportLayout from "@/components/templates/report"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <ReportLayout>{children}</ReportLayout>
}

export default Layout
