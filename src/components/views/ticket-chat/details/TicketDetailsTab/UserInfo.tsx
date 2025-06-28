import React from "react"
import { FC, TicketCustomer } from "@/utils/types"
import Badge from "@/components/atoms/Badge"
import { TEMPERAMENT_COLOR_MAP } from "@/components/views/help-desk/utils"
import TicketDetailItem from "@/components/views/help-desk/_components/ViewTicketDrawer/TicketDetailItem"

type Props = {
  customer: TicketCustomer
}

const UserInfo: FC<Props> = ({ customer }) => {
  return (
    <section className="py-5 px-6">
      <main className="border border-gray-50 rounded-x20 py-4 px-5 grid gap-4">
        <TicketDetailItem label="Customer ID" value={customer.id} />
        <TicketDetailItem
          label="Temperament"
          value={
            <Badge
              type="accent"
              size="sm"
              className="capitalize"
              color={TEMPERAMENT_COLOR_MAP[customer.current_temperament]}
            >
              {customer.current_temperament}
            </Badge>
          }
        />
      </main>
    </section>
  )
}

export default UserInfo
