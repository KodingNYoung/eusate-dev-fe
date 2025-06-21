import { FC } from "@/utils/types"
import React, { ReactNode } from "react"
import Typography from "../atoms/Typography"

type Props = {
  title: string
  description: ReactNode
}

const PageHeader: FC<Props> = ({ title, description }) => {
  return (
    <header className="grid gap-2">
      <Typography className="text-bold-base sm:text-bold-2xl text-gray-900">
        {title}
      </Typography>
      <Typography className="text-regular-xs sm:text-regular-sm text-black-50">
        {description}
      </Typography>
    </header>
  )
}

export default PageHeader
