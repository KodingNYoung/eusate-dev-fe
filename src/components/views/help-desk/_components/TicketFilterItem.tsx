import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

const TicketFilterItem: FC = () => {
  return (
    <div className="flex items-center gap-3 px-2.5 py-1.5 bg-gold-50 rounded-lg whitespace-nowrap">
      <Typography as="span" className="text-gray-900 text-medium-base">
        Priority is High
      </Typography>
      <button className="leading-none">
        <Icon name="icon-close" size={24} />
      </button>
    </div>
  )
}

export default TicketFilterItem
