"use client"

import AppDateRangePicker from "@/components/organisms/AppDateRangePicker"
import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { DATE_FILTER_OPTIONS, getDateRange } from "../overview/utils"
import { HD_QUERY_KEYS } from "../help-desk/utils"
import TopCards from "./_components/TopCards"
import TicketPriorities from "./_components/TicketPriorities"
import AgentResolutionTimes from "./_components/AgentResolutionTimes"
import TicketVolume from "./_components/TicketVolume"
import TicketResolution from "./_components/TicketResolution"

type Props = { date: string }

const HelpdeskSummary: FC<Props> = ({ date }) => {
  const { set } = useQueryParams()

  const { start, end } = useMemo(() => getDateRange(date), [date])

  return (
    <div className="grid items-start gap-5 w-full pb-20">
      <AppDateRangePicker
        presets={DATE_FILTER_OPTIONS}
        value={date}
        onDateSelect={(date) => set(HD_QUERY_KEYS.DATE, date)}
      />
      <TopCards date={date} start={start} end={end} />
      <div className="flex items-start flex-wrap gap-5">
        <div className="flex-[2] min-w-full sm:min-w-[500px] grid gap-5">
          <TicketVolume date={date} start={start} end={end} />
          <TicketResolution date={date} start={start} end={end} />
        </div>
        <div className="flex-1 min-w-full sm:min-w-[343px] grid gap-5">
          <TicketPriorities start={start} end={end} />
          <AgentResolutionTimes start={start} end={end} />
        </div>
      </div>
    </div>
  )
}

export default HelpdeskSummary
