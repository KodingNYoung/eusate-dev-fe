import { FC } from "@/utils/types"
import React from "react"
import ticketsEmptyState from "@/assets/images/tickets-empty-state.svg"
import EmptyState from "@/components/organisms/EmptyState"

const TicketsEmptyState: FC = () => {
  return (
    <EmptyState
      img={ticketsEmptyState}
      title="No tickets yet"
      subtitle="It looks like everything is running smoothly—no support tickets have been submitted by the AI!"
    />
  )
}

export default TicketsEmptyState
