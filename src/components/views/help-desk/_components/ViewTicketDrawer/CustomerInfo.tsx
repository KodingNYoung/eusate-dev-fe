import Icon from "@/components/atoms/Icon"
import Typography from "@/components/atoms/Typography"
import { FC, TicketCustomer } from "@/utils/types"
import React from "react"
import TicketDetailItem from "./TicketDetailItem"
import Badge from "@/components/atoms/Badge"
import { TEMPERAMENT_COLOR_MAP } from "../../utils"

type Props = {
  info: TicketCustomer
}

const CustomerInfo: FC<Props> = ({ info }) => {
  return (
    <section className="py-5 px-8 border-b border-gray-50">
      <header className="flex items-center gap-2 text-gray-400 !leading-none mb-3">
        <Icon name="icon-user-square" size={20} />
        <Typography className="text-medium-sm">Customer information</Typography>
      </header>
      <main className="border border-gray-50 rounded-x20 p-4 grid gap-5">
        <TicketDetailItem label="Customer ID" value={info.id} />
        <TicketDetailItem
          label="Temperament"
          value={
            <Badge
              type="accent"
              size="sm"
              className="capitalize"
              color={TEMPERAMENT_COLOR_MAP[info.current_temperament]}
            >
              {info.current_temperament}
            </Badge>
          }
        />
      </main>
    </section>
  )
}

export default CustomerInfo
