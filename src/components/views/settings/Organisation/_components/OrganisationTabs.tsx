"use client"

import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import { ORAGANISATION_TABS, ORGANISATION_QUERY_KEYS } from "../utils"

const OrganisationTabs = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      radius="full"
      variant="solid"
      tabs={ORAGANISATION_TABS}
      classNames={{ cursor: "rounded-full", tab: "p-5" }}
      onSelectionChange={(tab) => set(ORGANISATION_QUERY_KEYS.TAB, tab)}
      selectedKey={
        get(ORGANISATION_QUERY_KEYS.TAB) || ORAGANISATION_TABS[0].key
      }
    />
  )
}

export default OrganisationTabs
