import Header from "./Header"
import ViewAISummary from "./ViewAISummary"
import DetailsSection from "../../../help-desk/_components/ViewTicketDrawer/DetailsSection"
import React, { FC } from "react"
import { Ticket } from "@/utils/types"

type Props = { ticket: Ticket }

const TicketDetails: FC<Props> = ({ ticket }) => {
  return (
    <section className="relative grid content-start py-5 px-4">
      <Header ticket={ticket} />
      <DetailsSection ticket={ticket} />
      <ViewAISummary />
    </section>
  )
}

export default TicketDetails
