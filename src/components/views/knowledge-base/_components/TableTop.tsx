"use client"

import { FC } from "@/utils/types"
import React from "react"
import FilterDropdown from "./FilterDropdown"
import SearchInput from "../../../molecules/Inputs/SearchInput"
import { useQueryParams } from "@/hooks/utilityHooks"
import {
  INIT_PAGE_PARAMS,
  KB_QUERY_KEYS,
  KNOWLEDGE_BASE_SORT_COLUMNS,
} from "../utils"
import SortDropdown from "@/components/molecules/Popups/SortDropdown"
import { SortOrder } from "@/utils/enums"

type Props = {
  counts: Record<"all" | "published" | "drafts", number>
}

const TableTop: FC<Props> = () => {
  const { batchSet, get } = useQueryParams()

  return (
    <header className="p-2 flex items-center gap-1 sm:gap-2.5">
      <SearchInput
        value={get(KB_QUERY_KEYS.SEARCH) || ""}
        onSearch={(value) =>
          batchSet([
            { key: KB_QUERY_KEYS.SEARCH, value: value || null },
            INIT_PAGE_PARAMS,
          ])
        }
        classNames={{ input: "md:min-w-[276px]" }}
      />

      <SortDropdown
        value={
          get(KB_QUERY_KEYS.SORT_BY)?.split(" ")?.[0] ||
          KNOWLEDGE_BASE_SORT_COLUMNS[0].value
        }
        onSort={(value) =>
          batchSet([{ key: KB_QUERY_KEYS.SORT_BY, value }, INIT_PAGE_PARAMS])
        }
        options={KNOWLEDGE_BASE_SORT_COLUMNS}
        order={get(KB_QUERY_KEYS.SORT_BY)?.split(" ")?.[1] || SortOrder.ASCEND}
      />

      <FilterDropdown />
    </header>
  )
}

export default TableTop
