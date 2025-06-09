import React from "react"
import { LayoutFC } from "@/utils/types"
import SettingsLayout from "@/components/templates/settings"

const Layout: LayoutFC = ({ children }) => {
  return <SettingsLayout>{children}</SettingsLayout>
}

export default Layout
