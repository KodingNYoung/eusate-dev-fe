"use client"

import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import { INTEGRATION_QUERY_KEYS, INTEGRATION_TABS } from "../utils"

const IntegrationTabs = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      variant="solid"
      radius="full"
      tabs={INTEGRATION_TABS}
      classNames={{ cursor: "rounded-full", tab: "p-5" }}
      onSelectionChange={(tab) => set(INTEGRATION_QUERY_KEYS.TAB, tab)}
      selectedKey={get(INTEGRATION_QUERY_KEYS.TAB) || INTEGRATION_TABS[0].key}
    />
  )
}

export default IntegrationTabs
