import { FC } from "@/utils/types"
import React from "react"
import Header from "./Header"
import Banner from "./Banner"

const ReportLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white sm:bg-[#f3f4f5] sm:p-4 ">
      <Header />
      <div className="p-4 sm:py-4.5 sm:px-5 sm:mt-2.5 flex-1 bg-white rounded-x20">
        <Banner />
        <div className="w-full max-w-[1024px] mx-auto">{children}</div>
      </div>
    </div>
  )
}

export default ReportLayout
