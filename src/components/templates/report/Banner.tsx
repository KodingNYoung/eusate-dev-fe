"use client"
import { ReportType } from "@/components/views/report/utils"
import { FC, TWClassNames } from "@/utils/types"
import Image from "next/image"
import { useParams } from "next/navigation"
import React from "react"
import bannerChart from "@/assets/images/reports/report-page-banner-chart.svg"
import bannerChartSm from "@/assets/images/reports/report-page-banner-chart-sm.svg"
import Logo from "@/components/atoms/Logo"
import { cls } from "@/utils/helpers"

const bgMap: { [type in ReportType]: TWClassNames } = {
  [ReportType.OVERALL_PERFORMANCE]: "bg-brand-gradient",
  [ReportType.TICKET_RESOLUTION]: "bg-red-500",
  [ReportType.AI_VS_HUMAN]: "bg-info-500",
  [ReportType.CUSTOMER_SATISFACTION]: "bg-success-500",
  [ReportType.WORKLOAD_DISTRIBUTION]: "bg-gray-700",
}

const Banner: FC = () => {
  const params = useParams()
  const reportType = params.reportType as ReportType
  return (
    <section
      className={cls(
        "flex items-center justify-between rounded-xl h-[60px] sm:h-[80px]",
        bgMap[reportType]
      )}
    >
      <div className="pt-2.5 sm:px-3 w-1/4 sm:self-end">
        <Image
          src={bannerChart}
          height={80}
          width={400}
          alt=""
          className="w-full h-full hidden sm:block"
        />
        <Image
          src={bannerChartSm}
          height={40}
          width={200}
          alt=""
          className="w-full h-full sm:hidden"
        />
      </div>
      <div className="w-24 sm:w-[120px]">
        <Logo type="full-white" />
      </div>
      <div className="pt-2.5 sm:px-3 w-1/4 [transform:rotateY(-180deg)] sm:self-end">
        <Image
          src={bannerChart}
          height={80}
          width={400}
          alt=""
          className="w-full h-full hidden sm:block"
        />
        <Image
          src={bannerChartSm}
          height={40}
          width={200}
          alt=""
          className="w-full h-full sm:hidden"
        />
      </div>
    </section>
  )
}

export default Banner
