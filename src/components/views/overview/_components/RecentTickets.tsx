"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import { useTickets } from "@/hooks/api/helpdeskHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import TicketCard from "../../help-desk/_components/TicketCard"
import Link from "next/link"
import { ROUTES } from "@/utils/constants"
import { HD_QUERY_KEYS, HelpDeskTabs } from "../../help-desk/utils"

type Props = {
  start: string
  end: string
}

const RecentTickets: FC<Props> = ({ start: start_date, end: end_date }) => {
  const { data, isLoading } = useTickets({
    start_date,
    end_date,
    page_size: 4,
  })
  const tickets = useMemo(() => {
    return data?.pages?.flatMap((page) => page.results) || []
  }, [data])
  return (
    <ChartCard
      title="Recent Tickets"
      hideTrendAnalysis
      classNames={{
        root: "pt-0 pb-0 overflow-hidden",
        main: "!py-0 !px-0 max-h-[351px] overflow-auto",
      }}
    >
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] gap-5 px-6">
        {(!!(tickets && tickets.length) || isLoading) &&
          (tickets?.length ? tickets : new Array(4).fill({})).map(
            (ticket, idx) => (
              <TicketCard
                key={ticket.id || idx}
                ticket={ticket}
                loading={isLoading}
              />
            )
          )}
      </div>
      <footer className="border-t border-[#e6e6e6] bg-white py-4 flex items-center justify-center sticky bottom-0">
        <Link
          href={`${ROUTES.HELP_DESK}?${HD_QUERY_KEYS.TAB}=${HelpDeskTabs.ALL}`}
          className="flex items-center justify-center gap-1 leading-none group/link"
        >
          <Typography
            as="span"
            className="text-medium-sm text-gray-500 group-hover/link:text-gradient"
          >
            See all tickets
          </Typography>
          <Icon
            name="icon-arrow-right"
            size={20}
            className="text-gray-500 group-hover/link:text-gradient"
          />
        </Link>
      </footer>
    </ChartCard>
  )
}

export default RecentTickets
