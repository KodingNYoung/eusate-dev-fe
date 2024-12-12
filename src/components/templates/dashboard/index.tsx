import { FC } from "@/utils/types"
import React from "react"
import DashboardNavigation from "./DashboardNavigation"
import Header from "./Header"
import { ModalProvider } from "@/providers/modalProvider"

const DashboardLayout: FC = ({ children }) => {
  return (
    <ModalProvider>
      <div className="flex min-h-screen bg-white sm:bg-[#f3f4f5] ">
        <DashboardNavigation />
        <div className="flex-1 sm:px-5 sm:py-3.5 flex flex-col sm:ml-[68px] pb-[60px] sm:pb-3.5">
          <Header />
          <main className="sm:mt-2.5 flex-1">{children}</main>
        </div>
      </div>
    </ModalProvider>
  )
}

export default DashboardLayout
