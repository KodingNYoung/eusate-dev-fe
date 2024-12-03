import Typography from "@/components/atoms/Typography"
import Dropdown from "@/components/molecules/Popups/Dropdown"
import React from "react"
import OrderBtn from "./OrderBtn"
import { FC } from "@/utils/types"
import { KNOWLEDGE_BASE_SORT_COLUMNS, SORT_ORDERS, SortOrder } from "../utils"
import Radio from "@/components/molecules/Radio"

type Props = {
  anchor: HTMLElement | null
  close: () => void
  order: SortOrder
  setOrder: (order: SortOrder) => void
  sortValue: string
  setSortValue: (value: string) => void
}

const SortDropdown: FC<Props> = ({
  anchor,
  close,
  order,
  setOrder,
  sortValue,
  setSortValue,
}) => {
  return (
    <Dropdown
      anchorEl={anchor}
      isOpen={Boolean(anchor)}
      close={close}
      classNames={{
        root: "hidden sm:block",
        menuContent: "mr-3 mt-2 min-w-[193px] bg-white",
      }}
    >
      <header className="flex items-center justify-between border-b border-gray-50 p-3">
        <Typography variant="semibold-xs" className="text-gray-700">
          Sort by
        </Typography>
        <div className="flex items-center gap-0.5">
          {SORT_ORDERS.map((sortOrder) => (
            <OrderBtn
              key={sortOrder.key}
              icon={sortOrder.icon}
              data-active={order === sortOrder.value}
              onClick={() => setOrder(sortOrder.value)}
            />
          ))}
        </div>
      </header>
      <section className="p-1">
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
            onChange={(e) => setSortValue(e.currentTarget.value)}
            checked={sortValue === sorter.value}
          >
            {sorter.label}
          </Radio>
        ))}
      </section>
    </Dropdown>
  )
}

export default SortDropdown
