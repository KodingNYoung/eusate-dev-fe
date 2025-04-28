import React, { FC } from "react"
import { TWClassNames } from "@/utils/types"
import Typography from "@/components/atoms/Typography"
import { capitalizeFirstLetter } from "@/utils/helpers"
import { STATUS_COLOR_MAP, TicketStatus } from "../../help-desk/utils"

type Props = {
  status: TicketStatus
}

export type Color =
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "error"
  | "neutral"
  | "disabled"

const ColorVariant: { [key in Color]: TWClassNames } = {
  primary: "bg-gold-700",
  info: "bg-info-700",
  success: "bg-success-700",
  warning: "bg-warning-700",
  neutral: "bg-gray-700",
  error: "bg-error-700",
  disabled: "bg-gray-700",
}

const Status: FC<Props> = ({ status }) => {
  const color = STATUS_COLOR_MAP[status]
  return (
    <div className="flex items-center gap-x-2">
      <div className={`${ColorVariant[color]} w-2 h-2 rounded-full`}></div>
      <Typography className="text-regular-sm">
        {capitalizeFirstLetter(status)}
      </Typography>
    </div>
  )
}

export default Status
