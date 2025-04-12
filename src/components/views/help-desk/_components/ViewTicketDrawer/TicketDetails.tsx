import Badge from "@/components/atoms/Badge"
import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"
import { BADGE_COLOR_MAP, TicketPriority } from "../../utils"
import Userinfo from "@/components/molecules/Userinfo"
import TicketDetailItem from "./TicketDetailItem"

const TicketDetails: FC = () => {
  return (
    <section className="py-5 px-8 border-b border-gray-50">
      <div className="flex items-center gap-2 text-gray-400 mb-1 !leading-none">
        <Icon name="icon-ticket" size={20} />
        <Typography className="text-medium-sm">#TIC-2386</Typography>
      </div>
      <header className="grid gap-2 mb-6">
        <Typography as="h2" className="text-semibold-xl text-gray-900">
          Issue with account access{" "}
        </Typography>
        <Typography as="p" className="text-gray-700 text-regular-sm">
          I am unable to log into my account. I keep receiving an error message
          stating that my credentials are incorrect. Please assist me in
          resolving this issue.
        </Typography>
      </header>
      <div className="flex flex-col gap-4">
        <TicketDetailItem
          icon="icon-point"
          label="Status"
          value={<span>dropdown</span>}
        />
        <TicketDetailItem
          icon="icon-warning-circle"
          label="Priority"
          value={
            <Badge
              type="filled"
              color={BADGE_COLOR_MAP[TicketPriority.HIGH]}
              size="sm"
              className="capitalize"
            >
              {"high"}
            </Badge>
          }
        />
        <TicketDetailItem
          icon="icon-refresh-2"
          label="Last updated"
          value={"12 Mar, 2024. 7:00PM"}
        />
        <TicketDetailItem
          icon="icon-calendar-2"
          label="Created at"
          value={"12 Mar, 2024. 7:00PM"}
        />
        <TicketDetailItem
          icon="icon-user"
          label="Assigned to"
          value={
            <div className="flex items-center gap-2">
              <Userinfo
                src="https://images.pexels.com/photos/2100697/pexels-photo-2100697.jpeg"
                title="Jane Smith"
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
            <Icon name="icon-eusate" size={20} className="text-gray-900" />
          }
        />
      </div>
    </section>
  )
}

export default TicketDetails
