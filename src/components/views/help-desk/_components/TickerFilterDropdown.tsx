"use client"

import Icon from "@/components/atoms/Icon"
import Button from "@/components/molecules/Buttons"
import AppPopover from "@/components/molecules/Popups/AppPopover"
import { FC } from "@/utils/types"
import React, { useState } from "react"
import { TicketFilters } from "../utils"
import PriorityFilter from "./PriorityFilter"
import StatusFilter from "./StatusFilter"
import TemperamentFilter from "./TemperamentFilter"

const TickerFilterDropdown: FC = () => {
  const [openedFilter, setOpenedFilter] = useState<TicketFilters | null>()
  return (
    <AppPopover
      placement="bottom-start"
      offset={-10}
      classNames={{
        content:
          "min-w-[160px] shadow-soft-medium border border-gray-50 rounded-xl font-app",
      }}
      trigger={
        <Button
          variant="tetiaryText"
          startContent={<Icon name="icon-plus" size={24} />}
          classNames={{
            root: "text-gray-400 rounded-lg py-1.5 px-2.5 aria-expanded:opacity-100 aria-expanded:scale-100",
            label: "text-semibold-base",
          }}
          size="sm"
        >
          Add Filter
        </Button>
      }
    >
      <AppPopover
        placement="right-start"
        offset={10}
        isOpen={Boolean(openedFilter)}
        onClose={() => setOpenedFilter(null)}
        triggerScaleOnOpen={false}
        trigger={<div className="w-full h-0" />}
        classNames={{ content: "p-1 min-w-[150px] items-start" }}
      >
        {openedFilter === TicketFilters.PRIORITY && <PriorityFilter />}
        {openedFilter === TicketFilters.STATUS && <StatusFilter />}
        {openedFilter === TicketFilters.ASSIGNEE && <PriorityFilter />}
        {openedFilter === TicketFilters.DATE_CREATED && <PriorityFilter />}
        {openedFilter === TicketFilters.LAST_UPDATED && <PriorityFilter />}
        {openedFilter === TicketFilters.TEMPERAMENT && <TemperamentFilter />}
      </AppPopover>
      <button
        className="w-full p-3 flex justify-start text-medium-sm text-gray-700"
        onClick={() => setOpenedFilter(TicketFilters.PRIORITY)}
      >
        Priority
      </button>
      <button
        className="w-full p-3 flex justify-start text-medium-sm text-gray-700"
        onClick={() => setOpenedFilter(TicketFilters.STATUS)}
      >
        Status
      </button>
      {/* <button
        className="w-full p-3 flex justify-start text-medium-sm text-gray-700"
        onClick={() => setOpenedFilter(TicketFilters.ASSIGNEE)}
      >
        Assignee
      </button> */}
      {/* <button
        className="w-full p-3 flex justify-start text-medium-sm text-gray-700"
        onClick={() => setOpenedFilter(TicketFilters.DATE_CREATED)}
      >
        Date created
      </button> */}
      {/* <button
        className="w-full p-3 flex justify-start text-medium-sm text-gray-700"
        onClick={() => setOpenedFilter(TicketFilters.LAST_UPDATED)}
      >
        Last updated
      </button> */}
      <button
        className="w-full p-3 flex justify-start text-medium-sm text-gray-700"
        onClick={() => setOpenedFilter(TicketFilters.TEMPERAMENT)}
      >
        Temperament
      </button>
    </AppPopover>
  )
}

export default TickerFilterDropdown
