import React, { FC, useMemo } from "react"
import Badge from "@/components/atoms/Badge"
import {
  BADGE_COLOR_MAP,
  TicketStatus,
} from "@/components/views/help-desk/utils"
import TicketDetailItem from "@/components/views/help-desk/_components/ViewTicketDrawer/TicketDetailItem"
import { Ticket } from "@/utils/types"
import dayjs from "dayjs"
import StatusDropdown from "./StatusDropdown"
import { TICKET_CHANNELS_DATA } from "@/utils/constants"
import Typography from "@/components/atoms/Typography"
import Icon from "@/components/atoms/Icon"
import Userinfo from "@/components/molecules/Userinfo"
import sateAvatar from "@/assets/images/eusate-avatar.svg"

type Props = { ticket: Ticket }

const DetailsSection: FC<Props> = ({ ticket }) => {
  const ticketChannel = useMemo(
    () => (ticket ? TICKET_CHANNELS_DATA[ticket?.channel?.name] : null),
    [ticket]
  )
  return (
    <div className="flex flex-col gap-4">
      <TicketDetailItem
        icon="icon-point"
        label="Status"
        value={<StatusDropdown ticket={ticket as Ticket} />}
      />
      <TicketDetailItem
        icon="icon-warning-circle"
        label="Priority"
        value={
          <Badge
            type="filled"
            color={BADGE_COLOR_MAP[ticket?.priority]}
            size="sm"
            className="capitalize py-0.5 "
          >
            {ticket?.priority}
          </Badge>
        }
      />
      <TicketDetailItem
        icon="icon-refresh-2"
        label="Last updated"
        value={dayjs(ticket?.date_updated).format("DD MMM, YYYY. hh:mmA")}
      />
      <TicketDetailItem
        icon="icon-calendar-2"
        label="Created at"
        value={dayjs(ticket?.date_created).format("DD MMM, YYYY. hh:mmA")}
      />
      {ticket.status === TicketStatus.TAKEN && (
        <TicketDetailItem
          icon="icon-user"
          label="Assigned to"
          value={
            ticket.status === TicketStatus.TAKEN ? (
              <div className="flex items-center gap-8">
                <Userinfo
                  src={
                    ticket.assignee === null
                      ? sateAvatar
                      : ticket.assignee.profile_picture
                  }
                  title={
                    ticket.assignee === null ? "Sate" : ticket.assignee.name
                  }
                  classNames={{
                    root: "!py-0",
                    avatar: "!size-[17px] !min-w-[17px] !min-h-[17px]",
                    title: "!text-medium-sm !text-gray-900",
                  }}
                />
              </div>
            ) : (
              "-"
            )
          }
        />
      )}
      <TicketDetailItem
        icon="icon-share"
        label="Channel"
        value={
          ticketChannel && (
            <Typography
              as="span"
              className="text-gray-400 text-regular-xs flex items-center gap-2"
            >
              <Icon
                name={ticketChannel.icon}
                size={17}
                className="text-black"
              />
              From {ticketChannel.name}
            </Typography>
          )
        }
      />
    </div>
  )
}

export default DetailsSection
