import { FC } from "@/utils/types"
import React from "react"
import ReportHeader from "./_components/ReportHeader"
import { ReportType } from "./utils"
import MetricCard from "@/components/molecules/Cards/MetricCard"

const TicketResolution: FC = () => {
  return (
    <div className="flex flex-col gap-5 pt-10">
      <ReportHeader reportType={ReportType.TICKET_RESOLUTION} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(333px,_1fr))] gap-3">
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </div>
    </div>
  )
}

export default TicketResolution
