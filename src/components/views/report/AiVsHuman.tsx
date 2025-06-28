import { FC } from "@/utils/types"
import React from "react"
import { ReportType } from "./utils"
import ReportHeader from "./_components/ReportHeader"
import MetricCard from "@/components/molecules/Cards/MetricCard"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import AgentMetricItem from "./_components/AgentMetricItem"
import LineChart from "@/components/organisms/Charts/LineChart"
import MultiGauge from "@/components/organisms/Charts/MultiGauge"

const AiVsHuman: FC = () => {
  return (
    <div className="flex flex-col gap-5 pt-10">
      <ReportHeader reportType={ReportType.AI_VS_HUMAN} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(333px,_1fr))] gap-3">
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </div>
      <div className="grid sm:grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-5">
        <ChartCard title="Ticket Resolution Rate">
          <MultiGauge />
        </ChartCard>
        <ChartCard
          title="Agent productivity"
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
      <ChartCard title="Human-Agent Workload Reduction">
        <LineChart />
      </ChartCard>
    </div>
  )
}

export default AiVsHuman
