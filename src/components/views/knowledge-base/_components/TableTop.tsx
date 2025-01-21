"use client"

import Tabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import FilterDropdown from "./FilterDropdown"
import SearchInput from "./SearchInput"
import SortDropdown from "./SortDropdown"
import { useQueryParams } from "@/hooks/utilityHooks"
import { KNOWLEDGE_BASE_QUERY_KEYS, KNOWLEDGE_BASE_TABS } from "../utils"

const TableTop: FC = () => {
  const { set, get } = useQueryParams()

  return (
    <header className="p-2 flex justify-between items-center gap-1 sm:gap-2.5">
      <Tabs
        tabs={Object.keys(KNOWLEDGE_BASE_TABS).map((key) => ({
          label: key,
          key: KNOWLEDGE_BASE_TABS[key as keyof typeof KNOWLEDGE_BASE_TABS],
        }))}
        onSelectionChange={(tab) => {
          set(KNOWLEDGE_BASE_QUERY_KEYS.TAB, tab)
        }}
        selectedKey={get(KNOWLEDGE_BASE_QUERY_KEYS.TAB)}
      />

      <div className="flex-1" />

      <SearchInput
        value={get(KNOWLEDGE_BASE_QUERY_KEYS.SEARCH) || ""}
        onSearch={(value) =>
          set(KNOWLEDGE_BASE_QUERY_KEYS.SEARCH || null, value)
        }
      />

      <SortDropdown />

      <FilterDropdown />
    </header>
  )
}

export default TableTop
