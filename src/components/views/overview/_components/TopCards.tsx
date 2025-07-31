"use client"

// import MetricCard from "@/components/molecules/Cards/MetricCard"
import { formatComma, round } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React from "react"
import { COMPARISM_TIMEFRAME } from "../utils"
import { useOverviewTopCards } from "@/hooks/api/overviewHooks"
import dynamic from "next/dynamic"

const MetricCard = dynamic(
  () => import("@/components/molecules/Cards/MetricCard"),
  { ssr: false }
)

type Props = {
  date: string
  start: string
  end: string
}

const TopCards: FC<Props> = ({ date, start, end }) => {
  const { data, isLoading } = useOverviewTopCards({
    start_date: start,
    end_date: end,
  })

  return (
    <div className="grid grid-cols-[repeat(5,_minmax(240px,_1fr))] gap-3 overflow-auto px-4 sm:px-5 no-scrollbar">
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
        title="AI RESOLVED TICKETS"
        value={formatComma(data?.ai_resolved_tickets?.value || 0)}
        change={data?.ai_resolved_tickets?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="HUMAN RESOLVED TICKETS"
        value={formatComma(data?.human_resolved_tickets?.value || 0)}
        change={data?.human_resolved_tickets?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="CSAT SCORE"
        value={round(data?.csat_score?.value || 0)}
        unit="/5"
        change={data?.csat_score?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
      <MetricCard
        removeFooter
        title="AVG. TICKET COMPLEXITY "
        value={round(data?.avg_ticket_complexity_score?.value || 0)}
        unit="/41"
        change={data?.avg_ticket_complexity_score?.percentage_change}
        timeframe={COMPARISM_TIMEFRAME[date]}
        loading={isLoading}
      />
    </div>
  )
}

export default TopCards
