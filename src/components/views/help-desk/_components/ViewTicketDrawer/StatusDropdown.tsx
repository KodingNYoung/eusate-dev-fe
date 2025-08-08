"use client"

import { FC, Ticket } from "@/utils/types"
import React, { useMemo, useState } from "react"
import { TicketStatus } from "../../utils"
import AppDropdown from "@/components/molecules/Popups/AppDropdown"
import Icon from "@/components/atoms/Icon"
import Status from "./Status"
import { useOrganisation } from "@/providers/organisationProvider"
import { changeTicketStatus } from "@/app/(organisation-routes)/(dashboard)/helpdesk/actions"
import { useQueryClient } from "@tanstack/react-query"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { toaster } from "@/components/molecules/Toast"

type Props = {
  ticket: Ticket
}

const statusOptions = [
  {
    items: [
      {
        key: TicketStatus.CLOSED,
        label: "Closed",
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
  const { organisationUserId } = useOrganisation()
  const queryClient = useQueryClient()

  const [status, setStatus] = useState(ticket?.status || "")

  const isAssignedToTicket = useMemo(
    () => ticket.assignee?.id === organisationUserId,
    [organisationUserId, ticket.assignee]
  )

  const handleStatusChange = async (status: TicketStatus) => {
    setStatus(status)
    const response = await changeTicketStatus(status, ticket.id)
    if ("success" in response) {
      queryClient.invalidateQueries({ queryKey: QUERY_FN_KEYS.TICKETS })
    } else if ("error" in response) {
      setStatus(ticket.status)
      toaster.error(response.error.message)
    }
  }

  return (
    <AppDropdown
      placement="bottom-start"
      isDisabled={!isAssignedToTicket}
      triggerEl={
        <div className="flex items-center gap-x-2">
          <Status status={status} />
          {isAssignedToTicket && <Icon name="icon-chevron-down" />}
        </div>
      }
      triggerType="listbox"
      sections={statusOptions.map((section) => ({
        items: section.items.map((option) => ({
          ...option,
          action: () => handleStatusChange(option.key),
        })),
      }))}
      triggerBtnProps={{
        isIconOnly: false,
        radius: "full",
        size: "sm",
        className: "min-w-6 h-6 w-18 border border-gray-100 opacity-100 px-1",
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
