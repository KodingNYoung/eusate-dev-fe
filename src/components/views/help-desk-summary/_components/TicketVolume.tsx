import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  date: string
  start: string
  end: string
}

const TicketVolume: FC<Props> = () => {
  return (
    <div className="border border-gray-50 rounded-x10 p-4 sm:p-6">
      <header className="flex items-center justify-between">
        <Typography as="h3" className="text-semibold-base">
          TicketPriorities
        </Typography>
      </header>
    </div>
  )
}

export default TicketVolume
