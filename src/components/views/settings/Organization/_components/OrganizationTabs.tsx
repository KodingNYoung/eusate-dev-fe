"use client"

import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import { ORAGANIZATION_TABS, ORGANIZATION_QUERY_KEYS } from "../utils"

const OrganizationTabs = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      radius="full"
      variant="solid"
      tabs={ORAGANIZATION_TABS}
      classNames={{ cursor: "rounded-full", tab: "p-5" }}
      onSelectionChange={(tab) => set(ORGANIZATION_QUERY_KEYS.TAB, tab)}
      selectedKey={
        get(ORGANIZATION_QUERY_KEYS.TAB) || ORAGANIZATION_TABS[0].key
      }
    />
  )
}

export default OrganizationTabs
