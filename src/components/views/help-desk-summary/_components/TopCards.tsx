import MetricCard from "@/components/molecules/Cards/MetricCard"
import { useHDSummaryTopCards } from "@/hooks/api/helpdeskHooks"
import { formatComma, round } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React from "react"
import { COMPARISM_TIMEFRAME } from "../../overview/utils"

type Props = {
  date: string
  start: string
  end: string
}

const TopCards: FC<Props> = ({ date, start, end }) => {
  const { data, isLoading } = useHDSummaryTopCards({
    start_date: start,
    end_date: end,
  })
  return (
    <div className="grid grid-cols-[repeat(5,_minmax(240px,_1fr))] gap-3 overflow-auto no-scrollbar">
      <MetricCard
        removeFooter
        title="ALL TICKETS"
        value={formatComma(data?.all_tickets?.value || 0)}
        change={data?.all_tickets.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="AVG. HUMAN RESPONSE TIME"
        value={round(data?.avg_human_response_time?.value || 0, 1)}
        unit="mins"
        change={data?.avg_human_response_time?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="AVG. RESOLUTION TIME"
        value={round(data?.avg_resolution_time?.value || 0, 1)}
        unit="hrs"
        change={data?.avg_resolution_time?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="RESOLUTION RATE"
        value={round(data?.resolution_rate?.value || 0)}
        unit="%"
        change={data?.resolution_rate?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="CSAT SCORE"
        value={round(data?.csat_score?.value || 0, 1)}
        unit="/5"
        change={data?.csat_score?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
    </div>
  )
}

export default TopCards
