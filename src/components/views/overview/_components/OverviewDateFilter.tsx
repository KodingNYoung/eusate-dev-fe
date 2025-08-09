"use client"

import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React from "react"
import { DATE_FILTER_OPTIONS, OVERVIEW_QUERY_KEYS } from "../utils"
import AppDateRangePicker from "@/components/organisms/AppDateRangePicker"

type Props = {
  date: string
}

const OverviewDateFilter: FC<Props> = ({ date }) => {
  const { set } = useQueryParams()

  return (
    <div className="px-4 sm:px-5 pt-1">
      <AppDateRangePicker
        presets={DATE_FILTER_OPTIONS}
        value={date}
        onDateSelect={(date) => set(OVERVIEW_QUERY_KEYS.DATE, date)}
      />
    </div>
  )
}

export default OverviewDateFilter
