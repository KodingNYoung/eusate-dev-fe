import { addTicketComment } from "@/app/(dashboard)/helpdesk/actions"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useValidation } from "@/hooks/formHooks"
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

  useEffect(() => {
    if ("success" in state) {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_FN_KEYS.TICKET_COMMENTS, ticketId],
      })
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      action={action}
      ref={formRef}
      className="flex w-full bg-white gap-4 justify-between sticky bottom-0 items-center p-4.5 px-5 border-t border-gray-50 rounded-b-x20"
    >
      <input hidden name="ticket_id" value={ticketId} readOnly />
      <textarea
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value && !e.shiftKey) {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }
        }}
        onChange={(e) => {
          markFieldTouched(e.currentTarget.name)
        }}
        className="w-full border-none outline-none text-medium-sm placeholder:text-gray-300 flex-1 resize-none max-h-full"
        rows={1}
        name="message"
        placeholder="Type your comment"
        autoFocus
      />
      <SubmitButton
        size="sm"
        disabled={hasErrors}
        classNames={{ root: "px-6 !py-1.5" }}
      >
        Send
      </SubmitButton>
    </form>
  )
}
export default CommentFooter
