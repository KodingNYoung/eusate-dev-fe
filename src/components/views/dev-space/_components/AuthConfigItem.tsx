import Typography from "@/components/atoms/Typography"
import { FC } from "@/utils/types"
import React, { ReactNode } from "react"

type Props = {
  label: string
  value: ReactNode
}

const AuthConfigItem: FC<Props> = ({ label, value }) => {
  return (
    <div className="flex items-center">
      <Typography className="w-[280px] text-black" variant="medium-base">
        {label}
      </Typography>
      <Typography variant="medium-sm" className="text-gray-500">
        {value}
      </Typography>
    </div>
  )
}

export default AuthConfigItem
