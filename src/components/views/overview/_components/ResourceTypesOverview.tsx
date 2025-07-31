"use client"

import ChartCard from "@/components/molecules/Cards/ChartCard"
import DonutChart from "@/components/organisms/Charts/DonutChart"
import { useResourceTypeOverview } from "@/hooks/api/overviewHooks"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  start: string
  end: string
}

const ResourceTypesOverview: FC<Props> = ({ start, end }) => {
  const { data, isLoading } = useResourceTypeOverview({
    start_date: start,
    end_date: end,
  })

  return (
    <ChartCard
      title="Resource Types Overview"
      hideTrendAnalysis
      classNames={{
        root: "pt-0 pb-0 overflow-hidden",
        main: "pt-0.5 gap-6",
      }}
    >
      <DonutChart
        unit="resource"
        name="knowledge base resources"
        hasLegend
        loading={isLoading}
        data={[
          {
            label: "Document",
            count: data?.document_count || 0,
            color: "#E86555",
            indicatorBg: "bg-red-500",
          },
          {
            label: "Article",
            count: data?.article_count || 0,
            color: "#D7AB07",
            indicatorBg: "bg-gold-500",
          },
          {
            label: "Link",
            count: data?.link_count || 0,
            color: "#2E90FA",
            indicatorBg: "bg-info-500",
          },

          {
            label: "FAQs",
            count: data?.faq_count || 0,
            color: "#0A0A0A",
            indicatorBg: "bg-black-100",
          },
        ]}
      />
    </ChartCard>
  )
}

export default ResourceTypesOverview
