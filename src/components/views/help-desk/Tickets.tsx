import { FC } from "@/utils/types"
import React from "react"
import { HelpDeskTabs, TicketPriority, TicketStatus } from "./utils"
import TicketsActions from "./_components/TicketsActions"
import TicketsEmptyState from "./_components/TicketsEmptyState"
import TicketCard from "./_components/TicketCard"

type Props = {
  tab: HelpDeskTabs
}

const Tickets: FC<Props> = () => {
  return (
    <div className="grid gap-5 content-start flex-1">
      <TicketsActions />
      {false && <TicketsEmptyState />}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(270px,1fr))] gap-5">
        {[
          { status: TicketStatus.OPEN, priority: TicketPriority.CRITICAL },
          { status: TicketStatus.TAKEN, priority: TicketPriority.LOW },
          {
            status: TicketStatus.RELEASED_AND_OPEN,
            priority: TicketPriority.LOW,
          },
          { status: TicketStatus.CLOSED, priority: TicketPriority.MEDIUM },
          {
            status: TicketStatus.RESOLVED_AND_CLOSED,
            priority: TicketPriority.LOW,
          },
          { status: TicketStatus.OPEN, priority: TicketPriority.HIGH },
          { status: TicketStatus.CLOSED, priority: TicketPriority.LOW },
        ].map((ticket, idx) => {
          return <TicketCard key={idx} ticket={ticket} />
        })}
      </div>
    </div>
  )
}

export default Tickets
