import { FC } from "@/utils/types"
import React, { useCallback, useMemo } from "react"
import TicketFilterItem from "./TicketFilterItem"
import TickerFilterDropdown from "./TickerFilterDropdown"
import { useQueryParams } from "@/hooks/utilityHooks"
import { TicketFilters as ETicketFilters } from "../utils"

const TicketFilters: FC = () => {
  const { get, set, searchParams } = useQueryParams()

  const { priorities, statuses, date_created, last_created, temperament } =
    useMemo(() => {
      return {
        priorities: get(ETicketFilters.PRIORITY)?.split(",") || [],
        statuses: get(ETicketFilters.STATUS)?.split(",") || [],
        date_created: get(ETicketFilters.DATE_CREATED),
        last_created: get(ETicketFilters.LAST_UPDATED),
        temperament: get(ETicketFilters.TEMPERAMENT)?.split(",") || [],
      }
    }, [searchParams])

  const removeFilter = useCallback(
    (filter: ETicketFilters, value?: string) => {
      let prev: string | string[] | null
      switch (filter) {
        case ETicketFilters.PRIORITY:
          prev = priorities
          break
        case ETicketFilters.STATUS:
          prev = statuses
          break
        case ETicketFilters.TEMPERAMENT:
          prev = temperament
          break
        default:
          prev = []
      }
      if (
        [
          ETicketFilters.PRIORITY,
          ETicketFilters.TEMPERAMENT,
          ETicketFilters.STATUS,
        ].includes(filter)
      ) {
        const newFilters = prev.filter((priority) => priority !== value)
        set(filter, newFilters.join(",") || null)
      }
    },
    [priorities, temperament, statuses]
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
          {statuses.map((status) => (
            <TicketFilterItem
              key={status}
              label="Status"
              value={status}
              onRemove={() => removeFilter(ETicketFilters.STATUS, status)}
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
