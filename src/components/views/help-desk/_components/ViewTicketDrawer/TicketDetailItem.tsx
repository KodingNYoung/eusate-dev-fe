import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React, { ReactNode } from "react"

type Props = {
  icon?: IconNames
  label: string
  value: ReactNode
}

const TicketDetailItem: FC<Props> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <div className="flex items-center gap-2 text-gray-500 min-w-[150px] max-w-[180px] flex-[2]">
        {icon && <Icon name={icon} size={16} />}
        <Typography className="text-regular-sm text-gray-500">
          {label}
        </Typography>
      </div>
      <Typography
        as="span"
        className="text-medium-sm text-gray-900 truncate flex-[3] min-w-[105px]"
      >
        {value}
      </Typography>
    </div>
  )
}

export default TicketDetailItem
