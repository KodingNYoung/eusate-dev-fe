"use client"

import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import { FC } from "@/utils/types"
import React, { useState } from "react"
import { KNOWLEDGE_BASE_SORT_COLUMNS, SORT_ORDERS, SortOrder } from "../utils"
import SortDropdown from "./SortDropdown"
import SortDrawer from "./SortDrawer"

const SortAction: FC = () => {
  const [order, setOrder] = useState<SortOrder>(SORT_ORDERS[0].value)
  const [sortValue, setSortValue] = useState<string>(
    KNOWLEDGE_BASE_SORT_COLUMNS[0].value
  )
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const close = () => setAnchor(null)

  return (
    <>
      <Button
        variant="tetiary"
        onClick={(e) => setAnchor(e.currentTarget)}
        endContent={<Icon name="icon-arrow-swap" className="text-regular-xl" />}
        classNames={{
          label: "text-medium-sm hidden sm:inline",
          root: "p-2 sm:px-3 sm:py-2 border-0 sm:border",
        }}
      >
        Sort by
      </Button>
      <SortDropdown
        anchor={anchor}
        close={close}
        order={order}
        setOrder={setOrder}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <SortDrawer
        anchor={anchor}
        close={close}
        order={order}
        setOrder={setOrder}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </>
  )
}

export default SortAction
