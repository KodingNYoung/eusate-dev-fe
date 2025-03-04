"use client"

import AppTabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import { DEVSPACE_QUERY_KEYS, DEVSPACE_TABS } from "../utils"
import { useQueryParams } from "@/hooks/utilityHooks"

const DevSpaceActionTabs: FC = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      tabs={DEVSPACE_TABS}
      classNames={{
        tabList: "gap-2.5 border-b border-gray-50 px-0 pb-0",
        cursor: "w-full rounded-md",
        tab: "pb-1",
      }}
      onSelectionChange={(tab) => set(DEVSPACE_QUERY_KEYS.TAB, tab)}
      selectedKey={get(DEVSPACE_QUERY_KEYS.TAB) || DEVSPACE_TABS[0].key} // default to first tab
    />
  )
}

export default DevSpaceActionTabs
