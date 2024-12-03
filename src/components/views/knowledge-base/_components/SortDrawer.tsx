"use client"

import BottomDrawer from "@/components/molecules/Popups/BottomDrawer"
import React from "react"
import { KNOWLEDGE_BASE_SORT_COLUMNS, SORT_ORDERS, SortOrder } from "../utils"
import Radio from "@/components/molecules/Radio"
import Button from "@/components/molecules/Buttons"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { FC } from "@/utils/types"

type Props = {
  anchor: HTMLElement | null
  close: () => void
  order: SortOrder
  setOrder: (order: SortOrder) => void
  sortValue: string
  setSortValue: (value: string) => void
}

const SortDrawer: FC<Props> = ({
  anchor,
  close,
  order,
  setOrder,
  sortValue,
  setSortValue,
}) => {

  const apply = (formdata: FormData) => {
    const data = Object.fromEntries(formdata)
    setSortValue(data.sortBy as string)
    setOrder(data.order as SortOrder)

    close()
  }
  const reset = () => {
    // set url to empty
    // close drawer
    close()
  }

  return (
    <BottomDrawer isOpen={Boolean(anchor)} close={close} title="Sort by">
      <form action={apply}>
        <main className="flex flex-col gap-3 px-4 py-3">
          <div className="grid grid-cols-2 gap-0.5 py-1">
            {SORT_ORDERS.map((sortOrder) => (
              <Radio
                id={sortOrder.key}
                name="order"
                value={sortOrder.value}
                key={sortOrder.key}
                classNames={{
                  root: "bg-white before:[--radioColor1:#d7ab0700] before:[--radioColor2:#e8655500] py-3 px-4",
                  icon: "size-5 min-h-5 min-w-5",
                  iconMidCircle: "bg-gray-50",
                  label: "!text-medium-sm",
                }}
                defaultChecked={order === sortOrder.value}
              >
                {sortOrder.label}
              </Radio>
            ))}
          </div>
          <section className="p-3 border border-gray-50 rounded-xl flex flex-col gap-2">
            {KNOWLEDGE_BASE_SORT_COLUMNS.map((sorter) => (
              <Radio
                id={sorter.value}
                name="sortBy"
                value={sorter.value}
                key={sorter.value}
                classNames={{
                  root: "before:hidden flex-row-reverse justify-between items-center !p-4 has-[:checked]:bg-gray-50",
                  label:
                    "text-medium-sm text-gray-600 peer-[:checked]:text-medium-sm",
                  icon: "size-4 min-h-4 min-w-4",
                  iconMidCircle: "bg-white",
                  iconInnerCircle:
                    "size-3 opacity-0 group-has-[:checked]/radio:opacity-100",
                }}
                defaultChecked={sortValue === sorter.value}
              >
                {sorter.label}
              </Radio>
            ))}
          </section>
        </main>
        <footer className="pt-3 pb-6 px-4 grid grid-cols-2 gap-2">
          <Button
            variant="tetiary"
            classNames={{
              root: "sm-gradient py-4.5",
              label: "text-semibold-sm",
            }}
            onClick={reset}
          >
            Reset
          </Button>
          <SubmitButton
            classNames={{
              root: "sm-gradient py-4.5",
              label: "text-semibold-sm",
            }}
          >
            Apply
          </SubmitButton>
        </footer>
      </form>
    </BottomDrawer>
  )
}

export default SortDrawer
