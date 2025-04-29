import Header from "./Header"
import ViewAISummary from "./ViewAISummary"
import DetailsSection from "./DetailsSection"
import React, { FC, useEffect, useState } from "react"
import { TicketStatus } from "../../../help-desk/utils"
import { Activity, TicketDetails as ITicketDetails } from "../../utils"
import { useTicketChatDetails } from "@/providers/ticketChatProvider"

type Props = {
  ticketDetails: ITicketDetails
}

const TicketDetails: FC<Props> = ({
  ticketDetails: {
    title,
    description,
    assignedTo,
    priority,
    lastUpdated,
    createdAt,
    channel,
  },
}) => {
  const { updateActivities } = useTicketChatDetails()
  const [status, setStatus] = useState<TicketStatus>(TicketStatus.OPEN)

  useEffect(() => {
    const createStatusActivity: Activity = {
      avatarUrl:
        "https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg",
      name: "Caluum Willson",
      activityType: "status",
      status,
      createdAt: new Date(),
    }
    updateActivities(createStatusActivity)
  }, [status])

  const statusOptions: {
    items: { key: number; label: TicketStatus; action: () => void }[]
  }[] = [
    {
      items: [
        {
          key: 0,
          label: TicketStatus.OPEN,
          action: () => {
            setStatus(TicketStatus.OPEN)
          },
        },
        {
          key: 1,
          label: TicketStatus.CLOSED,
          action: () => {
            setStatus(TicketStatus.CLOSED)
          },
        },
        {
          key: 2,
          label: TicketStatus.TAKEN,
          action: () => {
            setStatus(TicketStatus.TAKEN)
          },
        },
        {
          key: 3,
          label: TicketStatus.RESOLVED_AND_CLOSED,
          action: () => {
            setStatus(TicketStatus.RESOLVED_AND_CLOSED)
          },
        },
        {
          key: 4,
          label: TicketStatus.RELEASED_AND_OPEN,
          action: () => {
            setStatus(TicketStatus.RELEASED_AND_OPEN)
          },
        },
      ],
    },
  ]

  return (
    <section className="relative grid grid-rows-[auto_1fr_auto] py-5 px-4">
      <Header title={title} description={description} />
      <DetailsSection
        status={status}
        options={statusOptions}
        assignedTo={assignedTo}
        priority={priority}
        channel={channel}
        createdAt={createdAt}
        lastUpdated={lastUpdated}
      />
      <ViewAISummary />
    </section>
  )
}

export default TicketDetails
