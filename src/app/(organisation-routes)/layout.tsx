import { OrganisationProvider } from "@/providers/organisationProvider"
import { LayoutFC } from "@/utils/types"
import React from "react"

/**
 * This layout component wraps all routes that uses the organisation context.
 * It will be wrapped by an OrganisationProvider to provide the necessary context.
 */

const Layout: LayoutFC = ({ children }) => {
  return <OrganisationProvider>{children}</OrganisationProvider>
}

export default Layout
