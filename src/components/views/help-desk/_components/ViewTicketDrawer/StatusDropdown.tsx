import { FC, Ticket } from "@/utils/types"
import React, { useState } from "react"
import { TicketStatus } from "../../utils"
import AppDropdown from "@/components/molecules/Popups/AppDropdown"
import Icon from "@/components/atoms/Icon"
import Status from "./Status"

type Props = {
  ticket: Ticket
}

const statusOptions = [
  {
    items: [
      {
        key: TicketStatus.OPEN,
        label: "Open",
      },
      {
        key: TicketStatus.CLOSED,
        label: "Closed",
      },
      {
        key: TicketStatus.TAKEN,
        label: "Taken",
      },
      {
        key: TicketStatus.RESOLVED_AND_CLOSED,
        label: "Resolved and closed",
      },
      {
        key: TicketStatus.RELEASED_AND_OPEN,
        label: "Released and open",
      },
    ],
  },
]

const StatusDropdown: FC<Props> = ({ ticket }) => {
  const [status, setStatus] = useState(ticket?.status || "")
  return (
    <AppDropdown
      placement="bottom-start"
      triggerEl={
        <div className="flex items-center gap-x-2">
          <Status status={status} />
          <Icon name="icon-chevron-down" />
        </div>
      }
      triggerType="listbox"
      sections={statusOptions.map((section) => ({
        items: section.items
          .filter((option) => option.key !== status)
          .map((option) => ({
            ...option,
            action: () => setStatus(option.key),
          })),
      }))}
      triggerBtnProps={{
        isIconOnly: false,
        radius: "full",
        size: "sm",
        className: "min-w-6 h-7 w-18 border border-gray-100",
      }}
      menuProps={{
        itemClasses: {
          title: "text-[14px] font-app font-medium text-gray-600",
        },
      }}
    />
  )
}

export default StatusDropdown
