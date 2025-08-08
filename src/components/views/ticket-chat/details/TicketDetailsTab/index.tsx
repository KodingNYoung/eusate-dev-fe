import AppTabs from "@/components/molecules/Tabs"
import React, { FC, useState } from "react"
import UserInfo from "./UserInfo"
import Attachments from "./Attachments"
import Comments from "./Comments"
import Activities from "./Activity"
import { Ticket } from "@/utils/types"
import { TICKET_DETAILS_TABS_LIST, TicketDetailsTabs } from "../../utils"

type Props = {
  ticket: Ticket
}

const TicketDetailsTab: FC<Props> = ({ ticket }) => {
  const [tab, setTab] = useState<number | string>(TicketDetailsTabs.ATTACHMENTS)

  return (
    <div className="h-[500px] border-t border-gray-50">
      <AppTabs
        tabs={TICKET_DETAILS_TABS_LIST.map(({ ...tab }) => ({
          ...tab,
        }))}
        classNames={{
          base: "flex w-full sticky top-0 left-0 bg-white",
          tabList: "w-full border-b border-gray-50 gap-0 pb-0 overflow-x-auto",
          cursor: "w-full rounded-md",
          tab: "h-12 pb-2 w-[unset] w-full justify-center",
        }}
        onSelectionChange={(tab) => setTab(tab)}
        selectedKey={tab}
      />
      <div className="h-[calc(100%_-_54px)]">
        {tab === TicketDetailsTabs.ATTACHMENTS && (
          // should use the ticket chat provider to get attachments
          <div className="max-h-full h-full overflow-auto no-scrollbar">
            <Attachments attachments={ticket?.attachments} />
          </div>
        )}
        {tab === TicketDetailsTabs.USERINFO && (
          <div className="max-h-full h-full overflow-auto no-scrollbar">
            <UserInfo customer={ticket?.customer} />
          </div>
        )}
        {tab === TicketDetailsTabs.COMMENTS && (
          <div className="h-full w-full py-5 px-6">
            <div className="max-h-full h-full overflow-auto no-scrollbar border border-gray-50 rounded-x20">
              <Comments ticketId={ticket?.id} />
            </div>
          </div>
        )}
        {tab === TicketDetailsTabs.ACTIVITY && (
          <div className="h-full w-full py-5 px-6">
            <div className="max-h-full h-full overflow-auto no-scrollbar border border-gray-50 rounded-x20">
              <Activities ticketId={ticket?.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketDetailsTab
