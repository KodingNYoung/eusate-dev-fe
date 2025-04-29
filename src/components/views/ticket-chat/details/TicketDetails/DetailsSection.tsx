import React, { FC } from "react"
import Icon from "@/components/atoms/Icon"
import Badge from "@/components/atoms/Badge"
import { formatDate } from "@/utils/helpers"
import { IconNames } from "@/utils/iconNames"
import Status from "../../_components/status"
import { ChannelList, Channels } from "../../utils"
import Userinfo from "@/components/molecules/Userinfo"
import AppDropdown from "@/components/molecules/Popups/AppDropdown"
import {
  BADGE_COLOR_MAP,
  TicketPriority,
  TicketStatus,
} from "@/components/views/help-desk/utils"
import TicketDetailItem from "@/components/views/help-desk/_components/ViewTicketDrawer/TicketDetailItem"

type Props = {
  assignedTo: string
  channel: Channels
  createdAt: Date
  lastUpdated: Date
  priority: TicketPriority
  status: TicketStatus
  options: {
    items: { key: number; label: TicketStatus; action: () => void }[]
  }[]
}

const CHANNELS_ICON: {
  [channel in Channels]: IconNames
} = {
  [ChannelList.TWITTER]: "icon-twitter",
}

const DetailsSection: FC<Props> = ({
  priority,
  channel,
  status,
  options,
  assignedTo,
  lastUpdated,
  createdAt,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <TicketDetailItem
        icon="icon-point"
        label="Status"
        value={
          <AppDropdown
            triggerEl={
              <div className="flex items-center gap-x-2">
                <Status status={status} />
                <Icon name="icon-chevron-down" />
              </div>
            }
            triggerType="listbox"
            sections={options}
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
        }
      />
      <TicketDetailItem
        icon="icon-warning-circle"
        label="Priority"
        value={
          <Badge
            type="filled"
            color={BADGE_COLOR_MAP[priority]}
            size="sm"
            className="capitalize"
          >
            {priority}
          </Badge>
        }
      />
      <TicketDetailItem
        icon="icon-refresh-2"
        label="Last updated"
        value={formatDate(lastUpdated)}
      />
      <TicketDetailItem
        icon="icon-calendar-2"
        label="Created at"
        value={formatDate(createdAt)}
      />
      <TicketDetailItem
        icon="icon-user"
        label="Assigned to"
        value={
          <div className="flex items-center gap-8">
            <Userinfo
              src="https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg"
              title={assignedTo}
              classNames={{
                root: "!py-0",
                avatar: "!size-5 !min-w-5 !min-h-5",
                title: "!text-medium-sm !text-gray-900",
              }}
            />
          </div>
        }
      />
      <TicketDetailItem
        icon="icon-share"
        label="Channel"
        value={
          <Icon
            name={CHANNELS_ICON[channel]}
            size={20}
            className="text-gray-900"
          />
        }
      />
    </div>
  )
}

export default DetailsSection
