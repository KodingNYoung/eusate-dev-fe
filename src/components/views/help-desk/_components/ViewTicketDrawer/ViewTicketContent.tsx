import { FC, Ticket } from "@/utils/types"
import React from "react"
import TicketDetails from "./TicketDetails"
import Attachments from "./Attachments"
import CustomerInfo from "./CustomerInfo"
import TicketActionBtns from "./TicketActionButtons"
import TicketSectionTabs from "./TicketSectionTabs"

type Props = {
  ticket: Ticket
}

const ViewTicketContent: FC<Props> = ({ ticket }) => {
  return (
    <main className="relative flex flex-col flex-1 overflow-y-auto">
      <TicketDetails ticket={ticket} />
      {!!ticket.attachments?.length && (
        <Attachments attachments={ticket.attachments} />
      )}
      <CustomerInfo info={ticket.customer} />
      <TicketSectionTabs ticket={ticket} />
      <TicketActionBtns ticket={ticket} />
    </main>
  )
}

export default ViewTicketContent
