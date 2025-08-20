"use client"

import { FC } from "@/utils/types"
import { SATE_AI_QUERY_KEYS, SATE_AI_TABS, SateAiTabsType } from "./utils"
import Remarks from "./Remarks"
import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import Priorities from "./Priority"
import Feedback from "./Feedback"
import { useMemo } from "react"

const SateAi: FC = () => {
  const { get, set, searchParams } = useQueryParams()
  const tab = useMemo(
    () =>
      (get(SATE_AI_QUERY_KEYS.TAB) as SateAiTabsType) || SATE_AI_TABS[0].key,
    [searchParams]
  )
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <AppTabs
        radius="full"
        variant="solid"
        tabs={SATE_AI_TABS}
        classNames={{
          cursor: "rounded-full",
          tab: "px-4 py-3",
          tabList: "gap-0",
        }}
        onSelectionChange={(tab) => set(SATE_AI_QUERY_KEYS.TAB, tab)}
        selectedKey={tab}
      />
      <main>
        {tab === "remarks" && <Remarks />}
        {tab === "priority" && <Priorities />}
        {tab === "feedback" && <Feedback />}
      </main>
    </div>
  )
}

export default SateAi
