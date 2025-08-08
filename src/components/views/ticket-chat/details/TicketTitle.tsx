import Typography from "@/components/atoms/Typography"
import { Ticket } from "@/utils/types"
import React, { FC } from "react"

type Props = { ticket: Ticket }
const TicketTitle: FC<Props> = ({ ticket }) => {
  return (
    <header className="grid gap-2 mb-6">
      <Typography as="h2" className="text-semibold-xl text-gray-900">
        {ticket?.title}
      </Typography>
      <Typography as="p" className="text-regular-sm text-gray-700">
        {ticket?.description}
      </Typography>
    </header>
  )
}

export default TicketTitle
