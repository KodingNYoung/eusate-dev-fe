"use client"

import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import { SATE_AI_QUERY_KEYS, SATE_AI_TABS } from "../utils"

const SataAiTabs = () => {
  const { get, set } = useQueryParams()
  return (
    <AppTabs
      radius="full"
      variant="solid"
      tabs={SATE_AI_TABS}
      classNames={{ cursor: "rounded-full", tab: "p-5" }}
      onSelectionChange={(tab) => set(SATE_AI_QUERY_KEYS.TAB, tab)}
      selectedKey={get(SATE_AI_QUERY_KEYS.TAB) || SATE_AI_TABS[0].key}
    />
  )
}

export default SataAiTabs
