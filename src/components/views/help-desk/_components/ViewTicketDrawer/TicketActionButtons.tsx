"use client"

import Button from "@/components/molecules/Buttons"
import { useModal } from "@/hooks/popupHooks"
import { ROUTES } from "@/utils/constants"
import { Ticket } from "@/utils/types"
import React, { FC, useCallback } from "react"
import TicketTakeoverBtn from "./TicketTakeoverBtn"
import { useRouter } from "next/navigation"

type Props = {
  ticket: Ticket
}

const TicketActionBtns: FC<Props> = ({ ticket }) => {
  const { close } = useModal()
  const { push } = useRouter()

  const goToChat = useCallback(() => {
    close()
    push(`${ROUTES.TICKET}/${ticket.id}`)
  }, [ticket, close, push])

  return (
    <footer className="p-5 px-8 border-t border-gray-50 w-full sticky left-0 bottom-0 mt-auto flex items-center justify-center gap-5 bg-white">
      <Button
        variant="tetiary"
        onClick={goToChat}
        size="lg"
        classNames={{ root: "flex-1 py-4.5" }}
      >
        View full details
      </Button>
      <TicketTakeoverBtn ticket={ticket} onTakeover={goToChat} />
    </footer>
  )
}

export default TicketActionBtns
