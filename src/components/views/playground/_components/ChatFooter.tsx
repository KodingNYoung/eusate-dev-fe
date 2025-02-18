"use client"

import Icon from "@/components/atoms/Icon"
import AutoResizingTextarea from "@/components/molecules/Inputs/AutoResizingTextarea"
import { AddMessageReturnType } from "@/providers/playgroundProvider"
import { FC, FormState } from "@/utils/types"
import React, { useEffect, useState } from "react"
import ChatPreferencesButton from "./ChatPreferencesButton"
import ChatPreferencesModal from "./ChatPreferencesModal"
import ClearButton from "./ClearButton"
import ClearConvoModal from "./ClearConvoModal"
import SubmitButton from "@/components/molecules/Buttons/SubmitButton"
import { useFormState } from "react-dom"
import { createMessage } from "@/app/(dashboard)/playground/actions"
import { SendMessageResponse } from "@/lib/services/playground"
import { usePlayground } from "@/hooks/playground"

const ChatFooter: FC = () => {
  const [ids, setIds] = useState<AddMessageReturnType>()
  const {
    textBoxValue,
    setTextBoxValue,
    settings,
    addNewMessage,
    updateNewMessageResponse,
  } = usePlayground()

  const [state, action] = useFormState<
    FormState<SendMessageResponse>,
    FormData
  >(async (state, formdata) => {
    const message = formdata.get("message") as string
    return await createMessage(state, { message, ...settings })
  }, {})

  useEffect(() => {
    if ("success" in state) {
      const payload = state.payload as SendMessageResponse
      updateNewMessageResponse(
        payload,
        ids?.historyCode || "",
        ids?.userMessage || "",
        ids?.sateResponse || ""
      )
    }
  }, [state])

  return (
    <footer className="sticky bottom-0 px-4 pb-5 sm:pb-10 ">
      <div className="max-w-[906px] w-full mx-auto">
        <form
          action={action}
          onSubmit={(e) => {
            const message = new FormData(e.currentTarget).get(
              "message"
            ) as string
            const ids = addNewMessage(message)
            setIds(ids)
          }}
          className="border border-gray-50 bg-gray-25 flex flex-col rounded-x20 p-1 gap-2"
        >
          <AutoResizingTextarea
            placeholder="Ask Eusate AI anything..."
            name="message"
            value={textBoxValue}
            onChange={setTextBoxValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form.requestSubmit()
              }
            }}
            classNames={{
              inputWrapper:
                "px-6 py-4 border border-gray-50 group-data-[focus=true]:border-warning-500 group-data-[hover=true]:border-warning-300",
            }}
            minRows={3}
            maxRows={6}
          />
          <div className="flex items-center px-3 py-2 gap-2">
            <ChatPreferencesButton />
            <ClearButton />
            <div className="flex-1" />
            <SubmitButton
              classNames={{
                label:
                  "!leading-none visible group-data-[loading=true]/button:invisible group-data-[loading=true]/button:absolute",
                root: "size-9 sm:size-14 !py-0",
              }}
            >
              <Icon name="icon-send-2-bold" size={20} />
            </SubmitButton>
          </div>
        </form>
      </div>
      <ChatPreferencesModal />
      <ClearConvoModal />
    </footer>
  )
}

export default ChatFooter
