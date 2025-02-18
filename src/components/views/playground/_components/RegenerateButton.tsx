import { createMessage } from "@/app/(dashboard)/playground/actions"
import Icon from "@/components/atoms/Icon"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { usePlayground } from "@/hooks/playground"
import { SendMessageResponse } from "@/lib/services/playground"
import { FC, FormState } from "@/utils/types"
import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"

type Props = {
  historyCode: string
  userMessageId: string
  userMessageText: string
  setCanGoToLast?: (val: boolean) => void
}

const RegenerateButton: FC<Props> = ({
  historyCode,
  userMessageId,
  userMessageText,
  setCanGoToLast,
}) => {
  const [responseId, setResponseId] = useState("")

  const { settings, createResponseEntry, updateResponse } = usePlayground()

  const [state, action] = useFormState<
    FormState<SendMessageResponse>,
    FormData
  >(async (state) => {
    return await createMessage(state, {
      message: userMessageText,
      userMessageId,
      regenerate: true,
      ...settings,
    })
  }, {})

  useEffect(() => {
    if ("success" in state) {
      updateResponse(
        state.payload as SendMessageResponse,
        historyCode,
        userMessageId,
        responseId
      )

      setTimeout(() => {
        if (setCanGoToLast) setCanGoToLast(true)
      }, 2000)
    }
  }, [state, updateResponse, historyCode, userMessageId, responseId])
  return (
    <form
      action={action}
      onSubmit={() => {
        if (setCanGoToLast) {
          setCanGoToLast(false)
        }
        const responseId = createResponseEntry(historyCode, userMessageId)
        setResponseId(responseId)
      }}
    >
      <SubmitButton
        variant="tetiaryText"
        size="mini"
        classNames={{
          root: "!border-0 focus:border-0 active:border-0 !py-0",
          label: "!leading-none",
        }}
        hideLoader
      >
        <Icon
          name="icon-refresh"
          size={20}
          className="group-data-[loading=true]/button:animate-spin block"
        />
      </SubmitButton>
    </form>
  )
}

export default RegenerateButton
