import Icon from "@/components/atoms/Icon"
import AppTabs from "@/components/molecules/Tabs"
import { IconNames } from "@/utils/iconNames"
import { FC, Ticket } from "@/utils/types"
import React, { useState } from "react"
import ConversationSnippet from "./ConversationSnippet"
import Comments from "@/components/views/ticket-chat/details/TicketDetailsTab/Comments"
import Activities from "@/components/views/ticket-chat/details/TicketDetailsTab/Activity"

type Props = {
  ticket: Ticket
}

const SECTION_TABS: { key: string; label: string; icon: IconNames }[] = [
  { key: "conversations", label: "Conversations", icon: "icon-message-text" },
  { key: "comments", label: "Comments", icon: "icon-messages-2" },
  { key: "activity", label: "Activity", icon: "icon-notification-status" },
]

const TicketSectionTabs: FC<Props> = ({ ticket }) => {
  const [currentTab, setCurrentTab] = useState(SECTION_TABS[0].key)
  return (
    <div className="h-[500px]">
      <div className="pt-5 px-8">
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
      </div>
      <div className="h-[calc(100%_-_61px)] px-8 py-5">
        <div className="max-h-full h-full overflow-auto no-scrollbar border border-gray-50 rounded-x20">
          {currentTab === SECTION_TABS[0].key && (
            <ConversationSnippet ticketId={ticket.id} />
          )}
          {currentTab === SECTION_TABS[1].key && (
            <Comments ticketId={ticket?.id} />
          )}
          {currentTab === SECTION_TABS[2].key && (
            <Activities ticketId={ticket?.id} />
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketSectionTabs
