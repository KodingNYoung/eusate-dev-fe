import React from "react"
import { FC } from "@/utils/types"
import Badge from "@/components/atoms/Badge"
import {
  TEMPERAMENT_COLOR_MAP,
  UserTemperament,
} from "@/components/views/help-desk/utils"
import TicketDetailItem from "@/components/views/help-desk/_components/ViewTicketDrawer/TicketDetailItem"

type Props = {
  customerId: string
  temperament: UserTemperament
}

const UserInfo: FC<Props> = ({ customerId, temperament }) => {
  return (
    <section className="py-5 px-8">
      <main className="border border-gray-50 rounded-x20 p-4 grid gap-5">
        <TicketDetailItem label="Customer ID" value={customerId} />
        <TicketDetailItem
          label="Temperament"
          value={
            <Badge
              type="accent"
              size="sm"
              className="capitalize"
              color={TEMPERAMENT_COLOR_MAP[temperament]}
            >
              {temperament}
            </Badge>
          }
        />
      </main>
    </section>
  )
}

export default UserInfo
