import AppDrawer from "@/components/organisms/AppDrawer"
import { PopupKeys } from "@/utils/enums"
import { FC, Ticket } from "@/utils/types"
import React from "react"
import ViewTicketContent from "./ViewTicketContent"

type Props = {
  ticket?: Ticket
}

const TicketViewDrawer: FC<Props> = ({ ticket }) => {
  return (
    <AppDrawer
      id={PopupKeys.VIEW_TICKET_DRAWER}
      header={{ title: "Ticket preview" }}
      classNames={{ wrapper: "px-2", base: "w-full max-w-[504px]" }}
    >
      <ViewTicketContent ticket={ticket} />
    </AppDrawer>
  )
}

export default TicketViewDrawer
