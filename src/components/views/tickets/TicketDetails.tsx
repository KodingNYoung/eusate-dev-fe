import React, { FC } from "react"

type Props = {
  ticketId: string | undefined
}

const TicketDetails: FC<Props> = ({ ticketId }) => {
  return (
    <div className="bg-white border-black border w-full h-full">
      <header>Ticket ID: {ticketId}</header>
      <main></main>
      <section></section>
    </div>
  )
}

export default TicketDetails
