import { FC } from "@/utils/types"
import React from "react"
import TicketFilterItem from "./TicketFilterItem"
import TickerFilterDropdown from "./TickerFilterDropdown"

const TicketFilters: FC = () => {
  return (
    <>
      <TickerFilterDropdown />
      <div className="grid min-w-[150px] sm:min-w-[340px] py-0.5 flex-1 ">
        <div className="overflow-x-auto flex items-center gap-2 scrollbar-hide">
          <TicketFilterItem />
          <TicketFilterItem />
          <TicketFilterItem />
        </div>
      </div>
    </>
  )
}

export default TicketFilters
