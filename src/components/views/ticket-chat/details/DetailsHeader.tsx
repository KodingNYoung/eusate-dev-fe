import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import React, { FC } from "react"

type Props = {
  ticketId: string
}

const Header: FC<Props> = ({ ticketId }) => {
  return (
    <header className="px-6 py-4 items-center gap-x-4 text-gray-400 border-gray-50 border-b h-[68px] hidden md:flex md:sticky md:top-0 md:left-0 md:bg-white md:z-[1]">
      <div className="flex items-center gap-2">
        <Icon
          name="icon-ticket"
          className="!text-regular-base sm:!text-regular-xl"
        />
        <Typography className="text-medium-base" weight={500}>
          #{ticketId}
        </Typography>
      </div>
    </header>
  )
}

export default Header
