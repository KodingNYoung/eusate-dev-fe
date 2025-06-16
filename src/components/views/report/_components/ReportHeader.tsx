import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { ReportType } from "../utils"
import { REPORTS } from "../../reports/utils"
import Typography from "@/components/atoms/Typography"
import Button from "@/components/molecules/Buttons"
import Icon from "@/components/atoms/Icon"
import dynamic from "next/dynamic"

type Props = {
  reportType: ReportType
}
const DateSelector = dynamic(() => import("./DateSelector"), { ssr: false })

const ReportHeader: FC<Props> = ({ reportType }) => {
  const reportTitle = useMemo(() => {
    return REPORTS.find((report) => report.id === reportType)?.title
  }, [reportType])
  return (
    <>
      <header className="grid gap-1.5">
        <Typography as="h2" className="text-bold-2xl text-gray-900">
          {reportTitle}
        </Typography>
        <Typography as="span" className="text-regular-sm text-black-50">
          Showing data up to March 24, 2025
        </Typography>
      </header>
      <div className="flex items-center flex-wrap gap-3">
        <Button
          variant="tetiary"
          startContent={
            <Icon
              name="icon-textalign-left"
              size={16}
              className="text-gray-400"
            />
          }
          classNames={{
            root: "py-1.5 pl-3 pr-2 rounded-lg",
            label: "text-medium-sm text-gray-500",
          }}
        >
          Read executive summary
        </Button>
        <Button
          variant="tetiary"
          startContent={
            <Icon name="icon-lamp-charge" size={16} className="text-gray-400" />
          }
          classNames={{
            root: "py-1.5 pl-3 pr-2 rounded-lg",
            label: "text-medium-sm text-gray-500",
          }}
        >
          View analytic approach
        </Button>
        <DateSelector />
      </div>
    </>
  )
}

export default ReportHeader
