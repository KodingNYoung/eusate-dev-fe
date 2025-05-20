"use client"

import { FC } from "@/utils/types"
import React from "react"
import TicketFilters from "./TicketFilters"

const TicketsActions: FC = () => {
  return (
    <div className="flex items-center flex-wrap gap-2.5">
      {/* <SearchInput
        value={get(HD_QUERY_KEYS.SEARCH) || ""}
        onSearch={(value) => {
          set(HD_QUERY_KEYS.SEARCH, value || null)
        }}
        classNames={{
          root: "flex-1 sm:min-w-[350px] min-w-full max-w-full md:max-w-[400px]",
          inputContainer:
            "rounded-lg before:[--inputColor1:_#F0F1F3] before:[--inputColor2:_#F0F1F3] my-0",
          input: "placeholder:text-gray-300 w-full ",
          startContent: "!text-gray-500",
        }}
      /> */}
      <TicketFilters />
    </div>
  )
}

export default TicketsActions
