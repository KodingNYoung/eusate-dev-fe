import { IconNames } from "@/utils/iconNames"
import { FC } from "@/utils/types"
import React from "react"
import Icon from "../atoms/Icon"
import Typography from "../atoms/Typography"

type Props = {
  title: string
  icon: IconNames
  description: string
}

const Info: FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="bg-warning-50 px-4 py-3 rounded-lg flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon name={icon} className="!text-regular-2xl text-warning-500" />
        <Typography className="text-semibold-sm text-black">{title}</Typography>
      </div>
      <Typography className="text-regular-xs text-gray-700">
        {description}
      </Typography>
    </div>
  )
}

export default Info
