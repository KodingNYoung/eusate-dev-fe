import Icon from "@/components/atoms/Icon"
import AppTabs from "@/components/molecules/Tabs"
import { IconNames } from "@/utils/iconNames"
import { FC, Ticket } from "@/utils/types"
import React, { useState } from "react"

type Props = {
  ticket: Ticket
}

const SECTION_TABS: { key: string; label: string; icon: IconNames }[] = [
  { key: "conversations", label: "Conversations", icon: "icon-message-text" },
  { key: "comments", label: "Comments", icon: "icon-messages-2" },
  { key: "activity", label: "Activity", icon: "icon-notification-status" },
]

const TicketSectionTabs: FC<Props> = () => {
  const [currentTab, setCurrentTab] = useState(SECTION_TABS[0].key)
  return (
    <div className="max-h-[500px] px-8 py-5 flex flex-col gap-2">
      <AppTabs
        tabs={SECTION_TABS.map(({ icon, ...tab }) => ({
          ...tab,
          startContent: <Icon name={icon} size={20} />,
        }))}
        disableAnimation
        classNames={{
          base: "grid",
          tabList: "border-b border-gray-50 w-full gap-0 pb-0",
          cursor: "rounded-md w-full",
          tab: "h-9 after:w-full",
        }}
        onSelectionChange={(tab) => setCurrentTab(tab as string)}
        selectedKey={currentTab || SECTION_TABS[0].key}
      />
      <div className="flex-1 border border-gray-50 rounded-x20 h-full overflow-y-auto">
        {currentTab === SECTION_TABS[0].key && (
          <div className="h-[600px]">Conversations</div>
        )}
        {currentTab === SECTION_TABS[1].key && <div className="">Comments</div>}
        {currentTab === SECTION_TABS[2].key && <div className="">Activity</div>}
      </div>
    </div>
  )
}

export default TicketSectionTabs
