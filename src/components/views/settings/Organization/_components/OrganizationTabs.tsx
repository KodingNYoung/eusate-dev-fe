"use client"

import AppTabs from "@/components/molecules/Tabs"
import { ORAGANIZATION_TABS, ORGANIZATION_QUERY_KEYS } from "../utils"
import { useQueryParams } from "@/hooks/utilityHooks"

const OrganizationTabs = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      variant="solid"
      radius="full"
      classNames={{ cursor: "rounded-full", tab: "p-5" }}
      tabs={ORAGANIZATION_TABS}
      onSelectionChange={(tab) => set(ORGANIZATION_QUERY_KEYS.TAB, tab)}
      selectedKey={
        get(ORGANIZATION_QUERY_KEYS.TAB) || ORAGANIZATION_TABS[0].key
      }
    />
  )
}

export default OrganizationTabs
