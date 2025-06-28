import React, { FC } from "react"
import { TWClassNames } from "@/utils/types"
import Typography from "@/components/atoms/Typography"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { TicketStatus } from "../../utils"

type Props = {
  status: TicketStatus
}

const ColorVariant: { [key in TicketStatus]: TWClassNames } = {
  [TicketStatus.RESOLVED_AND_CLOSED]: "bg-gold-700",
  [TicketStatus.TAKEN]: "bg-success-700",
  [TicketStatus.OPEN]: "bg-warning-700",
  [TicketStatus.CLOSED]: "bg-gray-700",
  [TicketStatus.RELEASED_AND_OPEN]: "bg-success-700",
}

const Status: FC<Props> = ({ status }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className={`${ColorVariant[status]} w-3 h-3 rounded-full`}></div>
      <Typography className="text-medium-sm">
        {capitalizeFirstLetter(status.replaceAll("_", " "))}
      </Typography>
    </div>
  )
}

export default Status
