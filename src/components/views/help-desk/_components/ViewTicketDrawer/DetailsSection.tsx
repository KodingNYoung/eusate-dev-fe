import React, { FC } from "react"
import Badge from "@/components/atoms/Badge"
import {
  BADGE_COLOR_MAP,
  TicketStatus,
} from "@/components/views/help-desk/utils"
import TicketDetailItem from "@/components/views/help-desk/_components/ViewTicketDrawer/TicketDetailItem"
import { Ticket } from "@/utils/types"
import dayjs from "dayjs"
import StatusDropdown from "./StatusDropdown"

type Props = { ticket: Ticket }

const DetailsSection: FC<Props> = ({ ticket }) => {
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
          // value={
          //   <div className="flex items-center gap-8">
          //     <Userinfo
          //       src="https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg"
          //       title={assignedTo}
          //       classNames={{
          //         root: "!py-0",
          //         avatar: "!size-5 !min-w-5 !min-h-5",
          //         title: "!text-medium-sm !text-gray-900",
          //       }}
          //     />
          //   </div>
          // }
          value={ticket?.assignee || "Sate"}
        />
      )}
      <TicketDetailItem
        icon="icon-share"
        label="Channel"
        // value={
        //   <Icon
        //     name={CHANNELS_ICON[channel]}
        //     size={20}
        //     className="text-gray-900"
        //   />
        // }
        value={ticket?.channel.name.replaceAll("_", " ")}
      />
    </div>
  )
}

export default DetailsSection
