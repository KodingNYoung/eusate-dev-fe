"use client"

import Tabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import FilterDropdown from "./FilterDropdown"
import SearchInput from "./SearchInput"
import SortDropdown from "./SortDropdown"

const TableTop: FC = () => {
  return (
    <header className="p-2 flex justify-between items-center gap-1 sm:gap-2.5">
      <Tabs
        tabs={[
          { label: "All", key: "key" },
          { label: "Draft", key: "draft" },
        ]}
        onChange={(tab) => console.log(tab)}
      />
      <div className="flex-1" />
      <SearchInput />
      <SortDropdown />
      <FilterDropdown />
    </header>
  )
}

export default TableTop
