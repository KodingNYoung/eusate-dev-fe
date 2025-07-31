"use client"

import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { useQueryParams } from "@/hooks/utilityHooks"
import { cls } from "@/utils/helpers"
import { FC } from "@/utils/types"
import React, { useState } from "react"
import {
  DATE_FILTER,
  DATE_FILTER_OPTIONS,
  formatCustomCalendarDate,
  OVERVIEW_QUERY_KEYS,
} from "../utils"
import { today, getLocalTimeZone } from "@internationalized/date"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import AppRangeCalendar from "@/components/organisms/AppRangeCalendar"

type Props = {
  date: string
}

const OverviewDateFilter: FC<Props> = ({ date }) => {
  const { set } = useQueryParams()

  const todayDate = today(getLocalTimeZone())

  const [dateRange, setDateRange] = useState(() =>
    formatCustomCalendarDate(date)
  )

  return (
    <div className="border border-gray-50 rounded-lg p-1 px-2.5 flex items-center gap-2.5 mt-1 mx-4 sm:mx-5 overflow-auto no-scrollbar max-w-fit">
      <Typography
        as="span"
        className="text-regular-base text-gray-500 items-center justify-center gap-2 hidden sm:flex"
      >
        <Icon name="icon-sort" size={24} className="text-gray-300" />
      </Typography>
      <div className="bg-gray-50 h-5 w-px hidden sm:block" />
      {DATE_FILTER_OPTIONS.map((item) => (
        <button
          key={item.key}
          className={cls(
            "p-2 py-1.5 rounded border whitespace-nowrap",
            date === item.key
              ? "border-gray-100/50 bg-gray-25 text-gray-900 text-medium-sm"
              : "border-transparent bg-transparent text-gray-400 text-regular-sm"
          )}
          onClick={() => set(OVERVIEW_QUERY_KEYS.DATE, item.key)}
        >
          {item.label}
        </button>
      ))}
      <AppPopover
        triggerScaleOnOpen={false}
        placement="bottom-end"
        trigger={
          <button
            className={cls(
              "p-2 py-1.5 rounded border outline-none",
              date.includes("custom")
                ? "border-gray-100/50 bg-gray-25 text-gray-900 text-medium-sm"
                : "border-transparent bg-transparent !text-gray-400 text-regular-sm"
            )}
          >
            Custom
          </button>
        }
      >
        <AppRangeCalendar
          color="primary"
          onChange={(date) => {
            set(
              OVERVIEW_QUERY_KEYS.DATE,
              `${DATE_FILTER.CUSTOM}:${date.start.toString()}:${date.end.toString()}`
            )
            setDateRange(date)
          }}
          maxValue={todayDate}
          value={dateRange}
          disableAnimation
        />
      </AppPopover>
    </div>
  )
}

export default OverviewDateFilter
