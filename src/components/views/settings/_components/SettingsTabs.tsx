"use client"

import AppTabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import { SETTINGS_QUERY_KEYS, SETTINGS_TABS } from "../utlis"
import { useQueryParams } from "@/hooks/utilityHooks"

const SettingsTabs: FC = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      tabs={SETTINGS_TABS}
      classNames={{}}
      onSelectionChange={(tab) => set(SETTINGS_QUERY_KEYS.TAB, tab)}
      selectedKey={get(SETTINGS_QUERY_KEYS.TAB) || SETTINGS_TABS[0].key} // default to first tab
    />
  )
}

export default SettingsTabs
