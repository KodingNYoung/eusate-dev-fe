"use client"

import Typography from "@/components/atoms/Typography"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import React, { useMemo } from "react"
import OrderBtn from "./OrderBtn"
import { FC } from "@/utils/types"
import { KNOWLEDGE_BASE_SORT_COLUMNS, SORT_ORDERS } from "../utils"
import Radio from "@/components/molecules/Radio"
import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"

type Props = {
  value: string
  onSort: (value: string) => void
}

const SortDropdown: FC<Props> = ({ value, onSort }) => {
  const [sortValue, order] = useMemo(() => {
    return value
      ? value.split(" ")
      : [KNOWLEDGE_BASE_SORT_COLUMNS[1].value, SORT_ORDERS[1].value]
  }, [value])

  return (
    <AppPopover
      trigger={
        <Button
          variant="tetiary"
          endContent={
            <Icon name="icon-arrow-swap" className="text-regular-xl" />
          }
          classNames={{
            label: "text-medium-sm hidden sm:inline",
            root: "p-2 sm:px-3 sm:py-2 border-0 sm:border",
          }}
        >
          Sort by
        </Button>
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
            <OrderBtn
              key={sortOrder.key}
              icon={sortOrder.icon}
              data-active={order === sortOrder.value}
              onClick={() => {
                onSort(`${sortValue} ${sortOrder.value}`)
              }}
            />
          ))}
        </div>
      </header>
      <section className="p-1 w-full">
        {KNOWLEDGE_BASE_SORT_COLUMNS.map((sorter) => (
          <Radio
            name="sortBy"
            id={sorter.value}
            value={sorter.value}
            key={sorter.value}
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
            checked={sortValue === sorter.value}
          >
            {sorter.label}
          </Radio>
        ))}
      </section>
    </AppPopover>
  )
}

export default SortDropdown
