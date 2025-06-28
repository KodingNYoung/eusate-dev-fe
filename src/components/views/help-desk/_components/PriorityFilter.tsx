import Checkbox from "@/components/molecules/Checkbox"
import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { TicketFilters } from "../utils"

const PriorityFilter: FC = () => {
  const { set, get, searchParams } = useQueryParams()

  const priorities = useMemo(() => {
    const priority = get(TicketFilters.PRIORITY)
    if (priority) {
      return new Set(priority.split(","))
    }
    return new Set()
  }, [searchParams])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPriorities = new Set(priorities)
    if (e.currentTarget.checked) {
      newPriorities.add(e.currentTarget.value)
    } else {
      newPriorities.delete(e.currentTarget.value)
    }
    set(TicketFilters.PRIORITY, Array.from(newPriorities).join(",") || null)
  }

  return (
    <div>
      <Checkbox
        name={TicketFilters.PRIORITY}
        value="critical"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={priorities.has("critical")}
      >
        Critical
      </Checkbox>
      <Checkbox
        name={TicketFilters.PRIORITY}
        value="high"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={priorities.has("high")}
      >
        High
      </Checkbox>
      <Checkbox
        name={TicketFilters.PRIORITY}
        value="medium"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={priorities.has("medium")}
      >
        Medium
      </Checkbox>
      <Checkbox
        name={TicketFilters.PRIORITY}
        value="low"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={priorities.has("low")}
      >
        Low
      </Checkbox>
    </div>
  )
}

export default PriorityFilter
