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
    <div className="grid grid-cols-[180px,_auto]">
      <div className="flex items-center gap-2 text-gray-500">
        {icon && <Icon name={icon} size={16} />}
        <Typography className="text-regular-sm text-gray-500">
          {label}
        </Typography>
      </div>
      <Typography as="span" className="text-medium-sm text-gray-900">
        {value}
      </Typography>
    </div>
  )
}

export default TicketDetailItem
