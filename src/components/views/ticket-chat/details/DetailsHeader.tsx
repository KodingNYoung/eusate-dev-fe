import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import React, { FC } from "react"

type Props = {
  ticketId: string | undefined
}

const Header: FC<Props> = ({ ticketId }) => {
  return (
    <header className="px-6 py-4 flex items-center gap-x-4 text-gray-400 border-gray-50 border-b-2">
      <div className="flex items-center gap-2">
        <Icon
          name="icon-ticket"
          className="!text-regular-base sm:!text-regular-xl"
        />
        <Typography variant="medium-base" weight={500}>
          #{ticketId}
        </Typography>
      </div>

      <div className="bg-gray-25 rounded-full px-1.5 py-0.5 border border-gray-50">
        <Icon
          name="icon-pin"
          className="!text-regular-base sm:!text-regular-lg "
        />
      </div>
    </header>
  )
}

export default Header
