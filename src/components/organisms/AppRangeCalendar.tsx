import { FC } from "@/utils/types"
import { RangeCalendar, RangeCalendarProps } from "@nextui-org/react"
import React from "react"

const AppRangeCalendar: FC<RangeCalendarProps> = ({ classNames, ...props }) => {
  return (
    <RangeCalendar
      classNames={{
        ...classNames,
        cellButton: [
          "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:bg-gold-500 data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:bg-gold-500 data-[selected=true]:data-[range-selection=true]:text-gold-500",
          "data-[selected=true]:data-[range-selection=true]:before:bg-gold-50",
          classNames?.cellButton,
        ],
        gridWrapper: ["bg-white", classNames?.gridWrapper],
        gridHeader: ["shadow-none", classNames?.gridHeader],
        base: ["shadow-none", classNames?.base],
      }}
      {...props}
    />
  )
}

export default AppRangeCalendar
