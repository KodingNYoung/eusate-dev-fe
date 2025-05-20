"use client"

import AppTabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import { HD_QUERY_KEYS, HD_TABS } from "../utils"
import Icon from "@/components/atoms/Icon"
import { useQueryParams } from "@/hooks/utilityHooks"

const HDTabs: FC = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      tabs={HD_TABS.map(({ icon, ...tab }) => ({
        ...tab,
        startContent: <Icon name={icon} size={20} />,
      }))}
      classNames={{
        base: "grid",
        tabList:
          "gap-2.5 border-b border-gray-50 px-0 pb-0 flex-1 items-start overflow-x-auto w-full",
        cursor: "w-full rounded-md",
        tab: "pb-1 w-[unset]",
      }}
      onSelectionChange={(tab) => set(HD_QUERY_KEYS.TAB, tab)}
      selectedKey={get(HD_QUERY_KEYS.TAB) || HD_TABS[0].key} // default to first tab
    />
  )
}

export default HDTabs
