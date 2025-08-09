"use client"

import { FC } from "@/utils/types"
import React, { useState } from "react"
import Typography from "../atoms/Typography"
import Icon from "../atoms/Icon"
import { cls } from "@/utils/helpers"
import AppPopover, { AppPopoverProps } from "../molecules/Popups/AppPopover"
import AppRangeCalendar from "./AppRangeCalendar"
import { RangeCalendarProps } from "@nextui-org/react"
import { DATE_FILTER, formatCustomCalendarDate } from "../views/overview/utils"
import { getLocalTimeZone, today } from "@internationalized/date"

type Props = {
  presets: { label: string; key: string }[]
  value?: string
  onDateSelect?: (date: string) => void
  hideCustom?: boolean
  popoverProps?: AppPopoverProps
  calendarRangeProps?: RangeCalendarProps
}

const AppDateRangePicker: FC<Props> = ({
  presets,
  value,
  onDateSelect,
  popoverProps,
  calendarRangeProps,
  hideCustom,
}) => {
  const todayDate = today(getLocalTimeZone())

  const [dateRange, setDateRange] = useState(() =>
    formatCustomCalendarDate(value || presets[0]?.key)
  )

  return (
    <div className="border border-gray-50 rounded-lg p-1 px-2.5 flex items-center gap-2.5 overflow-auto no-scrollbar max-w-fit">
      <Typography
        as="span"
        className="text-regular-base text-gray-500 items-center justify-center gap-2 hidden sm:flex"
      >
        <Icon name="icon-sort" size={24} className="text-gray-300" />
      </Typography>
      <div className="bg-gray-50 h-5 w-px hidden sm:block" />
      {presets.map((item) => (
        <button
          key={item.key}
          className={cls(
            "p-2 py-1.5 rounded border whitespace-nowrap",
            (value || presets[0]?.key) === item.key
              ? "border-gray-100/50 bg-gray-25 text-gray-900 text-medium-sm"
              : "border-transparent bg-transparent text-gray-400 text-regular-sm"
          )}
          onClick={() => {
            if (onDateSelect) {
              onDateSelect(item.key)
            }
            setDateRange(() => formatCustomCalendarDate(item.key))
          }}
        >
          {item.label}
        </button>
      ))}
      {!hideCustom && (
        <AppPopover
          triggerScaleOnOpen={false}
          placement="bottom-end"
          trigger={
            <button
              className={cls(
                "p-2 py-1.5 rounded border outline-none",
                value?.includes("custom")
                  ? "border-gray-100/50 bg-gray-25 text-gray-900 text-medium-sm"
                  : "border-transparent bg-transparent !text-gray-400 text-regular-sm"
              )}
            >
              Custom
            </button>
          }
          {...popoverProps}
        >
          <AppRangeCalendar
            color="primary"
            onChange={(date) => {
              if (onDateSelect) {
                onDateSelect(
                  `${DATE_FILTER.CUSTOM}:${date.start.toString()}:${date.end.toString()}`
                )
              }
              setDateRange(date)
            }}
            maxValue={todayDate}
            value={dateRange}
            disableAnimation
            {...calendarRangeProps}
          />
        </AppPopover>
      )}
    </div>
  )
}

export default AppDateRangePicker
