"use client"

import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import { useQueryParams } from "@/hooks/utilityHooks"
import { getLocalTimeZone, today } from "@internationalized/date"
import { DateRangePicker } from "@nextui-org/react"
import React, { useMemo, useRef, useState } from "react"
import { ReportFilters } from "../utils"

const DateSelector = () => {
  const customDateTriggerRef = useRef<HTMLButtonElement | null>(null)

  const [parentPopoverOpen, setParentPopoverOpen] = useState(false)
  const [customDatePicker, setCustomDatePicker] = useState(false)
  const { get, set, searchParams } = useQueryParams()
  // Get today's date to disable future dates
  const todayDate = today(getLocalTimeZone())

  const { date } = useMemo(() => {
    return {
      date: get(ReportFilters.DATE),
    }
  }, [searchParams])

  return (
    <>
      <AppPopover
        placement="bottom-start"
        isOpen={parentPopoverOpen}
        onOpenChange={setParentPopoverOpen}
        offset={10}
        classNames={{
          content:
            "min-w-[160px] shadow-soft-medium border border-gray-50 rounded-xl font-app",
        }}
        triggerScaleOnOpen={false}
        trigger={
          <div>
            <Button
              variant="tetiary"
              ref={customDateTriggerRef}
              endContent={
                <Icon
                  name="icon-chevron-down"
                  size={16}
                  className="text-gray-400"
                />
              }
              classNames={{
                root: "py-1.5 pl-3 pr-2 rounded-lg ",
                label: "text-medium-sm text-gray-500",
              }}
            >
              Add Filter
            </Button>
          </div>
        }
      >
        <div className="w-full">
          <button
            data-active={date === "today"}
            onClick={() => set(ReportFilters.DATE, "today")}
            className="w-full p-3 flex justify-start text-medium-sm text-gray-600"
          >
            Today
          </button>
          <button
            data-active={date === "this_week"}
            onClick={() => set(ReportFilters.DATE, "this_week")}
            className="w-full p-3 flex justify-start text-medium-sm text-gray-600"
          >
            This week
          </button>
          <button
            data-active={date === "this_month"}
            onClick={() => set(ReportFilters.DATE, "this_month")}
            className="w-full p-3 flex justify-start text-medium-sm text-gray-600"
          >
            This month
          </button>
          <button
            className="w-full p-3 flex justify-start text-medium-sm text-gray-600"
            onClick={() => {
              setParentPopoverOpen(false)
              setTimeout(() => {
                setCustomDatePicker((curr) => !curr)
              }, 100)
            }}
          >
            Custom
          </button>
        </div>
      </AppPopover>

      <DateRangePicker
        aria-label="Date range filter for report data"
        isOpen={customDatePicker}
        onOpenChange={setCustomDatePicker}
        onChange={(e) => console.log(e)}
        popoverProps={{
          shouldCloseOnBlur: false,
          placement: "bottom-start",
          triggerRef: customDateTriggerRef ?? undefined,
        }}
        classNames={{
          base: "absolute top-0 left-0 opacity-0 pointer-events-none",
          input: "absolute w-1 h-1 opacity-0",
          // Keep the popover visible
          popoverContent: "opacity-100 pointer-events-auto",
        }}
        maxValue={todayDate}
      />
    </>
  )
}

export default DateSelector
