import Typography from "@/components/atoms/Typography"
import DonutChart from "@/components/organisms/Charts/DonutChart"
import { useHDSummaryTicketPriorities } from "@/hooks/api/helpdeskHooks"
import { TICKET_PRIORITY_DATA } from "@/utils/constants"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"

type Props = {
  start: string
  end: string
}

const TicketPriorities: FC<Props> = ({ start, end }) => {
  const { data, isLoading } = useHDSummaryTicketPriorities({
    start_date: start,
    end_date: end,
  })
  const priorities = useMemo(
    () =>
      (data?.data || [])
        .filter((priority) => TICKET_PRIORITY_DATA[priority.priority])
        ?.map((priority) => {
          const priorityData = TICKET_PRIORITY_DATA[priority.priority]
          return {
            label: capitalizeFirstLetter(priority.priority),
            count: priority.count,
            color: priorityData.color,
          }
        }),
    [data]
  )
  return (
    <section className="border border-gray-50 rounded-x10 p-4 sm:p-6">
      <Typography as="h3" className="text-semibold-base mb-6">
        Ticket priorities
      </Typography>
      <div className="min-h-[220px]">
        {(data?.total && data?.data?.length) || isLoading ? (
          <DonutChart
            unit="ticket"
            name="helpdesk tickets"
            hasLegend
            loading={isLoading}
            data={priorities}
          />
        ) : (
          "No entries for the selected period"
        )}
      </div>
    </section>
  )
}

export default TicketPriorities
