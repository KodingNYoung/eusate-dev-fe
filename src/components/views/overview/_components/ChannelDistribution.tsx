"use client"

import ChartCard from "@/components/molecules/Cards/ChartCard"
import DonutChart from "@/components/organisms/Charts/DonutChart"
import { useChannelDistribution } from "@/hooks/api/overviewHooks"
import { TICKET_CHANNELS_DATA } from "@/utils/constants"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  start: string
  end: string
}

const ChannelDistribution: FC<Props> = ({ start, end }) => {
  const { data, isLoading } = useChannelDistribution({
    start_date: start,
    end_date: end,
  })

  return (
    <ChartCard
      title="Channel Distribution"
      hideTrendAnalysis
      classNames={{
        root: "pt-0 pb-0 overflow-hidden h-full",
        main: "pt-0.5 gap-6 h-full no-scrollbar",
      }}
    >
      {data?.data?.length || isLoading ? (
        <DonutChart
          unit="ticket"
          name="Channel Distribution"
          hasLegend
          loading={isLoading}
          data={
            isLoading
              ? Object.values(TICKET_CHANNELS_DATA)
                  .filter((channel) => channel.color)
                  .map((channel) => ({
                    label: channel.name,
                    color: channel.color,
                    count: 0,
                  }))
              : data?.data.map((channel) => ({
                  label: TICKET_CHANNELS_DATA[channel.channel].name,
                  color: TICKET_CHANNELS_DATA[channel.channel].color,
                  count: channel.count,
                })) || []
          }
        />
      ) : (
        <>No Channel data yet</>
      )}
    </ChartCard>
  )
}

export default ChannelDistribution
