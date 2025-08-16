import Icon from "@/components/atoms/Icon"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useCopilot, useTicketContext } from "@/hooks/helpdesk"
import { useOrganisation } from "@/providers/organisationProvider"
import React, { FC, useEffect, useRef, useState } from "react"
import { TicketStatus } from "../../help-desk/utils"
import { useFormState } from "react-dom"
import {
  sendCopilotMessage,
  SendCopilotMessageResponse,
} from "@/app/(organisation-routes)/(dashboard)/helpdesk/actions"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import { useValidation } from "@/hooks/formHooks"
import { sendMessageSchema } from "@/lib/schemas/helpdesk"

const ChatFooter: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const { ticketDetails: { data: ticket } = {} } = useTicketContext()
  const { organisationUserId } = useOrganisation()
  const { sendMessage, updateNewMessageResponse } = useCopilot()

  const { hasErrors, markFieldTouched } = useValidation(
    sendMessageSchema,
    formRef
  )

  const [newMessageId, setNewMessageId] = useState<string>()

  const [state, action] = useFormState(sendCopilotMessage, {})

  useEffect(() => {
    if ("success" in state) {
      const payload = state.payload as SendCopilotMessageResponse
      updateNewMessageResponse(payload, newMessageId as string)
      setNewMessageId("")
    }
  }, [state])

  return ticket?.assignee?.id === organisationUserId &&
    ticket.status === TicketStatus.TAKEN ? (
    <div className="sticky bg-white z-[11] bottom-0 mt-auto border-t border-t-gray-50 p-4">
      <form
        ref={formRef}
        className="flex w-full items-end"
        action={async (formdata) => {
          action(formdata)
        }}
        onSubmit={(e) => {
          const message = new FormData(e.currentTarget).get("message") as string
          const messageId = sendMessage(message)
          setNewMessageId(messageId)
          setTimeout(() => {
            if (formRef.current) {
              formRef.current.reset()
            }
          }, 50)
        }}
      >
        <input hidden name="ticketId" value={ticket?.id} readOnly />
        <AutoResizingTextarea
          name="message"
          placeholder="Type a message"
          onChange={() => markFieldTouched("message")}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              e.currentTarget.value.trim() &&
              !e.shiftKey
            ) {
              e.preventDefault()
              e.currentTarget.form.requestSubmit()
            }
          }}
          minRows={1}
          maxRows={2}
          classNames={{ input: "!text-medium-sm", inputWrapper: "p-0 min-h-8" }}
        />

        <SubmitButton
          size="sm"
          classNames={{
            label:
              "!leading-none visible group-data-[loading=true]/button:invisible group-data-[loading=true]/button:absolute",
            root: "size-5 min-h-5 min-w-5 sm:size-8 sm:min-h-8 sm:min-w-8 !py-0",
          }}
          disabled={hasErrors}
        >
          <Icon name="icon-send-2-bold" size={20} />
        </SubmitButton>
      </form>
    </div>
  ) : null
}

export default ChatFooter
