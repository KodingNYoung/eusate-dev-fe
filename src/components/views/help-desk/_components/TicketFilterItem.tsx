import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React from "react"

type Props = {
  label: string
  value: string
  onRemove: () => void
}

const TicketFilterItem: FC<Props> = ({ label, value, onRemove }) => {
  return (
    <div className="flex items-center gap-3 px-2.5 py-1.5 bg-gold-50 rounded-lg whitespace-nowrap">
      <Typography as="span" className="text-gray-900 text-medium-base">
        {label} is {value}
      </Typography>
      <button className="leading-none" onClick={onRemove}>
        <Icon name="icon-close" size={24} />
      </button>
    </div>
  )
}

export default TicketFilterItem
