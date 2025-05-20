import React, { FC } from "react"
import TicketDetails from "./TicketDetails"
import { useTicketContext } from "@/hooks/helpdesk"
import TicketDetailsTab from "./TicketDetailsTab"
import DetailsHeader from "./DetailsHeader"

const Details: FC = () => {
  const { ticketDetails: { data, isLoading } = {} } = useTicketContext()
  return (
    <div className="border-r border-r-gray-50 overflow-y-auto h-full">
      <DetailsHeader title={data?.id_slug} />
      {!data && isLoading && (
        <div className="flex items-center justify-center h-full">
          loading...
        </div>
      )}
      {!data && !isLoading && <>No data</>}
      {!!data && (
        <>
          <TicketDetails ticket={data} />
          <TicketDetailsTab ticket={data} />
        </>
      )}
    </div>
  )
}

export default Details
