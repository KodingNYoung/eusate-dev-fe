import { FC, Ticket } from "@/utils/types"
import React from "react"
import TicketDetails from "./TicketDetails"
import Attachments from "./Attachments"
import CustomerInfo from "./CustomerInfo"
import TicketActionBtns from "./TicketActionButtons"

type Props = {
  ticket?: Ticket
}

const ViewTicketContent: FC<Props> = ({ ticket }) => {
  console.log({ ticket })
  return (
    <main className="relative flex flex-col flex-1 overflow-auto">
      <TicketDetails />
      <Attachments />
      <CustomerInfo />
      <TicketActionBtns />
    </main>
  )
}

export default ViewTicketContent
