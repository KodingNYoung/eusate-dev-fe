import { takeoverTicket } from "@/app/(organisation-routes)/(dashboard)/helpdesk/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormToast } from "@/hooks/formHooks"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC, Ticket } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  ticket: Ticket
  onTakeover?: () => void
}

const TicketTakeoverBtn: FC<Props> = ({ ticket, onTakeover }) => {
  const queryClient = useQueryClient()

  const [state, action] = useFormState(takeoverTicket, {})

  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_FN_KEYS.TICKETS, ticket?.id],
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_FN_KEYS.TICKETS,
      })
      if (onTakeover) {
        onTakeover()
      }
    }
  }, [state, queryClient, onTakeover, ticket?.id])

  return ticket.assignee === null ? (
    <form className="flex-1 w-full" action={action}>
      <input hidden name="ticket" value={ticket.id} readOnly />
      <SubmitButton
        variant="primary"
        size="xl"
        classNames={{ root: "w-full py-4.5" }}
      >
        Take over
      </SubmitButton>
    </form>
  ) : null
}

export default TicketTakeoverBtn
