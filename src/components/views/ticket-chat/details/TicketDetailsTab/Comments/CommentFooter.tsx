import { addTicketComment } from "@/app/(organisation-routes)/(dashboard)/helpdesk/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import { useFormToast, useValidation } from "@/hooks/formHooks"
import { addCommentSchema } from "@/lib/schemas/helpdesk"
import { QUERY_FN_KEYS } from "@/utils/constants"
import { FC } from "@/utils/types"
import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useRef } from "react"
import { useFormState } from "react-dom"

type Props = {
  ticketId: string
}

const CommentFooter: FC<Props> = ({ ticketId }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const queryClient = useQueryClient()

  const { hasErrors, markFieldTouched } = useValidation(
    addCommentSchema,
    formRef
  )

  const [state, action] = useFormState(addTicketComment, {})

  useFormToast(state)

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_FN_KEYS.TICKET_COMMENTS, ticketId],
      })
      formRef.current?.reset()
    }
  }, [state, ticketId])

  return (
    <form
      action={action}
      ref={formRef}
      className="flex w-full bg-white gap-1 justify-between sticky bottom-0 items-end border-t border-gray-50 rounded-b-x20 py-2.5 px-3"
    >
      <input hidden name="ticket_id" value={ticketId} readOnly />
      <AutoResizingTextarea
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value && !e.shiftKey) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }
        }}
        onChange={() => {
          markFieldTouched("message")
        }}
        className="w-full border-none outline-none text-medium-sm placeholder:text-gray-300 flex-1 resize-none max-h-full"
        classNames={{
          inputWrapper:
            "p-0 group-data-[focus=true]:border-none !ring-0 !ring-offset-0",
          input: "!text-medium-sm text-gray-300 no-scrollbar",
        }}
        name="message"
        placeholder="Type your comment"
        autoFocus
      />
      <SubmitButton
        size="sm"
        disabled={hasErrors}
        classNames={{ root: "px-6 !py-1.5 mb-1" }}
      >
        Send
      </SubmitButton>
    </form>
  )
}
export default CommentFooter
