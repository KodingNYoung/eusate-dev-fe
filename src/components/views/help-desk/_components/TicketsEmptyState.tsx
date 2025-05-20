import { FC } from "@/utils/types"
import React from "react"
import ticketsEmptyState from "@/assets/images/tickets-empty-state.svg"
import EmptyState from "@/components/organisms/EmptyState"

type Props = {
  hasFilters: boolean
}

const TicketsEmptyState: FC<Props> = ({ hasFilters }) => {
  return (
    <EmptyState
      img={ticketsEmptyState}
      title={hasFilters ? "No tickets for this filter entry" : "No tickets yet"}
      subtitle={
        hasFilters
          ? "Your filter entry did not match any resources. Please try again or create a new resource."
          : "It looks like everything is running smoothly—no support tickets have been submitted by the AI!"
      }
    />
  )
}

export default TicketsEmptyState
