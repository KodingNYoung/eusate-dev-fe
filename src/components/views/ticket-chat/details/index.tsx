import Header from "./DetailsHeader"
import React, { FC } from "react"
import TicketDetails from "./TicketDetails"
import TicketDetailsTab from "./TicketDetailsTab"
import { TicketDetails as ITicketDetails } from "../utils"
import { TicketChatDetailsProvider } from "@/providers/ticketChatProvider"

type Props = {
  tab: string
  ticketId?: string | undefined
  ticketDetails: ITicketDetails
}

const Details: FC<Props> = ({ tab, ticketId, ticketDetails }) => {
  const { customerId, temperament } = ticketDetails
  return (
    <TicketChatDetailsProvider>
      <div className="border-r border-r-gray-50">
        {ticketId && <Header ticketId={ticketId} />}
        <TicketDetails ticketDetails={ticketDetails} />
        <TicketDetailsTab
          tab={tab}
          customerId={customerId}
          temperament={temperament}
        />
      </div>
    </TicketChatDetailsProvider>
  )
}

export default Details
