import { FC } from "@/utils/types"
import React from "react"
import ReportHeader from "./_components/ReportHeader"
import { ReportType } from "./utils"
import MetricCard from "@/components/molecules/Cards/MetricCard"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import DonutChart from "@/components/organisms/Charts/DonutChart"

const WorkloadDistribution: FC = () => {
  return (
    <div className="flex flex-col gap-5 pt-10">
      <ReportHeader reportType={ReportType.WORKLOAD_DISTRIBUTION} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(333px,_1fr))] gap-3">
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </div>
      <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-5">
        <ChartCard title="Tickets by channel">
          <DonutChart
            unit="ticket"
            name="Channel Tickets"
            hasLegend
            data={[
              {
                label: "Whatsapp",
                count: 1012,
                color: "#D7AB07",
              },
              {
                label: "Twitter",
                count: 2343,
                color: "#989FAD",
              },
              {
                label: "Website",
                count: 7345,
                color: "#2E90FA",
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Tickets by channel">
          <DonutChart
            unit="ticket"
            name="Channel Tickets"
            hasLegend
            data={[
              {
                label: "Whatsapp",
                count: 1012,
                color: "#D7AB07",
              },
              {
                label: "Twitter",
                count: 2343,
                color: "#989FAD",
              },
              {
                label: "Website",
                count: 7345,
                color: "#2E90FA",
              },
            ]}
          />
        </ChartCard>
      </div>
    </div>
  )
}

export default WorkloadDistribution
