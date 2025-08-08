import React, { FC } from "react"
import { useTicketContext } from "@/hooks/helpdesk"
import TicketDetailsTab from "./TicketDetailsTab"
import DetailsHeader from "./DetailsHeader"
import TicketTitle from "./TicketTitle"
import DetailsSection from "@/components/views/help-desk/_components/ViewTicketDrawer/DetailsSection"
import ViewAISummary from "./ViewAISummary"

const Details: FC = () => {
  const { ticketDetails: { data, isLoading } = {} } = useTicketContext()
  return (
    <div className="border-r border-r-gray-50 overflow-y-auto h-full no-scrollbar">
      <DetailsHeader title={data?.id_slug} />
      {!data && isLoading && (
        <div className="flex items-center justify-center h-full">
          loading...
        </div>
      )}
      {!data && !isLoading && <>No data</>}
      {!!data && (
        <>
          <section className="relative grid content-start py-5 px-4">
            <TicketTitle ticket={data} />
            <DetailsSection ticket={data} />
            <ViewAISummary />
          </section>
          <TicketDetailsTab ticket={data} />
        </>
      )}
    </div>
  )
}

export default Details
