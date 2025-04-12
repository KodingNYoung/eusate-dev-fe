import { FC } from "@/utils/types"
import React, { useCallback, useMemo } from "react"
import TicketFilterItem from "./TicketFilterItem"
import TickerFilterDropdown from "./TickerFilterDropdown"
import { useQueryParams } from "@/hooks/utilityHooks"
import { TicketFilters as ETicketFilters } from "../utils"

const TicketFilters: FC = () => {
  const { get, set, searchParams } = useQueryParams()

  const { priorities, date_created, last_created, temperament } =
    useMemo(() => {
      return {
        priorities: get(ETicketFilters.PRIORITY)?.split(",") || [],
        date_created: get(ETicketFilters.DATE_CREATED),
        last_created: get(ETicketFilters.LAST_UPDATED),
        temperament: get(ETicketFilters.TEMPERAMENT)?.split(",") || [],
      }
    }, [searchParams])

  const removeFilter = useCallback(
    (filter: ETicketFilters, value?: string) => {
      if (filter === ETicketFilters.PRIORITY) {
        const newPriorities = priorities.filter(
          (priority) => priority !== value
        )
        set(ETicketFilters.PRIORITY, newPriorities.join(",") || null)
      }
    },
    [priorities, temperament]
  )

  return (
    <>
      <TickerFilterDropdown />
      <div className="grid min-w-[150px] sm:min-w-[340px] py-0.5 flex-1 ">
        <div className="overflow-x-auto flex items-center gap-2 scrollbar-hide">
          {priorities.map((priority) => (
            <TicketFilterItem
              key={priority}
              label="Priority"
              value={priority}
              onRemove={() => removeFilter(ETicketFilters.PRIORITY, priority)}
            />
          ))}
          {date_created && (
            <TicketFilterItem
              label="Date Created"
              value={date_created}
              onRemove={() => removeFilter(ETicketFilters.DATE_CREATED)}
            />
          )}
          {last_created && (
            <TicketFilterItem
              label="Last Created"
              value={last_created}
              onRemove={() => removeFilter(ETicketFilters.LAST_UPDATED)}
            />
          )}
          {temperament.map((temp) => (
            <TicketFilterItem
              key={temp}
              label="Temperament"
              value={temp}
              onRemove={() => removeFilter(ETicketFilters.TEMPERAMENT, temp)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default TicketFilters
