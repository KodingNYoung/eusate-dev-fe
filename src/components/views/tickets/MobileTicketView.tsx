"use client"

import AppTabs from "@/components/molecules/Tabs"
import { useQueryParams } from "@/hooks/utilityHooks"
import React, { FC } from "react"
import { MOBILE_TICKET_CHAT_HB_TABS } from "./utils"

type Props = {
  tab: string
}

const MobileTicketView: FC<Props> = ({ tab }) => {
  const { set, get } = useQueryParams()

  return (
    <div className="md:hidden w-full h-full grid border-black border">
      <AppTabs
        tabs={MOBILE_TICKET_CHAT_HB_TABS.map(({ ...tab }) => ({
          ...tab,
        }))}
        classNames={{
          base: "flex w-full",
          tabList:
            "gap-2.5 border-b border-gray-50 px-0 pb-0 flex-1 items-center overflow-x-auto w-full",
          cursor: "w-full rounded-md",
          tab: "pb-2 w-[unset] w-full justify-center",
        }}
        onSelectionChange={(tab) => set("tab", tab)}
        selectedKey={get("tab") || MOBILE_TICKET_CHAT_HB_TABS[0].key} // default to first tab
      />

      {tab === "CONVERSATION" ? "Conversation" : "Details"}
    </div>
  )
}

export default MobileTicketView
