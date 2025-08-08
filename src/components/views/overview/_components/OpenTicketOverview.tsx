"use client"

import ChartCard from "@/components/molecules/Cards/ChartCard"
import MetricCard from "@/components/molecules/Cards/MetricCard"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { COMPARISM_TIMEFRAME } from "../utils"
import { formatComma } from "@/utils/helpers"
import Typography from "@/components/atoms/Typography"
import { useOpenTicketsOverview } from "@/hooks/api/overviewHooks"
import { Progress, Skeleton } from "@nextui-org/react"
import { TICKET_PRIORITY_DATA } from "@/utils/constants"
import { TicketPriority } from "../../help-desk/utils"

type Props = {
  date: string
  start: string
  end: string
}

const OpenTicketOverview: FC<Props> = ({ date, start, end }) => {
  const { data, isLoading } = useOpenTicketsOverview({
    start_date: start,
    end_date: end,
  })

  const priorities = useMemo(
    () => data?.ticket_priority_breakdown?.data.toReversed() || [],
    [data]
  )

  return (
    <ChartCard
      title="Open Ticket Overview"
      hideTrendAnalysis
      classNames={{
        root: "pt-0 pb-0 overflow-hidden",
        main: "overflow-y-auto pt-0.5 gap-6 no-scrollbar",
      }}
    >
      <div>
        <div className="grid grid-cols-[repeat(2,_minmax(240px,_1fr))] gap-3 w-full overflow-x-auto no-scrollbar">
          <MetricCard
            removeFooter
            title="OPEN TICKETS"
            value={formatComma(data?.open_tickets.value || 0)}
            change={data?.open_tickets?.percentage_change}
            timeframe={COMPARISM_TIMEFRAME[date]}
            loading={isLoading}
          />
          <MetricCard
            removeFooter
            title="ESCALATION RATE"
            value={`${data?.escalation_rate.value || 0}%`}
            change={data?.escalation_rate?.percentage_change}
            timeframe={COMPARISM_TIMEFRAME[date]}
            loading={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Typography as="h3" variant="bold-sm" className="text-gray-600">
          Ticket Priority Breakdown
        </Typography>
        <div className="bg-gray-25 rounded-xl p-4 grid gap-4">
          {!!priorities.length || isLoading
            ? (priorities.length ? priorities : new Array(4).fill({})).map(
                (priority, idx) => (
                  <div
                    className="flex flex-wrap gap-4.5 items-center"
                    key={idx}
                  >
                    <div className="flex-1 flex items-center justify-between">
                      <Typography
                        as="span"
                        variant="semibold-sm"
                        className="capitalize text-black h-[17.5px]"
                        loading={isLoading}
                      >
                        {priority.priority}
                      </Typography>
                      <Typography
                        as="span"
                        variant="medium-sm"
                        className="text-black h-[17.5px]"
                        loading={isLoading}
                      >
                        {priority.count} tickets
                      </Typography>
                    </div>
                    <Skeleton
                      isLoaded={!isLoading}
                      className="w-full sm:max-w-28 rounded-sm"
                    >
                      <Progress
                        aria-label={`${priority.priority} priority ticket count`}
                        classNames={{
                          track: "h-1.5",
                          indicator: `${TICKET_PRIORITY_DATA?.[priority.priority as TicketPriority]?.bg}`,
                          label: "font-semibold text-sm text-black",
                          value: "font-semibold text-sm text-black",
                        }}
                        value={priority.percentage}
                      />
                    </Skeleton>
                  </div>
                )
              )
            : null}
        </div>
      </div>
    </ChartCard>
  )
}

export default OpenTicketOverview
