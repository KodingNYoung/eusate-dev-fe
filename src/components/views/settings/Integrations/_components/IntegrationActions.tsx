"use client"

import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import {
  INTEGRATION_QUERY_KEYS,
  INTEGRATION_TABS,
  IntegrationTab,
} from "../utils"
import { useMemo } from "react"
import OpenModalButton from "@/components/molecules/Buttons/OpenModalButton"
import { PopupKeys } from "@/utils/enums"

const IntegrationActions = () => {
  const { get, set, searchParams } = useQueryParams()

  const { tab } = useMemo(
    () => ({
      tab: get(INTEGRATION_QUERY_KEYS.TAB) || INTEGRATION_TABS[0].key,
    }),
    [searchParams]
  )

  return (
    <div className="flex items-center justify-between">
      <AppTabs
        variant="solid"
        radius="full"
        tabs={INTEGRATION_TABS}
        classNames={{ cursor: "rounded-full", tab: "p-5" }}
        onSelectionChange={(tab) => set(INTEGRATION_QUERY_KEYS.TAB, tab)}
        selectedKey={tab}
      />
      {tab === IntegrationTab.API_KEYS && (
        <OpenModalButton
          modalKey={PopupKeys.GENERATE_API_KEY}
          size="sm"
          classNames={{ root: "px-4.5 py-2.5" }}
        >
          Generate api key
        </OpenModalButton>
      )}
    </div>
  )
}

export default IntegrationActions
