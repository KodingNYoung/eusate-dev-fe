import { FC } from "@/utils/types"
import React from "react"
import ReportHeader from "./_components/ReportHeader"
import { ReportType } from "./utils"
import MetricCard from "@/components/molecules/Cards/MetricCard"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import DonutChart from "@/components/organisms/Charts/DonutChart"
import ColumnChart from "@/components/organisms/Charts/ColumnChart"
import AgentMetricItem from "./_components/AgentMetricItem"

const OverallPerformance: FC = () => {
  return (
    <div className="flex flex-col gap-5 pt-10">
      <ReportHeader reportType={ReportType.OVERALL_PERFORMANCE} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(333px,_1fr))] gap-3">
        <MetricCard />
        <MetricCard />
        <MetricCard />
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
                indicatorBg: "bg-gold-500",
              },
              {
                label: "Twitter",
                count: 2343,
                color: "#0A0A0A",
                indicatorBg: "bg-black-100",
              },
              {
                label: "Website",
                count: 7345,
                color: "#2E90FA",
                indicatorBg: "bg-info-500",
              },
            ]}
          />
        </ChartCard>
        <ChartCard
          title="Agent Productivity"
          classNames={{ main: "!py-0 !px-0" }}
        >
          <div className="flex flex-col flex-1 gap-6 min-h-full max-h-[250px] overflow-y-auto px-6 py-4">
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
            <AgentMetricItem metric="50%" />
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Total Authorized Customers Attended To">
        <ColumnChart />
      </ChartCard>
    </div>
  )
}

export default OverallPerformance
