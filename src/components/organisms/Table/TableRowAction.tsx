"use client"

import Icon from "@/components/atoms/Icon"
import { FC } from "@/utils/types"
import React from "react"
import TableActionItem, { ItemType } from "./TableActionItem"
import Dropdown from "@/components/molecules/Popups/Dropdown"

type Props = {
  row: unknown
  items: (ItemType & { action?: (row: unknown) => void })[]
}

const TableRowAction: FC<Props> = ({ items, row }) => {
  return (
    <Dropdown
      trigger={
        <button className="outline-none">
          <Icon name="icon-more" className="!text-regular-xl" />
        </button>
      }
    >
      <div className="min-w-[154px] w-full">
        {items.map((item) => {
          return (
            <TableActionItem
              item={item}
              action={() => item.action && item.action(row)}
              key={item.key}
            />
          )
        })}
      </div>
    </Dropdown>
  )
}

export default TableRowAction
