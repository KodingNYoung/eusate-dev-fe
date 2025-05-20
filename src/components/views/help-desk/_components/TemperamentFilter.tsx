import { useQueryParams } from "@/hooks/utilityHooks"
import { FC } from "@/utils/types"
import React, { useMemo } from "react"
import { TicketFilters } from "../utils"
import Checkbox from "@/components/molecules/Checkbox"

const TemperamentFilter: FC = () => {
  const { set, get, searchParams } = useQueryParams()

  const temperament = useMemo(() => {
    const temperament = get(TicketFilters.TEMPERAMENT)
    if (temperament) {
      return new Set(temperament.split(","))
    }
    return new Set()
  }, [searchParams])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTemperament = new Set(temperament)
    if (e.currentTarget.checked) {
      newTemperament.add(e.currentTarget.value)
    } else {
      newTemperament.delete(e.currentTarget.value)
    }
    set(TicketFilters.TEMPERAMENT, Array.from(newTemperament).join(",") || null)
  }

  return (
    <div>
      <Checkbox
        name={TicketFilters.TEMPERAMENT}
        value="calm"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={temperament.has("calm")}
      >
        Calm
      </Checkbox>
      <Checkbox
        name={TicketFilters.TEMPERAMENT}
        value="neutral"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={temperament.has("neutral")}
      >
        Neutral
      </Checkbox>
      <Checkbox
        name={TicketFilters.TEMPERAMENT}
        value="impatient"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={temperament.has("impatient")}
      >
        Impatient
      </Checkbox>
      <Checkbox
        name={TicketFilters.TEMPERAMENT}
        value="upset"
        classNames={{
          root: "p-3 !gap-2",
          label: "!text-medium-sm text-gray-700",
        }}
        onChange={handleCheck}
        checked={temperament.has("upset")}
      >
        Upset
      </Checkbox>
    </div>
  )
}

export default TemperamentFilter
