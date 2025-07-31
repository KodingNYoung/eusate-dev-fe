import { cls } from "@/utils/helpers"
import { FC, Ticket } from "@/utils/types"
import React from "react"
import { BADGE_COLOR_MAP, TicketStatus } from "../utils"
import Typography from "@/components/atoms/Typography"
import Icon from "@/components/atoms/Icon"
import Badge from "@/components/atoms/Badge"
import TicketCardActions from "./TicketCardActions"
import dayjs from "dayjs"
import { Skeleton } from "@nextui-org/react"

const bgMap = {
  [TicketStatus.OPEN]: "bg-gold-50",
  [TicketStatus.TAKEN]: "bg-info-50",
  [TicketStatus.RELEASED_AND_OPEN]: "bg-[#E7FEFF]",
  [TicketStatus.RESOLVED_AND_CLOSED]: "bg-success-50",
  [TicketStatus.CLOSED]: "bg-gray-50",
}
const colorMap = {
  [TicketStatus.OPEN]: "text-warning-600",
  [TicketStatus.TAKEN]: "text-info-600",
  [TicketStatus.RELEASED_AND_OPEN]: "text-[#05C3CA]",
  [TicketStatus.RESOLVED_AND_CLOSED]: "text-success-600",
  [TicketStatus.CLOSED]: "text-gray-600",
}
const tagMap = {
  [TicketStatus.OPEN]: "Open",
  [TicketStatus.TAKEN]: "Taken",
  [TicketStatus.RELEASED_AND_OPEN]: "Released & Open",
  [TicketStatus.RESOLVED_AND_CLOSED]: "Resolved & Closed",
  [TicketStatus.CLOSED]: "Closed",
}

type Props = {
  ticket: Ticket
  onView?: () => void
  loading?: boolean
}

const TicketCard: FC<Props> = ({ ticket, onView, loading }) => {
  return (
    <div
      className={cls(
        "w-full rounded-2xl border border-gray-50 overflow-hidden",
        bgMap[ticket.status]
      )}
    >
      <main className="p-5 bg-white rounded-[14px] grid gap-4.5">
        <header className="flex items-center justify-between gap-2">
          <div className="flex-1 flex items-center gap-2 text-gray-300">
            <Skeleton isLoaded={!loading} className="!leading-none rounded-sm">
              <Icon name="icon-ticket" size={20} />
            </Skeleton>
            <Typography
              className="text-regular-sm text-[inherit] !leading-none w-24"
              loading={loading}
            >
              {ticket.id_slug}
            </Typography>
          </div>
          {(ticket.priority || loading) && (
            <Badge
              type="filled"
              color={BADGE_COLOR_MAP[ticket.priority]}
              size="sm"
              className="capitalize max-w-14"
              loading={loading}
            >
              {ticket.priority}
            </Badge>
          )}
          {onView && <TicketCardActions onView={onView} loading={loading} />}
        </header>
        <section className="grid gap-2">
          <Typography
            as="h4"
            className="text-gray-900 text-medium-lg truncate"
            loading={loading}
          >
            {ticket.title}
          </Typography>
          <Typography
            as="span"
            className="line-clamp-2 text-gray-500 text-regular-sm"
            loading={loading}
          >
            {ticket.description}
          </Typography>
        </section>
        <footer className="flex items-center justify-between">
          <Typography
            as="span"
            className="text-gray-400 text-regular-xs"
            loading={loading}
          >
            Created at {dayjs(ticket.date_created).format("DD/MM/YYYY hh:mmA")}
          </Typography>
          <Skeleton isLoaded={!loading} className="rounded-full">
            <div className="size-6 min-w-6 min-h-6 rounded-full bg-brand-gradient p-px">
              <div className="w-full h-full rounded-[inherit] bg-black text-white !leading-none flex items-center justify-center">
                <Icon name="icon-eusate" size={12} />
              </div>
            </div>
          </Skeleton>
        </footer>
      </main>
      <span className="flex justify-center p-1">
        <Typography className={cls("text-medium-xs", colorMap[ticket.status])}>
          {tagMap[ticket.status]}
        </Typography>
      </span>
    </div>
  )
}

export default TicketCard
