import { FC } from "@/utils/types"
import React from "react"
import ReportHeader from "./_components/ReportHeader"
import { ReportType } from "./utils"
import MetricCard from "@/components/molecules/Cards/MetricCard"
import ChartCard from "@/components/molecules/Cards/ChartCard"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"

const CSAT: FC = () => {
  return (
    <div className="flex flex-col gap-5 pt-10">
      <ReportHeader reportType={ReportType.CUSTOMER_SATISFACTION} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(333px,_1fr))] gap-3">
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </div>
      <ChartCard
        title="Possible Improvements Based on Customer Feedback"
        hideTrendAnalysis
        classNames={{ main: "flex flex-col gap-6" }}
      >
        {new Array(6).fill(null).map((_, idx) => (
          <div className="flex items-center justify-between gap-5" key={idx}>
            <p>
              <Typography
                as="span"
                className="text-semibold-base text-gray-300 mr-3"
              >
                #{idx + 1}
              </Typography>
              <Typography as="span" className="text-semibold-sm text-black">
                Expand the range of payment options available.
              </Typography>
            </p>
            <Button
              variant="tetiary"
              className="px-3 py-1.5"
              classNames={{ label: "text-semibold-xs" }}
              startContent={<Icon name="icon-ai-magic" size={16} />}
            >
              More info with AI
            </Button>
          </div>
        ))}
      </ChartCard>
    </div>
  )
}

export default CSAT
