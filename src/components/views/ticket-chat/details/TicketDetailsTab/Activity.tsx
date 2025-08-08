import React from "react"
import ActivityCard from "../../_components/ActivityCard"
import NoContentFound from "../../_components/NoContentFound"
import { FC } from "@/utils/types"
import { useTicketActivities } from "@/hooks/api/helpdeskHooks"

type Props = {
  ticketId: string
}

const Activities: FC<Props> = ({ ticketId }) => {
  const { data } = useTicketActivities(ticketId)

  return (
    <div className="p-5 px-3">
      {data?.length ? (
        <div className="flex flex-col gap-6">
          {data.map((activity, idx) => (
            <ActivityCard
              key={idx}
              activity={activity}
              lastCard={idx === data.length - 1}
            />
          ))}
        </div>
      ) : (
        <NoContentFound msg="No Activity Found" />
      )}
    </div>
  )
}

export default Activities
