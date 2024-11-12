import DashboardLayout from "@/components/templates/dashboard"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
