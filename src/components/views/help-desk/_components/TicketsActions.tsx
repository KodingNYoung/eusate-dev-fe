"use client"

import { FC } from "@/utils/types"
import React from "react"
import TicketFilters from "./TicketFilters"
import SearchInput from "@/components/molecules/Inputs/SearchInput"
import { HD_QUERY_KEYS } from "../utils"
import { useQueryParams } from "@/hooks/utilityHooks"
import Icon from "@/components/atoms/Icon"

const TicketsActions: FC = () => {
  const { set, get } = useQueryParams()
  return (
    <div className="flex items-center flex-wrap gap-2.5">
      <SearchInput
        value={get(HD_QUERY_KEYS.SEARCH) || ""}
        onSearch={(value) => {
          set(HD_QUERY_KEYS.SEARCH, value || null)
        }}
        classNames={{
          root: "flex-1 sm:min-w-[350px] min-w-full max-w-full md:max-w-[400px]",
          inputContainer:
            "rounded-lg before:[--inputColor1:_#F0F1F3] before:[--inputColor2:_#F0F1F3] my-0",
          input: "placeholder:text-gray-300 w-full pr-14",
          startContent: "!text-gray-500",
          endContent: "min-w-11",
        }}
        endComponent={
          <div className="hidden sm:flex items-center gap-1 text-gray-200">
            <Icon name="icon-command" size={16} /> <span>+</span> <span>K</span>{" "}
          </div>
        }
      />
      <TicketFilters />
    </div>
  )
}

export default TicketsActions
