import Settings from "@/components/views/settings"
import {
  SETTINGS_QUERY_KEYS,
  SETTINGS_TABS,
  SettingsTabsType,
} from "@/components/views/settings/utlis"
import { PageFC } from "@/utils/types"
import React from "react"

export const metadata = {
  title: "Settings",
}

const SettingsPage: PageFC = ({ searchParams }) => {
  const tab =
    (searchParams?.[SETTINGS_QUERY_KEYS.TAB] as SettingsTabsType) ||
    SETTINGS_TABS[0].key
  return <Settings tab={tab} />
}

export default SettingsPage
