import { takeoverTicket } from "@/app/(dashboard)/helpdesk/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC, FormState } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect } from "react"
import { useFormState } from "react-dom"

type Props = {
  ticketId: string
}

const TakeoverButton: FC<Props> = ({ ticketId }) => {
  const queryClient = useQueryClient()
  const [state, action] = useFormState<FormState, FormData>(takeoverTicket, {})

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_FN_KEYS.TICKET, ticketId],
      })
    }
  }, [state, queryClient, ticketId])
  return (
    <form action={action}>
      <input hidden name="ticket" value={ticketId} readOnly />
      <SubmitButton className="w-full py-3">Take over</SubmitButton>
    </form>
  )
}

export default TakeoverButton
