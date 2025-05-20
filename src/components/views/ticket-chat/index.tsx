"use client"

import React, { FC } from "react"
// import MobileTicketView from "./MobileTicketView"
import DesktopTicketView from "./DesktopTicketView"

// import { useTicketDetails } from "@/hooks/api/helpdeskHooks"
import {
  ChatContextProvider,
  TicketContextProvider,
} from "@/providers/ticketProviders"

type Props = {
  ticketId: string
  tab: string
}

const TicketChat: FC<Props> = ({ ticketId }) => {
  return (
    <TicketContextProvider ticketId={ticketId}>
      <ChatContextProvider ticketId={ticketId}>
        <div className="bg-white w-full rounded-xl sm:rounded-x20 h-[calc(100vh_-_94px)] overflow-hidden">
          <DesktopTicketView />
          {/* <MobileTicketView tab={tab} ticketDetails={ticketDetails[0]} /> */}
        </div>
      </ChatContextProvider>
    </TicketContextProvider>
  )
}

export default TicketChat
