import Report from "@/components/views/report"
import { ReportType } from "@/components/views/report/utils"
import { PageFC } from "@/utils/types"
import React from "react"

type ParamsProps = {
  reportType: ReportType
}

const ReportPage: PageFC<ParamsProps> = ({ params }) => {
  const reportType = params?.reportType as ReportType
  return <Report reportType={reportType} />
}

export default ReportPage
