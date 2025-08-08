import { FC, Ticket } from "@/utils/types"
import React from "react"
import TicketDetails from "./TicketDetails"
import Attachments from "./Attachments"
import CustomerInfo from "./CustomerInfo"
import TicketActionBtns from "./TicketActionButtons"
import TicketSectionTabs from "./TicketSectionTabs"
import { useTicketDetails } from "@/hooks/api/helpdeskHooks"

type Props = {
  ticket: Ticket
}

const ViewTicketContent: FC<Props> = ({ ticket }) => {
  const { data } = useTicketDetails(ticket.id, ticket)
  return data ? (
    <main className="relative flex flex-col flex-1">
      <TicketDetails ticket={data} />
      {!!data.attachments?.length && (
        <Attachments attachments={data.attachments} />
      )}
      <CustomerInfo info={data.customer} />
      <TicketSectionTabs ticket={data} />
      <TicketActionBtns ticket={data} />
    </main>
  ) : null
}

export default ViewTicketContent
