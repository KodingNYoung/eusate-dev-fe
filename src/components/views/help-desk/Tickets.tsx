"use client"

import { FC, Ticket } from "@/utils/types"
import React, { useMemo, useState } from "react"
import {
  HD_QUERY_KEYS,
  HelpDeskTabs,
  TicketFilters,
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
import { useModal } from "@/hooks/popupHooks"
import { PopupKeys } from "@/utils/enums"

type Props = {
  tab: HelpDeskTabs
}

const Tickets: FC<Props> = () => {
  const { get, searchParams } = useQueryParams()
  const { open } = useModal()

  const [ticket, setTicket] = useState<Ticket>({} as Ticket)

  const filters = useMemo(
    () => ({
      priority: (get(TicketFilters.PRIORITY) as TicketPriority) || undefined,
      status: (get(TicketFilters.STATUS) as TicketStatus) || undefined,
      date_created: (get(TicketFilters.DATE_CREATED) as string) || undefined,
      assigned_to_me:
        get(HD_QUERY_KEYS.TAB) === HelpDeskTabs.ASSIGNED_TO_ME || undefined,
      ai_tickets:
        get(HD_QUERY_KEYS.TAB) === HelpDeskTabs.AI_TICKETS || undefined,
      temperaments:
        (get(TicketFilters.TEMPERAMENT) as UserTemperament) || undefined,
      search: (get(HD_QUERY_KEYS.SEARCH) as string) || undefined,
    }),
    [searchParams]
  )

  const { data, isLoading } = useTickets(filters)

  const tickets = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || []
  }, [data])

  return (
    <div className="grid gap-5 content-start flex-1">
      <TicketsActions />
      {!data?.pages?.[0]?.count && !isLoading && (
        <TicketsEmptyState hasFilters={!!Object.values(filters).length} />
      )}
      {(!!tickets.length || isLoading) && (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(290px,1fr))] gap-5">
          {(tickets.length ? tickets : new Array(8).fill(null)).map(
            (ticket, idx) => {
              return (
                <TicketCard
                  key={ticket?.id || idx}
                  ticket={ticket}
                  onView={() => {
                    setTicket(ticket)
                    open(PopupKeys.VIEW_TICKET_DRAWER)
                  }}
                  loading={isLoading}
                />
              )
            }
          )}
        </div>
      )}
      <TicketViewDrawer ticket={ticket} />
    </div>
  )
}

export default Tickets
