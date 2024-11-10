import AuthLayout from "@/components/templates/auth"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
