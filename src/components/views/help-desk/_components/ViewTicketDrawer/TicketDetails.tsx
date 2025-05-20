import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC, Ticket } from "@/utils/types"
import React from "react"
import DetailsSection from "./DetailsSection"

type Props = {
  ticket: Ticket
}

const TicketDetails: FC<Props> = ({ ticket }) => {
  return (
    <section className="py-5 px-8 border-b border-gray-50">
      <div className="flex items-center gap-2 text-gray-400 mb-1 !leading-none">
        <Icon name="icon-ticket" size={20} />
        <Typography className="text-medium-sm">{ticket.id_slug}</Typography>
      </div>
      <header className="grid gap-2 mb-6">
        <Typography as="h2" className="text-semibold-xl text-gray-900">
          {ticket.title}
        </Typography>
        <Typography as="p" className="text-gray-700 text-regular-sm">
          {ticket.description}
        </Typography>
      </header>
      <DetailsSection ticket={ticket} />
    </section>
  )
}

export default TicketDetails
