import { FC } from "@/utils/types"
import React from "react"
import HeaderNav from "./_components/HeaderNav"
import HeaderPagination from "./_components/HeaderPagination"
import HeaderActions from "./_components/HeaderActions"

const Header: FC = () => {
  return (
    <header className="flex items-center justify-between sticky z-[11] sm:relative top-0 left-0 border-b border-gray-50 sm:border-b-0 bg-white sm:rounded-x20 p-3 sm:px-5 sm:py-2 gap-3">
      <HeaderNav />
      <div className="flex-1">
        <HeaderPagination />
      </div>
      <HeaderActions />
    </header>
  )
}

export default Header
