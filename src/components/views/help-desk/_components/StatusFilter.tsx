import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { TicketFilters } from "../utils"
import Checkbox from "@/components/molecules/Checkbox"

const StatusFilter: FC = () => {
  const { set, get, searchParams } = useQueryParams()

  const status = useMemo(() => {
    const status = get(TicketFilters.STATUS)
    if (status) {
      return new Set(status.split(","))
    }
    return new Set()
  }, [searchParams])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = new Set(status)
    if (e.currentTarget.checked) {
      newStatus.add(e.currentTarget.value)
    } else {
      newStatus.delete(e.currentTarget.value)
    }
    set(TicketFilters.STATUS, Array.from(newStatus).join(",") || null)
  }

  return (
    <div>
      <Checkbox
        name={TicketFilters.STATUS}
        value="open"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={status.has("open")}
      >
        Open
      </Checkbox>
      <Checkbox
        name={TicketFilters.STATUS}
        value="taken"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={status.has("taken")}
      >
        Taken
      </Checkbox>
      <Checkbox
        name={TicketFilters.STATUS}
        value="released_and_open"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={status.has("released_and_open")}
      >
        Released and Open
      </Checkbox>
      <Checkbox
        name={TicketFilters.STATUS}
        value="resolved_and_closed"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={status.has("resolved_and_closed")}
      >
        Released and Closed
      </Checkbox>
      <Checkbox
        name={TicketFilters.STATUS}
        value="closed"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={status.has("closed")}
      >
        Closed
      </Checkbox>
    </div>
  )
}

export default StatusFilter
