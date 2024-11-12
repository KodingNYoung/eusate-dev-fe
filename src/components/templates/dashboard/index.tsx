import { FC } from "@/utils/types"
import React from "react"
import DashboardNavigation from "./DashboardNavigation"
import Header from "./Header"

const DashboardLayout: FC = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f3f4f5] ">
      <DashboardNavigation />
      <div className="flex-1 sm:px-5 sm:py-3.5">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
