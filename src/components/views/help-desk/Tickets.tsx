"use client"

import { FC, Ticket } from "@/utils/types"
import React, { useMemo, useState } from "react"
import {
  HelpDeskTabs,
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "./utils"
import TicketsActions from "./_components/TicketsActions"
import TicketsEmptyState from "./_components/TicketsEmptyState"
import TicketCard from "./_components/TicketCard"
import TicketViewDrawer from "./_components/ViewTicketDrawer"
import { useTickets } from "@/hooks/api/helpdeskHooks"
import { useQueryParams } from "@/hooks/utilityHooks"

type Props = {
  tab: HelpDeskTabs
}

const Tickets: FC<Props> = () => {
  const { get, searchParams } = useQueryParams()

  const [ticket, setTicket] = useState<Ticket>({} as Ticket)

  const filters = useMemo(
    () => ({
      priority: (get("priority") as TicketPriority) || undefined,
      status: (get("status") as TicketStatus) || undefined,
      date_created: (get("date_created") as string) || undefined,
      date_updated: (get("date_updated") as string) || undefined,
      assigned_to_me: get("tab") === HelpDeskTabs.ASSIGNED_TO_ME || undefined,
      ai_tickets: get("tab") === HelpDeskTabs.AI_TICKETS || undefined,
      temperament: (get("temperament") as UserTemperament) || undefined,
    }),
    [searchParams]
  )

  const { data, isFetching } = useTickets(filters)

  return (
    <div className="grid gap-5 content-start flex-1">
      <TicketsActions />
      {!data?.pages?.[0]?.count && !isFetching && (
        <TicketsEmptyState hasFilters={!!Object.values(filters).length} />
      )}
      {!!data?.pages?.[0]?.count && (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,1fr))] gap-5">
          {data.pages
            .flatMap((page) => page.results)
            .map((ticket) => {
              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onView={() => setTicket(ticket)}
                />
              )
            })}
        </div>
      )}
      <TicketViewDrawer ticket={ticket} />
    </div>
  )
}

export default Tickets
