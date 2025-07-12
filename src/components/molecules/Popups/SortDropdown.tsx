import { FC } from "@/utils/types"
import React, { ReactElement } from "react"
import AppPopover from "./AppPopover"
import Button, { ButtonProps } from "../Buttons"
import Icon from "@/components/atoms/Icon"
import { cls } from "@/utils/helpers"
import Typography from "@/components/atoms/Typography"
import { SORT_ORDERS } from "@/utils/constants"
import SortOrderBtn from "../Buttons/SortOrderBtn"
import Radio from "../Radio"

export type SortOption = {
  label: string
  value: string
}
type Props = {
  value: string
  order: string
  onSort: (value: string) => void
  trigger?: ReactElement
  triggerBtnProps?: ButtonProps
  options: SortOption[]
}

const SortDropdown: FC<Props> = ({
  value,
  order,
  onSort,
  trigger,
  triggerBtnProps,
  options,
}) => {
  return (
    <AppPopover
      trigger={
        trigger || (
          <Button
            {...triggerBtnProps}
            variant="tetiary"
            endContent={
              <Icon name="icon-arrow-swap" className="text-regular-xl" />
            }
            classNames={{
              label: cls(
                "text-medium-sm hidden sm:inline",
                triggerBtnProps?.classNames?.label
              ),
              root: cls(
                "p-2 sm:px-3 sm:py-2 border-0 sm:border",
                triggerBtnProps?.classNames?.root
              ),
            }}
          >
            {triggerBtnProps?.children || "Sort by"}
          </Button>
        )
      }
      classNames={{
        content: "mr-3 mt-2 min-w-[193px] bg-white",
      }}
    >
      <header className="flex items-center justify-between border-b border-gray-50 p-3 w-full">
        <Typography variant="semibold-xs" className="text-gray-700">
          Sort by
        </Typography>
        <div className="flex items-center gap-0.5">
          {SORT_ORDERS.map((sortOrder) => (
            <SortOrderBtn
              key={sortOrder.value}
              icon={sortOrder.icon}
              data-active={order === sortOrder.value}
              onClick={() => {
                onSort(`${value} ${sortOrder.value}`)
              }}
            />
          ))}
        </div>
      </header>
      <section className="p-1 w-full">
        {options.map((option) => (
          <Radio
            name="sortBy"
            id={option.value}
            value={option.value}
            key={option.value}
            classNames={{
              root: "before:hidden flex-row-reverse justify-between items-center !p-3 has-[:checked]:bg-gray-50",
              label:
                "text-regular-xs text-gray-600 peer-[:checked]:text-regular-xs",
              icon: "!size-4 !min-h-4 !min-w-4",
              iconMidCircle: "bg-white",
              iconInnerCircle:
                "size-3 opacity-0 group-has-[:checked]/radio:opacity-100",
            }}
            onChange={(e) => {
              const value = e.currentTarget.value
              onSort(`${value} ${order}`)
            }}
            checked={value === option.value}
          >
            {option.label}
          </Radio>
        ))}
      </section>
    </AppPopover>
  )
}

export default SortDropdown
