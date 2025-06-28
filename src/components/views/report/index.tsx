import { FC } from "@/utils/types"
import React from "react"
import { ReportType } from "./utils"
import OverallPerformance from "./OverallPerformance"
import TicketResolution from "./TicketResolution"
import AiVsHuman from "./AiVsHuman"
import CSAT from "./CSAT"
import WorkloadDistribution from "./WorkloadDistribution"

type Props = {
  reportType: ReportType
}

const Report: FC<Props> = ({ reportType }) => {
  return reportType === ReportType.OVERALL_PERFORMANCE ? (
    <OverallPerformance />
  ) : reportType === ReportType.TICKET_RESOLUTION ? (
    <TicketResolution />
  ) : reportType === ReportType.AI_VS_HUMAN ? (
    <AiVsHuman />
  ) : reportType === ReportType.CUSTOMER_SATISFACTION ? (
    <CSAT />
  ) : reportType === ReportType.WORKLOAD_DISTRIBUTION ? (
    <WorkloadDistribution />
  ) : null
}

export default Report
