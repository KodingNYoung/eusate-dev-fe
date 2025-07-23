import Typography from "@/components/atoms/Typography"
import React, { FC } from "react"

type Props = {
  msg: string
}

const NoContentFound: FC<Props> = ({ msg }) => {
  return (
    <Typography
      as="p"
      className="text-medium-xs text-gray-400 text-center h-full flex justify-center items-center py-5"
    >
      {msg}
    </Typography>
  )
}

export default NoContentFound
