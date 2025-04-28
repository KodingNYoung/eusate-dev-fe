import Typography from "@/components/atoms/Typography"
import React, { FC } from "react"

type Props = {
  title: string
  description: string
}
const Header: FC<Props> = ({ title, description }) => {
  return (
    <header className="grid gap-2 mb-6">
      <Typography as="h2" className="text-semibold-xl text-gray-900">
        {title}
      </Typography>
      <Typography as="p" className="text-gray-700 text-regular-sm">
        {description}
      </Typography>
    </header>
  )
}

export default Header
