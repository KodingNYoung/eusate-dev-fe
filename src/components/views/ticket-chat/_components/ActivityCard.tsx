import React, { FC } from "react"
import Badge from "@/components/atoms/Badge"
import Typography from "@/components/atoms/Typography"
import { TicketPriority, TicketStatus } from "../../help-desk/utils"
import { TicketActivity } from "@/utils/types"
import { MessageSenders } from "@/utils/enums"
import { cls } from "@/utils/helpers"
import Icon from "@/components/atoms/Icon"
import { TICKET_EVENTS } from "@/utils/constants"
import { ACTIVITY_DESCRIPTIONS } from "../utils"
import dayjs from "dayjs"
import Avatar from "@/components/atoms/Avatar"

type Props = {
  activity: TicketActivity
  lastCard: boolean
}

const badgeProps = {
  [TicketStatus.OPEN]: { color: "primary" },
  [TicketStatus.TAKEN]: { color: "info" },
  [TicketStatus.RELEASED_AND_OPEN]: { color: "primary" },
  [TicketStatus.RESOLVED_AND_CLOSED]: { color: "success" },
  [TicketStatus.CLOSED]: { color: "disabled" },
  [TicketPriority.CRITICAL]: { color: "error" },
  [TicketPriority.HIGH]: { color: "primary" },
  [TicketPriority.MEDIUM]: { color: "info" },
  [TicketPriority.LOW]: { color: "neutral" },
} as const
const badgeText = {
  [TicketStatus.OPEN]: "Open",
  [TicketStatus.TAKEN]: "Taken",
  [TicketStatus.RELEASED_AND_OPEN]: "Released & Open",
  [TicketStatus.RESOLVED_AND_CLOSED]: "Resolved & Closed",
  [TicketStatus.CLOSED]: "Closed",
  [TicketPriority.CRITICAL]: "Critical",
  [TicketPriority.HIGH]: "High",
  [TicketPriority.MEDIUM]: "Medium",
  [TicketPriority.LOW]: "Low",
} as const

const ActivityCard: FC<Props> = ({ activity }) => {
  const event = activity.event
  const actor = activity.actor || activity.actor_on_delete
  const actorType = actor?.actor_type

  const hasBadge =
    event === TICKET_EVENTS.PRIORITY_CHANGE ||
    event === TICKET_EVENTS.STATUS_CHANGE

  const date = dayjs(activity.date_created)

  return (
    <div className="flex items-start gap-3">
      {/* image */}
      <div className="relative">
        <div
          className={cls(
            "size-8 min-w-8 min-h-8 rounded-full flex items-center justify-center overflow-hidden",
            actorType === MessageSenders.SATE
              ? "bg-black"
              : event === TICKET_EVENTS.CALL_JOIN ||
                  event === TICKET_EVENTS.CALL_START
                ? "bg-brand-gradient"
                : event === TICKET_EVENTS.CALL_END
                  ? "bg-error-500"
                  : "bg-gray-50"
          )}
        >
          {actorType === MessageSenders.SATE ? (
            <Icon name="icon-eusate" size={16} className="text-gradient" />
          ) : event === TICKET_EVENTS.CALL_JOIN ||
            event === TICKET_EVENTS.CALL_START ? (
            <Icon name="icon-call" size={16} className="text-white" />
          ) : event === TICKET_EVENTS.CALL_END ? (
            <Icon name="icon-call-slash" size={16} className="text-white" />
          ) : (
            <Avatar
              src={actor?.profile_picture}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      {/* body */}
      <div className="grid gap-1 flex-1">
        <Typography
          as="div"
          className="text-gray-300 text-regular-sm leading-[125%]"
        >
          <span className="text-semibold-sm text-gray-900">
            {event === TICKET_EVENTS.CALL_END ? "Call ended" : actor?.username}
          </span>{" "}
          {ACTIVITY_DESCRIPTIONS[event]}{" "}
          {hasBadge && (
            <Badge
              size="sm"
              type="accent"
              className="mt-2 mb-1"
              {...badgeProps[activity.value as TicketStatus | TicketPriority]}
            >
              {badgeText[activity.value as TicketStatus | TicketPriority]}
            </Badge>
          )}
        </Typography>
        <Typography className="text-regular-xs text-gray-300">
          {date.format("D MMM")} • {date.format("hh:mma")}
        </Typography>
        {event === TICKET_EVENTS.COMMENT && (
          <div className=" bg-gray-25 border border-gray-50 p-2.5 rounded-lg w-full">
            <Typography className="text-regular-sm text-gray-700 line-clamp-3">
              {activity.value}
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityCard
