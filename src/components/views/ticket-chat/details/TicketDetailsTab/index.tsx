import AppTabs from "@/components/molecules/Tabs"
import React, { FC, useState } from "react"
import UserInfo from "./UserInfo"
import Attachments from "./Attachments"
import Comments from "./Comments"
import Activities from "./Activity"
import { Ticket } from "@/utils/types"
import { TICKET_DETAILS_TABS_LIST } from "../../utils"

type Props = {
  ticket: Ticket
}

const TicketDetailsTab: FC<Props> = ({ ticket }) => {
  const [tab, setTab] = useState<number | string>("attachments")

  return (
    <div className="w-full h-[50%] max-h-[500px] overflow-y-auto border-t border-gray-50 flex flex-col">
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
      <div className="flex flex-col flex-1">
        {tab === "userinfo" && <UserInfo customer={ticket?.customer} />}
        {tab === "attachments" && (
          // should use the ticket chat provider to get attachments
          <Attachments attachments={ticket?.attachments} />
        )}
        {tab === "comments" && <Comments ticketId={ticket?.id} />}
        {tab === "activity" && <Activities />}
      </div>
    </div>
  )
}

export default TicketDetailsTab
