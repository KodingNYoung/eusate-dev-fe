"use client"

import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import PaginationItem from "@/components/molecules/PaginationItem"
import { REPORTS } from "@/components/views/reports/utils"
import { ROUTES } from "@/utils/constants"
import { FC } from "@/utils/types"
import { useParams } from "next/navigation"
import React, { useMemo } from "react"

const Header: FC = () => {
  const { reportType } = useParams()

  const reportTitle = useMemo(() => {
    return REPORTS.find((report) => report.id === reportType)?.title
  }, [reportType])
  return (
    <header className="flex items-center justify-between sticky z-[11] sm:relative top-0 left-0 border-b border-gray-50 sm:border-b-0 bg-white sm:rounded-x20 px-4 py-3 sm:px-5 sm:py-2 gap-3">
      <div className="max-w-[85%] flex-1">
        <section className="flex items-center gap-1 sm:gap-2">
          <PaginationItem
            label="Reports & Analytics"
            icon="icon-chart"
            link={ROUTES.REPORTS}
            hasMultipleLayers
          />
          <PaginationItem label={reportTitle || ""} isLast hasMultipleLayers />
        </section>
      </div>
      <Button
        variant="tetiary"
        startContent={
          <Icon
            name="icon-download"
            className="!text-regular-base sm:text-regular-xl"
          />
        }
        classNames={{
          root: "py-3 px-3 sm:px-8",
          label: "hidden sm:inline text-medium-sm",
        }}
      >
        Download PDF
      </Button>
    </header>
  )
}

export default Header
