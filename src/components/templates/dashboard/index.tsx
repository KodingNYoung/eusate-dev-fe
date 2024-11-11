import { FC } from "@/utils/types"
import React from "react"
import DashboardNavigation from "./_components/DashboardNavigation"

const DashboardLayout: FC = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <DashboardNavigation />
      <div className="flex-1 p-3">
        <header>Header</header>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
