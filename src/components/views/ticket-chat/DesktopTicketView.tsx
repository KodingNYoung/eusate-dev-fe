import CustomerChat from "./customer-chat"
import { TicketDetails } from "./utils"
import React, { FC } from "react"
import Details from "./details"
import AIChat from "./aichat"

type Props = {
  tab: string
  ticketId: string | undefined
  ticketDetails: TicketDetails
}

const DesktopTicketView: FC<Props> = ({ tab, ticketId, ticketDetails }) => {
  const { customerId, temperament } = ticketDetails
  return (
    <div className="hidden md:grid w-full h-full grid-cols-[27%_46%_27%]">
      <Details tab={tab} ticketId={ticketId} ticketDetails={ticketDetails} />
      <CustomerChat customerId={customerId} temperament={temperament} />
      <AIChat />
    </div>
  )
}

export default DesktopTicketView
