import SettingsLayout from "@/components/templates/settings"
import { LayoutFC } from "@/utils/types"
import React from "react"

const Layout: LayoutFC = ({ children }) => {
  return <SettingsLayout>{children}</SettingsLayout>
}

export default Layout
