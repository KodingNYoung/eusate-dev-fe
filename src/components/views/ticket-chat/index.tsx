"use client"

import { TicketDetails } from "./utils"
import React, { FC, useState } from "react"
import MobileTicketView from "./MobileTicketView"
import DesktopTicketView from "./DesktopTicketView"
import { TicketChatProvider } from "@/providers/ticketChatProvider"
import {
  TicketPriority,
  TicketStatus,
  UserTemperament,
} from "../help-desk/utils"

type Props = {
  ticketId: string | undefined
  tab: string
}

const MockTicketDetails: TicketDetails[] = [
  {
    id: "TIC-394",
    title: "Issue with account access",
    description: `I am unable to log into my account. 
                  I keep receiving an error message stating 
                  that my credentials are incorrect. Please 
                  assist me in resolving this issue`,
    status: TicketStatus.OPEN,
    priority: TicketPriority.HIGH,
    lastUpdated: new Date(),
    createdAt: new Date(),
    assignedTo: "Jane Smith",
    channel: "twitter",
    customerId: "#USER12345",
    temperament: UserTemperament.CALM,
  },
]

const TicketChat: FC<Props> = ({ ticketId, tab }) => {
  const [ticketDetails] = useState(
    MockTicketDetails.filter((details) => details.id === ticketId)
  )

  return (
    <TicketChatProvider>
      <div className="bg-white w-full h-full rounded-xl sm:rounded-x20 ">
        {!ticketDetails.length ? (
          <div className="h-full w-full flex justify-center items-center text-gray-300">
            I no say you go try am. Go and get married bro
          </div>
        ) : (
          <div className="w-full h-full">
            <DesktopTicketView
              tab={tab}
              ticketId={ticketId}
              ticketDetails={ticketDetails[0]}
            />
            <MobileTicketView tab={tab} ticketDetails={ticketDetails[0]} />
          </div>
        )}
      </div>
    </TicketChatProvider>
  )
}

export default TicketChat
