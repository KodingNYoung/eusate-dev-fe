"use client"

import Tabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import FilterDropdown from "./FilterDropdown"
import SearchInput from "../../../molecules/Inputs/SearchInput"
import SortDropdown from "./SortDropdown"
import { useQueryParams } from "@/hooks/utilityHooks"
import { INIT_PAGE_PARAMS, KB_QUERY_KEYS, KNOWLEDGE_BASE_TABS } from "../utils"

type Props = {
  counts: Record<"all" | "published" | "drafts", number>
}

const TableTop: FC<Props> = ({ counts }) => {
  const { batchSet, get } = useQueryParams()

  return (
    <header className="p-2 flex justify-between items-center gap-1 sm:gap-2.5">
      <Tabs
        tabs={Object.keys(KNOWLEDGE_BASE_TABS).map((key) => {
          const value =
            KNOWLEDGE_BASE_TABS[key as keyof typeof KNOWLEDGE_BASE_TABS]
          return {
            label: key,
            key: value,
            badge: counts[value],
            badgeColor: "disabled",
          }
        })}
        onSelectionChange={(tab) =>
          batchSet([
            { key: KB_QUERY_KEYS.TAB, value: tab as string },
            INIT_PAGE_PARAMS,
          ])
        }
        selectedKey={get(KB_QUERY_KEYS.TAB)}
      />

      <div className="flex-1" />

      <SearchInput
        value={get(KB_QUERY_KEYS.SEARCH) || ""}
        onSearch={(value) =>
          batchSet([
            { key: KB_QUERY_KEYS.SEARCH, value: value || null },
            INIT_PAGE_PARAMS,
          ])
        }
      />

      <SortDropdown
        value={get(KB_QUERY_KEYS.SORT_BY) || ""}
        onSort={(value) =>
          batchSet([{ key: KB_QUERY_KEYS.SORT_BY, value }, INIT_PAGE_PARAMS])
        }
      />

      <FilterDropdown />
    </header>
  )
}

export default TableTop
