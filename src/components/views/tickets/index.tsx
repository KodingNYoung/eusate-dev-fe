"use client"

import React, { FC } from "react"
import TicketDetails from "./TicketDetails"
import UserChat from "./UserChat"
import AIChat from "./AIChat"
import MobileTicketView from "./MobileTicketView"

type Props = {
  ticketId: string | undefined
  tab: string
}

const TicketChat: FC<Props> = ({ ticketId, tab }) => {
  return (
    <div className="bg-white w-full h-full rounded-x20">
      {/* Desktop Screen */}
      <div className="hidden md:grid w-full h-full grid-cols-[30%_40%_30%]">
        <TicketDetails ticketId={ticketId} />
        <UserChat />
        <AIChat />
      </div>

      <MobileTicketView tab={tab} />
    </div>
  )
}

export default TicketChat
