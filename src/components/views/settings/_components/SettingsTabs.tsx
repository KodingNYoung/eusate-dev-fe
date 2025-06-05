"use client"

import AppTabs from "@/components/molecules/Tabs"
import { FC } from "@/utils/types"
import React from "react"
import { SETTINGS_QUERY_KEYS, SETTINGS_TABS } from "../utils"
import Icon from "@/components/atoms/Icon"
import { cls } from "@/utils/helpers"
import { useQueryParams } from "@/hooks/utilityHooks"

const SettingsTabs: FC = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      isVertical={true}
      tabs={SETTINGS_TABS.map(({ icon, ...tabs }) => ({
        ...tabs,
        startContent: <Icon name={icon} />,
      }))}
      classNames={{
        tabList: "gap-y-0 ",
        tab: cls(
          "justify-start py-6 border-l-2 border-l-gray transition-all duration-800",
          "data-[selected=true]:border-l-2 data-[selected=true]:border-gray-900"
        ),
      }}
      onSelectionChange={(tab) => set(SETTINGS_QUERY_KEYS.TAB, tab)}
      selectedKey={get(SETTINGS_QUERY_KEYS.TAB) || SETTINGS_TABS[0].key}
    />
  )
}

export default SettingsTabs
